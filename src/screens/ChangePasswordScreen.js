import React, { Component } from "react";
import ChangePassword from "../components/ChangePassword";

export default class ChangePasswordScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerStyle: {
				backgroundColor: "#ed1b34",
				paddingRight: 20,
				paddingLeft: 20,
				borderBottomWidth: 0
			}
		};
	};
	render() {
		return <ChangePassword />;
	}
}
