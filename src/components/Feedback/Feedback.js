import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	KeyboardAvoidingView
} from "react-native";
import KeyboardAwareButton from "../_common/KeyboardAwareButton";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;
import LoadingCircles3 from "../../components/LoadingCircles3";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.bodyColor
	},
	backContainer: {
		flexBasis: "10%",
		display: "flex",
		backgroundColor: colors.appColor,
		justifyContent: "space-around",
		flexDirection: "row",
		alignItems: "flex-end",
		paddingTop: 5,
		paddingBottom: 10,
		paddingRight: 20,
		paddingLeft: 20,
		// borderColor: "rgba(255,255,255,0.1)",
		borderColor: "transparent",
		borderBottomWidth: 1
	},
	menuOptions: {
		color: colors.tapeWhite,
		fontWeight: "bold",
		fontSize: 20,
		flex: 5,
		textAlign: "center"
	},
	flatList: {
		flex: 6,
		padding: 20
	},
	actionButton: {
		flex: 1,
		alignItems: "flex-end",
		padding: 20
	},
	buttonItem: {
		backgroundColor: colors.appColor,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 25,
		paddingRight: 25,
		borderRadius: 15
	},
	buttonText: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: colors.tapeWhite
		}
	])
});

export default class Feedback extends Component {
	state = {
		message: ""
	};
	//memberOwner message
	render() {
		let { message } = this.state;
		let disabled = true;
		if (message.length > 0 && this.props.memberOwner.length > 0)
			disabled = false;
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={70}
					behavior="padding"
					style={{ flex: 1 }}
				>
					<View style={styles.flatList}>
						<TextInput
							style={appCss.defaultFontApp}
							placeholder="Type Here..."
							// placeholderTextColor="#000"
							autoCorrect={false}
							multiline={true}
							value={message}
							autoFocus={true}
							blurOnSubmit={true}
							returnKeyType="send"
							onChangeText={message => this.setState({ message })}
						/>
					</View>
					<KeyboardAwareButton
						title='Submit'
						disabled={disabled}
						onPress={() =>
							this.props.callSendFeedBack({
								message: this.state.message,
								memberOwner: this.props.memberOwner,
								navigation: this.props.navigation
							})
						}
						beginOnPage={true}
						loading={this.props.loading}
					/>
				</KeyboardAvoidingView>
			</View>
		);
	}
}
