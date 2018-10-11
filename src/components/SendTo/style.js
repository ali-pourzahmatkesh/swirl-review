import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.flatten({
    container: {
        flex: 1,
        backgroundColor: colors.appColor,
        height,
        width
    },
    sectionHeader:{
        backgroundColor:colors.bodyColor,
        width:65,
        height:20,
        alignItems:'center',
        justifyContent:'center',
        borderTopEndRadius:30,
        borderBottomEndRadius:30,
        marginTop:10,
        marginBottom:10
    },
    sectionHeaderTitle:{
        color:colors.appColor
    },
    sectionItems:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:15,
        paddingLeft:15
    },
    addBtn:{
        width:53,
        height:23,
        backgroundColor:colors.combinatorialColor,
        borderRadius:11.5,
        alignItems:'center',
        justifyContent:'center'
    },
    addBtnText:{
        color:colors.bodyColor,
        fontSize:13
    },

    actionBox: {
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row',
        marginRight:10
    },

    actionBtn:{
        width:30,
        height:30,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        marginRight:10,
        marginLeft:10,

    },

    actionBtnUnSelect:{
        borderWidth:2,
        borderColor:colors.combinatorialColor
    },

    actionBtnSelect:{
        backgroundColor:colors.combinatorialColor
    },
    actionIcon:{
        width:15,
        height:15
    },


    footer:{
        backgroundColor:colors.combinatorialColor ,
        alignItems:'center',
        justifyContent:'center',

        borderRadius:25,
        height:50,
        width:50


    },
    nextIcon:{
        width:25,
        height:25,

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
        alignItems:'center'
    },

});
export default styles;
