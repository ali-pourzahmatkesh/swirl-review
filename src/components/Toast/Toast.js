import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import appCss from "../../../app.css";
const styles = StyleSheet.flatten({
	container: {
		position: "absolute",
		marginTop: "8%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: 60,
		width: "100%",
		borderWidth: 2,
		borderColor: "#fff",
		backgroundColor: "#ed1b34",
		borderRadius: 15
	},

	text: {
		fontSize: 18,
		color: "#fff",
		textAlign: "center"
	}
});
export default class ToastContainer extends Component {
	state = {
		hasError: false,
		errorMessage: ""
	};

	timeOut = undefined;

	componentWillReceiveProps(nextProps) {
		if (this.timeOut !== undefined) {
			clearTimeout(this.timeOut);
		}
		if (nextProps.hasError !== this.state.hasError) {
			this.setState({
				hasError: nextProps.hasError,
				errorMessage: nextProps.errorMessage
			});
		}
		this.timeOut = setTimeout(() => {
			this.props.hideToast();
		}, 4000);
	}

	render() {
		if (!this.state.hasError) {
			return null;
		} else {
			return (
				<View style={styles.container}>
					<Text style={[appCss.defaultFontApp, styles.text]}>
						{this.state.errorMessage}
					</Text>
				</View>
			);
		}

		// <Toast
		//     visible={this.state.hasError}
		//     position={50}
		//     shadow={false}
		//     animation={false}
		//     hideOnPress={true}>
		//     {this.state.errorMessage}
		// </Toast>
	}
}
