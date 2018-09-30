import React, { Component } from "react";
import ForgotPasswordVerify from "../components/ForgotPasswordVerify";

export default class ForgotPasswordVerifyScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerStyle: {
				backgroundColor: "#fc003e",
				paddingRight: 20,
				paddingLeft: 20,
				borderBottomWidth: 0
			}
		};
	};
	render() {
		return <ForgotPasswordVerify />;
	}
}
