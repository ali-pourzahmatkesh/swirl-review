import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList
} from "react-native";
import Cookie from 'react-native-cookie';
import { NavigationActions } from "react-navigation";

import Ionicons from "react-native-vector-icons/Ionicons";
import appCss from "../../../app.css";
import {CONFIG} from "../../../config";

const colors = CONFIG.colors;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.tapeOffWhite
	},
	listViewItems: {
		display: "flex",
		justifyContent: "space-between",
		backgroundColor: colors.tapeOffWhite,
		flexDirection: "row",
		alignItems: "center",
		paddingRight: 20,
		paddingLeft: 20,
		height: 60,
		borderBottomWidth: 1,
		borderColor: colors.borderColor
	},
	listTitle: StyleSheet.flatten([appCss.defaultFontApp, {
		fontSize: 15,
		fontWeight: "bold",
		color: colors.tapeBlack
	}])
});

export default class Settings extends Component {
	constructor(props){
		super(props);
		this.state = {
			menuOptions: [
				{
					optionText: 'Change Password',
					clickHandler: () => this.onPressButton('ChangePasswordLevel1Screen')
				},
				{
					optionText: 'Leave Feedback',
					clickHandler: () => this.onPressButton("FeedbackScreen")
				},
				{
					optionText: 'Terms of Use',
					clickHandler: () => this.onPressButton("TermsAndConditionsScreen")
				},
				{
					optionText: 'Privacy Policy',
					clickHandler: () => {}
				},
				{
					optionText: 'Unlink Instagram',
					clickHandler: () => {}
				},
				{
					optionText: 'Log Out',
					clickHandler: this.handleSignOut,
					textStyles: {
						color: colors.appColor
					}
				}
			]
		}
	}

	onPressButton(screenName) {
		this.props.navigation.navigate(screenName);
	}

	handleSignOut = flag => {
		Cookie.clear();
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: "WelcomeStack" })],
			key: null
		});
		this.props.callLogout({
			navigation: this.props.navigation,
			resetAction,
			id: this.props.id
		});
		if (flag === "deleteAccount") {
			this.props.callDeleteAccount(this.props.id);
		}
	};

	renderSettingsMenu = ({item}) => {
		return(
			<TouchableOpacity
				style={styles.listViewItems}
				onPress={item.clickHandler}
			>
				<Text style={[styles.listTitle, item.textStyles]}>
					{item.optionText}
				</Text>
				<Ionicons size={25} color={colors.tapeDarkGrey} name="ios-arrow-forward" />
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<FlatList
				data={this.state.menuOptions}
				renderItem={this.renderSettingsMenu}
				keyExtractor={(item, index) => item.optionText}
				style={styles.container}
			/>
		);
	}
}