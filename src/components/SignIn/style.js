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
    iconFormInput: {
        flexDirection: 'row',
        marginTop: 15,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: colors.formInputUnderline,
        backgroundColor:colors.bodyColor,
        borderRadius:20
    },
	forgotPassword: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: colors.tapeWhite,
			textDecorationLine: "underline",
			fontSize: 12,
			marginTop: "23%"
		}
	]),
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
			color: colors.appColor,
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
	textInput: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			flex: 1,
			// fontWeight: "bold",
			fontSize: 12,
			width: "100%",
			paddingRight: 20,
			paddingLeft: 18,
			color: colors.tapeWhite
		}
	]),

	//styles inside of render country codes
	countryCodeBox: {
		width: 64,
		height: 35,
		backgroundColor: "transparent",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: 3,
		marginLeft:3,
		paddingRight: 3,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: colors.appColor
	},
	countryCodeImageBox: {
		height: 24,
		width: 24,
		display: "flex",
		borderWidth: 1,
		overflow: "hidden",
		borderColor: "#ddd",
		borderRadius: 50
	},
	countryCodeFlag: {
		height: 24,
		width: 24,
		resizeMode: "cover"
	},
	countryCode: {
		color: colors.combinatorialColor,
		fontWeight: "bold",
		fontSize: 12
	},

	//styles inside of country code selection modal
	modalContainer: {
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: "rgba(237,27,52,0.97)"
	},

	modalHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingBottom: 10
	},

	sectionItems: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#ed1b34",
		paddingLeft: 20,
		paddingRight: 20,
		height: 40,
		borderBottomWidth: 1,
		borderColor: "#fff"
	},

	countryCodeSearch: {
		color: "#fff",
		flexBasis: "15%",
		marginLeft: 10,
		textAlign: "right"
	},

	countryNameSearch: {
		color: "#fff",
		marginLeft: 20
	},
	sectionHeader: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingLeft: 20,
		paddingRight: 20,
		height: 30
	},
	sectionHeaderTitle: {
		color: "#ed1b34",
		fontWeight: "bold",
		fontSize: 15
	},
	modalOptions: {
		flex: 1
	},

	searchContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	SectionStyle: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},

	imageStyle: {
		paddingTop: 2,
		// margin: 5,
		height: "100%",
		width: 25,
		alignItems: "center"
	},
	searchTextInput: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: "#fff",
			height: "100%",
			width: "80%"
		}
	])
});

export default styles;
