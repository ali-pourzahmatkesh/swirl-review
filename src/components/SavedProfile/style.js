import { StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bodyColor
    },

    arrowPositionIcon: {
        width: 25,
        height: 25,
        flex : 1
    }
});

export default styles;