import React, {Component} from "react";
import {Text, TouchableOpacity, View, Animated} from "react-native";
import styles from "./style";
import Avatar from '../Avatar';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const {animationDuration : ANIMATION_DURATION} = CONFIG;

export default class MessagePopup extends Component {
    state = {
        _animated: new Animated.Value(0),
    };
    componentDidMount() {

        Animated.timing(this.state._animated, {
            toValue: 1,
            duration: ANIMATION_DURATION,
        }).start();
        setTimeout(()=>{
            Animated.timing(this.state._animated, {
                toValue: 0,
                duration: ANIMATION_DURATION,
            }).start(() => this.props.callbackPopup());

        },CONFIG.popupTime)
    }
    render() {
        const { popupUserName, popupDesc, callbackPopup, userId} = this.props;
        const rowStyles = [
            {
                opacity: this.state._animated.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
            },
        ];
        return (

            <Animated.View  style={[rowStyles,styles.container]}>
                <View style={styles.hideMobileInfoBox}>
                    {/*<View style={styles.hideMobileInfo}/>*/}
                </View>
                <View style={styles.header}>
                    <View style={styles.headerIconBox}>

                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Avatar userId={userId} size={45} />

                        <Text style={styles.text}>
                            <Text style={{fontWeight:'bold', marginRight:5}}>{popupUserName} </Text>{popupDesc}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => callbackPopup()}
                    >
                        <MaterialIcons size={25} color={colors.grayColor} name="close"/>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}

