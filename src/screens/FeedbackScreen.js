import React, { Component } from "react";
import { Text } from "react-native";
import appCss from "../../app.css";
import Feedback from "../components/Feedback";
import ProfileOptionHeader from "../components/_common/ProfileOptionHeader";

export default class FeedbackScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: <ProfileOptionHeader nav={navigation} title='Feedback'/>
		};
	};
	render() {
		return <Feedback />;
	}
}
