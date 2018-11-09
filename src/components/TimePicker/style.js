import {StyleSheet, Dimensions} from 'react-native';
const {  width } = Dimensions.get('window');
import {CONFIG} from '../../../config';
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container:{
        width,
        height: '100%',
        alignItems: 'center',
        borderWidth: 0
    },
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.tapeWhite,
        height: '100%',
        width: width * 0.9,
        height: '60%',
        borderRadius: 30,

        shadowOffset: {
            height: .75
        },
        shadowOpacity: .35,
        shadowRadius: 1.5,
    },
    backPicker: {
        height: 88,
        width: '100%',
        backgroundColor: colors.appColor,
        opacity: 0.1,
        position: 'absolute',
        left: 0
    },
    picker: {
        height: '100%',
        width: 100,
    },
    pickerItem: {
        height: '100%',
        color: colors.appColor,
        fontSize: 64,
        fontFamily: 'MuseoSansRounded-900'

    },
    timeDivider: {
        color: colors.appColor,
        fontSize: 64,
        fontFamily: 'MuseoSansRounded-900'
    },



    buttonContainer: {
        // flex: 1,
        height: '30%',
        width,
        alignItems: 'center',
    },
    buttonRow: {
        flex: 1,
        flexDirection: 'row',
        width: width * 0.9,
        // borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    quickTimeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.tapeWhite,
        width: '47%',
        height: '80%',
        // borderWidth: 1,
        borderRadius: 20,

        shadowOffset: {
            height: .75
        },
        shadowOpacity: .35,
        shadowRadius: 1.5,
    },
    quickTimeButtonText: {
        color: colors.appColor,
        fontSize: 30,
        fontFamily: 'MuseoSansRounded-900'
    }
});

export default styles
