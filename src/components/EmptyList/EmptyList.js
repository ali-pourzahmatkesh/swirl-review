import React, {Component} from "react";
import logo from '../../assets/images/logo_bigger.png';
import { StyleSheet, Image, View, Dimensions} from "react-native";
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'transparent',
        alignItems:'center',
        justifyContent:'center'
    },
    exportPic:{
        flex :1,
        width : width/4,
        height : width/4,
    }
});


export default class EmptyList extends Component {

    render() {
        return (
            <View style={styles.container}>

                <Image resizeMode={'contain'} style={[styles.exportPic, {opacity:0.5}]} source={logo}/>
            </View>
        )
    }
}
