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
    iconFormInput: {
        flexDirection: 'row',
        marginTop: 12,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: colors.formInputUnderline,
    },
    formInputIcon: {
        height: '110%',
        width: '10%',
        resizeMode: 'contain',
    },
    imagesContent: {
        height: '8%',
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
    minLengthText: StyleSheet.flatten([appCss.thinDefaultFontApp, {
        alignSelf: "flex-end",
        color: colors.tapeWhite,
        fontSize: 10,
        marginTop: 3,
        marginBottom: -15
    }]),
    signUpButton: {
        alignSelf: 'center',
        backgroundColor: colors.highlightColorTwo,
        borderRadius: 30,
        height: '35%',
        width: '65%',
        justifyContent: 'center',
    },
    signUpText: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.appColor,
        textAlign: 'center',
        fontSize: 20,
    }]),
	textInput: StyleSheet.flatten([appCss.defaultFontApp, {
        flex: 1,
		fontWeight: "bold",
		fontSize: 16,
        width: '100%',
		paddingRight: 20,
		paddingLeft: 18,
        color: colors.tapeWhite,
    }]),













    //styles inside of render country codes
    countryCodeBox: {
		width: 64,
		height: 35,
		backgroundColor: "transparent",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
        // marginTop: 10,
        paddingRight: 3,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: "#dc030e"
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
        color: "#fff",
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
        paddingBottom: 10,
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
        justifyContent: "center",
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
		height: '100%',
		width: 25,
        alignItems: "center",
    },
    searchTextInput: StyleSheet.flatten([appCss.defaultFontApp, {
        color: "#fff",
        height: '100%',
        width: '80%',
    }])
});

export default styles;