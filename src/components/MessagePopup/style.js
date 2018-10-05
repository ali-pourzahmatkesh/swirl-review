import {StyleSheet,Dimensions} from "react-native";
import {CONFIG} from "../../../config";
import appCss from "../../../app.css";
const {height, width} = Dimensions.get('window');
const colors = CONFIG.colors;
const styles = StyleSheet.flatten({
    container:{
        flex:1,
        backgroundColor:colors.combinatorialColor,
        alignItems:'center',
        justifyContent:'center'
    },
    messageBox:{
        width: width-30,
        height:height-100,
        backgroundColor:colors.bodyColor,

        borderRadius:20,
    },
    messageBoxHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:44,
        marginLeft:15,
        marginRight:15
    },
    closeIcon:{
        width:15,
        height:15
    },

    subjectBox:{
      flexDirection:'row',
        alignItems:'center',
        justifyContent:"center"
    },
    headerSubject:{
        color:colors.combinatorialColor,
        fontSize:17
    },

    textInputBox:{
        padding:15,
        flex:1,
        justifyContent:"space-between"

    },



    footer:{

    },
    footerCounter:{
        alignItems:'flex-end',
        marginBottom:20
    },
    footerCounterText:{
        color:colors.combinatorialColor,
        fontSize:12
    },


    footerActions:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    actionBox:{
        width: 40,
        height: 30,
        margin:5
    },
    actionBoxIcon:{
        width:undefined,
        height:undefined,
        flex:1
    },


    nextButton: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent',
        borderRadius: 50
    },

    iconButton: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },


});

export default styles;
