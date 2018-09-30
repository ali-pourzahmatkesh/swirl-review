import {StyleSheet,Dimensions} from "react-native";
import appCss from "../../../app.css";
import {CONFIG} from "../../../config";
const {height, width} = Dimensions.get('window');
const colors = CONFIG.colors;

import { getStatusBarHeight } from 'react-native-status-bar-height';

// const largeScreen = height === 812;
const largeScreen = height >= 812;

const styles = StyleSheet.flatten({
    container: {
        position: "absolute",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        // height:height === 812? 88: 64,
        // if screen height is 812 container height = 115
        // else 91
        // maybe should be greater than or equal to?
        height: largeScreen  ? 115 : 91,
        width: width,
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        backgroundColor: colors.tapeWhite,

        // getStatusBarHeight takes in a boolean for skipping
        // the android status bar height. don't need it in this case
        // because android positions the base view under the status
        // bar by default
        top: getStatusBarHeight(true),
        borderTopWidth: 1
    },

    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        // height: 44,
        // height: 71,
        height: '100%',
        flexDirection: 'row',
        width: width,
        paddingRight: 16,
        paddingLeft: 16,
    },
    text: StyleSheet.flatten([appCss.defaultFontApp, {
        fontSize: 15,
        textAlign: "center"
    }])
});

export default styles;
