import React, { Component } from "react";
import {
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	ActionSheetIOS,
	KeyboardAvoidingView,
	View,
	Dimensions
} from "react-native";
var BUTTONS = ["BLOCK", "Cancel"];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;
import appCss from "../../../app.css";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Avatar from "../Avatar";
import discussionIcon from "../../assets/images/icons/discussionNew.png";
import bubbleR from "../../assets/images/icons/bubble-r.png";
import bubbleL from "../../assets/images/icons/bubble-l.png";
import discussionError from "../../assets/images/warning_shield.png";
import { CONFIG } from "../../../config";
import styles from "./style";
import { getStatusBarHeight } from 'react-native-status-bar-height';
const colors = CONFIG.colors;
const  {height, width} = Dimensions.get('window');

export default class Discussion extends Component {
	state = {
		message: "",
		chatList: [],
		clicked: "none"
		//position: this.props.navigation.state.params.position || false
		//status: "friend1"
	};
	testChats = [
		{
			textContent: 'aasdf'
		},
		{

		},
		{

		}
	]

	componentDidMount() {
		// console.log(this.props);
		// this.setState(
		// 	{
		// 		memberOwner: this.props.memberOwner,
		// 		// friendMemberOwner: this.props.navigation.state.params.friendMemberOwner,
		// 		// name: this.props.navigation.state.params.name,
		// 		position:
		// 			this.props.friendRequest.friendshipRequestStatus == "connected"
		// 				? false
		// 				: true
		// 	},
		// 	() => {
		// 		this.props.callChatList({
		// 			memberOwner: this.state.memberOwner,
		// 			friendMemberOwner: this.state.friendMemberOwner
		// 		});
		// 		this.props.getFriendshipStatus({
		// 			receiverMemberId: this.state.friendMemberOwner,
		// 			senderMemberId: this.state.memberOwner
		// 		});
		// 	}
		// );
	}

	// componentWillUpdate(nextProps, nextState) {
	// 	if (nextProps.redirectBack) {
	// 		this.props.setRedirectBack(false);
	// 		this.props.getListData(
	// 			this.props.memberOwner,
	// 			this.props.currentTabOfPage
	// 		);
	// 		this.props.navigation.goBack();
	// 	}
	// }

	// componentWillReceiveProps(nextProps) {
	// 	if (
	// 		this.props.friendRequest.friendshipRequestStatus !==
	// 		nextProps.friendRequest.friendshipRequestStatus
	// 	) {
	// 		this.setState({
	// 			position:
	// 				nextProps.friendRequest.friendshipRequestStatus == "connected"
	// 					? false
	// 					: true //this.props.navigation.state.params.position
	// 		});

	// 		// console.log(
	// 		// 	"set new friendship",
	// 		// 	nextProps.friendRequest.friendshipRequestStatus
	// 		// );
	// 	}
	// }

	titleFunc = (item, i) => {
		if (item.senderMemberId === this.state.memberOwner) {
			// my message style
			return (
				<View style={styles.rightBoxAlignment} key={i.toString()}>
					<View style={[styles.discussionBox, { justifyContent: "flex-end" }]}>
						<Text
							style={[
								styles.TextComponentStyle,
								styles.TextComponentStyleRight
							]}
						>
							{item.textContent}
						</Text>
						<Image source={bubbleR} style={styles.bubbleRight} />
					</View>
					{/*
					<View style={styles.errorIcon}>
						<Image
							resizeMode={'contain'}
							style={{height:undefined, width:undefined, flex:1}}
							source={discussionError}
						/>
					</View> */}
				</View>
			);
		} else {
			if (item.senderMemberId === this.state.friendMemberOwner) {
				// my friend message style
				return (
					<View style={styles.leftBoxAlignment} key={i.toString()}>
						<View style={styles.avatarBox}>
							<Avatar userId={this.state.friendMemberOwner} size={32} />
						</View>

						<View style={[styles.discussionBox]}>
							<Text
								style={[
									styles.TextComponentStyle,
									styles.TextComponentStyleLeft
								]}
							>
								{item.textContent}
							</Text>
							<Image source={bubbleL} style={styles.bubbleLeft} />
						</View>
					</View>
				);
			} else {
				return (
					<View style={styles.dateTime} key={i.toString()}>
						<Text style={styles.dateTimeText}>{item.textContent}</Text>
					</View>
				);
			}
		}
	};

	send = () => {
		let requestMode = this.state.position ? true : false;
		// console.log("send message by position param , requestMode =", requestMode);
		this.props.callSendChat({
			senderMemberId: this.state.memberOwner,
			receiverMemberId: this.state.friendMemberOwner,
			textContent: this.state.message,
			postType: "text",
			isInRequestMode: requestMode
		});
		this.setState({ message: "" });
	};

