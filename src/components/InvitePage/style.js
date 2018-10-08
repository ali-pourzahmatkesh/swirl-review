import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const  {height, width} = Dimensions.get('window');

const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.appColor
    },

    chatList: {
        alignItems:'center',
        flex:1
    },
    chatListBox: {
        width: width - 30,
        height : 70,
        backgroundColor:colors.bodyColor,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:5,
        // paddingLeft:10,
        marginBottom:10
    },

    chatListBlockBox:{
        backgroundColor:colors.combinatorialColor,
        borderColor:colors.selectedBoxBorder,
        borderWidth:2
    },

    avatarBox: {
        flexBasis: 80,
        alignItems: "center",
        justifyContent:'center'
    },

    chatListSubjectBox:{
        width:width-110,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'

    },
    otherInfo:{
        // flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-start',
        height : 70,
        paddingTop:5,
        paddingRight:15
    },
    otherInfoLogo:{
        width: 43,
        height: 43,
        marginTop: 1
    },

    chatSubject:{
        fontSize:16,
        marginBottom:5
    },
    chatDesc :{
        fontSize:12,
        marginLeft:10
    },
    chatTime:{
        fontSize:12,
    },



    homeBottomBox: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // top:'100%',
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        marginBottom: height === 812 ? 34 : 20
    },

    iconBottomBox: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.combinatorialColor,
        borderRadius: 50
    },

    iconBottom: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    chatListEmpty:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    chatListEmptyText:{
        fontSize:20,
        marginTop:10,
        color:colors.bodyColor
    }
});

export default STYLES;