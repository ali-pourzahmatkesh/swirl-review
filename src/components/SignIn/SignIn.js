import React, { Component } from "react";
import {
    Animated,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
	View,
	Dimensions,
} from "react-native";
import {NavigationActions, SafeAreaView} from "react-navigation";
import BubbleInput from "../_common/BubbleInput";
import KeyboardAwareButton from "../_common/KeyboardAwareButton";
import logo from "../../assets/images/logo_bigger.png";
import passwordIcon from "../../assets/images/icons/password3.png";
import appCss from "../../../app.css";
import styles from "./style";
const { width, height } = Dimensions.get("window");

export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cellphone: "",
			password: "",
			passwordFocused: false,
			
			// need to provide default for country code
			cellphoneCountryCode: '1',
			flag: "",
		};

		this.forgotPassMargin = new Animated.Value(100);
        this.forgotPassMarginInterpolate = this.forgotPassMargin.interpolate({
            inputRange: [0, 100],
            outputRange: ["5%", "27%"]
        });
	}

	componentDidMount() {
		
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
			})
		]).start();
	};

	keyboardWillHide = event => {
		Animated.parallel([
			Animated.timing(this.forgotPassMargin, {
				duration: event.duration,
				toValue: 100
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
		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={(height * 0.08 + 120 + (this.state.passwordFocused && 50))}>
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
				</KeyboardAvoidingView>
				<TouchableOpacity
					onPress={() => {
						this.props.navigation.navigate("SignUpScreen", {leftTitle: 'Login'})
					}}
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
