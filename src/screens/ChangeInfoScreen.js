import React, { Component } from "react";
import { Text } from "react-native";
import ProfileOptionHeader from "../components/_common/ProfileOptionHeader";
import ChangeInfo from "../components/ChangeInfo";
import { CONFIG } from "../../config";
const colors = CONFIG.colors;
import appCss from "../../app.css";
export default class ChangeInfoScreen extends Component {
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
			// 		Change Username
			// 	</Text>
			// )
			header: <ProfileOptionHeader nav={navigation} title='Change Username'/>
		};
	};
	render() {
		return <ChangeInfo />;
	}
}
