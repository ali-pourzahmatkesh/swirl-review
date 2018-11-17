import React, { Component } from "react";
import ProfileOptionHeader from "../components/_common/ProfileOptionHeader";
import ChangePasswordFromProfile from "../components/ChangePasswordFromProfile";
import { Text } from "react-native";
import appCss from "../../app.css";
import { CONFIG } from "../../config";
const colors = CONFIG.colors;

export default class ChangePasswordFromProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			// headerStyle: {
			// 	backgroundColor: colors.appColor,
			// 	paddingRight: 16,
			// 	paddingLeft: 16,
			// 	borderBottomWidth: 0
			// },
			// headerTitle: (
			// 	<Text
			// 		style={[appCss.defaultFontApp, appCss.navigationTitle]}
			// 		numberOfLines={1}
			// 		ellipsizeMode="tail"
			// 	>
			// 		Change Password
			// 	</Text>
			// )
			header: <ProfileOptionHeader nav={navigation} title='Change Password'/>
		};
	};
	render() {
		return <ChangePasswordFromProfile />;
	}
}
