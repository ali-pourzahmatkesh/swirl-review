import React, { Component } from "react";
import PrivacyPolicy from "../components/PrivacyPolicy";
import { Text } from "react-native";
import appCss from "../../app.css";

export default class PrivacyPolicyScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<Text
					style={[appCss.defaultFontApp, appCss.navigationTitle]}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					Privacy Policy
				</Text>
			)
		};
	};
	render() {
		return <PrivacyPolicy />;
	}
}
