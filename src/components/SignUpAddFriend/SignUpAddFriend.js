import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
import InviteFromContacts from "../InviteFromContacts";
const colors = CONFIG.colors;
import { NavigationActions } from "react-navigation";

class SignUpAddFriend extends Component {
	constructor(props) {
		super(props);
	}

	handleSubmit = () => {
		NavigationActions.reset({
			index: 0,
			actions: [
				this.props.navigation.navigate({
					routeName: "HomeStack"
				})
			],
			key: null
		});
	};

	loadHeader = () => {
		return (
			<View style={appCss.header}>
				<View style={{flex: 1}} />
				<View style={{flex: 1}}>
					<Text style={styles.titleText}>
						Add Friends
					</Text>
				</View>
				<TouchableOpacity style={{flex: 1}} onPress={() => this.handleSubmit()}>
					<Text style={styles.done}>
						Done
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	render() {
		return (
			<View style={styles.container}>
				{this.loadHeader()}
				<View style={styles.chatList}>
					<InviteFromContacts />
				</View>
			</View>
		);
	}
}

export default SignUpAddFriend;
