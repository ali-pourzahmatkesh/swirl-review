import React, { Component } from "react";
import {
	FlatList,
	Image,
	Modal,
	TouchableOpacity,
	View,
	Dimensions,
	Animated,
	Easing,
	RefreshControl
} from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import logo from "../../assets/images/logo1.png";
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
			resorted: false,
			fullSpin: false
		};

		const MAX_DEPTH = height * -0.14

		this.scrollY = new Animated.Value(0);
		this.translateY = new Animated.Value(0);
		this.rotate = new Animated.Value(0);
		this.translateYInter = this.translateY.interpolate({
			// inputRange: [-200, 0],
			// outputRange: [200, 0],
			inputRange: [-200, 0],
			outputRange: [130, 0],
			// easing: Easing.bezier(.76,.63,.68,.94)
		});
		this.rotateInter= this.rotate.interpolate({
			inputRange: [-360, 0],
			outputRange: ['360deg', '0deg']
		});


		this.scrollY.addListener(({value}) => {
			this.translateY.setValue(value);

			if(this.rotate._value < MAX_DEPTH && value > MAX_DEPTH){
				this.setState({
					fullSpin: false
				}, () => {
					this.rotate.setValue(value);
				})
			}
			else if(this.rotate._value > MAX_DEPTH){
				this.rotate.setValue(value);
			}
			
		});
		this.translateY.addListener(({value}) => {
			if(value > 0){
				this.translateY.setValue(0);
			}
			if(value < MAX_DEPTH){
				this.translateY.setValue(MAX_DEPTH);
			}
		});
		this.rotate.addListener(({value}) => {
			if(value > 0){
				this.rotate.setValue(0);
			}
			if(value < MAX_DEPTH && !this.state.fullSpin){
				this.setState({
					fullSpin: true
				}, () => this.startFullSpin())
			}
		})
	}

	startFullSpin = () => {
		console.log('running animation', this.rotate._value)
		Animated.timing(this.rotate, {
			toValue: this.rotate._value - 75,
			duration: 100,
		}).start(() => {
			if(this.state.fullSpin){
				this.startFullSpin();
			}
		})
	}

	componentDidMount() {
		setTimeout(() => {
			this.props.chatGetList({
				id: this.props.id,
				// refreshing: true // load a new list of updated messages
			});
		}, 1);
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps", nextProps);
		if (
			nextProps.chatList &&
			Array.isArray(nextProps.chatList) &&
			this.state.list.length != nextProps.chatList.length
			// (this.state.list.length != nextProps.chatList.length ||
			// 	nextProps.resorted === true ||
			// 	this.state.refreshing === true ||
			// 	nextProps.isNewMessage === true)
		) {
			if (
				this.state.refreshing === true ||
				nextProps.isNewMessage === true ||
				nextProps.resorted === true // we should probably break this out and just resort it
			) {
				// remove all old timers
				for (message in this.state.timers) {
					clearTimeout(this.state.timersFunctions[`${message.id}`]);
				}
				this.setState({ timers: {}, timersFunctions: {} });

				// set the new timers
				if (nextProps.chatList.length) {
					// find messages that need to set timer for them

					nextProps.chatList &&
						nextProps.chatList.length &&
						nextProps.chatList.map(message => {
							// don't need to set a timer if it hasn't been seen
							// or if there's no chat list to begin with
							if (message.isSeen === false) {
								let availableAtByMS = new Date(
									message["availableAt"]
								).getTime();

								let nowByMS = new Date().getTime(); // + timeZoneOffsetByMilliSeconds;

								let intervalByMiliSeconds = availableAtByMS - nowByMS;
								if (intervalByMiliSeconds > 0) {
									// why do we care what the timer(functions) are
									// right here if we set it to an empty object up top?
									let localTimers = this.state.timers; // I don't think we're even using this???
									let localTimersFunctions = this.state.timersFunctions;

									// again, I feel like this will always run because localTimers'
									// data source is this.state.timers which we previously set 
									// to an empty object (has no keys)
									if (!localTimers[`${message.id}`]) {
										localTimers[`${message.id}`] = message;
										localTimersFunctions[`${message.id}`] = setTimeout(() => {
											// once the interval is over, the message is ready
											// we should show an in app notification here
											this.props.showToast(`Open ${message.senderName}'s swirl now!`);

											// this needs to happen because we're not sure of the state
											// at the time of the interval's end
											let localTimers = this.state.timers;
											let localTimersFunctions = this.state.timersFunctions;

											// clears timers and removes them from list
											clearTimeout(localTimersFunctions[`${message.id}`]);
											delete localTimers[`${message.id}`];
											delete localTimersFunctions[`${message.id}`];

											// resorting 
											let localList = sortChatList([].concat.apply([], this.state.list));
											this.setState({
												timers: localTimers,
												timersFunctions: localTimersFunctions,
												list: localList
											});
										}, intervalByMiliSeconds);


										this.setState({
											timers: localTimers,
											timersFunctions: localTimersFunctions
										});
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
					<Animated.Image
						style={[appCss.headerIcon, {
							transform: [
								{translateY: this.scrollY._value <= 0 ? this.translateYInter : 0},
								{rotate: this.rotateInter}
							]
						}]}
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
		// todo
		// if (this.state.list.length) {
		// 	let lastMessage = _.minBy(this.state.list, "identifier");
		// 	let lastIdentifier = lastMessage.identifier;
		// 	console.log("lastIdentifier", lastIdentifier);
		// 	// if (this.state.lastIdentifier != lastIdentifier) {
		// 	this.setState({ lastIdentifier: lastIdentifier }, () => {
		// 		console.log("call more page", lastIdentifier);
		// 		this.props.chatGetList({
		// 			id: this.props.id,
		// 			identifier: lastIdentifier,
		// 			refreshing: false
		// 		});
		// 	});
		// 	// }
		// }
	};
	
	componentWillUnmount() {
		this.scrollY.removeAllListeners()
	}

	render() {
		const { list, refreshing } = this.state;
		const scrollEvent = Animated.event([
			{
				nativeEvent: {
					contentOffset: {
						y: this.scrollY
					}
				}
			},
		]);
		
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
							// item is an array here
							// keyExtractor={(item, index) => "msg_" + item.id + item.identifier}
							keyExtractor={(item, index) => "msg_" + item[item.length - 1].id}
							renderItem={
								({ item }) => <ChatInfo
									messageList={{ item }}
									navigation={this.props.navigation}
									visitMessage={this.props.visitMessage}
									setHomeState={(state) => {
										this.setState(state);
									}}
								/>
							}
							ListEmptyComponent={() => <EmptyList />} // what is the point of having this and the empty list below?
							refreshControl={
								<RefreshControl
									refreshing={refreshing}
									onRefresh={() => {
										this.onRefresh();
									}}
									tintColor="transparent"
								/>
							}
							onEndReachedThreshold={0.3}
							onEndReached={() => {
								this.handleLoadMore();
							}}
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							onScroll={scrollEvent}
							scrollEventThrottle={30}
						/>
					)) || (
							<EmptyList
								emptyIcon={emptyIcon}
								emptyText={'Nobody swirled you… Yet..'}
								textStyle={{ fontFamily: 'MuseoSansRounded-1000' }}
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
					<View style={styles.iconBottomBackground} />
				</View>
			</View>
		);
	}
}

export default Home; 
