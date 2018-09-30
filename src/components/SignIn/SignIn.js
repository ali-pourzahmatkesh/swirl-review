import React, { Component } from "react";
import {
	Animated,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	LayoutAnimation,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

import { NavigationActions, SafeAreaView } from "react-navigation";
import { CONFIG } from "../../../config";

import logo from "../../assets/images/logo_bigger.png";
import passwordIcon from "../../assets/images/passwordIcon.png";
// import mailIcon from "../../assets/images/mailIcon.png";
import phoneIcon from "../../assets/images/phoneIcon.png";
import styles from "./style";

const colors = CONFIG.colors;

export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bottom: -100,
			cellphone: "",
			password: ""
		};

		this.connectFontSize = new Animated.Value(35);
		this.connectOpacity = new Animated.Value(1);
		this.forgotPassMargin = new Animated.Value(100);
		this.forgotPassMarginInterpolate = this.forgotPassMargin.interpolate({
			inputRange: [0, 100],
			outputRange: ["14%", "27%"]
		});

		this.logoHeight = new Animated.Value(100);
		this.logoHeightInterpolate = this.logoHeight.interpolate({
			inputRange: [0, 100],
			outputRange: ["16%", "28%"]
		});

		this.loginButtonBottom = new Animated.Value(-100);
	}

	componentWillMount() {
		this.keyboardWillShowSub = Keyboard.addListener(
			"keyboardWillShow",
			this.keyboardWillShow
		);
		this.keyboardWillHideSub = Keyboard.addListener(
			"keyboardWillHide",
			this.keyboardWillHide
		);
	}

	componentWillUnmount() {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
	}

	keyboardWillShow = event => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				event.duration,
				LayoutAnimation.Types[event.easing]
			)
		);
		this.setState({
			bottom: event.endCoordinates.height
		});

		Animated.parallel([
			Animated.timing(this.connectFontSize, {
				duration: event.duration,
				toValue: 1
			}),
			Animated.timing(this.connectOpacity, {
				duration: event.duration,
				toValue: 0
			}),
			Animated.timing(this.forgotPassMargin, {
				duration: event.duration,
				toValue: 0
			}),
			Animated.timing(this.logoHeight, {
				duration: event.duration,
				toValue: 0
			})
		]).start();
	};

	keyboardWillHide = event => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				event.duration,
				LayoutAnimation.Types[event.easing]
			)
		);
		this.setState({
			bottom: -100
		});
		Animated.parallel([
			Animated.timing(this.connectFontSize, {
				duration: event.duration,
				toValue: 35
			}),
			Animated.timing(this.connectOpacity, {
				duration: event.duration,
				toValue: 1
			}),
			Animated.timing(this.forgotPassMargin, {
				duration: event.duration,
				toValue: 100
			}),
			Animated.timing(this.logoHeight, {
				duration: event.duration,
				toValue: 100
			})
		]).start();
	};

	handleSubmit = () => {
		// Keyboard.dismiss()
		//  ^do we actually need this line?
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: "HomeStack" })],
			key: null
		});
		this.props.sendPassword({
			password: this.state.password,
			cellphone: this.state.cellphone,
			navigation: this.props.navigation,
			resetAction
		});
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<Animated.View
						style={[
							styles.imageContainer,
							{ height: this.logoHeightInterpolate }
						]}
					>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo} />
						</View>
					</Animated.View>
					<Animated.View style={{ opacity: this.connectOpacity }}>
						<Animated.Text
							style={[styles.connectText, { fontSize: this.connectFontSize }]}
						>
							Let's Connect!
						</Animated.Text>
					</Animated.View>
					<View style={styles.formInputContainer}>
						<View style={styles.iconFormInput}>
							<Image style={styles.formInputIcon} source={phoneIcon} />
							<TextInput
								style={styles.textInput}
								placeholder="Phone Number"
								placeholderTextColor={colors.tapeWhite}
								keyboardType="number-pad"
								autoCorrect={false}
								onFocus={() =>
									this.props.navigation.setParams({
										curScreen: "Login",
										nextScreen: "Signup",
										rightNav: "SignUpScreen"
									})
								}
								onBlur={() =>
									this.props.navigation.setParams({
										curScreen: "",
										nextScreen: ""
									})
								}
								onChangeText={text => this.setState({ cellphone: text })}
							/>
						</View>
						<View style={styles.iconFormInput}>
							<Image style={styles.formInputIcon} source={passwordIcon} />
							<TextInput
								style={styles.textInput}
								placeholder="Password"
								placeholderTextColor={colors.tapeWhite}
								secureTextEntry={true}
								onFocus={() =>
									this.props.navigation.setParams({
										curScreen: "Login",
										nextScreen: "Signup",
										rightNav: "SignUpScreen"
									})
								}
								onBlur={() =>
									this.props.navigation.setParams({
										curScreen: "",
										nextScreen: ""
									})
								}
								onChangeText={text => this.setState({ password: text })}
							/>
						</View>
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
					onPress={() => this.props.navigation.navigate("SignUpScreen")}
				>
					<Text style={styles.signUpText}>Don't have an account? Signup</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.loginButton, { bottom: this.state.bottom }]}
					onPress={this.handleSubmit}
				>
					<Text style={styles.loginText}>Login</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}
