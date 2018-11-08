import React, { Component } from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	TextInput,
	Animated,
	Keyboard,
	Easing,
	LayoutAnimation,
	Dimensions,
	Alert
} from "react-native";
import { SafeAreaView, NavigationActions } from "react-navigation";
import CodeInput from "react-native-confirmation-code-input";

import logo from "../../assets/images/logo_bigger.png";
import styles from "./style";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;
// const styles = StyleSheet.create({
// 	almostText: {
// 		fontSize: 26,
// 		color: "#f8e71c",
// 		marginBottom: "8%"
// 	},
// 	container: {
// 		backgroundColor: "#fc003e",
// 		flex: 1
// 	},
// 	contentContainer: {
// 		flex: 1,
// 		alignItems: "center"
// 	},
// 	imagesContent: {
// 		height: "10%",
// 		alignItems: "center",
// 		marginBottom: "3%"
// 	},
// 	imageItem: {
// 		flex: 1,
// 		aspectRatio: 1,
// 		resizeMode: "contain"
// 	},
// 	nextButtonContainer: {
// 		backgroundColor: "#faec22",
// 		// backgroundColor: 'blue',
// 		height: "20%",
// 		width: "100%",
// 		position: "absolute"
// 	},
// 	nextButton: {
// 		backgroundColor: "#faec22",
// 		height: "50%",
// 		justifyContent: "center"
// 	},
// 	nextText: {
// 		color: "#fc003e",
// 		textAlign: "center",
// 		fontSize: 20
// 	},
// 	resendButton: {
// 		alignSelf: "flex-end",
// 		marginRight: "12%"
// 	},
// 	resendText: {
// 		color: "#fff",
// 		fontSize: 14,
// 		fontFamily: "MuseoSansRounded-300"
// 	},
// 	promptText: {
// 		color: "#fff",
// 		fontSize: 18,
// 		textAlign: "center",
// 		width: "80%",
// 		marginBottom: "5%"
// 	}
// });

export default class SignUpConfirm extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

	componentDidMount() {
		console.log(this.props.navigation.state.params.currentMember);
	}

	componentDidUpdate() {
		if (
			this.props.currentMember.verifyCode === "" &&
			!this.props.isLoadingFetch
		) {
			this.props.getVerifyCode(
				this.props.navigation.state.params.currentMember.id
			);
		}
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

	handleResend = () => {
		console.log(this.props.navigation.state.params.currentMember);
		this.props.resendVerifyCode(
			this.props.navigation.state.params.currentMember.cellphone
		);
		console.log(this.props.verifyCode);
	};

	handleSubmit = () => {
		console.log("verify code from props", this.props.verifyCode);
		if (this.props.verifyCode !== "") {
			this.props.navigation.state.params.currentMember.verifyCode = this.props.verifyCode;
		}
		if (
			parseInt(this.state.code) !==
			this.props.navigation.state.params.currentMember.verifyCode
		) {
			this.props.showToast("That code doesn't match the one we sent you.");
			this.refs.vcode.clear();
		} else {
			let id = this.props.navigation.state.params.currentMember.id;
			let password = this.props.navigation.state.params.currentMemberPassword;
			let token = this.props.navigation.state.params.currentMember
				.resetPasswordToken;
			const resetAction = NavigationActions.reset({
				index: 0,
				actions: [
					NavigationActions.navigate({
						routeName: "HomeStack",
						params: { signUp: true }
					})
				],
				key: null
			});
			this.props.sendPassword({
				id,
				password,
				token,
				navigation: this.props.navigation,
				resetAction
			});
		}
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
				<View style={[styles.contentContainer]}>
					<View style={styles.imageContainer}>
						<Image style={styles.imageItem} source={logo} />
					</View>
					<Text style={[appCss.defaultFontApp, styles.promptText]}>
						Please enter verification code
					</Text>
					<View style={styles.formInputContainer}>
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
					<TouchableOpacity
						style={styles.resendButton}
						onPress={this.handleResend}
					>
						<Text style={[styles.resendText]}>Resend</Text>
					</TouchableOpacity>
				</View>

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
								nextDisabled && { color: colors.inactiveButtonText }
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
