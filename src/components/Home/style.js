import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";

const colors = CONFIG.colors;
const  {height, width} = Dimensions.get('window');
const BOX_HEIGT = 30 + (height * 0.06);
const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appColor
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
        // borderColor: colors.selectedBoxBorder,
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
        paddingBottom: BOX_HEIGT * 0.1
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
    },
    chatDesc: {
        fontSize: 6 + (height * 0.0103),
        fontFamily: 'MuseoSansRounded-300',
        // marginBottom: BOX_HEIGT * 0.2,
        borderWidth: 0
    },
    chatTime: {
        fontSize: 12,
        fontFamily: 'MuseoSansRounded-300',
        position: 'absolute',
        alignSelf: 'flex-start',
        right: width * 0.025,
    },



    homeBottomBox: {
        display: 'flex',
        position: 'absolute',
        width:50,
        bottom: 0,
        left: width/2-25,
        right: 0,
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        marginBottom: height === 812 ? 34 : 20,
        shadowOffset: {
            height: 1
        },
        shadowOpacity: 0.6,
        shadowRadius: 2.5,
    },

    iconBottomBox: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.highlightColorTwo,
        borderRadius: 50
    },

    iconBottom: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
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
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 0,
        // marginBottom: BOX_HEIGT * 0.12
    }
});

export default STYLES;