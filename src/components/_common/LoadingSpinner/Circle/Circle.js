import React, { Component } from "react";
import {
    View,
    Animated,
    Easing
} from "react-native"

import styles from "./style";

export default class Circle extends Component{
    constructor(props){
        super(props);
        this.rotation = new Animated.Value(0);
        
    }

    componentDidMount(){
        Animated.loop(
            Animated.timing(this.rotation, {
                // duration: 800,
                duration: 1500 / this.props.speed,
                toValue: 1,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ).start()
    }

    render(){
        let {
            radius,
            border,
            initialRotationOffset,
            degreesPastHalf
        } = this.props;
        let circleStyle = styles.getStyle({
            radius,
            border,
            degreesPastHalf
        });
        let rotationInterpolated = this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
        })

        return(
            <View style={{borderWidth: 0, position: 'absolute', transform: [{rotate: initialRotationOffset + 'deg'}]}}>
                <Animated.View style={[circleStyle.containingCircle, {transform: [{rotate: rotationInterpolated}]}]}>
                    <View style={circleStyle.halfContainer}>
                        <View style={circleStyle.halfFill}/>
                    </View>
                    <View style={circleStyle.topContainer}>
                        <View style={circleStyle.topFill}/>
                    </View>
                </Animated.View>
            </View>
        );
    }
}