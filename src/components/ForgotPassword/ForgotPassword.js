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

import { SafeAreaView } from "react-navigation";

import logo from "../../assets/images/logo_bigger.png";
import phoneIcon from "../../assets/images/phoneIcon.png";
import appCss from "../../../app.css";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fc003e"
		// flexDirection: 'column'
	},
	formInputIcon: {
		height: "110%",
		width: "10%",
		resizeMode: "contain"
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
	nextButton: {
		backgroundColor: "#faec22",
		height: "10%",
		width: "100%",
		justifyContent: "center",
		position: "absolute"
		// bottom: 100
		// marginBottom: -30,

		// borderWidth: 2,
		// borderColor: 'green'
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
	},
	textInputContainer: {
		alignSelf: "center",
		borderBottomWidth: 1.5,
		borderBottomColor: "#fff",
		flexDirection: "row",
		marginBottom: 30,
		paddingBottom: 12,
		width: "85%"
	}
});

export default class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bottom: 0,
			cellphone: ""
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
		this.props.sendVerifyCode({
			cellphone: this.state.cellphone,
			navigation: this.props.navigation
		});
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.imagesContent}>
					<Image style={styles.imageItem} source={logo} />
				</View>
				<View style={styles.textInputContainer}>
					<Image
						style={[styles.formInputIcon, { marginLeft: 5 }]}
						source={phoneIcon}
					/>
					<TextInput
						placeholder="Phone Number"
						placeholderTextColor="#fff"
						keyboardType="number-pad"
						style={[appCss.defaultFontApp, styles.textInput]}
						onChangeText={cellphone => this.setState({ cellphone })}
					/>
				</View>
				<TouchableOpacity
					style={[styles.nextButton, { bottom: this.state.bottom }]}
					onPress={this.handleSubmit}
				>
					<Text style={[appCss.defaultFontApp, styles.nextText]}>Next</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}