	// ****************************************************************************************************************
	// handleGoBack = () => {
	// 	this.props.callGetStatus(this.state.memberOwner);
	// 	setTimeout(() => {
	// 		// this.props.navigation.goBack();
	// 	}, 500);
	// };

	allowMessage = allChats => {
		if (allChats.length == 0) {
			// console.log("--> empty chat list, it allow to message");
			return true;
		} else {
			let allow = true;
			let MyId = this.state.memberOwner;
			for (item of allChats) {
				// console.log("items", item);
				if (item.senderMemberId !== MyId) {
					// console.log("--> detect a diferent message, it not allow to message");
					allow = false;
					break;
				}
			}
			// console.log("--> final result is", allow);
			return allow;
		}
	};

	discussionStatus = position => {
		// console.log("--> check allow message by position params", !position);
		let showDecisionButtons;

		if (!position) {
			// we are friend
			showDecisionButtons = false;
		} else {
			// we are not friend yet
			if (this.allowMessage(this.props.chatList)) {
				// I start messaging , then I can keep messaging to the other accept/decline it
				showDecisionButtons = false;
			} else {
				// I get messaging from anybody that is not my friend and need to take decision abbout friendship
				showDecisionButtons = true;
			}
		}

		if (!showDecisionButtons) {
			let { message } = this.state;

			// show send message area
			return (
				<View style={styles.textAreaBox}>
					<TextInput
						style={styles.textArea}
						autoCorrect={false}
						multiline={true}
						value={message}
						autoFocus={true}
						blurOnSubmit={true}
						returnKeyType="send"
						onChangeText={message => this.setState({ message })}
					/>
					{/* todo: change icon and add conditional opacity */}
					<TouchableOpacity
						onPress={this.send}
						disabled={
							!this.state.message.length
							// ||
							// this.props.friendRequest.friendshipRequestStatus !== "connected"
						}
					>
						<Image source={discussionIcon} style={styles.textAreaActionImage} />
					</TouchableOpacity>
				</View>
			);
		}

		if (showDecisionButtons) {
			// show accept|decline button area
			return (
				<View style={styles.confirmDiscussionBox}>
					<TouchableOpacity
						style={[styles.confirmDiscussionItems, styles.leftBtn]}
						onPress={() => this.DeclineRequest()}
					>
						<Text style={styles.declineBtn}>Decline</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => this.AcceptRequest()}
						style={[styles.confirmDiscussionItems, styles.rightBtn]}
					>
						<Text style={appCss.defaultFontApp}>Accept</Text>
					</TouchableOpacity>
				</View>
			);
		}
	};

	AcceptRequest = () => {
		this.setState({ position: false });
		this.props.chatRequestResponse({
			memberOwner: this.state.memberOwner,
			senderMemberOwner: this.state.friendMemberOwner,
			mode: "accept"
		});
		setTimeout(() => {
			this.props.getFriendshipStatus({
				receiverMemberId: this.state.friendMemberOwner,
				senderMemberId: this.state.memberOwner
			});
		}, 1000);
	};

	DeclineRequest = () => {
		this.props.chatRequestResponse({
			memberOwner: this.state.memberOwner,
			senderMemberOwner: this.state.friendMemberOwner,
			mode: "decline"
		});
		// this.props.navigation.goBack();
	};

	// ****************************************************************************************************************
	// showActionSheet = () => {
	// 	ActionSheetIOS.showActionSheetWithOptions(
	// 		{
	// 			options: BUTTONS,
	// 			cancelButtonIndex: CANCEL_INDEX,
	// 			destructiveButtonIndex: DESTRUCTIVE_INDEX
	// 		},
	// 		buttonIndex => {
	// 			if (BUTTONS[buttonIndex] === "BLOCK") {
	// 				this.props.blockMember({
	// 					memberOwner: this.props.memberOwner,
	// 					blockedMemberOwner: this.state.friendMemberOwner
	// 				});
	// 			}
	// 		}
	// 	);
	// };

	render() {
		// let offset = (width * 0.14) + getStatusBarHeight(true) + 15 + 3 + 30 + 40 + 15 + 3 + 7;// this.props.offset
		return (
			<View style={[styles.container, this.props.containerStyle]}>
				<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={this.props.headerOffset}>
					<ScrollView
						ref={ref => (this.scrollView = ref)}
						style={styles.chatBox}
						showsVerticalScrollIndicator={false}
						onContentSizeChange={(contentWidth, contentHeight) => {
							this.scrollView.scrollToEnd({ animated: true });
						}}
					>
						{/* {this.props.chatList.map((item, i) => this.titleFunc(item, i))} */}
						{this.testChats.map((item, i) => this.titleFunc(item, i))}
					</ScrollView>

					{this.discussionStatus(this.state.position)}
				</KeyboardAvoidingView>
			</View>
		);
	}
}
