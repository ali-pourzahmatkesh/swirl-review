import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";
const { width, height } = Dimensions.get("window");
const colors = CONFIG.colors;
const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: colors.tapeWhite
	},
	modalContainer: {
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: colors.tapeWhite
	},
	header: {
		display: "flex",
		flexDirection: "row",
		flexBasis: "7%",
		justifyContent: "space-between",
		alignItems: "center",
		paddingRight: 20,
		paddingLeft: 20
	},
	modalOptions: {
		flex: 1
	},

	backButtonBack: {
		width: 30,
		height: 30,
		resizeMode: "contain"
	},

	search: {
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
	ImageStyle: {
		padding: 5,
		margin: 5,
		height: 25,
		width: 25,
		alignItems: "center"
	},

	profileInfoBox: {
        // height: width / 3 + 135,
		alignItems: "center",
		justifyContent: "flex-start"
	},

    instagramBox: {
        flex: 1,
        backgroundColor: colors.appColor,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 40,
        paddingTop: 40,
    },
    instageramLogoBox: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    logoIcon: {
        width: 58,
        height: 58,
        marginLeft: 10,
        marginRight: 10
    },
    logoIconPlus: {
        textAlign: 'center',
        color: colors.bodyColor,
        fontSize: 25,
        marginRight: 10
    },
    instageramDesc: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.bodyColor,
        fontSize: 17,
        textAlign: "left",
    }]),
	profileTitle: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.tapeBlack,
        fontSize: 25,
        marginBottom: 10,
        marginTop: 10,
	}]),
	
	bioText: StyleSheet.flatten([appCss.defaultFontApp, {
		marginBottom: 15,
		marginTop: 0,
		marginRight: 16,
		marginLeft: 16,
		textAlign: 'center'
	}]),

	profileSeenBox: {
		flexDirection: "row",
		alignItems: "center"
	},

	profileSeenIcon: {
		width: 20,
		height: 19,
		resizeMode: "contain"
	},

	profileSeenText: {
		fontWeight: "bold",
		marginLeft: 5,
		fontSize: 13,
		color: colors.tapeWhite
	},

	profileButton: {
        width: (width / 3) * 2,
        height: 50,
		// marginTop: 15,
        borderRadius: 25,
		justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.combinatorialColor
	},

	profileButtonText: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.appColor,
        fontSize: 25
	}]),

	modalListContainer: {
		flex: 1
	},

	modalTitle: {
		fontWeight: "bold",
		fontSize: 20
    },

    profileActions: {
        height: 30,
		width: width,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'center',
		marginTop: 5,
		marginBottom: 15
	},


	profileActionItem: {
		width: 30,
		height: 30,
		marginRight: 15,
		marginLeft: 15
	},


    imageList: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },

    imageBox: {
        width: width / 3,
        height: width / 3,
        marginBottom: 1
    },
    imageItem: {
        width: undefined,
        height: undefined,
        flex: 1
    },

	withoutHeader: {
        height:height === 812? 44: 20
	},

    modalBio: {
		backgroundColor:colors.bodyColor,
		paddingTop:height === 812? 44: 20,
		flex:1,
		justifyContent:'space-between',
		width:width
	},
    modalClose:{ 
		flexDirection:"row",
        paddingLeft:16,
        paddingRight:16,
		width:width
	},

    textInputBox: {
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
	},
    textInput: StyleSheet.flatten([appCss.defaultFontApp, {
		borderColor: colors.tapeBlack,
		borderBottomWidth: 1,
        // width:'100%',
	}]),

	saveBioButton: {
		height: 60,
		width,
		backgroundColor: colors.combinatorialColor,
		marginBottom: height === 812 ? 20 : 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	saveBioText: {
		color: colors.appColor,
		fontSize: 20
	},
	saveFeedButton: {
		flex: 1
	},
	saveFeedText: StyleSheet.flatten([appCss.defaultFontApp, {
		color: colors.appColor,
		fontSize: 20,
		textAlign: 'right'
	}]),
	promptContainer: {
		flex: 1,
		alignItems: 'center',
		marginBottom: '-10%'
	},
	promptText: StyleSheet.flatten([appCss.defaultFontApp, {
		color: colors.appColor,
		fontSize: 12,
		textAlign: 'center'
	}])
});

export default styles;
