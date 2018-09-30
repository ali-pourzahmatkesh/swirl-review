import {Dimensions, StyleSheet} from "react-native";
import appCss from "../../../app.css";
import {CONFIG} from "../../../config";
const { width, height } = Dimensions.get("window");
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
		backgroundColor: colors.appColor,
        flex: 1,
    },
    connectText: StyleSheet.flatten([appCss.defaultFontApp, {
        opacity: 100,
        color: colors.highlightColor,
        alignSelf: 'center',
        marginTop: '5%',
    }]),
    iconFormInput: {
        flexDirection: 'row',
        marginTop: 15,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: colors.formInputUnderline,
    },
    forgotPassword: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.tapeWhite,
        textDecorationLine: 'underline',
        fontSize: 12,
        marginTop: '23%',
    }]),
    formInputIcon: {
        height: '110%',
        width: '10%',
        resizeMode: 'contain',
    },
    imageContainer: {
        height: '28%',
	},
    imagesContent: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
	},
    imageItem: {
        flex: 1, 
		aspectRatio: 1,
        resizeMode: "contain",
    },
    formInputContainer: {
        alignItems: "flex-start",
        width: 300,
        alignSelf: 'center',
    },
    loginButton: {
        backgroundColor: colors.highlightColorTwo,
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
    },
    loginText: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.appColor,
        textAlign: 'center',
        fontSize: 20,
    }]),
    signUpText: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.tapeWhite,
        textAlign: 'center',
        marginBottom: 25,
        fontSize: 12
    }]),
	textInput: StyleSheet.flatten([appCss.defaultFontApp, {
        flex: 1,
		fontWeight: "bold",
		fontSize: 18,
        width: '100%',
		paddingRight: 20,
		paddingLeft: 18,
        color: colors.tapeWhite,
	}]),
});

export default styles;