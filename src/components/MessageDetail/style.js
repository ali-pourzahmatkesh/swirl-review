import { StyleSheet, Dimensions } from "react-native";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;
const { width, height } = Dimensions.get("window");
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
		// flexDirection:'row',
		// alignItems:'center',
		// justifyContent:'space-between',
		height: 44,
		// marginLeft:15,
		// marginRight:15,
		position: "absolute",
		width: "100%",
		top: 44,
		zIndex: 2
		// backgroundColor:'red'
	},
	messageBoxHeaderActions: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// width
		// height:44,
		marginLeft: 15,
		marginRight: 15
		// position:'absolute',
		// width:'100%',
		// top:44,
		// zIndex:2,
		// backgroundColor:'red'
	},

	closeIcon: {
		width: 15,
		height: 15
	},
	closeIconText: {
		width: 15,
		height: 15,
		marginLeft: 15,
		marginRight: 15,
		top: -30
	},
	textInputBox: {
		padding: 15,
		flex: 1,
		justifyContent: "space-between"
	},

	cameraActionBox: {
		backgroundColor: "transparent",
		flex: 1,
		// position:'absolute',
		width,
		// height,
		// justifyContent:"space-between",
		paddingTop: height === 812 ? 50 : 40,
		paddingBottom: height === 812 ? 70 : 65,
		paddingLeft: 15,
		paddingRight: 15
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
		color: "#4a4a4a",
		top: 30
	}
});
export default styles;
