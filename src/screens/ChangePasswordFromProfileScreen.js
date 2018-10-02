import React, { Component } from "react";
import ChangePasswordFromProfile from "../components/ChangePasswordFromProfile";
import { Text } from "react-native";
import appCss from "../../app.css";

export default class ChangePasswordFromProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerStyle: {
				backgroundColor: "#ed1b34",
				paddingRight: 20,
				paddingLeft: 20,
				borderBottomWidth: 0
			},
			headerTitle: (
				<Text
					style={[appCss.defaultFontApp, appCss.navigationTitle]}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					Change Password
				</Text>
			)
		};
	};
	render() {
		return <ChangePasswordFromProfile />;
	}
}
