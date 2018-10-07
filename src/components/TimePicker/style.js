import {StyleSheet, Dimensions} from 'react-native';
const {  width } = Dimensions.get('window');
import {CONFIG} from '../../../config';
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.appColor,
        width,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor:'green',
        height:'100%',
        position: 'absolute', width,
        //
    },
    backPicker:{
        height:111,
        width,
        backgroundColor:colors.bodyColor,
        opacity:0.3
    },
    picker: {
        height:'100%',
        width: 100,
    },
    pickerItem: {
        height:'100%',
        color: colors.bodyColor,
        fontSize: 64,
        fontWeight: 'bold'

    },
    timeDivider: {
        color: colors.bodyColor,
        fontSize: 64,
        fontWeight: 'bold'
    }
});

export default styles
