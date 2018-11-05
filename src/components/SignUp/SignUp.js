import React, { Component } from "react";
import {
    Text,
    TouchableOpacity,
	View,
	Animated,
	Keyboard,
	Dimensions,
} from "react-native";
import {SafeAreaView} from "react-navigation";
import KeyboardAwareButton from "../_common/KeyboardAwareButton";
import BubbleInput from "../_common/BubbleInput";

import logo from "../../assets/images/logo_bigger.png";
import usernameIcon from "../../assets/images/icons/profile3.png";
import passwordIcon from "../../assets/images/icons/password3.png";
import phoneIcon from "../../assets/images/icons/phone3.png";

import EmptyList from "../EmptyList";
import emptyIcon from "../../assets/images/icons/emptyCountry.png";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SVGImage from "react-native-svg-image";
import appCss from "../../../app.css";
import styles from "./style";
import { CONFIG } from "../../../config";
import LoadingCircles3 from "../../components/LoadingCircles3";

// import moment from "moment";

const colors = CONFIG.colors;
const { width, height } = Dimensions.get("window");

export default class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			reEnterPassword: "",

			//for country code modal
			cellphoneCountryCode: "",
			cellphone: "",
			flag: "",
		};

		this.logoSize = new Animated.Value(80);
		this.bottomPadding = new Animated.Value(0);
		this.buttonAndTextOpacity = new Animated.Value(1);
		this.formHeight = new Animated.Value(.66);
		this.logoY = new  Animated.Value(0);
	}

	handleSubmit = () => {
        const resetAction =  this.props.navigation.navigate('SignUpAddFriendScreen');
		this.props.sendUser({
			user: {
				username: this.state.username,
				cellphone: this.state.cellphone,
				cellphoneCountryCode: this.state.cellphoneCountryCode,
				password: this.state.password
			},
			navigation: this.props.navigation,
			resetAction: resetAction
		});
	};

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

	keyboardWillShow = e => {
		if(e.startCoordinates.screenY !== e.endCoordinates.screenY){
			Animated.parallel([
				Animated.timing(this.logoSize, {
					duration: e.duration,
					toValue: 30
				}),
				Animated.timing(this.bottomPadding, {
					duration: e.duration,
					toValue: e.endCoordinates.height + (height * 0.08) + 150
				}),
				Animated.timing(this.buttonAndTextOpacity, {
					duration: e.duration,
					toValue: 0
				}),
				Animated.timing(this.formHeight, {
					duration: e.duration,
					toValue: e.endCoordinates.height + (height * 0.4) + 25
				}),
				Animated.timing(this.logoY, {
					duration: e.duration,
					toValue: 0
				})
			]).start();
		}
	}

	keyboardWillHide = e => {
		Animated.parallel([
			Animated.timing(this.logoSize, {
				duration: e.duration,
				toValue: 80
			}),
			Animated.timing(this.bottomPadding, {
				duration: e.duration,
				toValue: 0
			}),
			Animated.timing(this.buttonAndTextOpacity, {
				duration: e.duration,
				toValue: 1
			}),
			Animated.timing(this.formHeight, {
				duration: e.duration,
				toValue: height * 0.66
			}),
			Animated.timing(this.logoY, {
				duration: e.duration,
				toValue: 45
			})
		]).start();
	}

	componentWillUnmount() {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
	}

	render() {
		let {
			username,
			password,
			reEnterPassword,
			cellphoneCountryCode,
			cellphone,
		} = this.state;

		let { isLoadingFetch } = this.props;
		let signUpDisabled = false;

		if (
			username === "" ||
			password.length < 7 ||
			reEnterPassword !== password ||
			isLoadingFetch ||
			cellphoneCountryCode.length === 0 ||
			cellphone.length !== 10
		) {
			signUpDisabled = true;
		}
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<TouchableOpacity
						style={styles.headerSections}
						onPress={() => {this.props.navigation.goBack()}}>
						<Text style={[styles.headerText, {
							color: colors.tapeWhite,
							fontFamily: 'MuseoSansRounded-500',
							fontSize: 14					
						}]}>
							Login
						</Text>
					</TouchableOpacity>
					<View style={styles.headerSections}>
						<Animated.Text
							style={[styles.headerText, {
								color: colors.tapeWhite,
								fontFamily: "MuseoSansRounded-900",
								fontSize: 17,
								opacity: this.buttonAndTextOpacity
							}]}
						>
							Signup
						</Animated.Text>
					</View>
					<View style={{flex: 1}}/>
				</View>
				
				<Animated.View style={{ flex: 1, borderWidth: 0 }} behavior="padding">
					<View style={styles.imageContainer}>
						<Animated.Image style={[styles.imageItem, {
							height: this.logoSize,
							transform: [
								{
									translateY: this.logoY
								}
							]
						}]} source={logo}/>
					</View>
					<Animated.View style={[styles.formInputContainer, {height: this.formHeight}]}>
						<BubbleInput
							icon={passwordIcon}
							inputProps={{
								autoFocus:true,
								placeholder: "Username",
								onChangeText: username => this.setState({ username })
							}}
						/>

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
								onChangeText: cellphone => this.setState({ cellphone })
							}}
						/>

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
						<Animated.View style={{ width: '100%', opacity: this.buttonAndTextOpacity }}>
							<TouchableOpacity
								style={{ width: '100%', alignItems:'center',paddingTop:30, paddingBottom:30}}
								onPress={() => this.props.navigation.navigate('TermsAndConditionsScreen')}
							>
								<Text style={styles.textSignup}>By signing up you agree to the <Text style={styles.bolderSignup}>terms of use</Text></Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.signUpButton]}
								onPress={this.handleSubmit}
								disabled={signUpDisabled}
							>
								<Text style={[ styles.signUpText, signUpDisabled && { opacity: 0.8 } ]}>
									Sign Up
								</Text>
							</TouchableOpacity>
						</Animated.View>
					</Animated.View>
				</Animated.View>
				<KeyboardAwareButton
					title='Sign Up'
					onPress={this.handleSubmit}
					disabled={signUpDisabled}
				/>
			</SafeAreaView>
		);
	}
}
