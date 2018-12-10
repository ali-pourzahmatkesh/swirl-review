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
        width: 57.24,
        height: 24.84,
        backgroundColor: colors.highlightColorTwo,
        borderRadius: 11.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addBtnText:{
        color: colors.bodyColor,
        fontFamily: 'MuseoSansRounded-1000',
        fontSize: 15
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
        alignItems:'center',
        shadowOffset: {
            height: 1
        },
        shadowOpacity: .2,
        shadowRadius: 1
    },
    boxEmptySearchFaq:{
        backgroundColor:"#E0E3EB",
        width:60,
        height:60,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
    },

    boxEmptySearchText: {
        marginLeft: 15,
        fontSize: 16,
        fontFamily: 'MuseoSansRounded-900'
    },
    addFromContact: {
        fontFamily: 'MuseoSansRounded-900',
        color: colors.bodyColor,
        fontSize:16,
        alignSelf:'center'
    },
    importFromContactsIcon:{
        height: 35,
        width:50
    },
    addFromContactsContainer:{
        flexDirection: 'row',
        paddingLeft:15,
        paddingBottom:13,
        paddingTop:13

    }

});
export default styles;
