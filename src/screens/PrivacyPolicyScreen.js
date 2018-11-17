import React, { Component } from "react";
import PrivacyPolicy from "../components/PrivacyPolicy";
import ProfileOptionHeader from "../components/_common/ProfileOptionHeader";
import { Text, Dimensions } from "react-native";
import appCss from "../../app.css";
const { width, height } = Dimensions.get("window");

export default class PrivacyPolicyScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			// headerTitle: (
			// 	<Text
			// 		style={[appCss.defaultFontApp, appCss.navigationTitle, {borderWidth: 1, marginTop: height === 812 ? -21 : -10}]}
			// 		numberOfLines={1}
			// 		ellipsizeMode="tail"
			// 	>
			// 		Privacy Policy
			// 	</Text>
			// ),
			header: <ProfileOptionHeader nav={navigation} title='Privacy Policy'/>
		};
	};
	render() {
		return <PrivacyPolicy />;
	}
}
