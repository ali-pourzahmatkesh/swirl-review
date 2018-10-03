import React, { Component } from "react";
import { Text } from "react-native";
import ForgotPasswordVerify from "../components/ForgotPasswordVerify";
import { CONFIG } from "../../config";
const colors = CONFIG.colors;
import appCss from "../../app.css";

export default class ForgotPasswordVerifyScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
            headerTitle: (
				<Text
					style={[appCss.defaultFontApp, { color: colors.combinatorialColor, fontSize: 16 }]}
				>
					Forgot Password
				</Text>
            ),
			headerStyle: {
				backgroundColor: colors.appColor,
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
