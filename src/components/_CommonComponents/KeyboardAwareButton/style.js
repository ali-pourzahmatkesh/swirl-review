import { StyleSheet, Dimensions } from "react-native";
import appCss from "../../../../app.css";
import { CONFIG } from "../../../../config";
const COLORS = CONFIG.colors;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    buttonBackground: {
        backgroundColor: COLORS.tapeWhite,
        position: 'absolute',
        height: height * 0.08,
        width,
        bottom: -height * 0.08
    },
    button: {
        backgroundColor: COLORS.highlightColorTwo,
		height: height * 0.08,
        width: '100%',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.tapeWhite,
        textAlign: "center",
        fontSize: 24,
        fontFamily: 'MuseoSansRounded-1000'
    }
});

export default styles;
