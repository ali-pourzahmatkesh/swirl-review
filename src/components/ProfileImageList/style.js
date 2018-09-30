import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageList: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    imageBox: {
        width: width / 3,
        height: width / 3,
        marginBottom: 1
    },
    imageItem: {
        width: undefined,
        height: undefined,
        flex: 1
    },

    modalBox: {
        flex: 1,
        backgroundColor: colors.appColor
    },
    modalHeader: {
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 10
    },
    modalImageBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalImage: {
        width: width,
        height: width,
    }
});

export default styles;