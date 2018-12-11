import React, { Component } from "react";
import {
	Image,
	Text,
	View,
	Keyboard,
	Animated
} from "react-native";
import { SafeAreaView } from "react-navigation";
import KeyboardAwareButton from "../_CommonComponents/KeyboardAwareButton";
import CodeField from "react-native-confirmation-code-field";

import logo from "../../assets/images/logo1.png";

import appCss from "../../../app.css";
import styles from "./style";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;

export default class ForgotPasswordVerify extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: ""
		};
		this.bottomPadding = new Animated.Value(0);
	}

	componentWillReceiveProps(nextProps){
		if(
			!this.props.navigation.getParam('sendUserProps') &&
			this.props.isLoadingFetch !== nextProps.isLoadingFetch &&
			nextProps.hasError
		)
		{
			this.refs.vcode.clear();
		}
	}

	toConfirm = () => {
		this.props.navigation.navigate("ChangePasswordScreen");
	};

	propsForCodeField = (index)=>{
        return {
            autoCorrect: false,
			returnKeyType: null,
			selectionColor: colors.appColor, // changes the caret/cursor/blinking line color
        }
	}

	onFulfill = code => {
		this.setState({
			code
		}, this.handleSubmit)
	}

	handleSubmit = () => {
		let {
			navigation,
			sendUser
		} = this.props;
		let {
			code
		} = this.state;
		code = parseInt(code);
		if(navigation.getParam('sendUserProps')){
			if(
				code === navigation.getParam('verifyCode') &&
				new Date() < navigation.getParam('verifyCodeExpireAt')
			){
				sendUser(navigation.getParam('sendUserProps'));
			}
			else{
				setTimeout(()=>{
					this.refs.vcode.clear();
				}, 0);
			}
		}
		else{
			this.props.updateCodeGetUser({
				cellphoneCountryCode: this.props.navigation.state.params
					.cellphoneCountryCode,
				cellphone: this.props.navigation.state.params.cellphone,
				navigation: this.props.navigation,
				verifyCode: code
			});
		}
	};

	componentWillMount(){
		this.keyboardWillShowSub = Keyboard.addListener(
			"keyboardWillShow",
			this.keyboardWillShow
		);
		this.keyboardWillHideSub = Keyboard.addListener(
			"keyboardWillHide",
			this.keyboardWillHide
		);
	}

	componentWillUnmount(){
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
    }

	keyboardWillShow = event => {
		Animated.parallel([
			Animated.timing(this.bottomPadding, {
				duration: event.duration,
				toValue: event.endCoordinates.height
			}),
		]).start();
	};

	keyboardWillHide = event => {
		Animated.parallel([
			Animated.timing(this.bottomPadding, {
				duration: event.duration,
				toValue: 0
			}),
		]).start();
	};

	render() {
		let {
			isLoadingFetch
		} = this.props;

		let nextDisabled = false;
		if (this.state.code.length !== 4) {
			nextDisabled = true;
		}

		return (
			<SafeAreaView style={styles.container}>
				<Animated.View style={{ flex: 1,  paddingBottom: this.bottomPadding}}>
					<View style={ styles.imageContainer }>
						<Image style={styles.imageItem} source={logo}/>
					</View>

					<View style={styles.formInputContainer}>
						<Text style={styles.promptText}>
							Please enter the verification code
						</Text>
						<CodeField
							ref='vcode'
							codeLength={4}
							autoFocus={true}
                            keyboardType='numeric'
							getInputStyle={() => styles.codeInput}
							getInputProps={this.propsForCodeField}
							onFulfill={this.onFulfill}
							onChangeCode={code => this.setState({code})}
						/>
					</View>
				</Animated.View>
				<KeyboardAwareButton
					title='Next'
					onPress={this.handleSubmit}
					disabled={nextDisabled}
					beginOnPage={true}
					loading={isLoadingFetch}
				/>
			</SafeAreaView>
		);
	}
}