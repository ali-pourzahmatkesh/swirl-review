import React, { Component } from "react";
import MessageDetail from "../components/MessageDetail";
export default class ChangeInfoScreen extends Component {
	static navigationOptions= {
		header : null
	};
	render() {
		return <MessageDetail />;
	}
}
