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
	connectText: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			opacity: 100,
			color: colors.highlightColor,
			alignSelf: "center",
			marginTop: "5%"
		}
	]),

	forgotPassword: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: colors.tapeWhite,
			textDecorationLine: "underline",
			fontSize: 12,
			marginTop: "23%"
		}
	]),

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

    loginButton: {
        backgroundColor: colors.highlightColorTwo,
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
    },
	loginText: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: colors.tapeBlack,
			textAlign: "center",
			fontSize: 20
		}
	]),
	signUpText: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: colors.tapeWhite,
			textAlign: "center",
			marginBottom: 25,
			fontSize: 12
		}
	]),

});

export default styles;
