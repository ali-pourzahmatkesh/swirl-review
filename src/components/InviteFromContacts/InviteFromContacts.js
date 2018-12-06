import React, { Component } from "react";
import EmptyList from "../EmptyList";
import {Image, SectionList, Text, TextStyle as fontFamily, TouchableOpacity, View} from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import Avatar from "../../components/Avatar";
import { SafeAreaView } from "react-navigation";
import { PagedContacts } from "react-native-paged-contacts";
import emptyIcon from "../../assets/images/icons/emptyInviteContact.png";
import faq from "../../assets/images/icons/faq.png";
import emptyIconSearch from "../../assets/images/icons/friendSearchEmpty.png";
import logo from "../../assets/images/logo1.png";
// import checkedImage from "../../assets/images/checked.png";
import LoadingSpinner from "../../components/_common/LoadingSpinner";
import importFromContacts from "../../assets/images/icons/importFromContacts.png"

let pg = new PagedContacts();

export default class InviteFromContacts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			finalList: [],
			list: [],
			loading: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.id && !this.props.id){
			this.getPhoneNumbersFromContactList();
		}
		if(nextProps.membersFromContactsAreNotFriend &&
			nextProps.membersFromContactsAreNotFriend.length !== 0 &&
			this.props.membersFromContactsAreNotFriend.length === 0){
			this.setState({
				list: nextProps.membersFromContactsAreNotFriend,
				finalList: this.generateSectionList(
					nextProps.membersFromContactsAreNotFriend,
					"username"
				)
			});
		}




		if(
			nextProps.loading === false &&
			nextProps.hasError === false &&
			this.props.loadType === 'sendRequest'
		){
			let filteredList = this.state.list.filter(member => member.id != this.props.actionTarget);
			this.setState(
				{
					list: filteredList
				},
				() => {
					let searchPhrase =
						(this.props.screenProps && this.props.screenProps.searchText) || "";
					this.filterContact(filteredList, searchPhrase);
				}
			);
		}
	}

	componentDidMount() {
		if(this.props.membersFromContactsAreNotFriend.length > 0){
			this.setState({
				finalList: this.generateSectionList(
					this.props.membersFromContactsAreNotFriend,
					"username"
				)
			})
		}
		if(this.props.id){
			this.getPhoneNumbersFromContactList();
		}
	}

	getPhoneNumbersFromContactList = function() {
		pg.requestAccess().then(granted => {
			if (granted !== true) {
				return;
			}
			pg.getContactsCount().then(count => {
				pg.getContactsWithRange(0, count, [PagedContacts.phoneNumbers]).then(
					contacts => {
						this.setState({ contacts });
						if (contacts.length > 0) {
							this.getAllPhoneNumbers(contacts);
						}
					}
				);
			});
		});
	};

	getAllPhoneNumbers = contacts => {
		let numberList = [];
		contacts.forEach(item => {
			// some contact entries are empty/don't have numbers
			item["phoneNumbers"] && item["phoneNumbers"].forEach(itemNumber => {
				//if (itemNumber.label === "mobile") {
				numberList.push(itemNumber["value"]);
				//}
			});
		});
		this.props.getMembersAreInMyContactsThatNotFriend({
			memberOwner: this.props.id,
			numberList: numberList
		});
	};

	componentDidUpdate(prevProps) {
		if (this.props.screenProps && prevProps.screenProps) {
			if (
				this.props.screenProps.searchText !== prevProps.screenProps.searchText
			) {
				this.filterContact(this.state.list, this.props.screenProps.searchText);
			}
		}
	}

	filterContact = (contacts, search) => {
		if (search && contacts.length > 0) {
			contacts = contacts.filter(
				item => item["username"].toLowerCase().search(search.toLowerCase()) > -1
			);
		}
		let sectionList = this.generateSectionList(contacts);
		this.setState({
			finalList: sectionList,
			loading: false
		});
	};

	generateSectionList = array => {
		let list = { letters: [] };
		array.forEach(item => {
			let itLetter = item["username"].substring(0, 1).toUpperCase();
			if (!(itLetter in list)) {
				list[itLetter] = [];
				list.letters.push(itLetter);
			}
			list[itLetter].push(item);
		});
		list.letters = list.letters.sort();
		let sectionList = [];

		list.letters.forEach(item => {
			sectionList.push({
				title: item,
				data: list[item]
			});
		});
		return sectionList;
	};

	addFriend = item => {
		this.props.callAddFriend({
			senderMemberId: this.props.id,
			receiverMemberId: item.id
		});
	};


	// emptyList = ()=>{
    //     if(this.props.screenProps && this.props.screenProps.searchText){

    //     	return (
	// 		<View style={{flex:1 , alignItems:'center'}}>
	// 			<EmptyList emptyIcon={emptyIconSearch} emptyText={`We searched and searched but no ${'"'+this.props.screenProps.searchText+'"'}`}/>
	// 			<View style={styles.boxEmptySearch}>
	// 				<View style={styles.boxEmptySearchFaq}>
	// 					<Image style={appCss.emptyIcon} source={faq}/>

	// 				</View>
	// 				<Text style={styles.boxEmptySearchText}>"{this.props.screenProps.searchText}"</Text>
	// 			</View>
	// 		</View>
	// 		)
	// 	}else{
    //     	return (
	// 			<EmptyList emptyIcon={emptyIcon} emptyText={'None of your Friends are on Swirl... yet.'}/>
	// 		)
	// 	}
	// }
	render() {
		let {
			loading,
			loadType,
			actionTarget,
			screenProps,
			membersFromContactsAreNotFriend,

		} = this.props;

		return (
			<SafeAreaView style={styles.container}>
                headerIcon={Array.isArray(membersFromContactsAreNotFriend) &&
			    membersFromContactsAreNotFriend.length===0 ? // empty array or length 0
                <Text>Hello</Text>
				:
                <View style={styles.addFromContactsContainer}>
                    <Image
                        source={importFromContacts}
                        style={styles.importFromContactsIcon}
                        resizeMode={"contain"}
                    />
                    <Text style={styles.addFromContact}

                    >  Add From Contacts </Text>

                </View>}
				<SectionList
					sections={this.state.finalList}
					extraData={this.state.finalList}
					keyExtractor={(item, index) => {
						return index + item.id;
					}}
					// ListEmptyComponent={() =>this.emptyList() }
					// this keeps the function form being invoked on each render/onChange of the search bar
					// which keeps us from having to reload the empty list icon and faq icon
					ListEmptyComponent={
						screenProps && screenProps.searchText ?

						<View style={{flex:1 , alignItems:'center'}}>
							<EmptyList emptyIcon={emptyIconSearch} emptyText={`We searched and searched but no ${'"' + screenProps.searchText + '"'}`}/>
						</View>
						:
						<EmptyList emptyIcon={emptyIcon} emptyText={'None of your Contacts are on Swirl... Yet.'}/>
					}
					renderItem={({ item }) => (


						<View style={styles.sectionItems}>

							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-start"
								}}
							>
									<Avatar userId={item.id} position="image" size={45} />
								<Text
									style={[appCss.defaultFontApp, appCss.countryNameSearch]}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{item.username}
								</Text>
							</View>
							<TouchableOpacity
								style={styles.addBtn}
								onPress={() => this.addFriend(item)}
							>
								{(loading && loadType === 'sendRequest' && actionTarget === item.id) ? (
									<LoadingSpinner
										maxRadius={10}
										lineWidth={2}
									/>
								) : (
									<Text style={styles.addBtnText}> Add </Text>
								)}
							</TouchableOpacity>
						</View>
					)}
					renderSectionHeader={({ section }) => (
						<View style={styles.sectionHeader}>
							<Text style={[appCss.defaultFontApp, styles.sectionHeaderTitle]}>
								{section.title}
							</Text>
						</View>
					)}
				/>
			</SafeAreaView>
		);
	}
}
