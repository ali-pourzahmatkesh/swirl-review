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
    headerSubject:StyleSheet.flatten([appCss.defaultFontApp,{
        color:colors.combinatorialColor,
        fontSize:17
    }]),

    textInputBox:{
        padding:15,
        flex:1,
        justifyContent:"space-between"

    },

    textInput: {
        fontFamily: 'MuseoSansRounded-900',
        fontSize: 18
    },



    footer:{

    },
    footerCounter:{
        alignItems:'flex-end',
        marginBottom:20
    },
    footerCounterText:StyleSheet.flatten([appCss.defaultFontApp,{
        color:colors.combinatorialColor,
        fontSize:12
    }]),


    footerActions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth: 0
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
        borderRadius: 25,
    },

    iconButton: {
        // width: 25,
        // height: 25,
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    cameraBtn: {
        width: 60,
        height: 60,
        paddingRight:50,
        resizeMode: 'contain'
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
    cameraActions: {
        // backgroundColor:"yellow",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
        // height:110
    },
    cameraBtnBox: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "red",
        width,
        paddingRight: 20,
        paddingBottom: 30
    },


    containerOtherPage: {
        flex: 1,
        backgroundColor: colors.appColor,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    pickerText: {
        color: colors.bodyColor,
        fontSize: 17,
        fontFamily: 'MuseoSansRounded-900',
        marginBottom: 20,
        marginTop: 10
    },



    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },


});

export default styles;
