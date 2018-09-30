import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import appCss from "../../../app.css";
import styles from "./style";
import {CONFIG} from "../../../config";
const COLORS = CONFIG.colors;


export default class Header extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <View style={[appCss.header, this.props.containerStyle]}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={styles.backArrow}
                >    
                    <Ionicons
                        size={25}
                        color={COLORS.tapeDarkGrey}
                        name='ios-arrow-back'
                    />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, this.props.titleStyle]}>{this.props.title}</Text>
                <TouchableOpacity
                    style={styles.rightButton}
                    onPress={this.props.rightButtonOnPress}
                    disabled={this.props.rightButtonDisable}
                >
                    <Text style={[styles.rightText, this.props.rightTextStyle, this.props.rightButtonDisable && {opacity: .5}]}>{this.props.rightButtonText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}