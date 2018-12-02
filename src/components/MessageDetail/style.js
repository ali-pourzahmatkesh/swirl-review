import { StyleSheet, Dimensions } from "react-native";
import { CONFIG } from "../../../config";
import appCss from "../../../app.css";
const { height, width } = Dimensions.get("window");
const colors = CONFIG.colors;
const styles = StyleSheet.flatten({
	container: {
		flex: 1,
		backgroundColor: colors.combinatorialColor,
		alignItems: "center",
		justifyContent: "center"
	},
	messageBox: {
		width: width * 0.85,
		height: height * 0.9,
		backgroundColor: colors.bodyColor,
		marginTop: height * 0.02,
		borderRadius: 20
	},
	messageBoxHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 44,
		width: "100%",
		// borderColor: 'white',
		paddingLeft: "6%",
		paddingRight: "6%",
		borderWidth: 0
	},
	closeButton: {
		height: 30,
		width: 50,
		marginLeft: -20,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 0
	},
	closeIcon: {
		width: 15,
		height: 15
	},
	textInputBox: {
		padding: 15,
		flex: 1,
		justifyContent: "space-between"
	},

	containerCamera: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center"
	},

	selectedPhotoAsBackground: {
		flex: 1,
		width: null,
		height: null,
		padding: "auto",
		margin: "auto"
	},
	cameraActionBox: {
		backgroundColor: "transparent",
		flex: 1,
		position: "absolute",
		width,
		height,
		justifyContent: "space-between",
		paddingTop: height === 812 ? 50 : 40,
		paddingBottom: height === 812 ? 70 : 65
		// paddingLeft: 15,
		// paddingRight: 15
	},
	cameraActions: {
		// backgroundColor:"yellow",
		alignItems: "center",
		justifyContent: "space-between"
		// height:110
	},
	cameraBtnBox: {
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "red",
		width,
		paddingRight: 20,
		paddingBottom: 30
	},

	messageText: {
		fontFamily: "MuseoSansRounded-900",
		fontSize: 18,
		color: "#4a4a4a"
	},

	selectedPhotoAsBackgroundContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "stretch",
		width,
		height,
		justifyContent: "center",
		backgroundColor: "black",
		padding: 0,
		margin: 0,
		position: "absolute"
	},

	selectedPhotoAsBackgroundGallery: {
		// flex: 1,
		width
		// height: 'auto',
		// padding: "auto",
		// margin: "auto"
	}
});
export default styles;
