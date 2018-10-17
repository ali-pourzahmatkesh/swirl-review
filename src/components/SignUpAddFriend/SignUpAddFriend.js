import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
// import defaultMoment from "moment";
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
				<View />
				<View>
					<Text style={[styles.headerText, { color: colors.tapeWhite }]}>
						Add Friends
					</Text>
				</View>
				<TouchableOpacity onPress={() => this.handleSubmit()}>
					<Text style={[styles.headerText, { color: colors.tapeWhite }]}>
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
