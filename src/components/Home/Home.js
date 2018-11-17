import React, {Component} from "react";
import {
	FlatList,
	Image,
	Modal,
	TouchableOpacity,
	View,
	Dimensions
} from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import logo from "../../assets/images/logo_bigger.png";
import profile from "../../assets/images/icons/profile.png";
import addMessage from "../../assets/images/icons/Group.png";
import addFriend from "../../assets/images/icons/addFriend1.png"
import emptyIcon from "../../assets/images/icons/messageEmpty.png";;
import EmptyList from "../EmptyList";
import ChatInfo from "./ChatInfo";
import MessagePopup from "../MessagePopup";
import sortChatList from "../../util/sortChatList";
const { height, width } = Dimensions.get('window');
const _ = require("lodash");

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			newMessageModalVisible: false,
			list: [],
			lastIdentifier: null,
			timers: {},
			timersFunctions: {},
			isNewMessage: false,
			resorted: false
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.props.chatGetList({
				id: this.props.id,
				refreshing: true // load a new list of updated messages
			});
		}, 1);
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps", nextProps);
		if (
			nextProps.chatList &&
			Array.isArray(nextProps.chatList) &&
			(this.state.list.length != nextProps.chatList.length ||
				nextProps.resorted === true ||
				this.state.refreshing === true ||
				nextProps.isNewMessage === true)
		) {
			// console.log("----------------------new refresh the list of chats");
			if (
				this.state.refreshing === true ||
				nextProps.isNewMessage === true ||
				nextProps.resorted === true
			) {
				// console.log("refreshing list ....", this.state.refreshing);
				// console.log("check new message ....", nextProps.isNewMessage);

				// remove all old timers
				for (message in this.state.timers) {
					// console.log("a message from timer cycle", message);
					clearTimeout(this.state.timersFunctions[`${message.id}`]);
				}
				this.setState({ timers: {}, timersFunctions: {} });

				// set the new timers
				if (nextProps.chatList.length) {
					// find messages that need to set timer for them

					nextProps.chatList &&
						nextProps.chatList.length &&
						nextProps.chatList.map(message => {
							if (message.isSeen === false) {
								let availableAtByMS = new Date(
									message["availableAt"]
								).getTime();

								let nowByMS = new Date().getTime(); // + timeZoneOffsetByMilliSeconds;

								let intervalByMiliSeconds = availableAtByMS - nowByMS;
								if (intervalByMiliSeconds > 0) {
									let localTimers = this.state.timers;
									let localTimersFunctions = this.state.timersFunctions;

									if (!localTimers[`${message.id}`]) {
										// console.log(
										// 	"*********************** create timer for message ",
										// 	message.id
										// );

										localTimers[`${message.id}`] = message;
										localTimersFunctions[`${message.id}`] = setTimeout(() => {
											// console.log(
											// 	"ready to remove interval for message ",
											// 	message.id
											// );

											let localTimers = this.state.timers;
											let localTimersFunctions = this.state.timersFunctions;

											// update the message client side for correct design
											// let localList = this.state.list.filter(message => {
											// 	return message.id != message.id;
											// });
											// console.log("remove item from list", localList);
											// localList.unshift(message);
											// console.log("add to top of list", localList);

											clearTimeout(localTimersFunctions[`${message.id}`]);
											delete localTimers[`${message.id}`];
											delete localTimersFunctions[`${message.id}`];
											// console.log(
											// 	"------ SET REMOVE ----- timers",
											// 	localTimers,
											// 	"timers func",
											// 	localTimersFunctions
											// );
											//
											// console.log("list", this.state.list);
											let localList = sortChatList(this.state.list);
											this.setState({
												timers: localTimers,
												timersFunctions: localTimersFunctions,
												list: localList
											});
										}, intervalByMiliSeconds);
										// console.log(
										// 	"------ SET ----- timers",
										// 	localTimers,
										// 	"timers func",
										// 	localTimersFunctions
										// );
										this.setState({
											timers: localTimers,
											timersFunctions: localTimersFunctions
										});

										// console.log(
										// 	"new timer set for next ",
										// 	intervalByMiliSeconds,
										// 	" Miliseconds"
										// );
									}
								}
							}
						});
				}

				let orderedChatList = sortChatList(nextProps.chatList);
				this.setState({ list: orderedChatList });

				// trn off isNewMessage flag
				this.props.chatSetStore({
					isNewMessage: false,
					resorted: false
				});
			} else {
				// just update the list
				let orderedChatList = sortChatList(nextProps.chatList);
				this.setState({ list: orderedChatList });
			}
		}

		if (this.state.refreshing != nextProps.chatListRefreshing) {
			this.setState({ refreshing: nextProps.chatListRefreshing });
		}

		console.log('timers from hooooooome', this.state.timers)
	}

	handleSubmit = () => {
		this.props.navigation.push("ProfileScreen", {
			userId: 1, //item.memberId,
			x: 1
		});
	};

	handleInviteSubmit = () => {
		this.props.navigation.push("InviteTabsScreen");
	};

	loadHeader = () => {
		return (
			<View style={appCss.header}>
				<TouchableOpacity
					onPress={this.handleInviteSubmit}
					style={styles.headerIconBox}
				>
					<Image
						style={styles.headerIcon}
						resizeMode={"contain"}
						source={addFriend}
					/>
				</TouchableOpacity>
				<TouchableOpacity style={appCss.headerLogoBox}>
					<Image
						style={appCss.headerIcon}
						resizeMode={"contain"}
						source={logo}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.headerIconBox}
					onPress={this.handleSubmit}
				>
					<Image
						style={styles.headerIcon}
						resizeMode={"contain"}
						source={profile}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	onRefresh = () => {
		this.props.chatGetList({
			id: this.props.id,
			refreshing: true // load a new list of updated messages
		});
	};
	handleLoadMore = () => {
		console.log("handleLoadMore", this.state.list.length);
		if (this.state.list.length) {
			let lastMessage = _.minBy(this.state.list, "identifier");
			let lastIdentifier = lastMessage.identifier;
			console.log("lastIdentifier", lastIdentifier);
			// if (this.state.lastIdentifier != lastIdentifier) {
			this.setState({ lastIdentifier: lastIdentifier }, () => {
				console.log("call more page", lastIdentifier);
				this.props.chatGetList({
					id: this.props.id,
					identifier: lastIdentifier,
					refreshing: false
				});
			});
			// }
		}
	};

	render() {
		const { list, refreshing } = this.state;
		return (
			<View style={styles.container}>
				<Modal
					visible={this.state.newMessageModalVisible}
					animationType="slide"
					transparent={true}
				>
					<MessagePopup
						closeMessageModal={() => {
							this.setState({
								newMessageModalVisible: false
							});
						}}
					/>
				</Modal>
				{this.loadHeader()}
				<View style={styles.chatList}>
					{(list.length && (
						<FlatList
							data={list}
							keyExtractor={(item, index) => "msg_" + item.id + item.identifier}
							renderItem={
								({item}) => <ChatInfo
												item={{item}}
												navigation={this.props.navigation}
												visitMessage={this.props.visitMessage}
												setHomeState={(state)=>{
													this.setState(state);
												}}
											/>
							}
							ListEmptyComponent={() => <EmptyList />} // what is the point of having this and the empty list below?
							onRefresh={() => {
								this.onRefresh();
							}}
							refreshing={refreshing}
							onEndReachedThreshold={0.3}
							onEndReached={() => {
								this.handleLoadMore();
							}}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						/>
					)) || (
						<EmptyList
							emptyIcon={emptyIcon}
							emptyText={'Nobody swirled you… Yet..'}
							textStyle={{fontFamily: 'MuseoSansRounded-1000'}}
							containerStyle={{
								marginTop: height * -0.15
							}}
						/>
					)}
				</View>
				<View style={styles.homeBottomBox}>
					<TouchableOpacity
						onPress={() => this.setState({ newMessageModalVisible: true })}
					>
						<View style={styles.iconBottomBox}>
							<Image style={styles.iconBottom} source={addMessage} />
						</View>
					</TouchableOpacity>
					<View style={styles.iconBottomBackground}/>
				</View>
			</View>
		);
	}
}

export default Home; 
