import React, { Component } from "react";
import {  Text, View } from "react-native";
import appCss from "../../../app.css";
import styles from "./style";
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
					<View style={styles.toastBox}>
						<Text style={[appCss.defaultFontApp, styles.text]}>
                            {this.state.errorMessage}
						</Text>
					</View>

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
