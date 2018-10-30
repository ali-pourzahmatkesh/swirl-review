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
        flex:2,
        justifyContent: "center",
        alignItems: "center",
    },
    imagesContent: {
        height: '35%',

    },
    imageItem: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: "contain"
    },
    formInputContainer: {
        alignItems: "flex-start",
        width: 300,
        flex:3,
        alignSelf: "center"
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
        backgroundColor: colors.highlightColorTwo,
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
            color: colors.tapeWhite,
            textAlign: "center",
			fontSize: 24,
			fontFamily: 'MuseoSansRounded-700'
        }
    ]),

});

export default styles;
