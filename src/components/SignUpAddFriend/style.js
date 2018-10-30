import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
import appCss from "../../../app.css";


const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appColor
    },

    chatList: {
        alignItems:'center',
        flex:1
    },



    titleText: StyleSheet.flatten([
        // appCss.defaultFontApp,
        {
            fontFamily: 'MuseoSansRounded-900',
            textAlign: "center",
            color: colors.tapeWhite,
            fontSize: 19
        }
    ]),
    done: {
        fontFamily: 'MuseoSansRounded-500',
        textAlign: "right",
        color: colors.tapeWhite,
        fontSize: 18,
    }
});

export default STYLES;