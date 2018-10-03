import React, {Component} from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    LayoutAnimation,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import {NavigationActions, SafeAreaView} from "react-navigation";

import passwordIcon from "../../assets/images/icons/Lock.png";
import logo from "../../assets/images/logo_bigger.png";
import appCss from "../../../app.css";
import styles from "./style";
import {CONFIG} from "../../../config";

const colors = CONFIG.colors;

export default class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bottom: 0,
			password: "",
			retypePassword: ""
		};
	}

	componentWillMount() {
		this.keyboardWillShowSub = Keyboard.addListener(
			"keyboardWillShow",
			this.keyboardWillShow
		);
		this.keyboardWillHideSub = Keyboard.addListener(
			"keyboardWillHide",
			this.keyboardWillHide
		);
	}

	componentWillUnmount() {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
	}

	keyboardWillShow = event => {
        LayoutAnimation.configureNext({
            duration: event.duration,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            update: { type: LayoutAnimation.Types.easeInEaseOut },
        });
		this.setState({
			bottom: event.endCoordinates.height
		});
	};

	keyboardWillHide = event => {
        LayoutAnimation.configureNext({
            duration: event.duration,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
            },
            update: { type: LayoutAnimation.Types.easeInEaseOut },
        });
		this.setState({
			bottom: 0
		});
	};

	handleSubmit = () => {
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: "WelcomeStack" })],
			key: null
		});
		this.props.changePassword({
			cellphone: this.props.navigation.state.params.cellphone,
			cellphoneCountryCode: this.props.navigation.state.params
				.cellphoneCountryCode,
			token: this.props.navigation.state.params.token,
			password: this.state.password,
			navigation: this.props.navigation,
			resetAction: resetAction
		});
	};

	render() {
		console.log(this.state, this.props.navigation.state.params);

		let nextDisabled = true;
		if (
			this.state.password === this.state.retypePassword &&
			this.state.password.length >= 7
		) {
			nextDisabled = false;
		}

		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<View
						style={
                            styles.imageContainer
                        }
					>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo}/>
						</View>
					</View>
					<View style={appCss.formInputContainer}>
						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={passwordIcon}/>
							<TextInput
								placeholder="New Password"
								placeholderTextColor={colors.combinatorialColor}
								secureTextEntry={true}
								style={appCss.textInput}
								onChangeText={text => this.setState({ password: text })}
							/>
						</View>
						{/*<Text style={styles.minLengthText}>min 7 characters</Text>*/}

						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={passwordIcon}/>
							<TextInput
								placeholder="Re-enter Password"
								placeholderTextColor={colors.combinatorialColor}
								secureTextEntry={true}
								style={appCss.textInput}
								onChangeText={text => this.setState({ retypePassword: text })}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
				<TouchableOpacity
					style={[styles.nextButton, { bottom: this.state.bottom }]}
					disabled={nextDisabled}
					onPress={this.handleSubmit}
				>
					<Text
						style={[
							appCss.defaultFontApp,
							styles.nextText,
							nextDisabled && { opacity: 0.5 }
						]}
					>
						Next
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}
