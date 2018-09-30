import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View, Animated} from "react-native";
import appCss from "../../../app.css";
import styles from "./style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
// are we specifying an animation duration in the config?
const {animationDuration : ANIMATION_DURATION} = CONFIG;

export default class Popup extends Component {
    constructor(props){
        super(props);
        this.state = {
            _animated: new Animated.Value(0),
        };
        this.animationEnd;
    }

    
    componentDidMount() {
        Animated.timing(this.state._animated, {
            toValue: 1,
            duration: ANIMATION_DURATION,
        }).start();

        this.animationEnd = setTimeout(()=>{
            Animated.timing(this.state._animated, {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }).start(() => this.props.popupCallback());
        }, CONFIG.popupTime);
    }

    // keeps the original ending timeout from running another animation end
    // when the popup is already closed. eliminated weird close timings 
    // if people switch between modes quickly
    handleClosePopUp = () => {
        clearTimeout(this.animationEnd);
        this.props.popupCallback()
    }

    render() {
        let {
            containerStyle
        } = this.props;

        // why is this [0, 1] --> [0, 1]?
        const rowStyles = [
            {
                opacity: this.state._animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
            },
        ];

        return (
            <Animated.View  style={[rowStyles, styles.container, containerStyle]}>
                <View style={styles.header}>
                    <View style={appCss.headerIconBox}>
                        <Image
                            style={appCss.headerIcon}
                            resizeMode={'contain'}
                            source={this.props.popupIcon}
                        />
                    </View>
                    <Text style={styles.text}>
                        {this.props.popupText}
                    </Text>
                    <TouchableOpacity
                        onPress={this.handleClosePopUp}
                    >
                        <MaterialIcons size={25} color={colors.grayColor} name="close"/>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}

