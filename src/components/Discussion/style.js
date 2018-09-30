import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";
const {width, height} = Dimensions.get('window');
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.appColor
    },


    discussionBox: {
        flexDirection: 'row',
        flex:1,
    },

    chatBox: {
        backgroundColor:colors.bodyColor
    },
    leftBoxAlignment: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    rightBoxAlignment: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    TextComponentStyle: {
        padding: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'transparent',
        fontSize: 15,
        overflow:'hidden'
    },

    TextComponentStyleRight: {
        color: colors.bodyColor,
        backgroundColor: colors.appColor,
        marginLeft: 70
    },

    TextComponentStyleLeft: {
        backgroundColor: colors.highlightColor,
        marginRight: 70
    },


    bubbleLeft: {
        position: "absolute",
        bottom: 10,
        left: 2
    },
    bubbleRight: {
        position: "absolute",
        bottom: 10,
        right: 2
    },


    errorIcon: {
        marginRight: 16,
        height:24,
        width:10
    },
    avatarBox: {
        marginLeft: 16,
        marginBottom: 10
    },
    textAreaBox: {
        borderTopWidth: 1,
        borderColor: colors.borderColor,
        backgroundColor: colors.bodyColor,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: height === 812 ? 10 : 0,
    },
    textArea: {
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        borderColor: colors.borderColor,
        backgroundColor: colors.bodyColor,
        borderWidth: 1,
        height: 35,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 8,
        borderRadius: 35/2,
        alignItems: 'center'
    },
    textAreaActionImage: {
        width: 32,
        height: 32,
        resizeMode: "contain"
    },

    dateTime: {
        alignItems: 'center',
        justifyContent:'center',
        margin: 10
    },

    dateTimeText: StyleSheet.flatten([appCss.defaultFontApp, {
        fontSize: 12,
        color: colors.highlightColor
    }]),

    confirmDiscussionBox: {
        flexDirection: 'row',
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bodyColor
    },

    confirmDiscussionItems:{
        alignItems: "center",
        justifyContent: "center",
        borderColor: colors.borderColor,
        borderTopWidth: 1,
        width: width/2,
        paddingBottom: height === 812 ? 30 : 20,
        paddingTop: 20,
    },
    leftBtn: {
        borderRightWidth: 1,
        borderColor: colors.borderColor,
    },
    rightBtn:{
        borderLeftWidth: 1,
        borderColor: colors.borderColor,
    },
    declineBtn: StyleSheet.flatten([appCss.defaultFontApp, {
        fontWeight: 'bold',
        color: colors.appColor
    }])
});

export default styles;