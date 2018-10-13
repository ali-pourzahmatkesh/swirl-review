import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";
const { width, height } = Dimensions.get("window");
const COLORS = CONFIG.colors;

const STYLES = StyleSheet.create({
    sectionHeaderText: {
        // fontFamily: 'MuseoSansRounded-1000',
        fontSize: 12,
        marginLeft: '3%',
        marginTop: '10%'
    },
    optionContainer: {
        flexDirection: 'row',
        marginTop: '2%'
    },
    optionIconContainer: {
        width: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionIcon: {
        width: width * 0.07,
        height: width * 0.07,
    },
    optionButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '86%',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor
    },
    optionText:  StyleSheet.flatten([appCss.defaultFontApp]),
    optionArrow: {
        paddingRight: '5%'
    },
    nameText: StyleSheet.flatten([appCss.defaultFontApp,{
        // fontFamily: 'MuseoSansRounded-1000',
        fontSize: 24,
        color: COLORS.tapeWhite,
        alignSelf: 'center',
        marginBottom: '5%'
    }]),

    imageContainer:{ width: "100%" , backgroundColor:COLORS.appColor},
    editButton:{
        height: 26,
        width: 26,
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor:COLORS.combinatorialColor,
        borderRadius:13
    },
    editIcon: {
        width: undefined,
        height: undefined,
        flex: 1
    },

});

export default STYLES;