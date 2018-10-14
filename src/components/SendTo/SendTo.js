import React, { Component } from "react";
import EmptyList from "../EmptyList";
import {
	Dimensions,
	Image,
	SectionList,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import Avatar from "../../components/Avatar";
import { SafeAreaView } from "react-navigation";
import { PagedContacts } from "react-native-paged-contacts";
import checkedImage from "../../assets/images/icons/check_white.png";
import { CONFIG } from "../../../config";
import next from "../../assets/images/icons/next.png";
const colors = CONFIG.colors;
const { width } = Dimensions.get("window");

const pg = new PagedContacts();

export default class SendTo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			finalList: []
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log("IN componentWillReceiveProps", nextProps);
		if (
			nextProps.membersFromContactsAreNotFriend &&
			this.state.finalList.length !=
				nextProps.membersFromContactsAreNotFriend.length
		) {
			console.log(
				"membersFromContactsAreNotFriend",
				nextProps.membersFromContactsAreNotFriend
			);
			this.setState({
				finalList: this.generateSectionList(
					nextProps.membersFromContactsAreNotFriend,
					"username"
				)
			});
		}
	}

	componentDidMount() {
		this.getPhoneNumbersFromContactList();
	}

	getPhoneNumbersFromContactList = function() {
		pg.requestAccess().then(granted => {
			if (granted !== true) {
				return;
			}
			pg.getContactsCount().then(count => {
				pg.getContactsWithRange(0, count, [
					PagedContacts.displayName,
					PagedContacts.thumbnailImageData,
					PagedContacts.phoneNumbers
				]).then(contacts => {
					this.setState({ contacts });
					if (contacts.length > 0) {
						this.getAllPhoneNumbers(contacts);
					}
				});
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

	generateSectionList = (array, key) => {
		let list = { letters: [] };
		array.forEach(item => {
			let itLetter = item[key].substring(0, 1).toUpperCase();
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

	loadList = ({ item }) => {
		return (
			<View style={appCss.listItems}>
				{this.avatarFunc(item)}
				{this.titleFunc(item)}
				{this.actionFunc(item)}
			</View>
		);
	};

	avatarFunc = item => {
		return (
			<TouchableOpacity
				onPress={() => this.props.screenProps.profileNavigate(item)}
				style={appCss.avatarBox}
			>
				<Avatar userId={item.id} position="image" size={45} />
			</TouchableOpacity>
		);
	};

	titleFunc = item => {
		return (
			<View style={appCss.titleBox}>
				<View>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={appCss.titleBoxSubject}
					>
						{this.Capitalize(item.username)}
					</Text>
				</View>
			</View>
		);
	};

	actionFunc = item => {
		return (
			<View style={styles.actionBox}>
				<TouchableOpacity
					onPress={() => {
						this.onChange(item);
					}}
					style={[
						styles.actionBtn,
						item["checked"] ? styles.actionBtnSelect : styles.actionBtnUnSelect
					]}
				>
					{item["checked"] && (
						<Image
							source={checkedImage}
							resizeMode={"contain"}
							style={styles.actionIcon}
						/>
					)}
				</TouchableOpacity>
			</View>
		);
	};

	onChange = item => {
		const { finalList } = this.state;
		item["checked"] = !item["checked"];
		this.setState({ finalList });
	};

	Capitalize(str) {
		if (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		} else {
			return str;
		}
	}

	render() {
		const { finalList } = this.state;
		return (
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={finalList}
					extraData={finalList}
					keyExtractor={(item, index) => index}
					ListEmptyComponent={() => <EmptyList />}
					renderItem={({ item }) => this.loadList({ item })}
					renderSectionHeader={({ section }) => (
						<View style={styles.sectionHeader}>
							<Text style={[appCss.defaultFontApp, styles.sectionHeaderTitle]}>
								{section.title}
							</Text>
						</View>
					)}
				/>
				<View
					style={{
						height: 50,
						width: 50,
						position: "absolute",
						bottom: 50,
						right: 15
					}}
				>
					<TouchableOpacity
						style={styles.footer}
						onPress={() => this.props.friendList(finalList)}
					>
						<Image
							resizeMode={"contain"}
							style={styles.nextIcon}
							source={next}
						/>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}
