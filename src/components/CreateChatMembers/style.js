import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";
const { width, height } = Dimensions.get("window");
const COLORS = CONFIG.colors;

const STYLES = StyleSheet.create({
    headerBackground: {
        width: '100%'
    },


    searchBarContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingLeft: 15,
    },
    searchIcon: {
        
    },
    searchInput: StyleSheet.flatten([appCss.defaultFontApp, {
        marginLeft: 10,
        flex: 1
    }]),
    selectedContainer: {
        width: '90%',
        marginLeft: '5%',
    },


    contactHeaderText: {
        width: '100%',
        backgroundColor: COLORS.appColor,
        color: COLORS.tapeWhite,
        paddingLeft: '3%'
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10
    },
    contactText: {
        paddingLeft: '8%'
    },
    contactHighlightContainer: {
        borderWidth: 0,
        flex: 1,
        alignItems: 'flex-end'
    },
    contactHightlight: {
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        height: 20,
        width: 20,
        borderRadius: 10,
        marginRight: 25
    },



    selectedContactContainer: {
        marginRight: 10,
        borderWidth: 0,
        alignItems: 'center'
    },
    deselectButton: {
        width: 22,
        height: 22,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
        borderRadius: 11
    },
    deselectImage: {
        width: 20,
        height: 20,
    }
});

export default STYLES;