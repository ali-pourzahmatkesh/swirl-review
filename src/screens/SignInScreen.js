console.log("SignInScreen");
import React, { Component } from "react";
import SignIn from "../components/SignIn";
import CustomHeader from "../components/SignIn/CustomHeader";

import { CONFIG } from "../../config";

const COLORS = CONFIG.colors;

export default class SignInScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<CustomHeader
					middle={navigation.getParam("curScreen", "")}
					right={navigation.getParam("nextScreen", "")}
					rightNav={navigation.getParam("rightNav")}
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
		return <SignIn />;
	}
}
