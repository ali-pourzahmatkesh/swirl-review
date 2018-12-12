import React, { Component } from "react";
import {
    Animated,
    Image,
    Keyboard,
    Text,
    TouchableOpacity,
	View,
	Dimensions,
} from "react-native";
import {NavigationActions, SafeAreaView} from "react-navigation";
import { isIphoneX } from 'react-native-iphone-x-helper';
import SplashScreen from 'react-native-splash-screen';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import CustomHeader from "./CustomHeader";
import BubbleInput from "../_CommonComponents/BubbleInput";
import KeyboardAwareButton from "../_CommonComponents/KeyboardAwareButton";
import logo from "../../assets/images/logo1.png";
import passwordIcon from "../../assets/images/icons/password3.png";
import appCss from "../../../app.css";
import styles from "./style";
import xOpeningGif from "../../assets/animations/opening5.gif";
const { width, height } = Dimensions.get("window");
const openingGif = isIphoneX() ? xOpeningGif : null;

export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cellphone: "",
			password: "",
			passwordFocused: false,
			animationRunning: true,
			
			// need to provide default for country code
			cellphoneCountryCode: '1',
			flag: "",
		};

		this.forgotPassMargin = new Animated.Value(100);
        this.forgotPassMarginInterpolate = this.forgotPassMargin.interpolate({
            inputRange: [0, 100],
            outputRange: ["5%", "27%"]
		});
		this.bottomPadding = new Animated.Value(0);
	}

	componentDidMount() {
		SplashScreen.hide();
		setTimeout(() => {
			this.setState({
				animationRunning: false
			}, () => this.props.finishEntry())
		}, 600); // removes image tag at about the time the animation finishes
	}

	componentWillMount() {
		this.attachKeyboardListeners();
	}

	componentWillUnmount() {
		this.removeKeyboardListeners();
	}

	handlePhoneFieldFocus = () => {
		this.setState({
			countryCodeVisible: true
		});
	};

	handlePhoneFieldBlur = () => {
		this.setState({
			countryCodeVisible: false
		});
	};

	attachKeyboardListeners = () => {
		this.keyboardWillShowSub = Keyboard.addListener(
			"keyboardWillShow",
			this.keyboardWillShow
		);
		this.keyboardWillHideSub = Keyboard.addListener(
			"keyboardWillHide",
			this.keyboardWillHide
		);
	}

	removeKeyboardListeners = () => {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
    }

	keyboardWillShow = event => {
		Animated.parallel([
			Animated.timing(this.forgotPassMargin, {
				duration: event.duration,
				toValue: 0
			}),
			Animated.timing(this.bottomPadding, {
				duration: event.duration,
				toValue: event.endCoordinates.height + height * 0.10
			})
		]).start();
	};

	keyboardWillHide = event => {
		Animated.parallel([
			Animated.timing(this.forgotPassMargin, {
				duration: event.duration,
				toValue: 100
			}),
			Animated.timing(this.bottomPadding, {
				duration: event.duration,
				toValue: 0
			})
		]).start();
	};

	handleSubmit = () => {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: "HomeStack" })],
			key: null
		});
		this.props.sendPassword({
			password: this.state.password,
			cellphone: this.state.cellphone,
			cellphoneCountryCode: this.state.cellphoneCountryCode,
			navigation: this.props.navigation,
			resetAction
		});
	};

	render() {
		let gifHeight = height * 1.0;
		let gifWidth = width * 1.0;

		let {
			animationRunning
		} = this.state;
		return (
			<SafeAreaView style={styles.container}>
			{!this.props.finishedEntry &&  animationRunning && 
				<Image
					source={openingGif}
					style={{
						height: gifHeight,
						width: gifWidth,
						// borderWidth: 10,
						position: 'absolute',
						zIndex: 3,
						margin: 'auto',
						top: ((gifHeight * 0.5) - (height * 0.5)) * -1,
						left: ((gifWidth * 0.5) - (width * 0.5)) * -1,
					}}
				/>
			}
				<CustomHeader
					middle='Login'
					right='Signup'
					rightNav='SignUpScreen'
					rightNavProps={{
						leftTitle: 'Login'
					}}
					nav={this.props.navigation}
					containerStyle={{
						position: 'absolute',
						top: getStatusBarHeight(),
						zIndex: 2
					}}
				/>
				{/* this view creates space now that the header is being positioned absoultely */}
				<View style={{
					height: getStatusBarHeight(),
				}}/>
				<Animated.View style={{flex: 1, paddingBottom: this.bottomPadding}}>
					<View style={styles.imageContainer}>
						<Image style={styles.imageItem} source={logo} />
					</View>
					<View style={appCss.formInputContainer}>
						<BubbleInput
							phoneNumber={true}
							defaultCountryCode={this.state.cellphoneCountryCode}
							defaultFlag={this.state.flag}
							setCountryCode={
								countryCodeData=> {
									this.setState(countryCodeData)
								}
							}
							inputProps={{
								onChangeText: cellphone => this.setState({ cellphone })
							}}
						/>

						<BubbleInput
							icon={passwordIcon}
							inputProps={{
								secureTextEntry: true,
								placeholder: 'Password',
								onChangeText: text => this.setState({ password: text }),
								onFocus: () => this.setState({passwordFocused: true}),
							}}
						/>
						
						<TouchableOpacity
							style={{ alignSelf: "flex-end" }}
							onPress={() =>
								this.props.navigation.navigate("ForgotPasswordScreen")
							}
						>
							<Animated.Text
								style={[
									styles.forgotPassword,
									{ marginTop: this.forgotPassMarginInterpolate }
								]}
							>
								Forgot Password
							</Animated.Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("SignUpScreen", {leftTitle: 'Login'})
					}}
					style={styles.signUpButtonBottom}
				>
					<Text style={styles.signUpText}>Don't have an account? Signup</Text>
				</TouchableOpacity>
				<KeyboardAwareButton
					title='Login'
					onPress={this.handleSubmit}
					loading={this.props.isLoadingFetch}
				/>
			</SafeAreaView>
		);
	}
}
