import {StyleSheet} from 'react-native';
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },

    actionBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10
    },

    actionBtn:{
        width: 45,
        height: 45,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 10
    },
    verify:{
        backgroundColor: "#4CD964",
    },
    cancel:{
        backgroundColor: colors.highlightColorTwo,
    },
    actionIcon:{
        width: 20,
        height: 20
        // height: '100%',
        // width: '100%'
    }
});

export default styles;