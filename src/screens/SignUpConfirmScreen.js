console.log("SignUpConfirmScreen");
import React, { Component } from "react";
import SignUpConfirm from "../components/SignUpConfirm";

export default class SignUpConfirmScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerStyle: {
				backgroundColor: "#fc003e",
				borderBottomWidth: 0
			}
		};
	};
	render() {
		return <SignUpConfirm />;
	}
}
