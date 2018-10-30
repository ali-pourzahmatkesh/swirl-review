import React, { Component } from "react";
import { Text } from "react-native";
import ChangePassword from "../components/ChangePassword";
import { CONFIG } from "../../config";
const colors = CONFIG.colors;
import appCss from "../../app.css";
export default class ChangePasswordScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
            headerTitle: (
				<Text style={{ color: colors.tapeWhite, fontSize: 17, fontFamily: 'MuseoSansRounded-900' }}>
					Forgot Password
				</Text>
            ),
			headerStyle: {
				backgroundColor: colors.appColor,
				paddingRight: 16,
				paddingLeft: 16,
				borderBottomWidth: 0
			}
		};
	};
	render() {
		return <ChangePassword />;
	}
}
