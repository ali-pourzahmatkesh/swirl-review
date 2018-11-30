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
        flex: 1,
        borderWidth: 0
    },
    backButton: {
        height: height * 0.05,
        width: width * 0.12,
        justifyContent: 'center',
        borderWidth: 0
    },
    search: {
        flex: 5,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0
    },
    sectionStyle: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0,
        // marginLeft: 20
    },
    imageStyle: {
        height: 20,
        width: 20,
        marginRight: 10
    },
});

export default STYLES;