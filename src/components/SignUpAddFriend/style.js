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



    headerText: StyleSheet.flatten([
        appCss.defaultFontApp,
        {
            textAlign: "center"
        }
    ])
});

export default STYLES;