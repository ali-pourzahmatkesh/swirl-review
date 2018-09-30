import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";
const { width, height } = Dimensions.get("window");
const COLORS = CONFIG.colors;

const STYLES = StyleSheet.create({
    backArrow: {
        flex: 1,
    },
    headerTitle: StyleSheet.flatten([appCss.heavyDefaultFontApp, {
        fontSize: 24,
        flex: 3,
        textAlign: 'center'
    }]),
    rightButton: {
        flex: 1,
    },
    rightText: StyleSheet.flatten([appCss.thinDefaultFontApp, {
        fontSize: 16,
        alignSelf: 'flex-end'
    }]),
});

export default STYLES;