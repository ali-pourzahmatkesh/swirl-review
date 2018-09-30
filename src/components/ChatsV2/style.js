import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";

const {height, width} = Dimensions.get('window');
const colors = CONFIG.colors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bodyColor
    },

    headerContainer: StyleSheet.flatten([appCss.header, {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        height: height * 0.10,
        marginBottom: 0
    }]),
    headerButton: {
        width: width * 0.10,
        height: '70%'
    },
    headerIcon: {
        height: "100%",
        width: width * 0.10
    },

    listViewItemsActive: {
        // backgroundColor: "rgba(249,237,37,0.90)"
        backgroundColor: colors.highlightColor
    },

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
    chatItem: {
        backgroundColor: colors.tapeWhite,
        borderRadius: 20,
        width: width * .9,
        marginBottom: 10,


        shadowColor: colors.tapeBlack,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    chatNameText: StyleSheet.flatten([appCss.titleBoxSubject, {
        fontFamily: 'MuseoSansRounded-900'
    }]),
    chatDetailText: StyleSheet.flatten([appCss.titleBoxDetailText, appCss.thinDefaultFontApp, {
        // fontStyle: 'italic',
        fontFamily: 'MuseoSansRounded-300Italic'
    }]),
    chatTimeText: StyleSheet.flatten([appCss.thinDefaultFontApp, {
        alignSelf: 'flex-start',
        marginTop: '1%',
        marginRight: '3%'
    }])



});

export default styles;