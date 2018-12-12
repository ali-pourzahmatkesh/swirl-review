import React, { Component } from "react";
import ProfileOptionHeader from "../components/_CommonComponents/ProfileOptionHeader";
import ChangePasswordFromProfile from "../components/ChangePasswordFromProfile";
import { Text } from "react-native";
import appCss from "../../app.css";
import { CONFIG } from "../../config";
const colors = CONFIG.colors;

export default class ChangePasswordFromProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: <ProfileOptionHeader nav={navigation} title='Change Password'/>
		};
	};
	render() {
		return <ChangePasswordFromProfile />;
	}
}
