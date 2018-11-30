import React, { Component } from "react";
import { Text } from "react-native";
import appCss from "../../app.css";
import Feedback from "../components/Feedback";
import ProfileOptionHeader from "../components/_common/ProfileOptionHeader";

export default class FeedbackScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			// headerTitle: (
			// 	<Text
			// 		style={[appCss.defaultFontApp, appCss.navigationTitle]}
			// 		numberOfLines={1}
			// 		ellipsizeMode="tail"
			// 	>
			// 		Feedback
			// 	</Text>
			// )
			header: <ProfileOptionHeader nav={navigation} title='Feedback'/>
		};
	};
	render() {
		return <Feedback />;
	}
}
