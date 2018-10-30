import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.appColor,
        flex: 1
    },
    imageContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    imageItem: {
        height: 75,
        width: 75,
        aspectRatio: 1,
        resizeMode: "contain",
        marginTop: -35
    },
    promptText: {
        color: colors.bodyColor,
        fontSize: 20,
        fontFamily: 'MuseoSansRounded-700',
        textAlign: "center",
    },

    formInputContainer: {
        alignItems: "center",
        width: width,
        flex: 3,
        alignSelf: "center"
    },
    codeInput:{
        backgroundColor: "#fff",
        width: 47,
        height: 58,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        color: colors.combinatorialColor,
        fontSize: 40,
        fontFamily: 'MuseoSansRounded-1000'
    }
});

export default styles;
