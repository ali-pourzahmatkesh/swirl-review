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
import appCss from "../../../app.css";
import { CONFIG } from "../../../config";
import Avatar from "../Avatar";
import styles from "./style";
import messageFill from "../../assets/images/chatList.png";
const colors = CONFIG.colors;

export default class SavedProfile extends Component {
	componentDidMount() {
		this.props.getListSavedProfile(this.props.id);
	}

	handleChatNavigation = item => {
		// if (this.props.onClickItem) {
		// 	this.props.onClickItem();
		// }
		this.props.navigation.navigate("DiscussionScreen", {
			friendMemberOwner: item.saveProfileId.id,
			name: item.saveProfileId.name
		});
	};

	handleDeleteSavedProfile = id => {
		this.props.callDeleteSavedProfile({
			id
		});
	};

	deleteNote = item => {
		AlertIOS.alert("Delete Item", "Are you sure for delete Item ?", [
			{
				text: "No",
				style: "cancel"
			},
			{
				text: "Yes",
				onPress: () => this.handleDeleteSavedProfile(item.id)
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
			<View style={[item.isSeen ? styles.listViewItemsYellow : ""]}>
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

	formatTime(timeByMinute = 60) {
		if (timeByMinute <= 60) {
			timeByMinute = `${timeByMinute} minutes left to connect`;
		} else {
			timeByMinute = `${parseInt(timeByMinute / 60)} hours left to connect`;
		}
		return timeByMinute; //timeByMinute.charAt(0).toUpperCase() + timeByMinute.slice(1);
	}

	Capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	avatarFunc = item => {
		return (
			<View style={appCss.avatarBox}>
				<Avatar userId={item.saveProfileId.id} size={60} />
			</View>
		);
	};

	prepareForRedirectToProfile = item => {
		this.props.closeModal();
		this.props.navigation.push("ProfileScreen", {
			userId: item.saveProfileId.id,
			x: 1
		});
	};

	titleFunc = item => {
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
						{this.Capitalize(item.saveProfileId.name)}
					</Text>
				</TouchableOpacity>
				<View style={appCss.titleBoxDetail}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={[appCss.titleBoxDetailText, appCss.thinDefaultFontApp]}
					>
						{this.formatTime(item.remainingTime)}
					</Text>
				</View>
			</View>
		);
	};

	positionFunc = item => {
		return (
			<TouchableOpacity
				style={[appCss.actionBox, { paddingRight: 10 }]}
				onPress={() => this.handleChatNavigation(item)}
			>
					<Image
						resizeMode={"contain"}
						style={styles.arrowPositionIcon}
						source={messageFill}
					/>
			</TouchableOpacity>
		);
	};

	render() {
		return (
			<FlatList
				data={this.props.listSavedProfile}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => this.loadList({ item })}
				// ListEmptyComponent={() => <EmptyList />}
				onEndReachedThreshold={0.5}
				onRefresh={() => {
					this.props.getListSavedProfile(this.props.id);
				}}
				refreshing={this.props.getListSavedProfileRefreshing}
				style={{ flexGrow: 0 }}
			/>
		);
	}
}
