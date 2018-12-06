import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";

const colors = CONFIG.colors;
const  {height, width} = Dimensions.get('window');
const BOX_HEIGT = 30 + (height * 0.06);
// larger for larger screens
const BUTTON_HEIGHT = ((height - 545 - (height === 812 ? 100 : 0)) * 0.1) + 46;
const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appColor
    },
    headerIconBox: {
        height: 47,
        width: 47,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0
    },
    headerIcon: {
        height: 32,
        width: 32,
    },

    chatList: {
        alignItems: 'center',
        flex: 1,
    },
    chatListBox: {
        width: width * 0.9,
        height: BOX_HEIGT,
        backgroundColor: colors.bodyColor,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        shadowOffset: {
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 1.5,
        borderWidth: 0
    },

    chatListBlockBox: {
        backgroundColor: colors.highlightColorTwo,
    },

    avatarBox: {
        alignItems: "center",
        justifyContent:'center',
        width: '25%',
        borderWidth: 0
    },

    chatListSubjectBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0
    },
    messageInfoBox: {
        width: '50%',
        borderWidth: 0,
        height: BOX_HEIGT * 0.8,
        paddingTop: BOX_HEIGT * 0.1,
        paddingBottom: BOX_HEIGT * 0.1,
        overflow: 'visible'
    },
    otherInfo: {
        flexDirection:'row',
        justifyContent: 'flex-end',
        height: BOX_HEIGT * 0.9,
        paddingRight: width * 0.05,
        paddingTop: 5,
        width: '25%',
        borderWidth: 0
    },
    otherInfoLogo: {
        height: BOX_HEIGT * 0.6,
        width: BOX_HEIGT * 0.6,
        alignSelf: 'center',
        marginTop: height * 0.01,
        position: 'absolute', 
        right: BOX_HEIGT * 0.15,
        top: BOX_HEIGT * 0.1
    },

    chatSubject: {
        fontSize: 8 + (height * 0.0103),
        fontFamily: 'MuseoSansRounded-900',
        borderWidth: 0
    },
    messageHintContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        overflow: 'visible',
    },
    chatDesc: {
        fontSize: 6 + (height * 0.0103),
        fontFamily: 'MuseoSansRounded-300',
        // marginBottom: BOX_HEIGT * 0.2,
        borderWidth: 0,
        overflow: 'visible',
        width: width * 0.9 * 0.75 // quarter of the entire width. basically goes until the right side
    },
    chatTime: {
        fontSize: 11,
        fontFamily: 'MuseoSansRounded-300',
        position: 'absolute',
        alignSelf: 'flex-start',
        right: width * 0.025,
    },



    homeBottomBox: {
        position: 'absolute',
        width,
        bottom: 0,
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: height === 812 ? 34 : 20,
        shadowOffset: {
            height: 1
        },
        shadowOpacity: 0.6,
        shadowRadius: 2.5,
        borderWidth: 0
    },

    iconBottomButton: {
        borderWidth: 0,
        height: BUTTON_HEIGHT + 25,
        width: BUTTON_HEIGHT + 25,
        borderRadius: (BUTTON_HEIGHT + 25) * 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iconBottomBox: {
        width: BUTTON_HEIGHT,
        height: BUTTON_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.highlightColorTwo,
        borderRadius: BUTTON_HEIGHT * 0.5
    },

    iconBottom: {
        width: BUTTON_HEIGHT * 0.6,
        height: BUTTON_HEIGHT * 0.6,
        resizeMode: 'contain'
    },
    iconBottomBackground: {
        height: BUTTON_HEIGHT,
        width: BUTTON_HEIGHT,
        borderRadius: BUTTON_HEIGHT * 0.5,
        backgroundColor: '#ff88bb',
        position: 'absolute',
        zIndex: -1
    },

    chatListEmpty:{
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.3,
    },
    chatListEmptyText: {
        fontSize: 20,
        fontFamily: 'MuseoSansRounded-1000',
        marginTop: 10,
        color: colors.bodyColor
    },

    timerCountdown: {
        flex:1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 1.3,
        textAlign: 'center',
        marginRight: 100,
        borderLeftWidth:0,

        // marginBottom: BOX_HEIGT * 0.12
    }
});

export default STYLES;