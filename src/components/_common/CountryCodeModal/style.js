import { StyleSheet, Dimensions } from "react-native";
import appCss from "../../../../app.css";
import { CONFIG } from "../../../../config";
const colors = CONFIG.colors;
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.highlightColorTwo,
		height: height * 0.08,
        width: '100%',
        justifyContent: 'center',
        position: 'absolute',
    },
    buttonText: {
        color: colors.tapeWhite,
        textAlign: "center",
        fontSize: 24,
        fontFamily: 'MuseoSansRounded-1000'
    },
    searchIcon: {
        height: 20,
        width: 20,
        marginRight: 10
    },
});

export default styles;
