import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";

const window = Dimensions.get('window');
const colors = CONFIG.colors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bodyColor
    },

    // listViewItemsYellow: {
    //     backgroundColor: "rgba(249,237,37,0.9)",
    // },
    listViewItemsActive: {
        // backgroundColor: "rgba(249,237,37,0.90)"
        backgroundColor: colors.highlightColor
    },

    // lastStatusIcon: {
    //     width: 18,
    //     height: 18,
    //     resizeMode:'contain'
    // },

    // arrowPositionText: {
    //     fontWeight: 'bold',
    //     marginLeft: 10,
    //     fontSize: 12
    // },

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
    tabContainer: {
        height: '8%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButtonText: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.appColor,
        fontSize: 16
    }])




});

export default styles;