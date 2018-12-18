import React, { Component } from "react";
import Intro from "../components/Home/Notifications/Intro";
export default class IntroScreen extends Component {
	static navigationOptions= {
		header : null
	};
	render() {
		return <Intro />;
	}
}
