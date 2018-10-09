import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View, ImageBackground} from "react-native";
import styles from "./style";
import close from "../../assets/images/icons/close_red.png";
import {CONFIG} from "../../../config";
import background from "../../assets/images/logo_bigger.png";
const colors = CONFIG.colors;
export default class MessageDetail extends Component {

    loadContent = () => {
        const { navigation } = this.props;
        const data = navigation.getParam('data');
        if( data && data[ 'postType' ] === 'text' ) {
            return this.loadTextContent(data)
        } else {
            return this.loadImageContent(data)
        }

    };

    loadImageContent = data => {
        console.log("data.imageContentName", data.imageContentName)
        return(
            <ImageBackground
                style={styles.cameraActionBox}
                resizeMode='cover'
                source={{uri:data['imageContentName']}}>
                <View style={styles.messageBoxHeader}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Image style={styles.closeIcon} source={close}/>
                    </TouchableOpacity>
                    <View/><View/>
                </View>
            </ImageBackground>
        )
    };

    loadTextContent = data => {
        return (
            <View style={styles.container}>
                <View style={styles.messageBox}>
                    <View style={styles.messageBoxHeader}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Image style={styles.closeIcon} source={close}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textInputBox}>
                        <Text>{data.textContent}</Text>
                    </View>
                </View>
            </View>
        )
    };

    render() {
        return this.loadContent()
    }
}
