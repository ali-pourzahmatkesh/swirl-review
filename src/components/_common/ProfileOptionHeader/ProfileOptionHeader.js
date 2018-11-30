import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";
const {width, height} = Dimensions.get('window');

export default class ProfileOptionHeader extends Component{
    render(){
        let {
            title,
            nav
        } = this.props;
        return(
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <TouchableOpacity style={styles.backButton} onPress={() => nav.goBack()}>
                        <Ionicons
                            style={{textAlign: 'center'}}
                            size={30}
                            color='white'
                            name="ios-arrow-back"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.titleText}>{title}</Text>
                <View style={{flex: 1}}/>
            </View>
        );
    }
}