import { StyleSheet } from "react-native";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appColor
        // flexDirection: 'column'
    },
    formInputIcon: {
        height: "110%",
        width: "10%",
        resizeMode: "contain"
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
    nextButton: {
        backgroundColor: colors.combinatorialColor,
        height: "10%",
        width: "100%",
        justifyContent: "center",
        position: "absolute"
        // bottom: 100
        // marginBottom: -30,

        // borderWidth: 2,
        // borderColor: 'green'
    },
    nextText: StyleSheet.flatten([
        appCss.defaultFontApp,
        {
            color: colors.tapeBlack,
            textAlign: "center",
            fontSize: 20
        }
    ]),
    textInput: {
        fontSize: 16,
        paddingLeft: "6%",
        color: "#fff",
        width: "100%"
    },
    formInputContainer: {
        alignItems: "flex-start",
        width: 300,
        flex:3,
        alignSelf: "center"
    }
});

export default styles;
