import React, { Component } from "react";
import {
    Image,
    KeyboardAvoidingView,
    View
} from "react-native";

import BubbleInput from "../_CommonComponents/BubbleInput";
import KeyboardAwareButton from "../_CommonComponents/KeyboardAwareButton";
import logo from "../../assets/images/logo1.png";
import {CONFIG} from "../../../config";
import styles from "./style";
const COLORS = CONFIG.colors;

export default class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cellphone: "",
			cellphoneCountryCode: '1',
			flag: "",
		};
	}

	handleSubmit = () => {
		this.props.sendVerifyCode({
			cellphoneCountryCode: this.state.cellphoneCountryCode,
			cellphone: this.state.cellphone,
			navigation: this.props.navigation
		});
	};

	render() {
		let inactive = this.state.cellphone.length !== 10;

		let {
			isLoadingFetch
		} = this.props;

		return (
			<View style={styles.container}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<View style={styles.imageContainer}>
						<Image style={styles.imageItem} source={logo}/>
					</View>
					<View style={styles.formInputContainer}>
						<BubbleInput
							phoneNumber={true}
							defaultCountryCode={this.state.cellphoneCountryCode}
							defaultFlag={this.state.flag}
							setCountryCode={
								countryCodeData=> {
									this.setState(countryCodeData)
								}
							}
							inputProps={{
								onChangeText: cellphone => this.setState({ cellphone }),
								autoFocus: true
							}}
						/>
					</View> 
					<KeyboardAwareButton
						title='Next'
						onPress={this.handleSubmit}
						disabled={inactive}
						loading={isLoadingFetch}
					/>
				</KeyboardAvoidingView>
			</View>
		);
	}
}