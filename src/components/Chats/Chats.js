import React, { Component } from "react";
import Swipeout from "react-native-swipeout";
import EmptyList from "../EmptyList";
import {
	AlertIOS,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import appCss from "../../../app.css";
import FriendRequest from "../FriendRequest";
import messageFillRe from "../../assets/images/chatRequest.png";
import messageFill from "../../assets/images/chatList.png";
import chatAndRequestIcon from "../../assets/images/chatListWhiteFill.png";
import { CONFIG } from "../../../config";
import logo from "../../assets/images/tape-logo.png";
import Avatar from "../Avatar";
import styles from "./style";

const colors = CONFIG.colors;

export default class Requests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabSelected: this.props.currentTabOfPage
		};
	}

	componentDidMount() {
		console.log(
			"this.props.id, this.state.tabSelected",
			this.props.id,
			this.state.tabSelected
		);
		this.setTabFunc(this.state.tabSelected);
		//this.props.getListData(this.props.id, this.state.tabSelected);
	}

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
		AlertIOS.alert("Delete Chat", "Are you sure for delete chat ?", [
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
			<View style={[item.isSeen ? styles.listViewItemsActive : ""]}>
				<Swipeout right={swipeBtns} backgroundColor="transparent">
					<View style={[appCss.listItems]}>
						{this.avatarFunc(item)}
						{this.titleFunc(item)}
						<View style={appCss.actionBox}>{this.positionFunc(item)}</View>
					</View>
				</Swipeout>
			</View>
		);
	};

	Capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	avatarFunc = item => {
		return (
			<View style={appCss.avatarBox}>
				<Avatar userId={item.memberId} size={60} />
			</View>
		);
	};

	prepareForRedirectToProfile = item => {
		this.props.closeModal();
		this.props.navigation.push("ProfileScreen", {
			userId: item.memberId,
			x: 1
		});
	};

	titleFunc = item => {
		console.log("item:::::::", item);
		return (
			<View style={appCss.titleBox}>
				<TouchableOpacity
					onPress={() => this.prepareForRedirectToProfile(item)}
				>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={appCss.titleBoxSubject}
					>
						{this.Capitalize(item.name)}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.handleChat(item)}>
					<View style={appCss.titleBoxDetail}>
						<Text
							numberOfLines={2}
							ellipsizeMode="tail"
							style={appCss.titleBoxDetailText}
						>
							{this.Capitalize(item.recentMessage)}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	positionFunc = item => {
		if (item.unreadMessageCount) {
			return (
				<View style={styles.unreadRequestsBadge}>
					<Text
						style={styles.unreadChatsNumber}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{item.unreadMessageCount}
					</Text>
				</View>
			);
		} else {
			return null;
		}
	};

	setTabFunc = tabSelected => {
		// need to test this
		ReactNativeHapticFeedback.trigger("impactLight", true);
		this.props.setTabOfPage(tabSelected);
		this.props.getListData(this.props.id, tabSelected);
		this.setState({ tabSelected });
	};

	changeList = tabSelected => {
		console.log("tabSelected", tabSelected, this.props.list);
		if (
			tabSelected === "Chats" &&
			this.props.list &&
			this.props.list.isLength
		) {
			console.log("render chat list again", this.props.list);
			return (
				<FlatList
					data={this.props.list}
					extraData={this.props.deleteChat}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => this.loadList({ item })}
					ListEmptyComponent={() => <EmptyList />}
					onEndReachedThreshold={0.5}
				/>
			);
		} else {
			return <FriendRequest onClickItem={this.props.onClickItem} />;
		}
	};

	render() {
		let { tabSelected } = this.state;
		return (
			<View style={styles.container}>
				<View style={appCss.appColor}>
					<View style={appCss.header}>
						<View />
						<Image
							style={{
								height: "70%",
								width: "15%"
							}}
							resizeMode="contain"
							source={chatAndRequestIcon}
						/>
						<View />
					</View>
				</View>
				<View style={{ flex: 2 }}>
					<View style={styles.tabContainer}>
						<TouchableOpacity
							style={styles.tabButton}
							onPress={() => this.setTabFunc("Chats")}
						>
							<Text
								style={[
									styles.tabButtonText,
									{ opacity: tabSelected === "Chats" ? 1 : 0.4 }
								]}
							>
								Messages
							</Text>
						</TouchableOpacity>
						<View
							style={{
								borderLeftWidth: 1,
								borderLeftColor: colors.borderColor,
								height: "80%"
							}}
						/>
						<TouchableOpacity
							style={styles.tabButton}
							onPress={() => this.setTabFunc("Requests")}
						>
							<Text
								style={[
									styles.tabButtonText,
									{ opacity: tabSelected === "Requests" ? 1 : 0.4 }
								]}
							>
								Requests
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.container}>{this.changeList(tabSelected)}</View>

					<View style={appCss.closeButtonBox}>
						<TouchableOpacity onPress={this.props.closeModal}>
							<View style={appCss.closeButton}>
								<Image style={appCss.closeButtonIcon} source={logo} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
