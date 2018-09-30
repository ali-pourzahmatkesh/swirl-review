import React, { Component } from "react";
import Swipeout from "react-native-swipeout";
import EmptyList from "../EmptyList";
import {
	AlertIOS,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
	ImageBackground,
	Dimensions
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
import { getStatusBarHeight } from 'react-native-status-bar-height';

import background from "../../assets/images/background.png";
import profileIcon from "../../assets/images/profile.png";
import addIcon from "../../assets/images/add.png";

const colors = CONFIG.colors;
const {height, width} = Dimensions.get('window');

export default class Requests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// tabSelected: this.props.currentTabOfPage
		};
	}

	componentDidMount() {
		// this.props.callGetProfile(this.props.id);
		// console.log(this.props.userProfile)
	}

	goTo(screenName) {
		this.props.navigation.navigate(screenName);
	}

	handleChat = item => {
		if (this.props.onClickItem) {
			this.props.onClickItem();
		}
		this.props.navigation.navigate("HouseChatScreen", {
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
			<View style={[item.isSeen ? styles.listViewItemsActive : "", styles.chatItem]}>
				<Swipeout right={swipeBtns} backgroundColor="transparent" style={{borderWidth: 0, borderRadius: 20}}>
					<TouchableOpacity style={[appCss.listItems, {borderBottomWidth: 0}]} onPress={() => this.handleChat(item)}>
						{this.avatarFunc(item)}
						{this.titleFunc(item)}
						<View style={appCss.actionBox}>{this.positionFunc(item)}</View>
						<Text style={styles.chatTimeText}>time</Text>
					</TouchableOpacity>
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
				<Avatar userId={item.memberId} size={60} disabled={true}/>
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

	emoji = type => {
		if(type === 'action'){
			return '⚡️';				
		}
		else if(type === 'shout'){
			return '📢';
		}
		else{
			return '✉️';
		}
	}

	titleFunc = item => {
		console.log("item:::::::", item);
		return (
			<View style={appCss.titleBox}>
				<TouchableOpacity
					disabled={true}
				>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={styles.chatNameText}
					>
						{this.Capitalize(item.name)}
					</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity onPress={() => this.handleChat(item)}> */}
				<TouchableOpacity disabled={true}>
					<View style={appCss.titleBoxDetail}>
						<Text
							numberOfLines={2}
							ellipsizeMode="tail"
							style={styles.chatDetailText}
						>
							{this.emoji(item.type)} {this.Capitalize(item.recentMessage)}
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

	render() {
		// let { tabSelected } = this.state;
		// console.log(this.props.userProfile)
		return (
			<ImageBackground source={background} style={{height: '100%', width: '100%'}}>
				<View style={{flex: 1, backgroundColor: 'transparent'}}>
					<View style={styles.headerContainer}>
						<View style={{flex: 1, alignItems: 'flex-start'}}>
							<TouchableOpacity
								style={styles.headerButton}
								onPress={() => this.goTo('CreateChatMembersScreen')}
							>
								<Image
									style={styles.headerIcon}
									resizeMode="contain"
									source={addIcon}
								/>
							</TouchableOpacity>
						</View>
						<View style={{flex: 1, alignItems: 'center'}}>
							<TouchableOpacity style={styles.headerButton}>
								<Image
									style={styles.headerIcon}
									resizeMode="contain"
									source={logo}
								/>
							</TouchableOpacity>
						</View>
						<View style={{flex: 1, alignItems: 'flex-end'}}>
							<TouchableOpacity
								style={styles.headerButton}
								onPress={() => this.goTo('ProfileV2Screen')}
							>
								<Image
									style={styles.headerIcon}
									resizeMode="contain"
									source={profileIcon}
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View style={{height: (height * .9) - getStatusBarHeight(true), alignItems: 'center'}}>
						<FlatList
							// data={this.props.list}
							// data={[
							// 	{
							// 		name: 'asdfa',
							// 		recentMessage: 'alf;jhasljhasd lkhsadl fah'
							// 	},
							// 	{
							// 		name: 'asdfa',
							// 		recentMessage: 'alf;jhasljhasd lkhsadl fah'
							// 	},
							// 	{
							// 		name: 'asdfa',
							// 		recentMessage: 'alf;jhasljhasd lkhsadl fah'
							// 	},
							// 	{
							// 		name: 'asdfa',
							// 		recentMessage: 'alf;jhasljhasd lkhsadl fah'
							// 	},

							// ]}
							contentContainerStyle={{backgroundColor: 'transparent', height: '100%', width: width, alignItems: 'center'}}
							extraData={this.props.deleteChat}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => this.loadList({ item })}
							ListEmptyComponent={() => {
								return (
									<View style={{
										// flex: 1,
										// borderWidth: 10,
										width: width,
										height: '100%',
										alignItems: 'center',
										// justifyContent: 'center'
										paddingTop: '50%'
									}}>
										<Text>🤷‍♂️</Text>
										<Text style={{fontFamily: 'MuseoSansRounded-1000'}}>You don't have any chats yet...</Text>
									</View>
								);
							}}
							onEndReachedThreshold={0.5}
							
						/>
					</View>
				</View>
			</ImageBackground>
		);
	}
}
