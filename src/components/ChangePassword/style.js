import { StyleSheet, Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appColor
        // flexDirection: 'column'
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    imageItem: {
        height: 75,
        width: 75,
        aspectRatio: 1,
        resizeMode: "contain"
    },
    // formContainer: {
    //     width: 300,
    //     alignSelf: "center"
    //     // borderWidth: 1
    // },
    // formInputIcon: {
    //     height: "110%",
    //     width: "10%",
    //     resizeMode: "contain"
    //
    //     // borderWidth: 2
    // },
    // minLengthText: {
    //     alignSelf: "flex-end",
    //     color: colors.bodyColor,
    //     fontFamily: "MuseoSansRounded-300",
    //     fontSize: 10,
    //     marginTop: 7,
    //     marginBottom: 15
    // },
    nextButton: {
        backgroundColor: colors.highlightColorTwo,
        height: height * 0.07,
        width: "100%",
        justifyContent: "center",
        position: "absolute"
    },
    nextText: {
        color: colors.tapeWhite,
        textAlign: "center",
        fontSize: 24,
        fontFamily: 'MuseoSansRounded-1000'
    },
    textInput: {
        fontSize: 16,
        paddingLeft: "6%",
        color: colors.bodyColor,
        width: "100%"

        // borderWidth: 2
    },
    // textInputContainer: {
    //     alignSelf: "center",
    //     borderBottomWidth: 1.5,
    //     borderBottomColor: colors.bodyColor,
    //     flexDirection: "row",
    //     // marginBottom: 30,
    //     paddingBottom: 12,
    //     // width: '85%'
    //     width: 300
    // }
});

export default styles;
