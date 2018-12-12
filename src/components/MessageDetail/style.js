import { StyleSheet, Dimensions } from "react-native";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.flatten({
	container: {
		flex: 1,
		// backgroundColor: colors.combinatorialColor,
		alignItems: "center",
		justifyContent: "center"
	},
	messageBox: {
		width: width * 0.85,
		height: height * 0.9,
		backgroundColor: colors.bodyColor,
		marginTop: height * 0.02,
		borderRadius: 20,

	},
	messageBoxHeader: {
		height: 44,
		position: "absolute",
		width: "100%",
		top: 44,
		zIndex: 2,
		borderWidth: 0
	},
	messageBoxHeaderActions: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginLeft: 15,
		marginRight: 15
	},

	closeButton: {
		height: 20,
		width: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		marginTop: 10,
		borderWidth: 0
	},

	closeIcon: {
		height: 15,
		width: 15,
	},
	closeIconText: {
		height: 15,
		width: 15,
	},
	textInputBox: {
		padding: 15,
		flex: 1,
		justifyContent: "center",
		borderWidth: 0,
        alignItems:'center'

    },

	cameraActionBox: {
		backgroundColor: "transparent",
		flex: 1,
		width,
		paddingTop: height === 812 ? 50 : 40,
		paddingBottom: height === 812 ? 70 : 65,
		paddingLeft: 15,
		paddingRight: 15
	},
	cameraActions: {
		alignItems: "center",
		justifyContent: "space-between"
	},
	cameraBtnBox: {
		alignItems: "center",
		justifyContent: "center",
		width,
		paddingRight: 20,
		paddingBottom: 30
	},

	messageText: {
		fontFamily: "MuseoSansRounded-900",
		fontSize: 18,
		color: "#4a4a4a",
		alignItems:'center',
		justifyContent:'center'
	}
});
export default styles;
