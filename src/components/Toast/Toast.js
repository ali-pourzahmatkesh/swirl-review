import React, { Component } from "react";
import {
	Text,
	View,
	Image,
	Dimensions,
	TouchableOpacity,
	NetInfo
} from "react-native";
import appCss from "../../../app.css";
import styles from "./style";
import exit from "../../assets/images/icons/exit3.png";
import noInternet from "../../assets/images/toastIcons/noInternet.png"

//different toast icons
import wrongUsernameOrPassword from "../../assets/images/toastIcons/userPass.png";
import wrongPhone from "../../assets/images/toastIcons/wrongPhone.png";
import logo from "../../assets/images/logo1.png";


const {height, width} = Dimensions.get('window');
export default class ToastContainer extends Component {
	state = {
		// should probably rename this to 'show toast' or something
		hasError: false,
		errorMessage: "",
		icon: null,
		isConnected: true
	};

	timeOut = undefined;

	componentDidMount(){
		NetInfo.isConnected.fetch().then(isConnected => {
			this.setState({ isConnected });
		});

		NetInfo.isConnected.addEventListener(
			"connectionChange",
			this.handleConnectivityChange
		);
	}

	componentWillReceiveProps(nextProps) {
		if (this.timeOut !== undefined) {
			clearTimeout(this.timeOut);
		}
		if (nextProps.hasError !== this.state.hasError) {
			this.customizeToast(nextProps);
		}
		this.timeOut = setTimeout(() => {
			this.props.hideToast();
		}, 4000);
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener(
			"connectionChange",
			this.handleConnectivityChange
		);
	}

	handleConnectivityChange = isConnected => {
		this.setState({ isConnected }, () => {
			if(!isConnected){
				this.props.showToast(true, 'No Internet Connection')
			}
		});
	};

	closeToast = () => {
		clearTimeout(this.timeOut);
		this.props.hideToast();
	}

	customizeToast = (nextProps) => {
		let {
			hasError,
			errorMessage
		} = nextProps;
		let {
			isConnected
		} = this.state;
		console.log('error message ***************************', errorMessage);
		// probably should be an empty string but leaving it as the 
		// original message for debugging right now
		let newMessage = errorMessage;
		let newIcon = null;
		if(!isConnected){
			newIcon = noInternet;
			newMessage = 'No Internet Connection';
		}
		else if(
			errorMessage === 'Missing Parameter' ||
			errorMessage === 'Wrong Password'
		){
			newMessage = 'Wrong Username or Password';
			newIcon = wrongUsernameOrPassword;
		}
		else if(
			errorMessage === 'Error sending verifyCode.'
		){
			newMessage = 'Wrong Phone Number';
			newIcon = wrongPhone;
		}
		else if(
			errorMessage === 'Server Error from SEND_USER'
		){
			newMessage = 'Invalid Username';
			newIcon = wrongUsernameOrPassword;
		}
		else if(
			errorMessage === 'There is already an account associated with that phone number from SEND_USER'
		){
			newMessage = 'Existing Account';
			newIcon = wrongPhone;
		}
		else if(
			errorMessage.slice(-17) === 'just swirled you!' ||
			errorMessage.slice(-10) === 'swirl now!'
		){
			newIcon = logo;
		}

		this.setState({
			hasError,
			errorMessage: newMessage,
			icon: newIcon
		})
	}

	render() {
		let {
			hasError,
			errorMessage,
			icon,
		} = this.state;


		if (!hasError) {
			return null;
		} else {
			return (
				<View style={styles.container}>
					<Image
							// source={null}
							source={icon}
							style={{
								height: 25,
								width: 25
							}}
							resizeMode='contain'
						/>
						<Text style={styles.text}>
							{errorMessage}
						</Text>
						<TouchableOpacity
							style={{
								height: 27,
								width: 27,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={this.closeToast}
						>
							<Image
								source={exit}
								style={{
									height: 15,
									width: 15,
								}}
								resizeMode='contain'
							/>
						</TouchableOpacity>
				</View>
			);
		}
	}
}
