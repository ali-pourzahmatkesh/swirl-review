import React, {Component} from "react";
import {Image, TouchableOpacity} from "react-native";
import appCss from "../../../app.css";
export default class BottomNavButton extends Component{
    render(){
        let {
            onPress,
            iconSource,
            buttonStyle,
            iconStyle
        } = this.props;
        return(
            <TouchableOpacity
                style={[appCss.headerIconBox, buttonStyle]}
                onPress={onPress}
            >
                <Image
                    style={[appCss.headerIcon, iconStyle]}
                    resizeMode={'contain'}
                    source={iconSource}
                />
            </TouchableOpacity>
        )
    }
}