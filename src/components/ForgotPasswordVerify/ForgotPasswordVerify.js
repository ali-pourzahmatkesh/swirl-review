import React, { Component } from "react";
import {
	Image,
	Text,
	View,
    KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import KeyboardAwareButton from "../_common/KeyboardAwareButton";
import CodeInput from "react-native-confirmation-code-input";

import logo from "../../assets/images/logo_bigger.png";

import appCss from "../../../app.css";
import styles from "./style";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;

export default class ForgotPasswordVerify extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: ""
		};
	}

	toConfirm = () => {
		this.props.navigation.navigate("ChangePasswordScreen");
	};

	handleSubmit = () => {
		this.props.updateCodeGetUser({
			cellphoneCountryCode: this.props.navigation.state.params
				.cellphoneCountryCode,
			cellphone: this.props.navigation.state.params.cellphone,
			navigation: this.props.navigation,
			verifyCode: parseInt(this.state.code)
		});
	};

	render() {
		let nextDisabled = false;
		if (this.state.code.length !== 4) {
			nextDisabled = true;
		}

		return (
			<SafeAreaView style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<View style={ styles.imageContainer }>
						<Image style={styles.imageItem} source={logo}/>
					</View>

					<View style={styles.formInputContainer}>
						<Text style={styles.promptText}>
							Please enter the verification code
						</Text>
						<CodeInput
							ref="vcode"
							className="border-b"
							codeInputStyle={[appCss.defaultFontApp, styles.codeInput]}
							codeLength={4}
							keyboardType="numeric"
							onFulfill={(isMatching, code) => {
								
							}}
							returnKeyType={null}
							// The CodeInput has a returnKeyType automatically set to 'done'.
							// Setting it to null here to keep a consistent look.
							size={65}
							onContentSizeChange={() =>
								this.setState({ code: this.refs.vcode.state.codeArr.join("") })
							}
						/>
					</View>
				</KeyboardAvoidingView>
				<KeyboardAwareButton
					title='Next'
					onPress={this.handleSubmit}
					disabled={nextDisabled}
					beginOnPage={true}
				/>

			</SafeAreaView>
		);
	}
}