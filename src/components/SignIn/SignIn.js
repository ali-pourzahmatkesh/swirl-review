import React, { Component } from "react";
import {
	Animated,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	LayoutAnimation,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Modal,
	SectionList,
	ScrollView,
	ActivityIndicator
} from "react-native";

import { NavigationActions, SafeAreaView } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EmptyList from "../EmptyList";

import logo from "../../assets/images/logo_bigger.png";
import passwordIcon from "../../assets/images/passwordIcon.png";
// import mailIcon from "../../assets/images/mailIcon.png";
import phoneIcon from "../../assets/images/phoneIcon.png";
import SVGImage from "react-native-svg-image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import appCss from "../../../app.css";
import styles from "./style";
import { CONFIG } from "../../../config";

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
			outputRange: ["14%", "27%"]
		});

		this.logoHeight = new Animated.Value(100);
		this.logoHeightInterpolate = this.logoHeight.interpolate({
			inputRange: [0, 100],
			outputRange: ["16%", "28%"]
		});

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
					style={styles.countryCodeBox}
					color="#fef200"
				/>
			);
		} else {
			return (
				<TouchableOpacity
					style={styles.countryCodeBox}
					onPress={() => this.openModal()}
				>
					<View style={styles.countryCodeImageBox}>
						{flag.length > 0 ? (
							<SVGImage
								style={{ height: 30 }}
								source={{ uri: flag }}
								originWhitelist={["*"]}
							/>
						) : (
							<Image
								source={{ uri: flagCountry }}
								style={styles.countryCodeFlag}
							/>
						)}
					</View>
					<Text style={[appCss.defaultFontApp, styles.countryCode]}>
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
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				event.duration,
				LayoutAnimation.Types[event.easing]
			)
		);
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
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				event.duration,
				LayoutAnimation.Types[event.easing]
			)
		);
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
		let {
			username,
			password,

			//for modal
			cellphoneCountryCode,
			cellphone,
			countryCodeGroup,
			searchValue
		} = this.state;
		let { isLoadingFetch } = this.props;

		return (
			<SafeAreaView style={styles.container}>
				<Modal
					visible={this.state.modalVisible}
					animationType={"fade"}
					transparent={true}
					onRequestClose={() => this.closeModal()}
				>
					<SafeAreaView style={styles.modalContainer}>
						<View style={styles.modalHeader}>
							<TouchableOpacity
								style={styles.modalOptions}
								onPress={() => this.closeModal("SignInPassword")}
							>
								<MaterialCommunityIcons
									style={styles.backButton}
									size={20}
									color="#fff"
									name="window-close"
								/>
							</TouchableOpacity>
							<View style={styles.searchContainer}>
								<View style={styles.SectionStyle}>
									<Feather
										style={styles.imageStyle}
										size={15}
										color="#fff"
										name="search"
									/>
									<TextInput
										style={styles.searchTextInput}
										placeholderTextColor="#fff"
										placeholder="Country Name"
										value={searchValue}
										onChangeText={text => this.searchCountry(text)}
										underlineColorAndroid="transparent"
										autoCorrect={false}
									/>
								</View>
							</View>
							<View style={styles.modalOptions} />
						</View>
						<View style={{ flex: 1 }}>
							<SectionList
								sections={countryCodeGroup}
								extraData={countryCodeGroup}
								keyExtractor={(item, index) => index}
								ListEmptyComponent={() => <EmptyList />}
								renderItem={({ item }) => (
									<TouchableOpacity
										style={styles.sectionItems}
										onPress={() => this.handlePressItemCountry(item)}
									>
										<View style={styles.countryCodeImageBox}>
											<SVGImage
												style={{ height: 30 }}
												source={{ uri: item.flag }}
												originWhitelist={["*"]}
											/>
										</View>
										<Text
											style={[appCss.defaultFontApp, styles.countryCodeSearch]}
										>
											+ {item.callingCodes[0]}
										</Text>
										<Text
											style={[appCss.defaultFontApp, styles.countryNameSearch]}
											numberOfLines={1}
											ellipsizeMode="tail"
										>
											{item.name}
										</Text>
									</TouchableOpacity>
								)}
								renderSectionHeader={({ section }) => (
									<View style={styles.sectionHeader}>
										<Text
											style={[appCss.defaultFontApp, styles.sectionHeaderTitle]}
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
					<Animated.View
						style={[
							styles.imageContainer,
							{ height: this.logoHeightInterpolate }
						]}
					>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo} />
						</View>
					</Animated.View>
					<Animated.View style={{ opacity: this.connectOpacity }}>
						<Animated.Text
							style={[styles.connectText, { fontSize: this.connectFontSize }]}
						>
							Let's Connect!
						</Animated.Text>
					</Animated.View>
					<View style={styles.formInputContainer}>
						<View
							style={[
								styles.iconFormInput,
								{ paddingLeft: 0, paddingBottom: 0, paddingTop: 0 }
							]}
						>
							{this.state.countryCodeVisible ? (
								this.renderCountryCodes()
							) : (
								<Image
									style={[
										styles.formInputIcon,
										{ marginLeft: 10, marginTop: 8, height: "60%" }
									]}
									source={phoneIcon}
								/>
							)}
							<TextInput
								style={[
									appCss.defaultFontApp,
									styles.textInput,
									{ marginBottom: 12, marginTop: 10 }
								]}
								placeholder="Phone Number"
								placeholderTextColor="#fff"
								keyboardType="number-pad"
								onChangeText={cellphone => this.setState({ cellphone })}
								onFocus={this.handlePhoneFieldFocus}
								// onPress={this.handlePhoneFieldFocus}
								onBlur={this.handlePhoneFieldBlur}
							/>
						</View>

						<View style={styles.iconFormInput}>
							<Image style={styles.formInputIcon} source={passwordIcon} />
							<TextInput
								style={styles.textInput}
								placeholder="Password"
								placeholderTextColor={colors.tapeWhite}
								secureTextEntry={true}
								onFocus={() =>
									this.props.navigation.setParams({
										curScreen: "Login",
										nextScreen: "Signup",
										rightNav: "SignUpScreen"
									})
								}
								onBlur={() =>
									this.props.navigation.setParams({
										curScreen: "",
										nextScreen: ""
									})
								}
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
					<Text style={styles.loginText}>Login</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}
