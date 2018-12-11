import React, { Component } from "react";
import {
	AlertIOS,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import EmptyList from "../EmptyList";
import Avatar from "../../components/Avatar";
import check from "../../assets/images/icons/check4.png";
import cancel from "../../assets/images/icons/close2.png";
import appCss from "../../../app.css";
import styles from "./style";
import emptyIcon from "../../assets/images/icons/messageEmpty.png";
import emptyIconSearch from "../../assets/images/icons/friendSearchEmpty.png";
import LoadingSpinner from "../_CommonComponents/LoadingSpinner";

export default class FriendRequest extends Component {
	state = {
		contentList: []
	};

	componentDidMount() {
		this.props.getListData({
			receiverMemberId: this.props.id
		});
	}

	componentWillReceiveProps(nextProps) {
		console.log("---- componentWillReceiveProps");
		if (nextProps.list && nextProps.list.length != this.state.contentList) {
			console.log("---- new", nextProps.list);
			this.setState({ contentList: nextProps.list });
		}
	}

	componentDidUpdate(prevProps) {
		console.log("---- componentDidUpdate");

		if (this.props.screenProps && prevProps.screenProps) {
			if (
				this.props.screenProps.searchText !== prevProps.screenProps.searchText
			) {
				this.filterContact(
					this.state.contentList,
					this.props.screenProps.searchText
				);
			}
		}
	}

	filterContact = (contentList, searchText) => {
		console.log(contentList, searchText);
		if (searchText && contentList.length) {
			contentList = contentList.filter(
				i =>
					i["senderMemberId"]["username"]
						.toLowerCase()
						.search(searchText.toLowerCase()) > -1
			);
		}

		this.setState({ contentList });
	};

	Capitalize(str) {
		if (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		} else {
			return str;
		}
	}

	avatarFunc = item => {
		return (
			<Avatar userId={item.id} position="image" size={45} />
		);
	};

	titleFunc = item => {
		return (
			<View style={appCss.titleBox}>
				<View>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={[appCss.titleBoxSubject, {fontFamily: 'MuseoSansRounded-900'}]}
					>
						{this.Capitalize(item.senderMemberId.username)}
					</Text>
				</View>
			</View>
		);
	};

	loadList = ({ item }) => {
		return (
			<View style={appCss.listItems}>
				{this.avatarFunc(item)}
				{this.titleFunc(item)}
				{this.actionFunc(item)}
			</View>
		);
	};

	actionFunc = item => {
		let {
			loading,
			loadType,
			actionTarget
		} = this.props

		return (
			<View style={styles.actionBox}>
				<TouchableOpacity
					onPress={() => {
						this.cancel(item.id);
					}}
					style={[styles.actionBtn, styles.cancel]}
				>	
				{(loading && loadType === 'cancel' && actionTarget === item.id) ? 
					<LoadingSpinner
						maxRadius={20}
						lineWidth={2.5}
					/>
					:
					<Image
						source={cancel}
						// source={decline}
						resizeMode={"contain"}
						style={styles.actionIcon}
					/>
				}
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.approve(item.id)}
					style={[styles.actionBtn, styles.verify]}
				>
				{(loading && loadType === 'approve' && actionTarget === item.id) ? 
					<LoadingSpinner
						maxRadius={20}
						lineWidth={2.5}
					/>
					:
					<Image
						source={check}
						resizeMode={"contain"}
						style={[styles.actionIcon, {height: 25, width: 25}]}
					/>
				}
				</TouchableOpacity>
			</View>
		);
	};
	approve = id => {
		this.props.callApprove(id);
	};

	cancel = id => {
		this.props.callCancel(id);
	};

	render() {
		let {
			screenProps
		} = this.props;

		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.contentList}
					style={{ flex: 1 }}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => this.loadList({ item })}
					// empty list component no longer function. keeps icon from reloading
					ListEmptyComponent={
						screenProps && screenProps.searchText ?
						<View style={{flex:1 , alignItems:'center'}}>
							<EmptyList emptyIcon={emptyIconSearch} emptyText={`We searched and searched but no ${'"' + screenProps.searchText + '"'}`}/>
						</View>
						:
						<EmptyList emptyIcon={emptyIcon} emptyText={'No new Friend Requests... Here\'s a lollipop. '}/>
					}
					onEndReachedThreshold={0.5}
				/>
			</View>
		);
	}
}
