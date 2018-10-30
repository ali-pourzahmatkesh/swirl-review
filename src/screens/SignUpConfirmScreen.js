console.log("SignUpConfirmScreen");
import React, { Component } from "react";
import { Text } from "react-native";
import SignUpConfirm from "../components/SignUpConfirm";
import { CONFIG } from "../../config";
const colors = CONFIG.colors;
export default class SignUpConfirmScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<Text style={{ color: colors.tapeWhite, fontSize: 17, fontFamily: 'MuseoSansRounded-900' }} >
					Forgot Password
				</Text>
            ),
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
