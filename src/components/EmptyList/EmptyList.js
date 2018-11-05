import React, {Component} from "react";
import logo from '../../assets/images/logo_bigger.png';
import { StyleSheet, Image, View, Dimensions, Text} from "react-native";
const {width, height} = Dimensions.get('window');
import appCss from "../../../app.css";
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
            <View style={appCss.emptyList}>
                <Image style={appCss.emptyIcon} source={this.props.emptyIcon} />
                <Text style={appCss.emptyListText}>
                    {this.props.emptyText}
                </Text>
            </View>

        )
    }
}
