import React, {Component} from "react";
import {Dimensions, Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from "react-native";
import logo from "../../assets/images/logo_bigger.png";
import passwordIcon from "../../assets/images/icons/Lock.png";
import appCss from "../../../app.css";
import styles from "./style";
import {CONFIG} from "../../../config";
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
				<KeyboardAvoidingView keyboardVerticalOffset={height === 812? 85: 65} style={{ flex: 1 }}
									  behavior="padding">
					<View
						style={
                            styles.imageContainer
                        }
					>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo}/>
						</View>
					</View>
					<View style={[ appCss.formInputContainer ]}>
						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={passwordIcon}/>
							<TextInput
								placeholder="Old Password"
								placeholderTextColor={colors.combinatorialColor}
								secureTextEntry={true}
								style={appCss.textInput}
								onChangeText={text => this.setState({ oldPassword: text })}
							/>
						</View>
						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={passwordIcon}/>
							<TextInput
								placeholder="New Password"
								placeholderTextColor={colors.combinatorialColor}
								secureTextEntry={true}
								style={appCss.textInput}
								onChangeText={text => this.setState({ newPassword: text })}
							/>
						</View>
						<Text style={styles.minLengthText}>min 7 characters</Text>
						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={passwordIcon}/>
							<TextInput
								placeholder="Re-enter Password"
								placeholderTextColor={colors.combinatorialColor}
								secureTextEntry={true}
								style={appCss.textInput}
								onChangeText={text => this.setState({ retypeNewPassword: text })}
							/>
						</View>
					</View>
					<TouchableOpacity
						style={[ styles.nextButton ]}
						onPress={this.handleSubmit}
						disabled={nextDisabled}
					>
						<Text style={[ styles.nextText, !nextDisabled && { opacity: 0.5 } ]}>save</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
		);
	}
}
