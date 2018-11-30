import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";
const { width, height } = Dimensions.get("window");
const COLORS = CONFIG.colors;

const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.tapeWhite
    },
    backButton: {
        height: height * 0.05,
        width: width * 0.12,
        justifyContent: 'center',
        borderWidth: 0
    },
    sectionHeaderText: {
        fontFamily: 'MuseoSansRounded-700',
        fontSize: 15,
        marginLeft: '3%',
        marginTop: height * 0.015,
        marginBottom: height * 0.015,
        // borderWidth: 1,
        width: width * 0.95
    },
    optionContainer: {
        flexDirection: 'row',
        marginTop: height * 0.01,
        // borderWidth: 1,
        borderRadius: 20,
        height: height * 0.09,
        shadowOffset: {
            height: 1
        },
        shadowOpacity: 0.4,
        shadowRadius: 1.7,
        backgroundColor: COLORS.tapeWhite
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
        // borderBottomWidth: 1,
        borderBottomColor: COLORS.borderColor
    },
    optionText: {
        fontSize: 16,
        fontFamily: 'MuseoSansRounded-500'
    },
    optionArrow: {
        paddingRight: '5%'
    },
    nameText: StyleSheet.flatten([appCss.defaultFontApp,{
        fontFamily: 'MuseoSansRounded-1000',
        fontSize: 24,
        color: COLORS.tapeWhite,
        alignSelf: 'center',
        // marginBottom: '3%',
        // marginTop: '3%',
        borderWidth: 0
    }]),

    imageContainer: {
        width: "100%",
        height: height * 0.3,
        justifyContent: 'center',
        backgroundColor: COLORS.appColor,
        // shadowOffset: {
        //     height: 1
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 3,
    },
    editButton: {
        height: 26,
        width: 26,
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: COLORS.combinatorialColor,
        borderRadius: 13,
        shadowOffset: {
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    editIcon: {
        width: undefined,
        height: undefined,
        flex: 1
    },

});

export default STYLES;