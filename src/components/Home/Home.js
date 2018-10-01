import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
// import Discussion from "../Discussion";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit = () => {
		this.props.navigation.push("ProfileScreen", {
			userId: 1, //item.memberId,
			x: 1
		});
	};

	render() {
		return (
			<View style={{ flex: 1, justifyContent: "flex-end" }}>
				<View style={{ height: "20%" }}>
					<TouchableOpacity onPress={this.handleSubmit}>
						<Text>Profile</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Home;
