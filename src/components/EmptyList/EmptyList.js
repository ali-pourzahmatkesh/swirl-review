import React, {Component} from "react";
import exportPic from '../../assets/images/export.png';
import { StyleSheet, Image, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems:'center',
        justifyContent:'center'
    },
    exportPic:{
        flexBasis :1,
        resizeMode: 'contain',
        width : '50%',
    }
});


export default class EmptyList extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.exportPic} source={exportPic}/>
            </View>
        )
    }
}
