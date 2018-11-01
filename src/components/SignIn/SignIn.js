import React, { Component } from "react";
import {
	ActivityIndicator,
	Animated,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	LayoutAnimation,
	Modal,
	SectionList,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";

import { NavigationActions, SafeAreaView } from "react-navigation";
import EmptyList from "../EmptyList";

import logo from "../../assets/images/logo_bigger.png";
import passwordIcon from "../../assets/images/icons/Lock.png";
import phoneIcon from "../../assets/images/icons/phone.png";
import SVGImage from "react-native-svg-image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import appCss from "../../../app.css";
import styles from "./style";
import { CONFIG } from "../../../config";
import LoadingCircles3 from "../../components/LoadingCircles3";

const colors = CONFIG.colors;

export default class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bottom: -100,
			cellphone: "",
			password: "",
			cellphoneCountryCode: "",

			//for country code modal
			modalVisible: false,
			countryCodeVisible: false,
			flagCountry: "",
			countries: [],
			flag: "",
			searchValue: ""
		};

		this.connectFontSize = new Animated.Value(35);
		this.connectOpacity = new Animated.Value(1);
		this.forgotPassMargin = new Animated.Value(100);
		this.forgotPassMarginInterpolate = this.forgotPassMargin.interpolate({
			inputRange: [0, 100],
			outputRange: ["2%", "27%"]
		});

		this.logoHeight = new Animated.Value(100);
		// this.logoHeightInterpolate = this.logoHeight.interpolate({
		// 	inputRange: [0, 100],
		// 	outputRange: ["16%", "28%"]
		// });

		this.loginButtonBottom = new Animated.Value(-100);
	}

	componentDidMount() {
		this.props.getIpData();
	}

	componentWillReceiveProps(nextProps) {
		if (
			(nextProps.ipData["calling_code"] &&
				this.state.cellphoneCountryCode !== nextProps.ipData["calling_code"]) ||
			(nextProps.ipData["flag"] &&
				this.state.flagCountry !== nextProps.ipData["flag"]) ||
			(nextProps.countries &&
				nextProps.countries.length !== this.state.countries.length)
		) {
			let countryCodeGroup = [];
			if (nextProps.countries.length > 0) {
				countryCodeGroup = this.generateSectionList(nextProps.countries);
			}
			let cellphoneCountryCode = this.state.cellphoneCountryCode;
			if (cellphoneCountryCode.length === 0) {
				cellphoneCountryCode = nextProps.ipData["calling_code"];
			}
			this.setState({
				cellphoneCountryCode,
				flagCountry: nextProps.ipData["flag"],
				countries: nextProps.countries,
				countryCodeGroup
			});
		}
	}

	generateSectionList = array => {
		let list = { letters: [] };
		array.forEach(item => {
			let itLetter = item["alpha2Code"].substring(0, 1).toUpperCase();
			if (!(itLetter in list)) {
				list[itLetter] = [];
				list.letters.push(itLetter);
			}
			list[itLetter].push(item);
		});
		list.letters = list.letters.sort();
		let countryCodeGroup = [];

		list.letters.forEach(item => {
			countryCodeGroup.push({
				title: item,
				data: list[item]
			});
		});
		return countryCodeGroup;
	};

	openModal() {
		this.setState({ modalVisible: true }, () => {
			if (this.state.countries.length) return;
			this.props.getCountries();
		});
	}

	closeModal = () => {
		this.setState({ modalVisible: false });
	};

	searchCountry = text => {
		let countries = [...this.state.countries];
		let filterCountry = countries.filter(item => {
			if (item && item["name"].includes(text)) {
				return item;
			}
		});
		let countryCodeGroup = this.generateSectionList(filterCountry);
		this.setState({ countryCodeGroup, searchValue: text });
	};

	handlePhoneFieldFocus = () => {
		this.setState({
			countryCodeVisible: true
		});
	};

	handlePhoneFieldBlur = () => {
		this.setState({
			countryCodeVisible: false
		});
	};

	renderCountryCodes = () => {
		let { cellphoneCountryCode, flagCountry, flag } = this.state;
		if (cellphoneCountryCode.length === 0 || flagCountry.length === 0) {
			return (
				<ActivityIndicator
					size={1}
					style={appCss.countryCodeBox}
					color={colors.combinatorialColor}
				/>
			);
		} else {
			return (
				<TouchableOpacity
					style={appCss.countryCodeBox}
					onPress={() => this.openModal()}
				>
					<View style={appCss.countryCodeImageBox}>
						{flag.length > 0 ? (
							<SVGImage
								style={appCss.countryFlagSvg}
								source={{ uri: flag }}
								originWhitelist={["*"]}
							/>
						) : (
							<Image
								source={{ uri: flagCountry }}
								style={appCss.countryCodeFlag}
							/>
						)}
					</View>
					<Text style={[appCss.defaultFontApp, appCss.countryCode]}>
						+ {cellphoneCountryCode}
					</Text>
				</TouchableOpacity>
			);
		}
	};

	handlePressItemCountry = item => {
		this.setState({
			cellphoneCountryCode: item.callingCodes[0],
			modalVisible: false,
			flag: item.flag
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

	componentWillUnmount() {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
	}

	keyboardWillShow = event => {
		LayoutAnimation.configureNext({
			duration: event.duration,
			create: {
				type: LayoutAnimation.Types.easeInEaseOut,
				property: LayoutAnimation.Properties.opacity
			},
			update: { type: LayoutAnimation.Types.easeInEaseOut }
		});
		this.setState({
			bottom: event.endCoordinates.height
		});

		Animated.parallel([
			Animated.timing(this.connectFontSize, {
				duration: event.duration,
				toValue: 1
			}),
			Animated.timing(this.connectOpacity, {
				duration: event.duration,
				toValue: 0
			}),
			Animated.timing(this.forgotPassMargin, {
				duration: event.duration,
				toValue: 0
			}),
			Animated.timing(this.logoHeight, {
				duration: event.duration,
				toValue: 0
			})
		]).start();
	};

	keyboardWillHide = event => {
		LayoutAnimation.configureNext({
			duration: event.duration,
			create: {
				type: LayoutAnimation.Types.easeInEaseOut,
				property: LayoutAnimation.Properties.opacity
			},
			update: { type: LayoutAnimation.Types.easeInEaseOut }
		});
		this.setState({
			bottom: -100
		});
		Animated.parallel([
			Animated.timing(this.connectFontSize, {
				duration: event.duration,
				toValue: 35
			}),
			Animated.timing(this.connectOpacity, {
				duration: event.duration,
				toValue: 1
			}),
			Animated.timing(this.forgotPassMargin, {
				duration: event.duration,
				toValue: 100
			}),
			Animated.timing(this.logoHeight, {
				duration: event.duration,
				toValue: 100
			})
		]).start();
	};

	handleSubmit = () => {
		// Keyboard.dismiss()
		//  ^do we actually need this line?
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: "HomeStack" })],
			key: null
		});
		this.props.sendPassword({
			password: this.state.password,
			cellphone: this.state.cellphone,
			cellphoneCountryCode: this.state.cellphoneCountryCode,
			navigation: this.props.navigation,
			resetAction
		});
	};

	render() {
		let { countryCodeGroup, searchValue } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				<Modal
					visible={this.state.modalVisible}
					animationType={"fade"}
					transparent={true}
					onRequestClose={() => this.closeModal()}
				>
					<SafeAreaView style={appCss.modalContainer}>
						<View style={appCss.modalHeader}>
							<TouchableOpacity
								style={appCss.modalOptions}
								onPress={() => this.closeModal("SignInPassword")}
							>
								<MaterialCommunityIcons
									style={styles.backButton}
									size={20}
									color="#fff"
									name="window-close"
								/>
							</TouchableOpacity>
							<View style={appCss.searchContainer}>
								<View style={appCss.SectionStyle}>
									<Feather
										style={appCss.imageStyle}
										size={15}
										color="#fff"
										name="search"
									/>
									<TextInput
										style={appCss.searchTextInput}
										placeholderTextColor="#fff"
										placeholder="Country Name"
										value={searchValue}
										onChangeText={text => this.searchCountry(text)}
										underlineColorAndroid="transparent"
										autoCorrect={false}
									/>
								</View>
							</View>
							<View style={appCss.modalOptions} />
						</View>
						<View style={{ flex: 1 }}>
							<SectionList
								sections={countryCodeGroup}
								extraData={countryCodeGroup}
								keyExtractor={(item, index) => index}
								ListEmptyComponent={() => <EmptyList />}
								renderItem={({ item }) => (
									<TouchableOpacity
										style={appCss.sectionItems}
										onPress={() => this.handlePressItemCountry(item)}
									>
										<View style={appCss.countryCodeImageBox}>
											<SVGImage
												style={appCss.countryFlagSvg}
												source={{ uri: item.flag }}
												originWhitelist={["*"]}
											/>
										</View>
										<Text
											style={[appCss.defaultFontApp, appCss.countryCodeSearch]}
										>
											+ {item.callingCodes[0]}
										</Text>
										<Text
											style={[appCss.defaultFontApp, appCss.countryNameSearch]}
											numberOfLines={1}
											ellipsizeMode="tail"
										>
											{item.name}
										</Text>
									</TouchableOpacity>
								)}
								renderSectionHeader={({ section }) => (
									<View style={appCss.sectionHeader}>
										<Text
											style={[appCss.defaultFontApp, appCss.sectionHeaderTitle]}
										>
											{section.title}
										</Text>
									</View>
								)}
							/>
						</View>
					</SafeAreaView>
				</Modal>

				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
					<View style={styles.imageContainer}>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo} />
						</View>
					</View>
					<View style={appCss.formInputContainer}>
						<View
							style={[
								appCss.iconFormInput,
								{ paddingLeft: 0, paddingBottom: 0, paddingTop: 0 }
							]}
						>
							{this.state.countryCodeVisible ? (
								this.renderCountryCodes()
							) : (
								<Image
									style={[
										appCss.formInputIcon,
										{ marginLeft: 10, marginTop: 8, height: "60%" }
									]}
									source={phoneIcon}
								/>
							)}
							<TextInput
								style={[
									appCss.defaultFontApp,
									appCss.textInput,
									{ marginBottom: 12, marginTop: 10 }
								]}
								placeholder="Phone Number"
								placeholderTextColor={colors.combinatorialColor}
								keyboardType="number-pad"
								onChangeText={cellphone => this.setState({ cellphone })}
								// onFocus={this.handlePhoneFieldFocus}
								onFocus={() => {
									this.props.navigation.setParams({
										curScreen: "Login",
										nextScreen: "Signup",
										rightNav: "SignUpScreen"
									});

									this.handlePhoneFieldFocus();
								}}
								// onPress={this.handlePhoneFieldFocus}
								onBlur={() => {
									this.handlePhoneFieldBlur();
								}}
							/>
						</View>

						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={passwordIcon} />
							<TextInput
								style={appCss.textInput}
								placeholder="Password"
								placeholderTextColor={colors.combinatorialColor}
								secureTextEntry={true}
								onFocus={() => {
									this.props.navigation.setParams({
										curScreen: "Login",
										nextScreen: "Signup",
										rightNav: "SignUpScreen"
									});
								}}
								onBlur={() => {
									this.props.navigation.setParams({
										curScreen: "",
										nextScreen: ""
									});
								}}
								onChangeText={text => this.setState({ password: text })}
							/>
						</View>
						<TouchableOpacity
							style={{ alignSelf: "flex-end" }}
							onPress={() =>
								this.props.navigation.navigate("ForgotPasswordScreen")
							}
						>
							<Animated.Text
								style={[
									styles.forgotPassword,
									{ marginTop: this.forgotPassMarginInterpolate }
								]}
							>
								Forgot Password
							</Animated.Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate("SignUpScreen")}
				>
					<Text style={styles.signUpText}>Don't have an account? Signup</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.loginButton, { bottom: this.state.bottom }]}
					onPress={this.handleSubmit}
				>
					{this.props.loading ? (
						<LoadingCircles3 />
					) : (
						<Text style={styles.loginText}>Login</Text>
					)}
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}
