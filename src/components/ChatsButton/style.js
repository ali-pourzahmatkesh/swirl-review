import {StyleSheet, Dimensions} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";
const colors = CONFIG.colors;
const styles = StyleSheet.create({


    listViewItems: {
        display: "flex",
        justifyContent: "space-around",
        // backgroundColor: "#ffffff00", <-- ?????
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        // paddingTop: 2,
        height: 80,
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
    },


    listViewItemsActive: {
        backgroundColor: colors.highlightColor
    },

    avatarBox: {
        flexBasis: "25%",
        paddingLeft: 30,
        alignItems: "center",
        justifyContent:'center'
    },



    titleBox: {
        flexBasis: "50%",
        paddingLeft: 20,
        alignItems: "flex-start",
        justifyContent:'center',
        flexDirection: "column"
    },
    boxSubject: StyleSheet.flatten([appCss.defaultFontApp, {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5
    }]),




    lastStatusImageBox: {
        flexBasis: "25%",
        paddingRight: 40,
        alignItems: "flex-end",
        justifyContent: 'center'
    },




    lastStatusBox: {
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent:'flex-start'
    },



    lastStatusText: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.tapeDarkGrey,
        fontSize: 10
    }]),

    unreadChatsBadge: {
        width: 20,
        height: 20,
        backgroundColor: colors.appColor,
        borderRadius: 20/2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    unreadChatsNumber: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.tapeWhite,
        fontWeight: "bold"
    }]),



});

export default styles;