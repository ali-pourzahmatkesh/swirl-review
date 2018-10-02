console.log("SignUpScreen");
import React, { Component } from "react";
import SignUp from "../components/SignUp";
import CustomHeader from "../components/SignIn/CustomHeader";
import { CONFIG } from "../../config";
const COLORS = CONFIG.colors;

export default class SignUpScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<CustomHeader
					left={navigation.getParam("Login", "")}
					leftNav={navigation.getParam("leftNav")}
					middle="Signup"
					nav={navigation}
				/>
			),
			headerStyle: {
				backgroundColor: COLORS.appColor,
				borderBottomWidth: 0
			}
		};
	};
	render() {
		return <SignUp />;
	}
}
