import React, {Component} from "react";
import {NetInfo, StyleSheet, Text, View} from "react-native";
import appCss from "../../../app.css";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;

export default class NoConnection extends Component {
	state = {
		isConnected: true
	};

	componentDidMount() {
		NetInfo.isConnected.fetch().then(isConnected => {
			this.setState({ isConnected });
		});

		NetInfo.isConnected.addEventListener(
			"connectionChange",
			this.handleFirstConnectivityChange
		);
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener(
			"connectionChange",
			this.handleFirstConnectivityChange
		);
	}

	handleFirstConnectivityChange = isConnected => {
		this.setState({ isConnected });
	};

	render() {
		if (this.state.isConnected) {
			return null;
		} else {
			return (
					<View style={styles.container}>
						<Text style={styles.text}>
							No Internet Connection
						</Text>
					</View>
			);
		}
	}
}
const styles = StyleSheet.flatten({
	container: {
		position: "absolute",
        // marginTop: "8%",
		top: 30,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: 60,
		width: "100%",
		borderWidth: 2,
		borderColor: colors.tapeWhite,
		backgroundColor: colors.appColor,
		borderRadius: 15
	},

	text: StyleSheet.flatten([appCss.defaultFontApp, {
		fontSize: 18,
		color: colors.tapeWhite,
		textAlign: "center"
	}])
});
