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
	iconFormInput: {
		flexDirection: "row",
		marginTop: 12,
		paddingTop: 10,
		paddingLeft: 10,
		paddingBottom: 12,
		borderBottomWidth: 1.5,
		borderBottomColor: colors.formInputUnderline
	},
	formInputIcon: {
		height: "110%",
		width: "10%",
		resizeMode: "contain"
	},
    imageContainer: {
        flex: 1,
        justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1
    },
    imagesContent: {
        // height: '35%',
		flex: .8
    },
    imageItem: {
		// flex: 1,
		height: '100%',
		width: '100%',
        aspectRatio: 1,
		resizeMode: "contain",
		// borderWidth: 1
    },
    formInputContainer: {
        alignItems: "flex-start",
		height: height * 0.7,
		paddingTop: height * 0.1,
		width,
		alignSelf: "center",
		paddingLeft: width * 0.06,
		paddingRight: width * 0.06,
    },
	minLengthText: StyleSheet.flatten([
		appCss.thinDefaultFontApp,
		{
			alignSelf: "flex-end",
			color: colors.tapeWhite,
			fontSize: 10,
			marginTop: 3,
			marginBottom: -15
		}
	]),
	signUpButton: {
		alignSelf: "center",
		backgroundColor: colors.highlightColorTwo,
		borderRadius: 30,
		// height: "35%",
		width: "80%",
        paddingTop:10,
		paddingBottom:10,
		justifyContent: "center"
	},
	signUpText: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: colors.bodyColor,
			textAlign: "center",
			fontSize: 20
		}
	]),
	textInput: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			flex: 1,
			fontWeight: "bold",
			fontSize: 16,
			width: "100%",
			paddingRight: 30,
			paddingLeft: 18,
			paddingBottom:10,
			color: colors.tapeWhite
		}
	]),
    nextButton: {
        backgroundColor: colors.combinatorialColor,
        height: height === 812 ? 65 : 55,
        width: "100%",
        justifyContent: "center",
        // position: "absolute"
        // bottom: 100
        // marginBottom: -30,

        // borderWidth: 2,
        // borderColor: 'green'
    },
    nextText: StyleSheet.flatten([
        appCss.defaultFontApp,
        {
            color: colors.tapeBlack,
            textAlign: "center",
            fontSize: 20
        }
    ]),

});

export default styles;
