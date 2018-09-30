import {StyleSheet, Dimensions} from 'react-native';
const window = Dimensions.get('window');
import {CONFIG} from "../../../config";
import appCss from '../../../app.css';
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },

    avatarBox: {
        flexBasis: "25%",
        marginLeft: 20,
        alignItems: "center",
        justifyContent:'center'
    },


    arrowPositionIcon: {
        width: 17,
        height: 18,
        resizeMode:'contain'
    },

    arrowPositionText: {
        color: colors.appColor,
        marginTop: 10,
        fontSize: 10
    },




    emptyBox: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginTop: '30%'
    },

    ghostBox: {
        width: 44.6,
        height: 44.6,
        marginBottom: 25

    },


    ghostBoxIcon: {
        width: undefined,
        height: undefined,
        flex: 1
    },

    ghostBoxText: StyleSheet.flatten([appCss.defaultFontApp, {
        color: colors.appColor,
        fontSize: 20,
        textAlign: 'center'
    }]),





    filterModalButtonContainer: {
        flexDirection: 'row',
        flex: 1
    },
    filterModalButton: {
        flex: 2
    },
    filterModalButtonImage: {
        height: 35,
        resizeMode: "contain",
        width: '100%',
        alignSelf: 'flex-end',
    }

});

export default styles;