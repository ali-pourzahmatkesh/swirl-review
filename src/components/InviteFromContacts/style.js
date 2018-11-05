import {Dimensions, StyleSheet} from "react-native";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
import appCss from "../../../app.css";
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.flatten({
    container: {
        flex: 1,
        backgroundColor: colors.appColor,
        height,
        width
    },
    sectionHeader:{
        backgroundColor: colors.bodyColor,
        width: 65,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: 30,
        borderBottomEndRadius: 30,
        marginTop: 10,
        marginBottom: 10
    },
    sectionHeaderTitle: {
        color: colors.appColor
    },
    sectionItems:{
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15
    },
    addBtn:{
        width: 53,
        height: 23,
        backgroundColor: colors.highlightColorTwo,
        borderRadius: 11.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addBtnText:{
        color: colors.bodyColor,
        fontFamily: 'MuseoSansRounded-1000',
        fontSize: 13
    },
    boxEmptySearch:{
        width:width/4*3,
        height:70,
        backgroundColor:colors.bodyColor,
        borderRadius:10,
        marginTop:20,
        paddingLeft:15,
        paddingRight:15,
        flexDirection:'row',
        alignItems:'center'
    },
    boxEmptySearchFaq:{
        backgroundColor:"#E0E3EB",
        width:60,
        height:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
    },

    boxEmptySearchText:StyleSheet.flatten([appCss.defaultFontApp,{
        marginLeft:15,
        fontSize:16
    }]),

});
export default styles;
