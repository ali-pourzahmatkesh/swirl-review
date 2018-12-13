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
import SplashScreen from 'react-native-splash-screen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styles from "./style";
import appCss from "../../../app.css";
import logo from "../../assets/images/logo1.png";
import profile from "../../assets/images/icons/profile.png";
import addMessage from "../../assets/images/icons/Group.png";
import addFriend from "../../assets/images/icons/addFriend1.png"
import emptyIcon from "../../assets/images/icons/messageEmpty.png";;
import friendRequestAvailable from "../../assets/images/icons/friendRequest.png";
import EmptyList from "../EmptyList";
import ChatInfo from "./ChatInfo";
import MessagePopup from "../MessagePopup";
import sortChatList from "../../util/sortChatList";

import xOpeningGif from "../../assets/animations/opening5.gif";

const openingGif = isIphoneX() ? xOpeningGif : null;
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
			timerFunctions: {},
			isNewMessage: false,
			resorted: false,
			fullSpin: false,
			animCanRun: false,
			animHasRun: false,
			timeOutRan: false
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
		Animated.timing(this.rotate, {
			toValue: this.rotate._value - 75,
			duration: 100,
		}).start(() => {
			if(this.state.fullSpin){
				this.startFullSpin();
			}
		})
	}

	handleSplashAnim = () => {
		SplashScreen.hide();
		setTimeout(() => {
			this.setState({
				animHasRun: true,
				animCanRun: false
			}, () => this.props.finishEntry())
		}, 600); // removes image tag at about the time the animation finishes
	}

	componentDidMount() {
		this.setState({
			list: this.props.chatList
		})
		setTimeout(() => {
			this.props.chatGetList({
				id: this.props.id,
			});
			this.props.getListData({
				receiverMemberId: this.props.id
			});
			this.props.setNav(this.props.navigation);
		}, 1);
		console.log('mounted the home screen ****************', this.props.friendRequests)
		if(!this.props.finishedEntry){
			console.log('capping timeout ************')
			this.capLoadingScreenTime = setTimeout(() => {
				this.setState({
					animCanRun: true,
					timeOutRan: true
				}, this.handleSplashAnim);
			}, 500)
		}	
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps", nextProps);
		if (
			!this.state.animHasRun &&
			!nextProps.chatListRefreshing &&
			this.props.chatListRefreshing &&
			!this.state.timeOutRan
		){
			if(this.capLoadingScreenTime){
				clearTimeout(this.capLoadingScreenTime);
			}
			// this.setState({
			// 	animCanRun: true
			// }, () => {
			// 	console.log('cleared the timeout and got a response instead ************************************************************************')
			// 	SplashScreen.hide();
			// 	setTimeout(() => {
			// 		this.setState({
			// 			animHasRun: true,
			// 			animCanRun: false
			// 		}, () => this.props.finishEntry())
			// 	}, 600); // removes image tag at about the time the animation finishes
			// })
			this.setState({
				animCanRun: true
			}, this.handleSplashAnim)
		}

		if (
			nextProps.chatList &&
			Array.isArray(nextProps.chatList) &&
			this.state.list.length != nextProps.chatList.length
		) {
			if (
				this.state.refreshing === true ||
				nextProps.isNewMessage === true
			) {
				// remove all old timers
				for (message in this.state.timerFunctions) {
					clearTimeout(this.state.timerFunctions[`${message.id}`]);
				}
				this.setState({ timers: {}, timerFunctions: {} });

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
									let localTimerFunctions = this.state.timerFunctions;
									localTimerFunctions[`${message.id}`] = setTimeout(() => {
										// once the interval is over, the message is ready
										// we should show an in app notification here
										this.props.showToast(`Open ${message.senderName}'s swirl now!`, message);

										// this needs to happen because we're not sure of the state
										// at the time of the interval's end
										let localTimerFunctions = this.state.timerFunctions;

										// clears timers and removes them from list
										clearTimeout(localTimerFunctions[`${message.id}`]);
										delete localTimerFunctions[`${message.id}`];

										// resorting 
										let localList = sortChatList([].concat.apply([], this.state.list));
										this.setState({
											timerFunctions: localTimerFunctions,
											list: localList
										});
									}, intervalByMiliSeconds);


									this.setState({
										timerFunctions: localTimerFunctions
									});
								}
							}
						});
				}

				let orderedChatList = sortChatList(nextProps.chatList);
				this.setState({ list: orderedChatList });

				// turn off isNewMessage flag
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
						source={this.props.friendRequests.length === 0 ? addFriend : friendRequestAvailable}
					/>
				</TouchableOpacity>
				<View style={appCss.headerLogoBox}>
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
				</View>
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
		this.scrollY.removeAllListeners();
		this.translateY.removeAllListeners();
		this.rotate.removeAllListeners();
	}

	render() {
		const {
			list,
			refreshing,
			animCanRun,
			animHasRun
		} = this.state;

		const {
			navigation,
		} = this.props;
		const scrollEvent = Animated.event([
			{
				nativeEvent: {
					contentOffset: {
						y: this.scrollY
					}
				}
			},
		]);
		let gifHeight = height * 1.0;
		let gifWidth = width * 1.0;
		
		return (
			// https://github.com/thegamenicorus/react-native-swipe-gestures
			// ^fork of react-native-swipe-gestures that allows disabling of 
			// swipe detection for certain directions. unblocks the list below
			<GestureRecognizer
				style={styles.container}
				config={{
					detectSwipeUp: false,
					detectSwipeDown: false,
				}}
				onSwipeLeft={() => { navigation.navigate('ProfileScreen') }}
				onSwipeRight={() => { navigation.navigate('InviteTabsScreen') }}
			>
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
				{!this.props.finishedEntry && animCanRun && !animHasRun &&
					<Image
						source={openingGif}
						style={{
							height: gifHeight,
							width: gifWidth,
							// borderWidth: 10,
							position: 'absolute',
							zIndex: 2,
							margin: 'auto',
							top: ((gifHeight * 0.5) - (height * 0.5)) * -1,
							left: ((gifWidth * 0.5) - (width * 0.5)) * -1,
						}}
					/>
				}
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
										// refreshing={false}
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
							style={styles.iconBottomButton}
						>
							<View style={styles.iconBottomBox}>
								<Image style={styles.iconBottom} source={addMessage} />
							</View>
						</TouchableOpacity>
						<View style={styles.iconBottomBackground} />
					</View>
				</View>
			</GestureRecognizer>
		);
	}
}

export default Home; 
