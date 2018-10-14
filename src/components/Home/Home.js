import React, { Component } from "react";
import {
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
	Modal
} from "react-native";
import { NavigationActions, SafeAreaView } from "react-navigation";
import styles from "./style";
import appCss from "../../../app.css";
import logo from "../../assets/images/logo_bigger.png";
import logoOther from "../../assets/images/logo_bigger_other.png";
import profile from "../../assets/images/icons/profile.png";
import addMessage from "../../assets/images/icons/Group.png";
import noSwirl from "../../assets/images/icons/noSwirl.png";
import Avatar from "../Avatar";
import { CONFIG } from "../../../config";
const COLORS = CONFIG.colors;
import EmptyList from "../EmptyList";
// import defaultMoment from "moment";
import moment from "moment-timezone";
// import ReactMomentCountDown from "react-moment-countdown";
import TimerCountdown from "react-native-timer-countdown";
import MessagePopup from "../MessagePopup";
import InviteFromContacts from "../InviteFromContacts/InviteFromContacts";

import sortChatList from "../../util/sortChatList";

// import Discussion from "../Discussion";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			newMessageModalVisible: false,
			list: [],
			lastIdentifier: null,
			timers: {},
			timersFunctions: {}
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
				nextProps.resorted === true)
		) {
			console.log("----------------------new refresh the list of chats");
			if (
				this.state.refreshing === true ||
				nextProps.isNewMessage === true ||
				nextProps.resorted === true
			) {
				console.log("refreshing list ....", this.state.refreshing);
				console.log("new message ....", nextProps.isNewMessage);

				// remove all old timers
				for (message in this.state.timers) {
					console.log("a message from timer cycle", message);
					clearTimeout(this.state.timersFunctions[message.id]);
				}
				this.setState({ timers: {}, timersFunctions: {} });

				// set the new timers
				if (nextProps.chatList.length) {
					// find messages that need to set timer for them
					nextProps.chatList.map(message => {
						if (message.isSeen === false) {
							let intervalByMiliSeconds =
								new Date(message["availableAt"]).getTime() -
								new Date().getTime();

							if (intervalByMiliSeconds > 0) {
								let localTimers = this.state.timers;
								let localTimersFunctions = this.state.timersFunctions;

								localTimers[message.id] = message;
								localTimersFunctions[message.id] = setTimeout(() => {
									console.log(
										"ready to remove interval for message ",
										message.id
									);

									// update the message client side for correct design
									// let localList = this.state.list.filter(msg => {
									// 	return msg.id != message.id;
									// });
									// console.log("remove item from list", localList);
									// localList.unshift(message);
									// console.log("add to top of list", localList);

									clearTimeout(localTimersFunctions[message.id]);
									delete localTimers[message.id];
									delete localTimersFunctions[message.id];
									console.log(
										"------ SET REMOVE ----- timers",
										localTimers,
										"timers func",
										localTimersFunctions
									);

									let localList = sortChatList(localList);
									this.setState({
										timers: localTimers,
										timersFunctions: localTimersFunctions,
										list: localList
									});
								}, intervalByMiliSeconds);
								console.log(
									"new timer set for next ",
									intervalByMiliSeconds,
									" Miliseconds"
								);
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
			}
		}

		if (this.state.refreshing != nextProps.chatListRefreshing) {
			this.setState({ refreshing: nextProps.chatListRefreshing });
		}
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
					style={appCss.headerIconBox}
				>
					<Image
						style={appCss.headerIcon}
						resizeMode={"contain"}
						source={addMessage}
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
					style={appCss.headerIconBox}
					onPress={this.handleSubmit}
				>
					<Image
						style={appCss.headerIcon}
						resizeMode={"contain"}
						source={profile}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	loadContentItem = ({ item }) => {
		const isAvailable =
			new Date(item["availableAt"]).getTime() <= new Date().getTime();
		let messageHint = "";
		let messageOnpress;
		let messageStyle;
		if (isAvailable) {
			if (item.isSeen) {
				messageHint = () => {
					return (
						"Unswirled " +
						moment(item["availableAt"], "YYYYMMDD")
							.startOf("hour")
							.fromNow(true) +
						" ago"
					);
				};
				messageOnpress = () => {
					this.setState({ newMessageModalVisible: true });
				};
				messageStyle = "Archived";
			} else {
				messageHint = () => {
					return "Tap to unswirl!";
				};
				messageOnpress = () => {
					this.loadDetail(item);
				};
				messageStyle = "Ready";
			}
		} else {
			const remainingSeconds =
				new Date(item["availableAt"]).getTime() - new Date().getTime();

			messageHint = () => {
				return (
					<View>
						<TimerCountdown
							initialSecondsRemaining={remainingSeconds}
							onTick={secondsRemaining => console.log("tick", secondsRemaining)}
							onTimeElapsed={() => console.log("complete")}
							allowFontScaling={true}
							style={{ fontSize: 12 }}
						/>{" "}
						<Text> left</Text>
					</View>
				);
			};

			messageOnpress = () => {};
			messageStyle = "Waiting";
		}

		return (
			<View
				style={[
					styles.chatListBox,
					isAvailable && !item.isSeen && styles.chatListBlockBox
				]}
			>
				<View style={styles.avatarBox}>
					<Avatar userId={item.senderMemberId} size={57} position="profile" />
				</View>
				<TouchableOpacity
					onPress={() => {
						messageOnpress();
					}}
					style={styles.chatListSubjectBox}
				>
					<View>
						<Text
							style={[
								styles.chatSubject,
								messageStyle == "Ready" && { color: COLORS.bodyColor }
							]}
						>
							{item.identifier}
						</Text>
						<Text
							style={[
								styles.chatDesc,
								messageStyle == "Ready" && { color: COLORS.bodyColor }
							]}
						>
							{messageHint()}
						</Text>
					</View>
					<View style={styles.otherInfo}>
						<View>
							<Text
								style={[
									styles.chatTime,
									messageStyle == "Ready" && { color: COLORS.bodyColor }
								]}
							>
								{moment(item["createdAt"], "YYYYMMDD").fromNow(true)}
							</Text>
						</View>
						{(messageStyle == "Ready" || messageStyle == "Waiting") && (
							<Image
								source={(messageStyle == "Waiting" && logoOther) || logo}
								style={styles.otherInfoLogo}
							/>
						)}
					</View>
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

	loadDetail = data => {
		console.log("receive loadDetail", data);
		this.props.navigation.push("MessageDetailScreen", { data });
		if (data.isSeen === false) {
			console.log("it is falseeeeeee", data);
			this.props.visitMessage({
				listOfId: [data.id]
			});
			//let localList = sortChatList(this.state.list);
			//console.log("+++++++++++++ sort again", localList);
			//this.setState({ list: localList });
		}
	};

	handleLoadMore = () => {
		if (this.state.list.length) {
			let lastIdentifier = this.state.list[this.state.list.length - 1]
				.identifier;

			if (this.state.lastIdentifier != lastIdentifier) {
				this.setState({ lastIdentifier: lastIdentifier }, () => {
					this.props.chatGetList({
						id: this.props.id,
						identifier: lastIdentifier
					});
				});
			}
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
							keyExtractor={(item, index) => `${item.id}-${item.identifier}`}
							renderItem={({ item }) => this.loadContentItem({ item })}
							ListEmptyComponent={() => <EmptyList />}
							onRefresh={() => {
								this.onRefresh();
							}}
							refreshing={refreshing}
							onEndReachedThreshold={0.5}
							onEndReached={() => this.handleLoadMore()}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
						/>
					)) || (
						<View style={styles.chatListEmpty}>
							<Image style={styles.iconBottom} source={noSwirl} />
							<Text style={styles.chatListEmptyText}>
								Nobody swirled you… Yet..
							</Text>
						</View>
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
				</View>
			</View>
		);
	}
}

export default Home;
