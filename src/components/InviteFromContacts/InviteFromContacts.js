import React, { Component } from "react";
import EmptyList from "../EmptyList";
import {
	ActivityIndicator,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";

import appCss from "../../../app.css";
// import sendTo from "../../assets/images/Send-to.png";
// import checkedImage from "../../assets/images/checked.png";

import { PagedContacts } from "react-native-paged-contacts";
let pg = new PagedContacts();

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "transparent"
	},

	listViewItems: {
		display: "flex",
		justifyContent: "space-around",
		backgroundColor: "rgba(255,255,255,0)",
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 2,
		height: 80,
		borderBottomWidth: 1,
		borderColor: "#ddd"
	},

	listViewItemsActive: {
		backgroundColor: "rgba(249,237,37,0.90)"
	},

	modalImageBox: {
		flexBasis: "25%",
		overflow: "hidden",
		marginLeft: 20,
		alignItems: "center"
	},

	imageListBox: {
		borderWidth: 1,
		width: 50,
		borderColor: "#ddd",
		borderRadius: 50,
		marginRight: 20,
		overflow: "hidden",
		backgroundColor: "#e6e7e9"
	},

	imageList: {
		width: 50,
		height: 50
	},

	modalTitleBox: {
		flexBasis: "90%",
		paddingLeft: 20,
		alignItems: "flex-start",
		flexDirection: "column"
	},
	listTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "left"
	},
	modalIconBox: {
		flexBasis: "20%",
		marginRight: 20,
		alignItems: "center"
	},

	modalCheckedItem: {
		width: 22,
		height: 22
	},

	listAuteur: {
		fontSize: 10,
		color: "#9d9d9d"
	},

	selectedItemContentBox: {
		display: "flex",
		justifyContent: "flex-end"
	},

	selectedItemBox: {
		marginRight: 20,
		flexBasis: "10%"
	},

	selectedItem: {
		width: 20,
		height: 20,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: "#58595b",
		justifyContent: "flex-start"
	},
	checkedItem: {
		width: 22,
		height: 22
	},

	forwardContainer: {
		display: "flex",
		position: "absolute",
		bottom: 20,
		right: 20
	},
	forwardImageItem: {
		width: 45,
		height: 45
	}
});

export default class InviteFromContacts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			refreshing: false,
			//limit: 7,
			//page: 0,
			list: [],
			// newContactList: [],
			newList: []
		};
		this.getListData.bind(this);
	}

	componentDidMount() {
		this.getListRequest(true);
	}

	// componentWillReceiveProps(nextProps) {
	// 	if (this.state.loading !== nextProps.loading) {
	// 		this.setState({ loading: nextProps.loading });
	// 	}
	// }

	getListData = function() {
		console.log("getListData");

		// TODO : EXPO: read contact list
		// // Ask for permission to query contacts.
		// const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
		// if (permission.status !== 'granted') {
		//     // Permission was denied...
		//     return;
		// }
		// const contacts = await Expo.Contacts.getContactsAsync({
		//     fields: [
		//         Expo.Contacts.PHONE_NUMBERS,
		//         Expo.Contacts.EMAILS,
		//     ],
		//     pageSize: this.state.limit,
		//     pageOffset: this.state.page,
		// });
		// if (contacts.total > 0) {
		//     this.setState({list:contacts['data'], loading:false, newContactList : contacts['data'], refreshing :false})
		// }

		pg.requestAccess().then(granted => {
			if (granted !== true) {
				return;
			}

			// TODO: need to implement pagination to contacts
			pg.getContactsCount().then(count => {
				pg
					.getContactsWithRange(0, count, [
						PagedContacts.displayName,
						//PagedContacts.thumbnailImageData,
						PagedContacts.phoneNumbers
						//PagedContacts.emailAddresses
					])
					.then(contacts => {
						//Use contacts here
						console.log(
							"page",
							this.state.page,
							"limit",
							this.state.limit,
							"contacts list",
							contacts
						);

						if (contacts.length > 0) {
							this.setState({
								list: contacts,
								loading: false,
								// newContactList: contacts,
								refreshing: false
							});
						}
					});
			});
		});
	};

	// renderFooter = () => {
	// 	if (this.state.loading && this.state.page > 1) {
	// 		console.log("renderFooter > ActivityIndicator");
	// 		return <ActivityIndicator />;
	// 	} else {
	// 		console.log("renderFooter > NULL");
	// 		return null;
	// 	}
	// };

	// handleLoadMore = () => {
	// 	console.log("handleLoadMore");
	//
	// 	if (
	// 		this.state.list.length > 0 &&
	// 		!this.state.loading &&
	// 		this.state.newContactList.length
	// 	) {
	// 		// TODO: when set an state this is not a good pattern to read from state
	// 		console.log("handleLoadMore new page", this.state.page + 1);
	// 		this.setState({ page: this.state.page + 1 });
	// 	}
	// };

	handleRefresh = () => {
		console.log("handleRefresh");
		// this.setState({ page: 0 }, () => {
		// 	this.getListRequest(null, true);
		// });
		this.getListRequest(null, true);
	};

	getListRequest = (loading = false, refreshing = false) => {
		console.log("getListRequest");

		this.setState({ loading, refreshing });
		this.getListData();
	};

	loadCheckedItem = active => {
		if (active) {
			return <Image style={styles.checkedItem} source={checkedImage} />;
		} else {
			return <View style={styles.selectedItem} />;
		}
	};

	setActiveData = item => {
		let list = [...this.state.list];
		let newList = [];
		list.forEach(data => {
			if (item.identifier === data.identifier) {
				data["active"] = data["active"] ? false : true;
			}
			if (data["active"]) {
				if (data.phoneNumbers.length) {
					data.phoneNumbers.forEach(phone => {
						newList.push(phone["value"]);
					});
				}
			}
		});
		this.setState({ list, newList });
	};

	handleInviteFromContact = () => {
		this.props.navigation.goBack();
		let { id } = this.props;
		this.props.sendPhoneNumbersList({
			memberId: id,
			numbers: this.state.newList
		});
		console.log("handleInviteFromContact", {
			memberId: id,
			numbers: this.state.newList
		});
		this.props.loadListAfterNavigate();
	};

	loadList = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.listViewItems}
				onPress={() => {
					this.setActiveData(item);
				}}
			>
				<View style={styles.modalTitleBox}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={[appCss.defaultFontApp, styles.listTitle]}
					>
						{item.displayName}
					</Text>
					{/*<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={[appCss.defaultFontApp, styles.listAuteur]}
					>
						{item.relativeDate}
					</Text>
					*/}
				</View>
				<View style={styles.selectedItemBox}>
					<View style={styles.selectedItemContentBox}>
						{this.loadCheckedItem(item.active)}
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		let disabled = this.state.newList.length === 0 ? true : false;
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.list}
					keyExtractor={item => item.identifier}
					renderItem={({ item }) => this.loadList({ item })}
					ListEmptyComponent={() => <EmptyList />}
					refreshing={this.state.refreshing}
					onRefresh={this.handleRefresh.bind(this)}
					onEndReachedThreshold={0.5}
				/>
				<View style={styles.forwardContainer}>
					{/*<TouchableOpacity*/}
						{/*style={styles.smallButton}*/}
						{/*onPress={this.handleInviteFromContact}*/}
						{/*disabled={disabled}*/}
					{/*>*/}
						{/*<Image style={styles.forwardImageItem} source={sendTo} />*/}
					{/*</TouchableOpacity>*/}
				</View>
			</View>
		);
	}
}
