import React, {Component} from "react";
import {
    Image,
    KeyboardAvoidingView,
	View,
	Dimensions
} from "react-native";

import {NavigationActions, SafeAreaView} from "react-navigation";
import KeyboardAwareButton from "../_common/KeyboardAwareButton";
import BubbleInput from "../_common/BubbleInput";

import passwordIcon from "../../assets/images/icons/password3.png";
import logo from "../../assets/images/logo_bigger.png";
import appCss from "../../../app.css";
import styles from "./style";
import {CONFIG} from "../../../config";

const colors = CONFIG.colors;
const {width, height} = Dimensions.get('window');

export default class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			reEnterPassword: ""
		};
	}

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
		let nextDisabled = true;
		if (
			this.state.password === this.state.reEnterPassword &&
			this.state.password.length >= 7
		) {
			nextDisabled = false;
		}

		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={height * 0.09 + 45}>
					<View style={ styles.imageContainer }>
						<Image style={styles.imageItem} source={logo}/>
					</View>
					<View style={appCss.formInputContainer}>
						<BubbleInput
							icon={passwordIcon}
							inputProps={{
								placeholder: "Password",
								secureTextEntry: true,
								onChangeText: password => this.setState({ password })
							}}
						/>

						<BubbleInput
							icon={passwordIcon}
							inputProps={{
								placeholder: "Re-enter Password",
								secureTextEntry: true,
								onChangeText: reEnterPassword => this.setState({ reEnterPassword })
							}}
						/>
					</View>
				</KeyboardAvoidingView>
				<KeyboardAwareButton
					title='Login'
					onPress={this.handleSubmit}
					disabled={nextDisabled}
					beginOnPage={true}
				/>
			</SafeAreaView>
		);
	}
}
