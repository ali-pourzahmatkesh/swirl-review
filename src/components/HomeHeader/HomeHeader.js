import React, { Component } from "react";
import {
	Text,
	View,
	PanResponder,
	Animated,
	TouchableOpacity,
	Easing,
	FlatList,
	Image,
	Dimensions
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import homeHeaderStyles from "./style";

import Avatar from "../Avatar";

import profilePic from "../../assets/images/chatListWhiteFill.png";
// import { ScrollView } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get("window");

// https://github.com/glepur/react-native-swipe-gestures
// ^using gesture recognition logic from here
function isValidSwipe(
	velocity,
	velocityThreshold,
	directionalOffset,
	directionalOffsetThreshold
) {
	return (
		Math.abs(velocity) > velocityThreshold &&
		Math.abs(directionalOffset) < directionalOffsetThreshold
	);
}

class HouseChatHeader extends Component {
	constructor(props) {
		super(props);

		// let activityHeight = 40 + 15 + 3 + 7;//height of activity item, height of label, margin bottom of label, padding top of activity container
		this.state = {
			pan: new Animated.ValueXY({ x: 0, y: this.props.activityStubHeight }),
			activityShown: false,
			swipeConfig: {
				velocityThreshold: 0.3,
				directionalOffsetThreshold: 80
			},
			activityStubHeight: this.props.activityStubHeight,
			myStyles: homeHeaderStyles.getSheet(
				this.props.outerStyles,
				this.props.topHeight,
				this.props.activityListHeight
			)
		};
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onMoveShouldSetResponderCapture: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
			onPanResponderGrant: (e, gestureState) => {
				this.state.pan.setOffset({
					x: this.state.pan.x._value,
					y: this.state.pan.y._value
				});
				this.state.pan.setValue({ x: 0, y: 0 });
			},

			onPanResponderMove: (e, gestureState) => {
				this.state.pan.y._offset + gestureState.dy >=
					this.state.activityStubHeight &&
				this.state.pan.y._offset + gestureState.dy <= height + 10
					? Animated.event([
							null,
							{ dx: this.state.pan.x, dy: this.state.pan.y }
					  ])(e, gestureState)
					: null;
			},

			onPanResponderRelease: (e, gestureState) => {
				this.state.pan.flattenOffset();
				let direction = this._getSwipeDirection(gestureState);

				if (direction === "UP") {
					this.activityHide();
				} else if (direction === "DOWN") {
					this.activityShow();
				} else {
					// console.log(`offset = ${this.state.pan.y._value}, value = ${this.state.pan.y._value}, midpoint = ${(height + 100) / 2}`)
					if (
						this.state.pan.y._value <
						(height + this.state.activityStubHeight) / 2
					) {
						this.activityHide();
					} else {
						this.activityShow();
					}
				}
			}
		});
	}

	activityShow = () => {
		Animated.timing(this.state.pan.y, {
			// toValue: height - (getStatusBarHeight(true) + 15 + 40), // height minus top part with heads
			// toValue: height - ((width * 0.14) + getStatusBarHeight(true) + 20 + 3 + 30),
			toValue: height - this.props.topHeight,
			duration: 300,
			easing: Easing.out(Easing.ease)
		}).start();
		this.setState({
			activityShown: true
		});
	};
	activityHide = () => {
		Animated.timing(this.state.pan.y, {
			toValue: this.state.activityStubHeight,
			duration: 300,
			easing: Easing.out(Easing.ease)
		}).start();
		this.setState({
			activityShown: false
		});
	};
	handleActivityToggle = () => {
		if (this.state.activityShown) {
			this.activityHide();
		} else {
			this.activityShow();
		}
	};

	_getSwipeDirection(gestureState) {
		const { dy } = gestureState;
		if (this._isValidVerticalSwipe(gestureState)) {
			return dy > 0 ? "DOWN" : "UP";
		}
		return null;
	}

	_isValidVerticalSwipe(gestureState) {
		const { vy, dx } = gestureState;
		const {
			velocityThreshold,
			directionalOffsetThreshold
		} = this.state.swipeConfig;
		return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
	}

	renderActiveHeads = ({ item }) => {
		return (
			<Avatar
				userId={item.id}
				size={this.props.outerStyles.activeHeadsList.height}
				avatarContainerStyle={{
					marginRight: width * 0.012
				}}
			/>
		);
	};

	renderActivityItem = ({ item }) => {
		return (
			<View style={this.state.myStyles.activityItem}>
				<Avatar
					userId={item.id}
					size={30}
					avatarContainerStyle={{
						marginLeft: width * 0.03,
						marginRight: width * 0.02
					}}
				/>
				<Text style={this.state.myStyles.activityTextLight}>
					<Text style={this.state.myStyles.activityTextHeavy}>Name</Text> has
					performed this action @ x time.
				</Text>
			</View>
		);
	};

	render() {
		let panHandlersForBottom = this.state.activityShown
			? this._panResponder.panHandlers
			: {};
		let panHandlersForFull = this.state.activityShown
			? {}
			: this._panResponder.panHandlers;
		return (
			<View style={this.state.myStyles.container}>
				<View style={this.state.myStyles.headerBackground}>
					<Text style={this.state.myStyles.titleText}>House Name</Text>
					<View style={this.state.myStyles.listLabel}>
						<Text style={this.state.myStyles.listLabelText}>Active 🏠</Text>
					</View>
					<View style={[this.state.myStyles.activeHeadsContainer]}>
						<FlatList
							contentContainerStyle={this.state.myStyles.activeHeadsList}
							data={[
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								11,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1,
								1
							]}
							renderItem={this.renderActiveHeads}
							keyExtractor={(item, index) => index + ""}
							horizontal={true}
							scrollEnabled={true}
						/>
					</View>
				</View>
				<Animated.View
					style={[
						this.state.myStyles.activityContainer,
						{ height: this.state.pan.y }
					]}
					{...panHandlersForFull}
				>
					<View style={this.state.myStyles.listLabel}>
						<Text style={this.state.myStyles.listLabelText}>Activity ⚡️</Text>
					</View>
					<View style={{ flex: 1, overflow: "hidden" }}>
						<View style={this.state.myStyles.activityFeed}>
							<FlatList
								data={[
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									11,
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									1,
									1
								]}
								renderItem={this.renderActivityItem}
								keyExtractor={(item, index) => index + ""}
							/>
						</View>
						<View
							style={this.state.myStyles.dragZone}
							{...panHandlersForBottom}
						/>
					</View>
					<TouchableOpacity
						onPress={this.handleActivityToggle}
						style={this.state.myStyles.activityToggleButton}
					>
						<Text style={{ textAlign: "center" }}>V</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	}
}

export default HouseChatHeader;
