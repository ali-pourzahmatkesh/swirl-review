import { StyleSheet, Dimensions } from "react-native";
import appCss from "../../../../app.css";
import { CONFIG } from "../../../../config";
const COLORS = CONFIG.colors;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: height === 812 ? 10 : 6,
        height: 44 + (height === 812 ? 43 + 10 : 20 + 6),
        borderBottomWidth: 0,
        paddingTop: height === 812 ? 43 : 20,
        backgroundColor: COLORS.appColor,
    },
    backButton: {
        height: height * 0.05,
        width: width * 0.12,
        justifyContent: 'center',
        borderWidth: 0
    },
    titleText: {
        fontFamily: 'MuseoSansRounded-900',
        fontSize: 20,
        color: COLORS.tapeWhite,
        borderWidth: 0
    }
});

export default styles;