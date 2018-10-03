import React, {Component} from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Modal,
    SectionList,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {NavigationActions, SafeAreaView} from "react-navigation";

import logo from "../../assets/images/logo_bigger.png";
import passwordIcon from "../../assets/images/icons/Lock.png";
import phoneIcon from "../../assets/images/icons/phone.png";
import usernameIcon from "../../assets/images/icons/Mask.png";

import EmptyList from "../EmptyList";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SVGImage from "react-native-svg-image";
import appCss from "../../../app.css";
import styles from "./style";
import {CONFIG} from "../../../config";

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
        if( cellphoneCountryCode.length === 0 || flagCountry.length === 0 ) {
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


                        {flag.length > 0? (
							<SVGImage
								style={appCss.countryFlagSvg}
								source={{ uri: flag }}
								originWhitelist={["*"]}
							/>
                        ): (
							<Image
								source={{ uri: flagCountry }}
								style={appCss.countryCodeFlag}
							/>
                        )}
					</View>
					<Text style={[ appCss.defaultFontApp, appCss.countryCode ]}>
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
					transparent={false}
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
							<View style={appCss.modalOptions}/>
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
											style={[ appCss.defaultFontApp, appCss.countryCodeSearch ]}
										>
											+ {item.callingCodes[0]}
										</Text>
										<Text
											style={[ appCss.defaultFontApp, appCss.countryNameSearch ]}
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
											style={[ appCss.defaultFontApp, appCss.sectionHeaderTitle ]}
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
					<View
						style={
                            styles.imageContainer
                        }
					>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo}/>
						</View>
					</View>
					<View style={[styles.formInputContainer]}>
						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={usernameIcon}/>
							<TextInput
								style={[ appCss.textInput ]}
								placeholder="User Name"
								placeholderTextColor={colors.combinatorialColor}
								autoCorrect={false}
								onChangeText={username => this.setState({ username })}
							/>
						</View>

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
								onFocus={this.handlePhoneFieldFocus}
								// onPress={this.handlePhoneFieldFocus}
								onBlur={this.handlePhoneFieldBlur}
							/>
						</View>

						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={passwordIcon}/>
							<TextInput
								style={[ appCss.textInput ]}
								placeholder="Password"
								placeholderTextColor={colors.combinatorialColor}
								secureTextEntry={true}
								onChangeText={password => this.setState({ password })}
							/>
						</View>
						<Text style={styles.minLengthText}>min 7 characters</Text>
						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={passwordIcon}/>
							<TextInput
								style={[ appCss.textInput ]}
								placeholder="Re-enter Password"
								placeholderTextColor={colors.combinatorialColor}
								secureTextEntry={true}
								onChangeText={reEnterPassword =>
									this.setState({ reEnterPassword })
								}
							/>
						</View>
						<View style={{ width: '100%', alignItems:'center',paddingTop:30, paddingBottom:30}}>
							<Text style={styles.textSignup}>By signing up you agree to the terms of use</Text>
						</View>
						<View style={{ width: '100%' }}>
							<TouchableOpacity
								style={[ styles.signUpButton ]}
								onPress={this.handleSubmit}
								disabled={signUpDisabled}
							>
								<Text
									style={[ styles.signUpText, signUpDisabled && { opacity: 0.5 } ]}
								>
									Sign Up
								</Text>
							</TouchableOpacity>
						</View>

					</View>


				</KeyboardAvoidingView>
				{/* Sign up button */}

			</SafeAreaView>
		);
	}
}
