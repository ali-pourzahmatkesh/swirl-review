import {StyleSheet, Dimensions} from "react-native";
const {height} = Dimensions.get('window');
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const styles = StyleSheet.flatten({
    container: {
        position: "absolute",
        // marginTop: "8%",
        top:height === 812 ? 43 : 20,
        height: 60,
        width: "100%",
        borderWidth: 2,
        overflow:'hidden',
        borderColor: colors.bodyColor,
        backgroundColor: colors.appColor,
        borderRadius: 15
    },

    toastBox:{
        width:'100%',
        height:'100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor:colors.combinatorialColor
    },
    text: {
        fontSize: 15,
        color: colors.bodyColor,
        textAlign: "center"
    }
});

export default styles;
