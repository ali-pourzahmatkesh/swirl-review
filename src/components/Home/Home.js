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
import EmptyList from "../EmptyList";
// import defaultMoment from "moment";
import moment from "moment-timezone";
import MessagePopup from "../MessagePopup/MessagePopup";
import InviteFromContacts from "../InviteFromContacts/InviteFromContacts";
const COLORS = CONFIG.colors;

// import Discussion from "../Discussion";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			newMessageModalVisible: false,
			list: []
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
			this.state.list.length != nextProps.chatList.length
		) {
			this.setState({ list: nextProps.chatList });
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

	loadHeader = () => {
		return (
			<View style={appCss.header}>
				<TouchableOpacity
					onPress={() => this.setState({ newMessageModalVisible: true })}
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
			new Date(item["availableAt"]).getTime() < new Date().getTime();

		return (
			<View style={[styles.chatListBox, !isAvailable && styles.chatListBlockBox]}>
				<View style={styles.avatarBox}>
					<Avatar userId={item.senderMemberId}  size={57} position="profile" />
				</View>
				<TouchableOpacity
					onPress={() => {
                        this.loadDetail(item, isAvailable);
                    }}
					style={styles.chatListSubjectBox}>
					<View>
						<Text
							style={[
								styles.chatSubject,
								!isAvailable && { color: COLORS.bodyColor }
							]}
						>
							{item["senderName"]}
						</Text>
						<Text
							style={[
								styles.chatDesc,
								!isAvailable && { color: COLORS.bodyColor }
							]}
						>
							{(!isAvailable && "Tap to unswirl!") ||
								moment(item["availableAt"], "YYYYMMDD")
									.startOf("hour")
									.fromNow()}
						</Text>
					</View>
					<View style={styles.otherInfo}>
						<View>
							<Text
								style={[
									styles.chatTime,
									!isAvailable && { color: COLORS.bodyColor }
								]}
							>
								{moment(item["availableAt"], "YYYYMMDD").fromNow()}
							</Text>
						</View>
						{(!item["isSeen"] || !isAvailable) && (
							<Image
								source={(!isAvailable && logo) || logoOther}
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

	loadDetail = (data, isAvailable) => {
		if (!isAvailable) {
			alert("not Available");
		} else {
			alert("Available");
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
							this.setState({ newMessageModalVisible: false });
						}}
					/>
				</Modal>
				{this.loadHeader()}
				<View style={styles.chatList}>
					{(list.length && (
						<FlatList
							data={list}
							keyExtractor={(item, index) => item.id}
							renderItem={({ item }) => this.loadContentItem({ item })}
							ListEmptyComponent={() => <EmptyList />}
							onEndReachedThreshold={0.5}
							onRefresh={() => {
								this.onRefresh();
							}}
							refreshing={refreshing}
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
				{list.length && (
					<View style={styles.homeBottomBox}>
						<TouchableOpacity
							onPress={() => this.setState({ newMessageModalVisible: true })}
						>
							<View style={styles.iconBottomBox}>
								<Image style={styles.iconBottom} source={addMessage} />
							</View>
						</TouchableOpacity>
					</View>
				)}
			</View>
		);
	}
}

export default Home;
