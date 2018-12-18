import { StyleSheet, Dimensions } from "react-native";
import { CONFIG } from "../../../../../config";
const colors = CONFIG.colors;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.flatten({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	openingGif: {
		height,
		width,
		position: 'absolute',
		zIndex: 2,
		margin: 'auto',
	},
	messageBox: {
		width: width * 0.85,
		height: height * 0.9,
		backgroundColor: colors.bodyColor,
		marginTop: height * 0.02,
		borderRadius: 20,
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
	textInputBox: {
		padding: 15,
		flex: 1,
		justifyContent: "center",
		borderWidth: 0,
        alignItems:'center'

    },
});
export default styles;
