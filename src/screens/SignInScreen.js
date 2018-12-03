console.log("SignInScreen");
import React, { Component } from "react";
import SignIn from "../components/SignIn";
import CustomHeader from "../components/SignIn/CustomHeader";

import { CONFIG } from "../../config";

const COLORS = CONFIG.colors;

export default class SignInScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: null
		};
	};

	render() {
		return <SignIn />;
	}
}
