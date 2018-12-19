import React, { Component } from "react";
import { Text } from "react-native";
import appCss from "../../app.css";
import Feedback from "../components/Support";
import ProfileOptionHeader from "../components/_CommonComponents/ProfileOptionHeader";

export default class FeedbackScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: <ProfileOptionHeader nav={navigation} title='Support'/>
		};
	};
	render() {
		return <Feedback />;
	}
}
