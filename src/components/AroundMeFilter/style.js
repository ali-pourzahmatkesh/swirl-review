import {StyleSheet, Dimensions} from "react-native";
import appCss from "../../../app.css";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },

    closeModalButton: {
        flex: 2
    },
    closeModalButtonContainer: {
        flexDirection: 'row',
        flex: 1
    },
    closeModalButtonImage: {
        height: 50,
        resizeMode: "cover",
        width: '100%',
        alignSelf: 'flex-end'
    },
    filterBlock: {
        width: '100%',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: colors.borderColor
    },
    filterText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    filterButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
    filterButton: {
        borderWidth: 1,
        borderRadius: 30,
        borderColor: colors.appColor,
        padding: 7,
        paddingLeft: 20,
        paddingRight: 20,
    },
    filterButtonText: StyleSheet.flatten([appCss.thinDefaultFontApp, {
        fontSize: 14,
        color: colors.appColor,
    }]),
    filterLabel: StyleSheet.flatten([appCss.defaultFontApp

    ]),
    filterValue: StyleSheet.flatten([appCss.thinDefaultFontApp

    ]),
    // filterSlider: {

    // },
    filterMultiSlider: {
        marginTop: 30
    },
    headerText: StyleSheet.flatten([appCss.headerTitle, {
        textAlign: "center",
        flex: 3,
    }]),

});

export default styles;