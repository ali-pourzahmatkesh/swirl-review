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
        borderBottomEndRadius:30
    },
    sectionHeaderTitle:{
        color:colors.appColor
    },


    sectionItems:{
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }

});
export default styles;
