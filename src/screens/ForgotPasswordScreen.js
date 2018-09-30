import React, { Component } from "react";
import { Text } from "react-native";
import ForgotPassword from "../components/ForgotPassword";

import appCss from "../../app.css";

export default class ForgotPasswordScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<Text
					style={[appCss.defaultFontApp, { color: "#faec22", fontSize: 16 }]}
				>
					Forgot Password
				</Text>
			),
			headerStyle: {
				backgroundColor: "#fc003e",
				paddingRight: 20,
				paddingLeft: 20,
				borderBottomWidth: 0
			}
		};
	};
	render() {
		return <ForgotPassword />;
	}
}
