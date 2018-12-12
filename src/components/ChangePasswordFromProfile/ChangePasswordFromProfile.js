import React, { Component } from "react";
import {
	Dimensions,
	Image,
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Animated,
	Keyboard
} from "react-native";
import BubbleInput from "../_CommonComponents/BubbleInput";
import KeyboardAwareButton from "../_CommonComponents/KeyboardAwareButton";
import logo from "../../assets/images/logo1.png";
import passwordIcon from "../../assets/images/icons/password3.png";
import appCss from "../../../app.css";
import styles from "./style";
import { CONFIG } from "../../../config";
const { height } = Dimensions.get("window");
const colors = CONFIG.colors;

export default class ChangePasswordFromProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bottom: 0,
			oldPassword: "",
			newPassword: "",
			retypeNewPassword: ""
		};

		this.formHeight = new Animated.Value(height * 0.7);
		this.formTopPadding = new Animated.Value(height * 0.1);
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
	
	handleSubmit = () => {
		console.log("handleSubmit id", this.props.id);

		this.props.changePasswordFromProfile({
			id: this.props.id,
			newPassword: this.state.newPassword,
			oldPassword: this.state.oldPassword,
			navigation: this.props.navigation
		});
	};

	keyboardWillShow = event => {
		console.log('end height', event.endCoordinates.height)
		Animated.parallel([
			Animated.timing(this.formHeight, {
				duration: event.duration,
				toValue: height * 0.8
			}),
			Animated.timing(this.formTopPadding, {
				duration: event.duration,
				toValue: 0
			}),
		]).start();
	};

	keyboardWillHide = event => {
		Animated.parallel([
			Animated.timing(this.formHeight, {
				duration: event.duration,
				toValue: height * 0.7
			}),
			Animated.timing(this.formTopPadding, {
				duration: event.duration,
				toValue: height * 0.1
			}),
		]).start();
	};

	render() {
		console.log("render props", this.props);

		let nextDisabled = true;
		if (
			this.state.newPassword === this.state.retypeNewPassword &&
			this.state.newPassword.length >= 7 &&
			this.state.oldPassword.length >= 7
		) {
			nextDisabled = false;
		}

		return (
			<View style={styles.container}>
				{/* <KeyboardAvoidingView keyboardVerticalOffset={height === 812? 85: 65} style={{ flex: 1}} behavior="padding"> */}
				{/* <KeyboardAvoidingView keyboardVerticalOffset={height * 0.08 + 100} style={{ flex: 1}} behavior="padding"> */}
				<View style={{flex: 1}}>
					<View style={styles.imageContainer}>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo} />
						</View>
					</View>
					{/* <Animated.View style={[ appCss.formInputContainer, {borderWidth: 1, transform: [{translateY: height * 0.0}]} ]}> */}
					<Animated.View style={[styles.formInputContainer, {height: this.formHeight, paddingTop: this.formTopPadding}]}>
						<BubbleInput
							icon={passwordIcon}
							inputProps={{
								placeholder: 'Old Password',
								secureTextEntry: true,
								onChangeText: text => this.setState({ oldPassword: text })
							}}
						/>
						<BubbleInput
							icon={passwordIcon}
							inputProps={{
								placeholder: 'New Password',
								secureTextEntry: true,
								onChangeText: text => this.setState({ newPassword: text })
							}}
						/>
						<Text style={styles.minLengthText}>min 7 characters</Text>
						<BubbleInput
							icon={passwordIcon}
							inputProps={{
								placeholder: 'Re-enter Password',
								secureTextEntry: true,
								onChangeText: text => this.setState({ retypeNewPassword: text })
							}}
						/>
					</Animated.View>
					<KeyboardAwareButton
						title='Save'
						onPress={this.handleSubmit}
						disabled={nextDisabled}
						// beginOnPage={true}
						loading={this.props.isLoadingFetch}
					/>
				</View>
				{/* </KeyboardAvoidingView> */}
			</View>
		);
	}
}
