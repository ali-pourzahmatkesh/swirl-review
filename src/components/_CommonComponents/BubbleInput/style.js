import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../../config";
import {isIphoneX} from "react-native-iphone-x-helper";
const { height, width } = Dimensions.get('window');
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    iconFormInput: {
        flexDirection: 'row',
        marginTop: 25,
        backgroundColor: colors.bodyColor,
        borderRadius: 50,
        height:
            !isIphoneX()?
            height*0.07
        :
            height*0.06,

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
        marginLeft: 20,
    },
    textInput: {
        fontFamily: "MuseoSansRounded-900",
        flex: 1,
        fontSize: 18,
        width: "100%",
        paddingRight: 20,
        paddingLeft: 18,
        color: colors.highlightColorTwo,
        height: '100%',
    },

});

export default styles;
