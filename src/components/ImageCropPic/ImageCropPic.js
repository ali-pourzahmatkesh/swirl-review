import React, {Component} from "react";
import {Image, Text, View} from "react-native";
// var ImagePicker = NativeModules.ImageCropPicker;
import styles from "./style";
import ImagePicker from "react-native-image-crop-picker";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
export default class ImageCropPic extends Component {
    componentDidMount() {

    }

    crop = () => {
        ImagePicker.openCropper({
            path: this.props.imageSource,
            width: 300,
            height: 400
        }).then(image => {
            console.log(image);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={() => this.crop()}>{this.props.imageSource}</Text>
                <Image style={{ width: 300, height: 300, resizeMode: 'contain' }}
                       source={{ uri: this.props.imageSource }}/>
            </View>
        )
    }
}
