import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "./config";
const { height, width } = Dimensions.get('window');
const colors = CONFIG.colors;
const widthFilter = width/5;
const defaultFontApp = {
    fontFamily: 'MuseoSansRounded-700'
};
const appCss = StyleSheet.create({
    defaultFontApp,
    heavyDefaultFontApp: {
        fontFamily: 'MuseoSansRounded-1000'
    },
    thinDefaultFontApp: {
        fontFamily: 'MuseoSansRounded-300'
    },

	navigationTitle: {
        ...defaultFontApp,
		color: colors.bodyColor,
		fontWeight: 'bold',
		fontSize: 20
	},
	forwardContainer: {
		flex: 1,
		padding: 20,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	forwardPageContentBox: {
		width: 45,
		height: 45,
		backgroundColor: colors.combinatorialColor,
		borderRadius: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	tapeBackColor: {
		backgroundColor: colors.appColor
	},
	forwardPageImageBox: {
		width: 30,
		height: 30
	},


    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 10,
        height: 44,
        marginTop: height === 812 ? 43 : 20
    },
    headerTitle: {
        ...defaultFontApp,
        fontSize: 25,
        color: colors.bodyColor,
        fontWeight: 'bold'
    },

    headerIconBox: {
	    width: 27,
        height: 27
    },
    headerIconHorizontalBox: {
        width: 50,
        height: 27
    },
    headerIcon: {
        width: undefined,
        height: undefined,
        flex: 1
    },



    listItems: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255,255,255,0)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 2,
		// marginLeft:16,
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    avatarBox: {
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        justifyContent:'center'
    },
    

    titleBox: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    titleBoxSubject: {
        ...defaultFontApp,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },

    titleBoxDetail: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },



    titleBoxDetailText: {
        ...defaultFontApp,
		opacity:0.97,
        fontSize:12
    },

    actionBox: {
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        justifyContent:'center',
        // borderWidth: 1
    },


    closeButtonBox: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // top:'100%',
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        marginBottom: height === 812 ? 44 : 34
    },

    closeButton: {
        width: 70,
        height: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.appColor,
        borderRadius: 50
    },

    closeButtonIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },



    appColor: {
        backgroundColor: colors.appColor
    },

    safeArea: {
        backgroundColor: colors.appColor
    },




    filterBar:{
        backgroundColor: colors.highlightColor,
        padding: 5,
        alignItems:'center',
        justifyContent:'center',
        borderBottomWidth: 1,
        borderColor: colors.bodyColor
    },

    filterBarActionBox:{
        width: widthFilter-10,
        borderRadius: widthFilter/2,
        backgroundColor: colors.disableColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },


    filterBarActionBoxItem:{
        width: (widthFilter/2)-9,
        margin: 2,
        padding: (widthFilter/13),
        height: (widthFilter/2)-9,
        borderRadius: widthFilter/4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    filterImage: {
        // flex:1,
        width: (widthFilter/2)-17,
        height: (widthFilter/2)-18,
    },
    filterImageSaveProfile: {
        // flex:1,
        width: (widthFilter/2)-20,
        height: (widthFilter/2)-19,
    },
    filterImageAround: {
        // flex:1,
        width: (widthFilter/2)-21,
        height: (widthFilter/2)-21,
    },

    countryFlagSvg: {
        height: 27,
        width: 35,
        position: 'absolute',
        top: -5,
        left: -6
    },

    iconFormInput: {
        flexDirection: 'row',
        marginTop: 15,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 12,
        borderBottomWidth: 1.5,
        borderBottomColor: colors.formInputUnderline,
        backgroundColor: colors.bodyColor,
        borderRadius: 20
    },

    formInputIcon: {
        height: "110%",
        width: "10%",
        resizeMode: "contain"
    },


    formInputContainer: {
        alignItems: "center",
        width: 300,
        flex:3,
        alignSelf: "center"
    },

    textInput: {
        ...defaultFontApp,
        flex: 1,
        // fontWeight: "bold",
        fontSize: 12,
        width: "100%",
        paddingRight: 20,
        paddingLeft: 18,
        color: colors.combinatorialColor
    },

    countryCodeBox: {
        width: 64,
        height: 35,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 3,
        marginLeft: 3,
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

    modalContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.appColor
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
        backgroundColor: colors.appColor,
        paddingLeft: 20,
        paddingRight: 20,
        height: 40,
        borderBottomWidth: 1,
        borderColor: colors.bodyColor
    },

    countryCodeSearch: {
        color: colors.bodyColor,
        flexBasis: "15%",
        marginLeft: 10,
        textAlign: "right"
    },

    countryNameSearch: {
        color: colors.bodyColor,
        marginLeft: 20
    },
    sectionHeader: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.bodyColor,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        height: 30
    },
    sectionHeaderTitle: {
        color: colors.appColor,
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
    searchTextInput: {
        ...defaultFontApp,
        color: "#fff",
        height: "100%",
        width: "80%"
    },
    backButton:{
        marginLeft:15
    }





});

export default appCss;
