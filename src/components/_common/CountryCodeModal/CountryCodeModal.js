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
	Keyboard
} from "react-native";
import EmptyList from "../../EmptyList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SVGImage from "react-native-svg-image";
import Feather from "react-native-vector-icons/Feather";
import search from "../../../assets/images/icons/search3.png";
import appCss from "../../../../app.css";

import styles from "./style";
import {CONFIG} from "../../../../config";

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

	componentWillMount(){
		console.log('asjfakls;js;djfa;lskdjf;alksjdf;lkajs setf;lkfja;skdfaksdfj a;ksld fj;als')
		// this.props.getIpData();
		// this.props.getCountries();
	}

	componentDidMount() {
		console.log('asljdfl;asjd;fkajsd;kfjas;dkfja;sdf;asdf;aksjd;fkajd;fkajs;dfkj;')
		this.props.getIpData();
		// this.props.getCountries();
	}
	componentWillUnmount(){
		// this.props.focus();
		// console.log('unmounting ************************************************************************************************************************')
	}
	componentWillMount(){
		// console.log('mounting ************************************************************************************************************************')
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
			console.log('default country code', nextProps.defaultCountryCode)
			let cellphoneCountryCode = nextProps.defaultCountryCode || this.state.cellphoneCountryCode;
			// let cellphoneCountryCode = this.state.cellphoneCountryCode;
			if (nextProps.ipData["calling_code"] && cellphoneCountryCode.length === 0) {
				cellphoneCountryCode = nextProps.ipData["calling_code"];
			}
			console.log('default flaalgalsjl;ajfklnas;fna;ds', nextProps.defaultFlag)
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
		console.log(this.props.blur, 'blluuururuururua')
		this.props.blur()
        this.setState({ modalVisible: true }, () => {
            if( this.state.countries.length ) return;
            this.props.getCountries();
        }, this.props.updateModalVisible(true));

	}

	closeModal = () => {
		this.setState({ modalVisible: false }, this.props.updateModalVisible(false));
		this.props.focus();
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
					style={[appCss.countryCodeBox, cellphoneCountryCode.length > 3 && {width: 75}]}
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
					<Text style={[ appCss.defaultFontApp, appCss.countryCode ]}>
						+ {cellphoneCountryCode}
					</Text>
				</TouchableOpacity>
			);
		}
	};

	handlePressItemCountry = item => {
		console.log('item ********************************************************************************************************************************************', item)
		console.log('focuusuususuusus', this.props.focus)
		// this.props.focus()
		this.setState({
			cellphoneCountryCode: item.callingCodes[0],
			modalVisible: false,
			flag: item.flag
		}, () => {
			this.props.setCountryCode({cellphoneCountryCode: item.callingCodes[0], flag: item.flag});
			this.props.updateModalVisible(false);
			this.props.focus();
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
								<MaterialCommunityIcons
									style={styles.backButton}
									size={20}
									color="#fff"
									name="window-close"
								/>
							</TouchableOpacity>
							<View style={appCss.searchContainer}>
								<View style={appCss.SectionStyle}>
									{/* <Feather
										style={appCss.imageStyle}
										size={15}
										color="#fff"
										name="search"
									/> */}
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
				{this.renderCountryCodes()}	
			</View>
        )
    }
}