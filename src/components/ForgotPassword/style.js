import { StyleSheet, Dimensions } from "react-native";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const {width, height} = Dimensions.get('window');
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appColor
    },
    imageContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    imageItem: {
        aspectRatio: 1,
        resizeMode: "contain",
        height: '35%'
    },
    formInputContainer: {
        alignItems: "flex-start",
        width: 300,
        flex: 3,
        alignSelf: "center"
    }
});

export default styles;
