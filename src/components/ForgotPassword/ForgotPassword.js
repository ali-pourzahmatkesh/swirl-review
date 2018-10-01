import React, { Component } from "react";
import {
	Image,
	Keyboard,
	LayoutAnimation,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	View,
	Modal,
	SectionList,
	ScrollView,
	ActivityIndicator
} from "react-native";

import { SafeAreaView } from "react-navigation";
import EmptyList from "../EmptyList";

import logo from "../../assets/images/logo_bigger.png";
import phoneIcon from "../../assets/images/phoneIcon.png";
import SVGImage from "react-native-svg-image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.appColor
		// flexDirection: 'column'
	},
	formInputIcon: {
		height: "110%",
		width: "10%",
		resizeMode: "contain"
	},
	imagesContent: {
		height: "15%",
		alignItems: "center",
		marginTop: "5%",
		marginBottom: "10%"
	},
	imageItem: {
		flex: 1,
		resizeMode: "contain"
	},
	nextButton: {
		backgroundColor: "#faec22",
		height: "10%",
		width: "100%",
		justifyContent: "center",
		position: "absolute"
		// bottom: 100
		// marginBottom: -30,

		// borderWidth: 2,
		// borderColor: 'green'
	},
	nextText: {
		color: "#fc003e",
		textAlign: "center",
		fontSize: 20
	},
	textInput: {
		fontSize: 16,
		paddingLeft: "6%",
		color: "#fff",
		width: "100%"
	},
	textInputContainer: {
		alignSelf: "center",
		borderBottomWidth: 1.5,
		borderBottomColor: "#fff",
		flexDirection: "row",
		marginBottom: 30,
		paddingBottom: 12,
		width: "85%"
	},

	// -------

	//styles inside of render country codes
	countryCodeBox: {
		width: 64,
		height: 35,
		backgroundColor: "transparent",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		// marginTop: 10,
		paddingRight: 3,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: "#dc030e"
	},
	countryCodeImageBox: {
		height: 24,
		width: 24,
		display: "flex",
		borderWidth: 1,
		overflow: "hidden",
		borderColor: "#ddd",
		borderRadius: 50
	},
	countryCodeFlag: {
		height: 24,
		width: 24,
		resizeMode: "cover"
	},
	countryCode: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 12
	},

	//styles inside of country code selection modal
	modalContainer: {
		flex: 1,
		justifyContent: "space-between",
		backgroundColor: "rgba(237,27,52,0.97)"
	},

	modalHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingBottom: 10
	},

	sectionItems: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#ed1b34",
		paddingLeft: 20,
		paddingRight: 20,
		height: 40,
		borderBottomWidth: 1,
		borderColor: "#fff"
	},

	countryCodeSearch: {
		color: "#fff",
		flexBasis: "15%",
		marginLeft: 10,
		textAlign: "right"
	},

	countryNameSearch: {
		color: "#fff",
		marginLeft: 20
	},
	sectionHeader: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingLeft: 20,
		paddingRight: 20,
		height: 30
	},
	sectionHeaderTitle: {
		color: "#ed1b34",
		fontWeight: "bold",
		fontSize: 15
	},
	modalOptions: {
		flex: 1
	},

	searchContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	SectionStyle: {
		flexDirection: "row",
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},

	imageStyle: {
		paddingTop: 2,
		// margin: 5,
		height: "100%",
		width: 25,
		alignItems: "center"
	},
	searchTextInput: StyleSheet.flatten([
		appCss.defaultFontApp,
		{
			color: "#fff",
			height: "100%",
			width: "80%"
		}
	])
});

export default class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bottom: 0,
			cellphone: "",
			cellphoneCountryCode: "",

			//for country code modal
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
	};

	keyboardWillHide = event => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				event.duration,
				LayoutAnimation.Types[event.easing]
			)
		);
		this.setState({
			bottom: 0
		});
	};

	handleSubmit = () => {
		this.props.sendVerifyCode({
			cellphoneCountryCode: this.state.cellphoneCountryCode,
			cellphone: this.state.cellphone,
			navigation: this.props.navigation
		});
	};

	render() {
		let {
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

				<View style={styles.imagesContent}>
					<Image style={styles.imageItem} source={logo} />
				</View>
				<View style={styles.textInputContainer}>
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
				</View>
				<TouchableOpacity
					style={[styles.nextButton, { bottom: this.state.bottom }]}
					onPress={this.handleSubmit}
				>
					<Text style={[appCss.defaultFontApp, styles.nextText]}>Next</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}
