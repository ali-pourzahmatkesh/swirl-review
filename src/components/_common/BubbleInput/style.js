import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../../config";
const { height, width } = Dimensions.get('window');
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    iconFormInput: {
        flexDirection: 'row',
        marginTop: 25,
        // paddingLeft: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: colors.formInputUnderline,
        backgroundColor: colors.bodyColor,
        borderRadius: 50,
        height: height * 0.06,
        alignItems: 'center',
        shadowOffset: {
            height: .5
        },
        shadowOpacity: .25,
        shadowRadius: 1,
    },
    formInputIcon: {
        height: height * 0.035,
        width: "10%",
        resizeMode: "contain",
        marginLeft: 20
        // marginTop: 10
    },
    textInput: {
        fontFamily: "MuseoSansRounded-900",
        flex: 1,
        fontSize: 18,
        width: "100%",
        paddingRight: 20,
        paddingLeft: 18,
        color: colors.highlightColorTwo,
        marginTop: 2,
        height: '100%',
    },

});

export default styles;
