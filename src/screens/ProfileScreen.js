import React, { Component } from "react";
import Profile from "../components/Profile";
let userId = "";
export default class ProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		// userId =
		// 	navigation.state && navigation.state.params && navigation.state.params.id
		// 		? navigation.state.params.id
		// 		: "";
		// return {
		// 	header: null
		// };
		return {
			header: null
		};
	};

	render() {
		return <Profile userId={userId} />;
	}
}
