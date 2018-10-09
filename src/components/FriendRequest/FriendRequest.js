import React, { Component } from "react";
import {
	ActivityIndicator,
	AlertIOS,
	FlatList,
	Text,
	TouchableOpacity,
	View
} from "react-native";
// import Swipeout from "react-native-swipeout";
import EmptyList from "../EmptyList";
import Avatar from "../../components/Avatar";
import { CONFIG } from "../../../config";
import appCss from "../../../app.css";
import styles from "./style";
const colors = CONFIG.colors;

export default class FriendRequest extends Component {
	//state = {};

	// componentDidMount() {
	// 	this.getListRequest();
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (this.state.loading !== nextProps.loading) {
	// 		this.setState({ loading: nextProps.loading });
	// 	}
	// }

	// renderFooter = () => {
	// 	if (this.state.loading && this.state.page > 1) {
	// 		return <ActivityIndicator />;
	// 	} else {
	// 		return null;
	// 	}
	// };

	// handleLoadMore = () => {
	// 	if (
	// 		this.props.list.length > 0 &&
	// 		!this.state.loading &&
	// 		this.props.list.length < this.props.count
	// 	) {
	// 		this.setState({ page: this.state.page + 1, loading: true }, () => {
	// 			this.getListRequest(this.state.loading);
	// 		});
	// 	}
	// };
	//
	// handleRefresh = () => {
	// 	this.setState({ page: 1 }, () => {
	// 		this.getListRequest(null, true);
	// 	});
	// };

	getListRequest = (/*loading = false, refreshing = false*/) => {
		// const { page, limit } = this.state;
		// let options = {
		// 	receiverMemberId: this.props.id,
		// 	skip: (page - 1) * limit,
		// 	limit: limit,
		// 	loading,
		// 	refreshing
		// };

		//this.props.getListData(options, "FriendRequests");
		this.props.getListData(this.props.id, "FriendRequests");
	};

	handleChat = item => {
		if (this.props.onClickItem) {
			this.props.onClickItem();
		}
		this.props.navigation.navigate("DiscussionScreen", {
			friendMemberOwner: item.memberId,
			name: item.name
		});
	};

	handleDeleteChat = memberId => {
		this.props.callDeleteChat({
			memberId1: this.props.id,
			memberId2: memberId
		});
	};

	deleteNote = item => {
		AlertIOS.alert("Delete Chat", "Are you sure for delete this request ?", [
			{
				text: "No",
				style: "cancel"
			},
			{
				text: "Yes",
				onPress: () => this.handleDeleteChat(item.memberId)
			}
		]);
	};

	loadList = ({ item }) => {
		let swipeBtns = [
			{
				text: "Delete",
				backgroundColor: colors.appColor,
				onPress: () => {
					this.deleteNote(item);
				}
			}
		];
		return (
			// <View style={[item.isSeen ? styles.listViewItemsYellow : ""]}>
			<View>
				<View backgroundColor="transparent">
					<View style={[appCss.listItems]}>
						{this.avatarFunc(item)}
						{this.titleFunc(item)}
					</View>
				</View>
			</View>
		);
	};

	Capitalize(str) {
		if (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		} else {
			return str;
		}
	}

	avatarFunc = item => {
		return (
			<View style={appCss.avatarBox}>
				<Avatar userId={item.memberId} size={60} />
			</View>
		);
	};

	prepareForRedirectToProfile = item => {
		this.props.onClickItem();
		this.props.navigation.push("ProfileScreen", {
			userId: item.memberId,
			x: 1
		});
	};

	titleFunc = item => {
		return (
			<View style={appCss.titleBox}>
				{/*<TouchableOpacity*/}
					{/*onPress={() => this.prepareForRedirectToProfile(item)}*/}
				{/*>*/}
					{/*<Text*/}
						{/*numberOfLines={1}*/}
						{/*ellipsizeMode="tail"*/}
						{/*style={appCss.titleBoxSubject}*/}
					{/*>*/}
						{/*{this.Capitalize(item.name)}*/}
					{/*</Text>*/}
				{/*</TouchableOpacity>*/}
				{/*<TouchableOpacity onPress={() => this.handleChat(item)}>*/}
					{/*<View style={appCss.titleBoxDetail}>*/}
						{/*<Text*/}
							{/*numberOfLines={2}*/}
							{/*ellipsizeMode="tail"*/}
							{/*style={appCss.titleBoxDetailText}*/}
						{/*>*/}
							{/*{this.Capitalize(item.recentMessage)}*/}
						{/*</Text>*/}
					{/*</View>*/}
				{/*</TouchableOpacity>*/}
			</View>
		);
	};

	// loadList = ({ item }) => {
	// 	return (
	// 		<View style={styles.listViewItems}>
	// 			{this.avatarFunc(item)}
	// 			{this.titleFunc(item)}
	// 			<View style={styles.lastStatusImageBox}>{this.positionFunc(item)}</View>
	// 		</View>
	// 	);
	// };

	approve = item => {
		this.props.callApprove(item.id);
	};

	cancel = item => {
		this.props.callCancel(item.id);
	};

	render() {
        console.log("console.log(this.props.screenProps.cats);cccc111", this.props.screenProps)
        console.log("console.log(this.props.screenProps.cats);cccc111", this.props.navigation.state)
		return (
			<View style={styles.container}>
				<FlatList
					data={this.props.list}
					style={{flex:1}}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => this.loadList({ item })}
					ListEmptyComponent={() => <EmptyList />}
					onEndReachedThreshold={0.5}
				/>
			</View>
		);
	}
}
