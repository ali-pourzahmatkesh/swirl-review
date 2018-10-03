import React, { Component } from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	TextInput,
    KeyboardAvoidingView,
	Animated,
	Keyboard,
	Easing,
	LayoutAnimation,
	Dimensions
} from "react-native";
import { SafeAreaView } from "react-navigation";
import CodeInput from "react-native-confirmation-code-input";

import logo from "../../assets/images/logo_bigger.png";

import appCss from "../../../app.css";
import styles from "./style";

export default class ForgotPasswordVerify extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// isMatch: false,
			code: ""
		};

		// this.buttonBottom.interpolate = this.buttonBottom.interpolate({
		//     inputRange: [0, 100],
		//     outputRange: [-100, 100]
		// })
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
		Animated.timing(this.buttonBottom, {
			duration: event.duration,
			toValue:
				event.endCoordinates.height - Dimensions.get("window").height * 0.1,
			// easing: Easing.bezier(.71,.72,.69,.98)
			//tried to get as close as possible to the keyboard
			//easing with a custom bezier curve
			easing: Easing.bezier(0.74, 0.8, 0.69, 0.98)
		}).start();
	};

	keyboardWillHide = event => {
		Animated.timing(this.buttonBottom, {
			duration: event.duration,
			toValue: 0 - Dimensions.get("window").height * 0.1,
			easing: Easing.bezier(0.43, 0.79, 0.64, 0.98)
		}).start();
	};

	toConfirm = () => {
		this.props.navigation.navigate("ChangePasswordScreen");
	};

	handleSubmit = () => {
		this.props.updateCodeGetUser({
			cellphoneCountryCode: this.props.navigation.state.params
				.cellphoneCountryCode,
			cellphone: this.props.navigation.state.params.cellphone,
			navigation: this.props.navigation,
			verifyCode: parseInt(this.state.code)
		});
	};

	render() {
		//Need to get window height on each render as it is subject to change.
		this.buttonBottom = new Animated.Value(
			0 - Dimensions.get("window").height * 0.1
		);

		let nextDisabled = false;
		if (this.state.code.length !== 4) {
			nextDisabled = true;
		}

		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<View
						style={
                            styles.imageContainer
                        }
					>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo}/>
						</View>
					</View>

					<View style={styles.formInputContainer}>
						<Text style={[appCss.defaultFontApp, styles.promptText]}>
							Please enter the verification code
						</Text>
						<CodeInput
							ref="vcode"
							className="border-b"
							codeInputStyle={[appCss.defaultFontApp, styles.codeInput]}
							codeLength={4}
							keyboardType="numeric"
							onFulfill={(isMatching, code) => {
								isMatching = true;
								if (isMatching) {
									// this.toConfirm();
								}
							}}
							returnKeyType={null}
							// The CodeInput has a returnKeyType automatically set to 'done'.
							// Setting it to null here to keep a consistent look.
							size={65}
							onContentSizeChange={() =>
								this.setState({ code: this.refs.vcode.state.codeArr.join("") })
							}
						/>
					</View>
				</KeyboardAvoidingView>

				<Animated.View
					style={[styles.nextButtonContainer, { bottom: this.buttonBottom }]}
				>
					<TouchableOpacity
						style={styles.nextButton}
						onPress={this.handleSubmit}
						disabled={nextDisabled}
					>
						<Text
							style={[
								appCss.defaultFontApp,
								styles.nextText,
								nextDisabled && { opacity: 0.5 }
							]}
						>
							Next
						</Text>
					</TouchableOpacity>
				</Animated.View>
			</SafeAreaView>
		);
	}
}
