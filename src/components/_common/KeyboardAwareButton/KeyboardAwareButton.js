import React, {Component} from "react";
import {
    Text,
    TouchableOpacity,
    Animated,
    Keyboard,
    Dimensions
} from "react-native";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./style";
const {width, height} = Dimensions.get('window');

export default class KeyboardAwareButton extends Component{
    constructor(props){
        super(props);
        this.buttonY = new Animated.Value(0)
    }

    componentWillMount() {
		this.attachKeyboardListeners();
	}

	componentWillUnmount() {
		this.removeKeyboardListeners();
	}

	attachKeyboardListeners = () => {
		this.keyboardWillShowSub = Keyboard.addListener(
			"keyboardWillShow",
			this.keyboardWillShow
		);
		this.keyboardWillHideSub = Keyboard.addListener(
			"keyboardWillHide",
			this.keyboardWillHide
		);
	}

	removeKeyboardListeners = () => {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = event => {	
        // console.log('showing', event)
        if(event.startCoordinates.screenY !== event.endCoordinates.screenY){
            Animated.timing(this.buttonY, {
                duration: event.duration,
                toValue: (event.endCoordinates.height * -1) - (this.props.beginOnPage ? 0 : (height * 0.08)) // height of keyboard + height of button
            }).start();
        }
	};

	keyboardWillHide = event => {	
        // console.log('hiding', event)
        Animated.timing(this.buttonY, {
            duration: event.duration,
            toValue: 0
        }).start();
	};

    render(){
        let {
            title,
            onPress,
            disabled,
            beginOnPage,
            loading
        } = this.props;

        return(
            <Animated.View style={[styles.buttonBackground, beginOnPage && {bottom: 0}, {transform: [{ translateY: this.buttonY }]}]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                    activeOpacity={.5}
                    disabled={disabled}
                >
                    {loading ?
                    <LoadingSpinner/>    
                    :
                    <Text style={[styles.buttonText, disabled && {opacity: 0.8}]}>{title}</Text>
                    }
                </TouchableOpacity>
            </Animated.View>
        )
    }
}