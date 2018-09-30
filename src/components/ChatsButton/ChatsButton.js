import React, { Component } from "react";
import Swipeout from "react-native-swipeout";
import { AlertIOS, Animated, Text, TouchableOpacity, View } from "react-native";
import Avatar from "../Avatar";
import styles from "./style";
import {CONFIG} from "../../../config";
const colors = CONFIG.colors;
const ANIMATION_DURATION = 300;
const ROW_HEIGHT = 80;
export default class ChatsButton extends Component {
	state = {
		_animated: new Animated.Value(0)
	};

	handleDeleteChat = memberId => {
		Animated.timing(this.state._animated, {
			toValue: 0,
			duration: ANIMATION_DURATION
		}).start(() =>
			this.props.callDeleteChat({
				memberId1: this.props.id,
				memberId2: memberId
			})
		);
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

    loadList = ( item, i ) => {
        let swipeBtns = [ {
            text: 'Delete',
            backgroundColor: colors.appColor,
            onPress: () => {
                this.deleteNote(item)
            }
        } ];

		Animated.timing(this.state._animated, {
			toValue: 1,
			duration: ANIMATION_DURATION
		}).start();
		const rowStyles = [
			{
				opacity: this.state._animated.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1]
				}),
				height: this.state._animated.interpolate({
					inputRange: [0, 1],
					outputRange: [0, ROW_HEIGHT],
					extrapolate: "clamp"
				})
				// transform: [
				//     {
				//         scale: this.state._animated.interpolate({
				//             inputRange: [ 0, 1 ],
				//             outputRange: [ 0.85, 1 ],
				//             extrapolate: 'clamp',
				//         })
				//     }
				// ],
			}
		];

        return (
            <Animated.View style={rowStyles} key={i}>
                <View
                    style={[
                        item.isSeen ? styles.listViewItemsActive : ""
                    ]}
                >
                    <Swipeout
                        autoClose={true}
                        right={swipeBtns}
                        style={{backgroundColor: "transparent"}}
                    >
                        <View
                            style={[ styles.listViewItems]}
                        >
                            {this.avatarFunc(item)}
                            {this.titleFunc(item)}
                            <View style={styles.lastStatusImageBox}>{this.positionFunc(item)}</View>
                        </View>
                    </Swipeout>
				</View>
			</Animated.View>
		);
	}

    avatarFunc = item => {
        return (
            <View style={styles.avatarBox}>
                <Avatar userId={item.memberId} size={50}/>
            </View>
        );
    };
    titleFunc = item => {
        return (
            <TouchableOpacity
                onPress={() => this.props.handleChat(item)}
                style={styles.titleBox}
            >
                <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.boxSubject}
                >
                    {item.username}
                </Text>
                <View style={styles.lastStatusBox}>
                    <Text style={styles.lastStatusText}>
                        {item.recentMessage}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    positionFunc = item => {
        if( item.unreadMessageCount ) {
            return (
                <View style={styles.unreadChatsBadge}>
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
            return null
        }
    };

    render() {
        return this.loadList(this.props.chatItem)
    }
}
