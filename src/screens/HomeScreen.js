console.log("HomeScreen");
import React, { Component } from "react";
import Home from "../components/Home";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
	"Warning: isMounted(...) is deprecated",
	"Module RCTImageLoader"
]);
export default class HomeScreen extends Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return <Home />;
	}
}
