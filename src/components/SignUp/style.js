import { Dimensions, StyleSheet } from "react-native";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const { width, height } = Dimensions.get("window");
const colors = CONFIG.colors;
const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.appColor,
		flex: 1
	},
    imageContainer: {
        flex: 1,
        justifyContent: "center",
		alignItems: "center",
    },
    imageItem: {
		height: 80,
		width: 80,
        aspectRatio: 1,
		resizeMode: "contain",
		// position: 'absolute',
		// top: 10
    },
    formInputContainer: {
		width: '90%',
		alignSelf: "center",
	},

	minLengthText: StyleSheet.flatten([
		appCss.thinDefaultFontApp,
		{
			alignSelf: "flex-end",
			color: colors.tapeWhite,
			fontSize: 10,
			marginTop: 3,
			marginBottom: -15,
			marginRight: 10
		}
	]),

	bottomContainer: {
		borderWidth: 0,
		borderColor: 'blue',
		width: '100%', 
		paddingBottom: height * 0.1,
		height: height * 0.3,
	},
	signUpButton: {
		alignSelf: "center",
		backgroundColor: colors.highlightColorTwo,
		borderRadius: 30,
		width: "80%",
        paddingTop: 10,
		paddingBottom: 10,
		justifyContent: "center"
	},
	signUpText: {
		color: colors.bodyColor,
		textAlign: "center",
		fontSize: 24,
		fontFamily: 'MuseoSansRounded-1000'
	},
    textSignup: {
		fontSize: 14,
		fontFamily: 'MuseoSansRounded-300',
		paddingBottom: 20,
		color: colors.tapeWhite,
		alignSelf: 'center'
	},
	bolderSignup: {
		fontFamily: 'MuseoSansRounded-1000'
	},
	headerContainer: {
		backgroundColor: colors.appColor,
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

export default styles;
