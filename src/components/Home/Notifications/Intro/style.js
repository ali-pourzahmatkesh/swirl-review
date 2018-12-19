import { StyleSheet, Dimensions } from "react-native";
import { CONFIG } from "../../../../../config";
const colors = CONFIG.colors;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.flatten({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	openingGif: {
		height,
		width,
		position: 'absolute',
		zIndex: 2,
		margin: 'auto',
	},
	messageBox: {
		// width: width * 0.85,
		// height: height * 0.9,
		width: width * 0.9,
		height: height * 0.925,
		backgroundColor: colors.bodyColor,
		marginTop: height * 0.02,
		borderRadius: 20,
		backgroundColor: colors.appColor
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: height * 0.06,
		borderWidth: 0
	},
	closeButton: {
		height: 20,
		width: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 10,
		borderWidth: 0
	},

	closeIcon: {
		height: 15,
		width: 15,
	},
	headerTitle:{
		borderWidth: 0,
		fontFamily: 'MuseoSansRounded-900',
		fontSize: 20,
		color: colors.tapeWhite
	},
	headerSpacer: {
		height: 20,
		width: 20,
		marginRight: 10,
		borderWidth: 0
	},
	
	textContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: width * 0.8,
		borderWidth: 0
	},

	logo: {
		height: 20,
		width: 20
	},

	wrapper: {
		borderRadius: 20,
		borderWidth: 0
	},
	slide: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.appColor,
		borderRadius: 20
	},
	slideImage: {
		height: '70%',
		width: '90%',
		marginBottom: height * 0.08,
		borderWidth: 0
	},
	text: {
		color: colors.tapeWhite,
		fontSize: ((height / 800) * 10 ) + 7,
		// fontSize: 14,
		fontFamily: 'MuseoSansRounded-900',
		textAlign: 'center'
	},

	dotStyle: {
		borderWidth: 1,
		borderColor: colors.tapeWhite,
		backgroundColor: 'transparent'
	}
});
export default styles;
