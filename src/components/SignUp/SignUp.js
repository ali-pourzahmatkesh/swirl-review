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
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import BubbleInput from "../_common/BubbleInput";
import KeyboardAwareButton from "../_common/KeyboardAwareButton";

import logo from "../../assets/images/logo1.png";
import usernameIcon from "../../assets/images/icons/profile3.png";
import passwordIcon from "../../assets/images/icons/password3.png";
import styles from "./style";
import { CONFIG } from "../../../config";

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
			cellphoneCountryCode: 1,
			cellphone: "",
			flag: "",
		};

		this.logoSize = new Animated.Value(80);
		this.bottomPadding = new Animated.Value(0);
		this.buttonAndTextOpacity = new Animated.Value(1);
		this.marginTop = new Animated.Value(0);
		this.logoY = new  Animated.Value(0);
	}

	handleSubmit = () => {
		// const resetAction =  this.props.navigation.navigate('SignUpAddFriendScreen');
		// todo: get rid of the resetAction stuff in this flow
		const resetAction = {};
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
		console.log(getBottomSpace(), 'bottooooooooom')
	}

	componentWillReceiveProps(nextProps){
		console.log('current props', this.props, 'next props', nextProps);
		if(
			Object.keys(this.props.userData).length === 0 &&
			Object.keys(nextProps.userData).length !== 0
		){
			this.props.navigation.navigate('SignUpAddFriendScreen');
		}
	}

	getEndHeight = () => {
		// basically there's a 'baseline size' of 35
		// we subtract ~580 to set the iphone SE as sort of the low end
		// then subtract a little extra from the iphone X line
		// result is multiplied to get an increasingly larger size 
		// on top of 35 as a function of height
		return ((height - 580 - (isIphoneX() ? 130 : 0)) * 0.4) + 35;
	}

	keyboardWillShow = e => {
		if(e.startCoordinates.screenY !== e.endCoordinates.screenY){
			Animated.parallel([
				Animated.timing(this.logoSize, {
					duration: e.duration,
					toValue: this.getEndHeight(height)
				}),
				Animated.timing(this.bottomPadding, {
					duration: e.duration,
					toValue: e.endCoordinates.height + (height * 0.08) + 150
				}),
				Animated.timing(this.buttonAndTextOpacity, {
					duration: e.duration,
					toValue: 0
				}),
				Animated.timing(this.marginTop, {
					duration: e.duration,
					// this is the height of the obscuring item (keyboard + button)
					// minus the item already under the form (bottom container, terms of use text + signup button)
					// minus the potential bottom space. should be 34 for iPhone X line and 0 for other ios devices
					// plus the usual top margin associated with form inputs
					toValue: (e.endCoordinates.height + (height * 0.08)) - (height * 0.3) - getBottomSpace() + 25
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
			Animated.timing(this.marginTop, {
				duration: e.duration,
				toValue: 0
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
				
				<Animated.View style={{ flex: 1, borderWidth: 0 }}>
					<View style={[styles.imageContainer, {borderWidth: 0}]}>
						<Animated.Image style={[styles.imageItem, {
							height: this.logoSize,
							// transform: [
							// 	{
							// 		translateY: this.logoY
							// 	}
							// ],
							borderWidth: 0
						}]} source={logo}/>
					</View>
					<Animated.View style={[styles.formInputContainer, { borderWidth: 0}]}>
						<BubbleInput
							icon={usernameIcon}
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
					</Animated.View>
					<Animated.View style={[styles.bottomContainer, { opacity: this.buttonAndTextOpacity, marginTop: this.marginTop }]}>
						<TouchableOpacity
							style={{ width: '100%', alignItems: 'center', paddingTop: 30, paddingBottom: 30}}
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
				<KeyboardAwareButton
					title='Sign Up'
					onPress={this.handleSubmit}
					disabled={signUpDisabled}
					loading={isLoadingFetch}
				/>
			</SafeAreaView>
		);
	}
}
