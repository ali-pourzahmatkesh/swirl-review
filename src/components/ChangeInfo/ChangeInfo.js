import React, { Component } from "react";
import {
	Image,
	KeyboardAvoidingView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { SafeAreaView } from "react-navigation";
import logoPic from "../../assets/images/tape-logo.png";
import forward from "../../assets/images/forward.png";
// import { Ionicons } from '@expo/vector-icons';
import { get } from "lodash";
import appCss from "../../../app.css";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ed1b34",
		flex: 1
	},
	imageContainer: {
		flex: 2
	},
	header: {
		display: "flex",
		justifyContent: "flex-start"
	},
	backButton: {
		marginLeft: 20
	},
	imagesContent: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: "50%"
	},
	imageItem: {
		flex: 1,
		aspectRatio: 1,
		resizeMode: "contain"
	},
	flexContent: {
		flex: 1
	},
	textInputContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center"
	},
	textInput: {
		borderWidth: 0,
		fontWeight: "bold",
		fontSize: 20,
		width: "100%",
		paddingRight: 20,
		paddingTop: 20,
		paddingLeft: 20,
		textAlign: "center",
		color: "#fff"
	},
	forwardContainer: {
		flex: 1,
		padding: 20,
		justifyContent: "flex-end",
		alignItems: "flex-end"
	},
	forwardImageItem: {
		width: 45,
		height: 45
	}
});

export default class ChangeInfo extends Component {
	state = {
		username: ""
	};

	// componentDidMount() {
	// 	let params = get(this.props, "navigation.state.params", {});
	// 	this.setState({
	// 		username: params.username
	// 	});
	// }

	onPressButton = () => {
		this.props.updateMember({
			id: this.props.id,
			username: this.state.username,
			navigation: this.props.navigation
		});
	};

	render() {
		let { username } = this.state;
		let disabledBtn = false;
		if (!username || username.length === 0) disabledBtn = true;

		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={70}
					behavior="padding"
					style={{ flex: 1 }}
				>
					<View style={styles.imageContainer}>
						<View style={styles.imagesContent}>
							<View style={styles.flexContent} />
							<Image style={styles.imageItem} source={logoPic} />
							<View style={styles.flexContent} />
						</View>
					</View>
					<View style={styles.textInputContainer}>
						<TextInput
							style={[appCss.defaultFontApp, styles.textInput]}
							placeholder={this.props.username}
							placeholderTextColor="#fff"
							autoCorrect={false}
							value={username}
							blurOnSubmit={true}
							autoFocus={true}
							returnKeyType="send"
							onChangeText={username => this.setState({ username })}
						/>
					</View>
					<View style={styles.forwardContainer}>
						<TouchableOpacity
							style={styles.smallButton}
							disabled={disabledBtn}
							onPress={this.onPressButton}
						>
							<Image style={styles.forwardImageItem} source={forward} />
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}
