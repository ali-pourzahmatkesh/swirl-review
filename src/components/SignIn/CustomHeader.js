import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import appCss from "../../../app.css";
import { CONFIG } from "../../../config";

const colors = CONFIG.colors;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appColor,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	headerSections: {
		flex: 1
	},
	headerText: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			textAlign: "center"
		}
	])
});

export default class CustomHeader extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.headerSections}
					onPress={() =>
						this.props.back
							? this.props.nav.goBack()
							: this.props.nav.navigate(this.props.leftNav)
					}
				>
					<Text style={[styles.headerText, { color: colors.tapeWhite }]}>
						{this.props.left}
					</Text>
				</TouchableOpacity>
				<View style={styles.headerSections}>
					<Text
						style={[styles.headerText, { color: colors.highlightColorTwo }]}
					>
						{this.props.middle}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.headerSections}
					onPress={() => this.props.nav.navigate(this.props.rightNav)}
				>
					<Text style={[styles.headerText, { color: colors.tapeWhite }]}>
						{this.props.right}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
