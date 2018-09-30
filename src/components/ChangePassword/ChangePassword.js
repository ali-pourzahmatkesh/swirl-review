import React, { Component } from "react";
import {
	Image,
	Keyboard,
	LayoutAnimation,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	View
} from "react-native";

import { SafeAreaView, NavigationActions } from "react-navigation";

import logo from "../../assets/images/logo_bigger.png";
import passwordIcon from "../../assets/images/passwordIcon.png";
import appCss from "../../../app.css";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fc003e"
		// flexDirection: 'column'
	},
	imagesContent: {
		height: "15%",
		alignItems: "center",
		marginTop: "5%",
		marginBottom: "10%"
	},
	imageItem: {
		flex: 1,
		resizeMode: "contain"
	},
	formContainer: {
		width: 300,
		alignSelf: "center"
		// borderWidth: 1
	},
	formInputIcon: {
		height: "110%",
		width: "10%",
		resizeMode: "contain"

		// borderWidth: 2
	},
	minLengthText: {
		alignSelf: "flex-end",
		color: "#fff",
		fontFamily: "MuseoSansRounded-300",
		fontSize: 10,
		marginTop: 7,
		marginBottom: 15
	},
	nextButton: {
		backgroundColor: "#faec22",
		height: "10%",
		width: "100%",
		justifyContent: "center",
		position: "absolute"
	},
	nextText: {
		color: "#fc003e",
		textAlign: "center",
		fontSize: 20
	},
	textInput: {
		fontSize: 16,
		paddingLeft: "6%",
		color: "#fff",
		width: "100%"

		// borderWidth: 2
	},
	textInputContainer: {
		alignSelf: "center",
		borderBottomWidth: 1.5,
		borderBottomColor: "#fff",
		flexDirection: "row",
		// marginBottom: 30,
		paddingBottom: 12,
		// width: '85%'
		width: 300
	}
});

export default class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bottom: 0,
			password: "",
			retypePassword: ""
		};
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
	};

	keyboardWillHide = event => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				event.duration,
				LayoutAnimation.Types[event.easing]
			)
		);
		this.setState({
			bottom: 0
		});
	};

	handleSubmit = () => {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: "WelcomeStack" })],
			key: null
		});
		this.props.changePassword({
			cellphone: this.props.navigation.state.params.cellphone,
			token: this.props.navigation.state.params.token,
			password: this.state.password,
			navigation: this.props.navigation,
			resetAction: resetAction
		});
	};

	render() {
		console.log(this.state, this.props.navigation.state.params);

		let nextDisabled = true;
		if (
			this.state.password === this.state.retypePassword &&
			this.state.password.length >= 7
		) {
			nextDisabled = false;
		}

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.imagesContent}>
					<Image style={styles.imageItem} source={logo} />
				</View>
				<View style={styles.formContainer}>
					<View style={styles.textInputContainer}>
						<Image style={styles.formInputIcon} source={passwordIcon} />
						<TextInput
							placeholder="New Password"
							placeholderTextColor="#fff"
							secureTextEntry={true}
							style={[appCss.defaultFontApp, styles.textInput]}
							onChangeText={text => this.setState({ password: text })}
						/>
					</View>
					<Text style={styles.minLengthText}>min 7 characters</Text>

					<View style={styles.textInputContainer}>
						<Image style={styles.formInputIcon} source={passwordIcon} />
						<TextInput
							placeholder="Re-enter Password"
							placeholderTextColor="#fff"
							secureTextEntry={true}
							style={[appCss.defaultFontApp, styles.textInput]}
							onChangeText={text => this.setState({ retypePassword: text })}
						/>
					</View>
				</View>
				<TouchableOpacity
					style={[styles.nextButton, { bottom: this.state.bottom }]}
					disabled={nextDisabled}
					onPress={this.handleSubmit}
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
			</SafeAreaView>
		);
	}
}
