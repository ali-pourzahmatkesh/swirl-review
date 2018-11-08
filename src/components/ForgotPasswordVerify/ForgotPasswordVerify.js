import React, { Component } from "react";
import {
	Image,
	Text,
	View,
    KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import KeyboardAwareButton from "../_common/KeyboardAwareButton";
import CodeField from "react-native-confirmation-code-field";

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

	componentWillReceiveProps(nextProps){
		if(this.props.isLoadingFetch !== nextProps.isLoadingFetch && nextProps.hasError){
			this.refs.vcode.clear()
		}
	}

	toConfirm = () => {
		this.props.navigation.navigate("ChangePasswordScreen");
	};

	propsForCodeField = (index)=>{
        return {
            autoCorrect: false,
			returnKeyType: null,
			selectionColor: colors.appColor, // changes the caret/cursor/blinking line color
        }
	}

	onFulfill = code => {
		this.setState({
			code
		}, this.handleSubmit)
	}

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
		let {
			isLoadingFetch
		} = this.props;

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
						<CodeField
							ref='vcode'
							codeLength={4}
							autoFocus={true}
                            keyboardType='numeric'
							getInputStyle={() => styles.codeInput}
							getInputProps={this.propsForCodeField}
							onFulfill={this.onFulfill}
							onChangeCode={code => this.setState({code})}
						/>
					</View>
				</KeyboardAvoidingView>
				<KeyboardAwareButton
					title='Next'
					onPress={this.handleSubmit}
					disabled={nextDisabled}
					beginOnPage={true}
					loading={isLoadingFetch}
				/>
			</SafeAreaView>
		);
	}
}