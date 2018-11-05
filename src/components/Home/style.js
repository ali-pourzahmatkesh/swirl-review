import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";

const colors = CONFIG.colors;
const  {height, width} = Dimensions.get('window');

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
        height: height * 0.09,
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
        alignItems: 'center'
    },
    messageInfoBox: {
        width: '50%',
        borderWidth: 0
    },
    otherInfo: {
        flexDirection:'row',
        justifyContent: 'flex-end',
        height: height * 0.09,
        paddingRight: width * 0.05,
        paddingTop: 5,
        width: '25%',
        borderWidth: 0
    },
    otherInfoLogo: {
        width: 43,
        height: 43,
        alignSelf: 'center'
    },

    chatSubject: {
        fontSize: 16,
        fontFamily: 'MuseoSansRounded-900',
    },
    chatDesc: {
        fontSize: 14,
        fontFamily: 'MuseoSansRounded-300',
        borderWidth: 0,
    },
    chatTime: {
        fontSize: 12,
        fontFamily: 'MuseoSansRounded-300',
        position: 'absolute',
        alignSelf: 'flex-start',
        right: width * 0.02,
        top: 3
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
        width: 25,
        height: 25,
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

    TimerCountdown:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'flex-start',
        marginTop: 16,
    }
});

export default STYLES;