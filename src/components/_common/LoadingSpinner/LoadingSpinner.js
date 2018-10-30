import React, { Component } from "react";
import {
    View,
    Dimensions
} from "react-native";
import Circle from "./Circle";
const {width, height} = Dimensions.get('window');

export default class LoadingSpinner extends Component{
    render(){
        let buttonHeight = height * 0.08;
        let maxRadius = buttonHeight / 2;
        return(
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                flex: 1
            }}>
                <Circle
                    radius={maxRadius * 0.35}
                    border={2}
                    initialRotationOffset={-120}
                    degreesPastHalf={40}
                    speed={2.4}
                />
                <Circle
                    radius={maxRadius * 0.55}
                    border={2}
                    initialRotationOffset={-80}
                    speed={1.2}                  
                />
                <Circle
                    radius={maxRadius * 0.75}
                    border={2}
                    initialRotationOffset={-130}
                    degreesPastHalf={50}
                    speed={1.8}
                />
            </View>
        );
    }
}