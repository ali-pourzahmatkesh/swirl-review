import React, { Component } from "react";
import EmptyList from "../EmptyList";
import {
	Dimensions,
	Image,
	SectionList,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import Avatar from "../../components/Avatar";
import { SafeAreaView } from "react-navigation";
import checkedImage from "../../assets/images/icons/check4.png";
import { CONFIG } from "../../../config";
import next from "../../assets/images/icons/next1.png";
import LoadingCircles3 from "../../components/LoadingCircles3";
const colors = CONFIG.colors;
const { width } = Dimensions.get("window");

export default class SendTo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			membersThatAreFriends: [],
			loadingSendMessage: props.loadingSendMessage || false
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log("sendTo > componentWillReceiveProps nextProps", nextProps);
		if (
			nextProps.membersThatAreFriends &&
			this.state.membersThatAreFriends.length !=
				nextProps.membersThatAreFriends.length
		) {
			console.log("membersThatAreFriends", nextProps.membersThatAreFriends);
			this.setState({
				membersThatAreFriends: nextProps.membersThatAreFriends,
				list: this.generateSectionList(
					nextProps.membersThatAreFriends,
					"username"
				)
			});
		}

		if (nextProps.loadingSendMessage !== this.state.loadingSendMessage) {
			this.setState({
				loadingSendMessage: nextProps.loadingSendMessage
			});
		}
	}

	componentDidMount() {
		this.props.getFriends({
			id: this.props.id
		});
	}

	generateSectionList = (arrData, key) => {
		let list = { letters: [] };
		let sectionList = [];
		if (arrData && arrData.length) {
			arrData.forEach(item => {
				let itLetter = item[key].substring(0, 1).toUpperCase();
				if (!(itLetter in list)) {
					list[itLetter] = [];
					list.letters.push(itLetter);
				}
				list[itLetter].push(item);
			});
			list.letters = list.letters.sort();

			list.letters.forEach(item => {
				sectionList.push({
					title: item,
					data: list[item]
				});
			});
		}
		return sectionList;
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

	avatarFunc = item => {
		return (
			<TouchableOpacity
				onPress={() => this.props.screenProps.profileNavigate(item)}
				style={appCss.avatarBox}
			>
				<Avatar userId={item.id} position="image" size={45} />
			</TouchableOpacity>
		);
	};

	titleFunc = item => {
		return (
			<View style={appCss.titleBox}>
				<View>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={appCss.titleBoxSubject}
					>
						{this.Capitalize(item.username)}
					</Text>
				</View>
			</View>
		);
	};

	actionFunc = item => {
		return (
			<View style={styles.actionBox}>
				<TouchableOpacity
					onPress={() => {
						this.onChange(item);
					}}
					style={[
						styles.actionBtn,
						item["checked"] ? styles.actionBtnSelect : styles.actionBtnUnSelect
					]}
				>
					{item["checked"] && (
						<Image
							source={checkedImage}
							resizeMode={"contain"}
							style={styles.actionIcon}
						/>
					)}
				</TouchableOpacity>
			</View>
		);
	};

	onChange = item => {
		const { list } = this.state;
		item["checked"] = !item["checked"];
		this.setState({ list });
	};

	Capitalize(str) {
		if (str) {
			return str.charAt(0).toUpperCase() + str.slice(1);
		} else {
			return str;
		}
	}

	render() {
		const { list, loadingSendMessage } = this.state;
		var sendButton = loadingSendMessage ? (
			<TouchableOpacity style={styles.footer}>
				<LoadingCircles3 />
			</TouchableOpacity>
		) : (
			<TouchableOpacity
				style={styles.footer}
				onPress={() => this.props.friendList(list)}
			>
				<Image resizeMode={"contain"} style={styles.nextIcon} source={next} />
			</TouchableOpacity>
		);
		return (
			<SafeAreaView style={styles.container}>
				<SectionList
					sections={list}
					extraData={list}
					keyExtractor={(item, index) => index}
					ListEmptyComponent={() => <EmptyList />}
					renderItem={({ item }) => this.loadList({ item })}
					renderSectionHeader={({ section }) => (
						<View style={styles.sectionHeader}>
							<Text style={[appCss.defaultFontApp, styles.sectionHeaderTitle]}>
								{section.title}
							</Text>
						</View>
					)}
				/>
				<View
					style={{
						height: 50,
						width: 50,
						position: "absolute",
						bottom: 50,
						right: 15
					}}
				>
					{sendButton}
				</View>
			</SafeAreaView>
		);
	}
}
