import { StyleSheet, Dimensions } from "react-native";
const {height, width} = Dimensions.get('window');
import {CONFIG} from "./config";
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


});

export default appCss;
