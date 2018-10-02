console.log("SignUpConfirmScreen");
import React, { Component } from "react";
import SignUpConfirm from "../components/SignUpConfirm";
import { CONFIG } from "../../config";
const colors = CONFIG.colors;
export default class SignUpConfirmScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerStyle: {
				backgroundColor: colors.appColor,
				borderBottomWidth: 0
			}
		};
	};
	render() {
		return <SignUpConfirm />;
	}
}
