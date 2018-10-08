import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const  {height, width} = Dimensions.get('window');

const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appColor
    },

    modalHeader: {
        display: "flex",
        flexDirection: "row",
        flexBasis: "7%",
        justifyContent: "space-around",
        alignItems: "center",
        paddingRight: 20,
        paddingLeft: 20
    },
    innerContainer: {
        alignItems: "center"
    },

    headerAction: {
        flex: 1
    },
    search: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    SectionStyle: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    ImageStyle: {
        padding: 5,
        margin: 5,
        height: 25,
        width: 25,
        alignItems: "center"
    },
});

export default STYLES;