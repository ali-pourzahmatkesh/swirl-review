import { StyleSheet, Dimensions } from "react-native";
import { CONFIG } from "../../../config";
import appCss from "../../../app.css";
const { height, width } = Dimensions.get("window");
const colors = CONFIG.colors;
const styles = StyleSheet.flatten({
	container: {
		flex: 1,
		backgroundColor: colors.tapeWhite,
		alignItems: "center"
	},
	messageBox: {
		width: width * 0.85,
		height: height * 0.91,
		backgroundColor: colors.bodyColor,
		marginTop: height * 0.06,

		borderRadius: 20
	},
	messageBoxHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 44,
		width: '100%',
		borderColor: 'white',
		borderWidth: 0,
		paddingLeft: '6%',
		paddingRight: '6%',
	},
	closeIcon: {
		width: 15,
		height: 15
	},

	subjectBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	headerSubject: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: colors.combinatorialColor,
			fontSize: 17
		}
	]),

	textInputBox: {
		padding: 15,
		flex: 1,
		justifyContent: "space-between"
	},

	textInput: {
		fontFamily: "MuseoSansRounded-900",
		fontSize: 18,
		color: "#4a4a4a",
		flex: 1
	},

	footer: {},
	footerCounter: {
		alignItems: "flex-end",
		marginBottom: 20
	},
	footerCounterText: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: colors.combinatorialColor,
			fontSize: 12
		}
	]),

	footerActions: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderWidth: 0
	},
	actionBox: {
		width: 40,
		height: 30,
		margin: 5
	},
	actionBoxIcon: {
		width: undefined,
		height: undefined,
		flex: 1
	},

	nextButton: {
		width: 50,
		height: 50,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 25
	},

	iconButton: {
		// width: 25,
		// height: 25,
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},

	cameraBtn: {
		width: 60,
		height: 60,
		paddingRight: 50,
		resizeMode: "contain"
	},

	cameraActionBox: {
		backgroundColor: "transparent",
		flex: 1,
		position: "absolute",
		width,
		height,
		justifyContent: "space-between",
		paddingTop: height === 812 ? 50 : 40,
		paddingBottom: height === 812 ? 70 : 65,
		// paddingLeft: 15,
		// paddingRight: 15
	},

	selectedPhotoAsBackgroundContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "stretch",
		width,
		height,
		justifyContent: "center",
		backgroundColor: "yellow",
		padding: 0,
		margin: 0,
		position: "absolute"
	},

	selectedPhotoAsBackground: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: "contain",
		padding: "auto",
		margin: "auto"
	},

	//
	// selectedPhotoAsBackground: {
	// 	backgroundColor: "blue",
	// 	flex: 1,
	// 	width: null,
	// 	height: null
	// },

	cameraActions: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		width,
		borderWidth: 0,
		borderColor: 'white',
		paddingLeft: '6%',
		paddingRight: '6%',
	},
	cameraBtnBox: {
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "red",
		width,
		paddingRight: 20,
		paddingBottom: 30
	},

	containerOtherPage: {
		flex: 1,
		backgroundColor: colors.appColor,
		alignItems: "center",
		justifyContent: "space-between"
	},

	pickerText: {
		color: colors.bodyColor,
		fontSize: 17,
		fontFamily: "MuseoSansRounded-900",
		marginBottom: 20,
		marginTop: 10
	},

	preview: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center"
	}
});

export default styles;
