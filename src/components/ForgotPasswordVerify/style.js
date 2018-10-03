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
    contentContainer: {
        flex: 1,
        alignItems: "center"
    },
    imageContainer: {
        flex:2,
        justifyContent: "center",
        alignItems: "center",
    },
    imagesContent: {
        height: '35%',

    },
    imageItem: {
        flex: 1,
        aspectRatio: 1,
        resizeMode: "contain"
    },
    nextButtonContainer: {
        backgroundColor: colors.combinatorialColor,
        height: height === 812 ? "22%" : "20%",
        width: "100%",
        position: "absolute"
    },
    nextButton: {
        backgroundColor: colors.combinatorialColor,
        height: "50%",
        justifyContent: "center"
    },
    nextText: {
        color: colors.tapeBlack,
        textAlign: "center",
        fontSize: 20
    },
    promptText: {
        color: colors.bodyColor,
        fontSize: 18,
        textAlign: "center",
        width: "80%"
    },

    formInputContainer: {
        alignItems: "center",
        width: width,
        flex:3,
        alignSelf: "center"
    },
    codeInput:{
        backgroundColor:"#fff",
        width:38,
        height:48,
        marginLeft:15,
        marginRight:15,
        borderRadius:10,
        color:colors.combinatorialColor}
});

export default styles;
