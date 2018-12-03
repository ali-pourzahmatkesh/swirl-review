import React, { Component } from "react";
import PrivacyPolicy from "../components/PrivacyPolicy";
import ProfileOptionHeader from "../components/_common/ProfileOptionHeader";
import { Text, Dimensions } from "react-native";
import appCss from "../../app.css";
const { width, height } = Dimensions.get("window");

export default class PrivacyPolicyScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: <ProfileOptionHeader nav={navigation} title='Privacy Policy'/>
		};
	};
	render() {
		return <PrivacyPolicy />;
	}
}
