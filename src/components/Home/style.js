import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
const COLORS = CONFIG.colors;
const  {height, width} = Dimensions.get('window');

const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.appColor
    },

    chatList: {
        alignItems:'center'
    },
    chatListBox: {
        width: width - 30,
        height : 70,
        backgroundColor:COLORS.bodyColor,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:5,
        // paddingLeft:10,
        marginBottom:10
    },

    chatListBlockBox:{backgroundColor:"#ff4674", borderColor:"#ff345e",borderWidth:2},

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
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        height : 70,
        paddingTop:10,
        paddingRight:5
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
    }
    
});

export default STYLES;