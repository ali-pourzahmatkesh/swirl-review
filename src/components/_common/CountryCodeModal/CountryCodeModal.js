import React, { Component } from "react";
import {
    View,
    Text,
    Modal,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
	SectionList,
	ActivityIndicator,
	Image,
	Dimensions,
	Keyboard
} from "react-native";
import EmptyList from "../../EmptyList";
import SVGImage from "react-native-svg-image";
import exitIcon from "../../../assets/images/icons/exit3.png";
import emptyIcon from "../../../assets/images/icons/emptyCountry.png";
import search from "../../../assets/images/icons/search3.png";
import appCss from "../../../../app.css";

import styles from "./style";
import {CONFIG} from "../../../../config";
const { width, height } = Dimensions.get("window");
const colors = CONFIG.colors;
export default class CountryCodeModal extends Component {
    constructor(props){
        super(props);
        this.state = {
			searchValue: '',
			modalVisible: false,
			countryCodeVisible: false,
			flagCountry: '',
			countries: [],
			flag: '',
			searchValue: '',
			

			cellphoneCountryCode: '',
			countryCodeGroup: [],
			countries: [],
			flagCountry: [],
			flag: []
        }
	}

	componentDidMount() {
		this.props.getIpData();
	}
	
	componentWillReceiveProps(nextProps) {
		// todo: split up this if statement later
		if (
			(nextProps.ipData["calling_code"] &&
				this.state.cellphoneCountryCode !== nextProps.ipData["calling_code"]) ||
			(nextProps.ipData["flag"] &&
				this.state.flagCountry !== nextProps.ipData["flag"]) ||
			(nextProps.countries &&
				nextProps.countries.length !== this.state.countries.length) ||
			(nextProps.defaultCountryCode)
		) {
			if (nextProps.countries.length > 0 && this.state.countryCodeGroup.length === 0) {
				let countryCodeGroup = [];
				countryCodeGroup = this.generateSectionList(nextProps.countries);
				this.setState({
					countryCodeGroup
				});
			}
			let cellphoneCountryCode = nextProps.defaultCountryCode || this.state.cellphoneCountryCode;
			// let cellphoneCountryCode = this.state.cellphoneCountryCode;
			if (nextProps.ipData["calling_code"] && cellphoneCountryCode.length === 0) {
				cellphoneCountryCode = nextProps.ipData["calling_code"];
			}
			this.setState({
				cellphoneCountryCode,
				flagCountry: nextProps.ipData["flag"] || [],
				flag: nextProps.defaultFlag,
				countries: nextProps.countries,
				// countryCodeGroup
			});
		}
	}

	generateSectionList = array => {
		let list = { letters: [] };
		array.forEach(item => {
			let itLetter = item.name.substring(0, 1).toUpperCase();
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
		// console.log(this.props.blur, 'blluuururuururua')
		// this.props.blur()
        this.setState({ modalVisible: true }, () => {
            if( this.state.countries.length ) return;
            this.props.getCountries();
        }, this.props.updateModalVisible(true));

	}

	closeModal = () => {
		this.setState({ modalVisible: false }, this.props.updateModalVisible(false));
		// this.props.focus();
	};

	searchCountry = text => {
		let countries = [...this.state.countries];
		let filterCountry = countries.filter(item => {
			if (item && item["name"].toLowerCase().includes(text.toLowerCase())) {
				return item;
			}
		});
		let countryCodeGroup = this.generateSectionList(filterCountry);
		this.setState({ countryCodeGroup, searchValue: text });
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
					style={[
						appCss.countryCodeBox,
						// starting with the base length (can find another explanation for the in the style.js)
						// then increasing my a diminishing amount for each extra country code digit
						// probably going to come back and try something a bit cleaner for this later
						flag.length > 0 && {width: ((height * 0.09) + ((800 / height) * 9)) + ((2500 / height) * (cellphoneCountryCode.length - 1))}
					]}
					onPress={() => this.openModal()}
				>
					<View style={[appCss.countryCodeImageBox, flag.length > 0 && {marginLeft: height * 0.00}]}>


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
					<Text style={[ appCss.defaultFontApp, appCss.countryCode ]}>
						+ {cellphoneCountryCode}
					</Text>
				</TouchableOpacity>
			);
		}
	};

	handlePressItemCountry = item => {
		console.log('item ********************************************************************************************************************************************', item)
		// console.log('focuusuususuusus', this.props.focus)
		// this.props.focus()
		this.setState({
			cellphoneCountryCode: item.callingCodes[0],
			modalVisible: false,
			flag: item.flag
		}, () => {
			this.props.setCountryCode({cellphoneCountryCode: item.callingCodes[0], flag: item.flag});
			this.props.updateModalVisible(false);
			// this.props.focus();
		});
	};

    render(){
        let {
            searchValue,
            countryCodeGroup
        } = this.state;

        return(
			<View>
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
								<Image
									style={styles.exitIcon}
									source={exitIcon}
									resizeMode='contain'
								/>
							</TouchableOpacity>
							<View style={appCss.searchContainer}>
								<View style={appCss.SectionStyle}>
									<Image
										source={search}
										style={styles.searchIcon}
										resizeMode='contain'
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
								keyboardShouldPersistTaps='handled'
								sections={countryCodeGroup}
								extraData={countryCodeGroup}
								keyExtractor={(item, index) => index}
								ListEmptyComponent={
									<EmptyList
										emptyIcon={emptyIcon}
										emptyText={
											<Text>Imaginary Countries don't count. <Text style={{fontFamily: 'MuseoSansRounded-1000Italic'}}>{'"'+this.state.searchValue+'"'}</Text></Text>
										}
									/>
								}
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
				{this.renderCountryCodes()}	
			</View>
        )
    }
}