import {StyleSheet,Dimensions} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";
const {height, width} = Dimensions.get('window');
const colors = CONFIG.colors;
const styles = StyleSheet.flatten({
    container: {
        position: "absolute",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        // height: height === 812? 88: 64,
        height: height === 812 ? 115 : 91,
        width: width,
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        backgroundColor: colors.tapeWhite,
    },

    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        // height: 44,
        height: 71,
        flexDirection: 'row',
        width: width,
        paddingRight: 16,
        paddingLeft: 16
    },


    hideMobileInfoBox: {
        height: height === 812 ? 44 : 20,
        width: width,
        alignItems: 'center',
        paddingLeft: height === 812 ? 22 : 5,
        paddingRight: height === 812 ? 42 : 38,
        paddingTop: height === 812 ? 17 : 4

    },
    hideMobileInfo: {
        height: 12,
        width: '100%',
        backgroundColor: colors.tapeBlack,
    },
    text: StyleSheet.flatten([appCss.defaultFontApp, {
        fontSize: 15,
        textAlign: "center",
        marginLeft: 16
    }]),

    headerIconBox: {
        width: 10,
        height: 10,
        backgroundColor: colors.appColor,
        borderRadius: 5
    }
});

export default styles;
