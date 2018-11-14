import {StyleSheet, Dimensions} from 'react-native';
import {CONFIG} from '../../../config';
const colors = CONFIG.colors;
const {width, height} = Dimensions.get('window');
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
    textInputBox:{
        padding:15,
        flex:1,
        justifyContent:"space-between"

    },




    cameraActionBox:{
        backgroundColor:"transparent",
        flex:1,
        position:'absolute',
        width,
        height,
        justifyContent:"space-between",
        paddingTop:height === 812 ? 50 : 40,
        paddingBottom:height === 812 ? 70 : 65,
        paddingLeft:15,
        paddingRight:15
    },
    cameraActions:{
        // backgroundColor:"yellow",
        alignItems:"center",
        justifyContent:"space-between",
        // height:110
    },
    cameraBtnBox:{
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "red",
        width ,
        paddingRight:20,
        paddingBottom:30
    },

    messageText: {
        fontFamily: 'MuseoSansRounded-900',
        fontSize: 18
    }
});
export default styles
