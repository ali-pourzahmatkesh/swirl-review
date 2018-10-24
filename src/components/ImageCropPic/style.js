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

});
export default styles
