import React, { Component } from "react";
import EmptyList from "../EmptyList";
import { Image, SectionList, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import Avatar from "../../components/Avatar";
import { SafeAreaView } from "react-navigation";
import { PagedContacts } from "react-native-paged-contacts";
import logo from "../../assets/images/logo_bigger.png";
// import checkedImage from "../../assets/images/checked.png";
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
		console.log("IN componentWillReceiveProps", nextProps);
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
	}

	componentDidMount() {
		
	}

	getPhoneNumbersFromContactList = function() {
		pg.requestAccess().then(granted => {
			if (granted !== true) {
				return;
			}
			pg.getContactsCount().then(count => {
				pg.getContactsWithRange(0, count, [PagedContacts.phoneNumbers]).then(
					contacts => {
						console.log('contacts: ', contacts)
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
			item["phoneNumbers"].forEach(itemNumber => {
				//if (itemNumber.label === "mobile") {
				numberList.push(itemNumber["value"]);
				//}
			});
		});
		console.log("getAllPhoneNumbers", numberList, this.props);
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
		console.log("invite from filterContact", contacts);
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
		console.log(item);
		this.props.callAddFriend({
			senderMemberId: this.props.id,
			receiverMemberId: item.id
		});
		let filteredList = this.state.list.filter(member => member.id != item.id);
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
	};

	render() {
		console.log(this.props, 'alsjdf;akjsf;lkajs;dflja;dsfj;adj;akljdf;kajds')
		return (
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={this.state.finalList}
					extraData={this.state.finalList}
					keyExtractor={(item, index) => index}
					ListEmptyComponent={() => <EmptyList />}
					renderItem={({ item }) => (
						<View style={styles.sectionItems}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "flex-start"
								}}
							>
								<TouchableOpacity
									onPress={() =>
										(this.props.screenProps &&
											this.props.screenProps.profileNavigate(item)) ||
										null
									}
									style={appCss.avatarBox}
								>
									<Avatar userId={item.id} position="image" size={45} />
								</TouchableOpacity>
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
								<Text style={styles.addBtnText}> Add </Text>
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
