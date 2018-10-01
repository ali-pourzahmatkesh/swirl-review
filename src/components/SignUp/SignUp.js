import React, { Component } from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	Keyboard,
	Modal,
	SectionList,
	ScrollView,
	ActivityIndicator
} from "react-native";
import { SafeAreaView, NavigationActions } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import logo from "../../assets/images/logo_bigger.png";
import phoneIcon from "../../assets/images/phoneIcon.png";
import passwordIcon from "../../assets/images/passwordIcon.png";
import usernameIcon from "../../assets/images/usernameIcon.png";

import EmptyList from "../EmptyList";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SVGImage from "react-native-svg-image";
import appCss from "../../../app.css";
import styles from "./style";
import { CONFIG } from "../../../config";

// import moment from "moment";

const colors = CONFIG.colors;

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
			modalVisible: false,
			countryCodeVisible: false,
			flagCountry: "",
			countries: [],
			flag: "",
			searchValue: ""
		};
	}

	componentDidMount() {
		this.props.getIpData();
	}

	/* ************************************************************************************************************************* */
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

	/* ************************************************************************************************************************* */

	// handleDateChange = birthdate => {
	//     this.setState({
	//         birthdate,
	//         age: moment().diff(birthdate, 'years')
	//     })
	// }

	handlePressItemCountry = item => {
		this.setState({
			cellphoneCountryCode: item.callingCodes[0],
			modalVisible: false,
			flag: item.flag
		});
	};

	handleSubmit = () => {
		// if(this.state.age < 18){
		//     this.props.showToast('You must be 18 or older.')
		// }else{
		// }
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: "HomeStack",
					params: { signUp: true }
				})
			],
			key: null
		});
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

	render() {
		let {
			username,
			password,
			reEnterPassword,

			//for modal
			cellphoneCountryCode,
			cellphone,
			countryCodeGroup,
			searchValue
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

				<View style={styles.imagesContent}>
					<Image style={styles.imageItem} source={logo} />
				</View>
				<ScrollView
					contentContainerStyle={{ marginTop: "20%" }}
					keyboardShouldPersistTaps="handled"
					scrollEnabled={false}
				>
					<View style={[styles.formInputContainer]}>
						<View style={[styles.iconFormInput, { paddingLeft: 2 }]}>
							<Image
								style={[
									styles.formInputIcon,
									{
										height: "140%",
										width: "13%",
										resizeMode: "cover",
										marginLeft: 3
									}
								]}
								source={usernameIcon}
							/>
							<TextInput
								style={[styles.textInput, { paddingLeft: 13, paddingTop: 10 }]}
								placeholder="User Name"
								placeholderTextColor={colors.tapeWhite}
								autoCorrect={false}
								onChangeText={username => this.setState({ username })}
							/>
						</View>

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
								style={[styles.textInput]}
								placeholder="Password"
								placeholderTextColor={colors.tapeWhite}
								secureTextEntry={true}
								onChangeText={password => this.setState({ password })}
							/>
						</View>
						<Text style={styles.minLengthText}>min 7 characters</Text>
						<View style={styles.iconFormInput}>
							<Image style={styles.formInputIcon} source={passwordIcon} />
							<TextInput
								style={[styles.textInput]}
								placeholder="Re-enter Password"
								placeholderTextColor={colors.tapeWhite}
								secureTextEntry={true}
								onChangeText={reEnterPassword =>
									this.setState({ reEnterPassword })
								}
							/>
						</View>
					</View>
				</ScrollView>
				{/* Sign up button */}
				<View style={{ height: "20%" }}>
					<TouchableOpacity
						style={[styles.signUpButton]}
						onPress={this.handleSubmit}
						disabled={signUpDisabled}
					>
						<Text
							style={[styles.signUpText, signUpDisabled && { opacity: 0.5 }]}
						>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}
