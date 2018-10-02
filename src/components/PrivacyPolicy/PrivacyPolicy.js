import React, { Component } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import appCss from "../../../app.css";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e6e7e9"
	},

	backContainer: {
		flexBasis: "10%",
		display: "flex",
		backgroundColor: "#ed1b34",
		justifyContent: "space-around",
		flexDirection: "row",
		alignItems: "flex-end",
		paddingTop: 5,
		paddingBottom: 10,
		paddingRight: 20,
		paddingLeft: 20,
		borderColor: "rgba(255,255,255,0.1)",
		borderBottomWidth: 1
	},
	menuOptions: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 20,
		flex: 5,
		textAlign: "center"
	},

	flatList: {
		flex: 1,
		padding: 20
	},

	listViewItems: {
		display: "flex",
		justifyContent: "space-between",
		backgroundColor: "#e6e7e9",
		flexDirection: "row",
		alignItems: "center",
		paddingRight: 20,
		paddingLeft: 20,
		height: 60,
		borderBottomWidth: 1,
		borderColor: "#ddd"
	},

	listTitle: {
		fontSize: 15,
		fontWeight: "bold",
		color: "#414143"
	},
	terms: {
		textAlign: "justify",
		marginBottom: 20,
		fontSize: 12
	}
});

export default class PrivacyPolicy extends Component {
	// onPressButton( screenName ) {
	//     this.props.navigation.navigate(screenName);
	// }

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.flatList}>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						Introduction
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						There are multiple reasons why SaaS businesses would want to have a
						Terms and Conditions as a legally binding agreement between the
						company and the customers accessing and using the app on a regular
						basis.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						Think of the Terms and Conditions as a legal contract that the SaaS
						company and its customers are signing together: the terms and rules
						as set in the agreement will govern the access to the app.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						Here's why you'll want this agreement if you're developing a SaaS
						app:
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If a paying customer didn't pay yet, you can block or suspend access
						of that user to the app.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If your app allows user-generated content to be posted publicly and
						users start posting infringed content, you can retain your right to
						remove any content that infringes copyright. You can choose to
						include arbitration clauses. And many more.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If a paying customer didn't pay yet, you can block or suspend access
						of that user to the app. If your app allows user-generated content
						to be posted publicly and users start posting infringed content, you
						can retain your right to remove any content that infringes
						copyright. You can choose to include arbitration clauses. And many
						more.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If a paying customer didn't pay yet, you can block or suspend access
						of that user to the app. If your app allows user-generated content
						to be posted publicly and users start posting infringed content, you
						can retain your right to remove any content that infringes
						copyright. You can choose to include arbitration clauses. And many
						more.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If a paying customer didn't pay yet, you can block or suspend access
						of that user to the app. If your app allows user-generated content
						to be posted publicly and users start posting infringed content, you
						can retain your right to remove any content that infringes
						copyright. You can choose to include arbitration clauses. And many
						more.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If a paying customer didn't pay yet, you can block or suspend access
						of that user to the app. If your app allows user-generated content
						to be posted publicly and users start posting infringed content, you
						can retain your right to remove any content that infringes
						copyright. You can choose to include arbitration clauses. And many
						more.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If a paying customer didn't pay yet, you can block or suspend access
						of that user to the app. If your app allows user-generated content
						to be posted publicly and users start posting infringed content, you
						can retain your right to remove any content that infringes
						copyright. You can choose to include arbitration clauses. And many
						more.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If a paying customer didn't pay yet, you can block or suspend access
						of that user to the app. If your app allows user-generated content
						to be posted publicly and users start posting infringed content, you
						can retain your right to remove any content that infringes
						copyright. You can choose to include arbitration clauses. And many
						more.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If a paying customer didn't pay yet, you can block or suspend access
						of that user to the app. If your app allows user-generated content
						to be posted publicly and users start posting infringed content, you
						can retain your right to remove any content that infringes
						copyright. You can choose to include arbitration clauses. And many
						more.
					</Text>
					<Text style={[appCss.defaultFontApp, styles.terms]}>
						If a paying customer didn't pay yet, you can block or suspend access
						of that user to the app. If your app allows user-generated content
						to be posted publicly and users start posting infringed content, you
						can retain your right to remove any content that infringes
						copyright. You can choose to include arbitration clauses. And many
						more.
					</Text>
					<View style={{ height: 20 }} />
				</ScrollView>
			</View>
		);
	}
}
