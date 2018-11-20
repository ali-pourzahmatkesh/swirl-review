import React, {Component} from "react";
import logo from '../../assets/images/logo1.png';
import { StyleSheet, Image, View, Dimensions, Text} from "react-native";
import {CONFIG} from "./../../../config";
import appCss from "../../../app.css";
const {width, height} = Dimensions.get('window');
const colors = CONFIG.colors;
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: 'transparent',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
    // exportPic: {
    //     flex: 1,
    //     width: width / 4,
    //     height: width / 4,
    // },
});


export default class EmptyList extends Component {
    render() {
        let {
            textStyle,
            containerStyle,
            emptyText,
            emptyIcon
        } = this.props;

        return (
            <View style={[appCss.emptyList, containerStyle]}>
                <Image style={appCss.emptyIcon} source={emptyIcon} />
                <Text style={[appCss.emptyListText, textStyle]}>
                    {emptyText}
                </Text>
            </View>

        )
    }
}
