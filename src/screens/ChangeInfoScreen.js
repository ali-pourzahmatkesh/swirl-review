import React, { Component } from "react";
import ChangeInfo from "../components/ChangeInfo";

export default class ChangeInfoScreen extends Component {
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
		return <ChangeInfo />;
	}
}
