import React, { Component } from "react";
import {
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
	Modal
} from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import appCss from "../../../app.css";
import SavedProfile from "../SavedProfile";
import logo from "../../assets/images/tape-logo.png";
import Avatar from "../Avatar";
import styles from "./style";
import aroundMe from "../../assets/images/aroundMe.png";
import savedProfile from "../../assets/images/saveProfile.png";
import ghost from "../../assets/images/ghost.png";
import EmptyList from "../EmptyList";

import filterIcon from "../../assets/images/filterIcon.png";
import AroundMeFilter from "../AroundMeFilter";

const defaultRotate = 0;

export default class AroundYou extends Component {
	state = {
		tabSelected: "AroundMe",
		filterVisible: false
	};

	componentDidMount() {
		this.props.callGetProfile(this.props.id);
		this.props.getListPeopleNearMe(this.props.id);
	}

	loadList = ({ item }) => {
		return (
			<View style={[appCss.listItems]}>
				{this.avatarFunc(item)}
				{this.titleFunc(item)}
				<View style={appCss.actionBox}>{this.positionFunc(item)}</View>
			</View>
		);
	};

	Capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

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
						{this.Capitalize(item.name)}
					</Text>
				</TouchableOpacity>
			</View>

			// <View style={appCss.titleBox}>
			// <TouchableOpacity
			// 	onPress={() => this.prepareForRedirectToProfile(item)}
			// >
			// 	<Text
			// 		numberOfLines={1}
			// 		ellipsizeMode="tail"
			// 		style={[appCss.defaultFontApp, appCss.titleBoxSubject]}
			// 	>
			// 		{this.Capitalize(item.name)}
			// 	</Text>
			// </TouchableOpacity>
			// <TouchableOpacity onPress={() => this.handleChat(item)}>
			// 	<View style={appCss.titleBoxDetail}>
			// 		<Text
			// 			numberOfLines={2}
			// 			ellipsizeMode="tail"
			// 			style={appCss.titleBoxDetailText}
			// 		>
			// 			{this.Capitalize(item.recentMessage)}
			// 		</Text>
			// 	</View>
			// </TouchableOpacity>
			// </View>
		);
	};
	avatarFunc = item => {
		return (
			<View style={appCss.avatarBox}>
				<Avatar userId={item.memberId} size={60} />
			</View>
		);
	};

	positionFunc = item => {
		let rotate = defaultRotate + item.compass;
		return (
			<View style={appCss.actionBox}>
				<Image
					style={[
						styles.arrowPositionIcon,
						{ transform: [{ rotate: `${rotate}deg` }] }
					]}
					source={aroundMe}
				/>
				{/*<Text style={ styles.arrowPositionText}>*/}
				{/*{(item.distance * 3.28084).toFixed(2)} ft*/}
				{/*</Text>*/}
			</View>
		);
	};

	setTabFunc = tabSelected => {
		// need to test this
		ReactNativeHapticFeedback.trigger("impactLight", true);
		this.setState({ tabSelected });
		if (tabSelected == "AroundMe") {
			this.props.getListPeopleNearMe(this.props.id);
		}
	};

	prepareForRedirectToProfile = item => {
		this.props.closeModal();
		this.props.navigation.push("ProfileScreen", {
			userId: item.memberId,
			x: 1
		});
	};

	changeList = tabSelected => {
		if (tabSelected === "AroundMe") {
			if (this.props.userProfile.isInGhostMode) {
				// load view of ghost mode
				return (
					<View style={styles.emptyBox}>
						<View style={styles.ghostBox}>
							<Image source={ghost} style={styles.ghostBoxIcon} />
						</View>
						<Text style={styles.ghostBoxText}>You’re on Ghost Mode!</Text>
						<Text style={styles.ghostBoxText}>
							Deactivate from profile to see other users
						</Text>
					</View>
				);
			} else {
				// load view of around you
				let { ListPeopleNearMe } = this.props;
				return (
					<FlatList
						data={ListPeopleNearMe}
						keyExtractor={(item, index) => {
							return item.memberId;
						}}
						renderItem={({ item }) => this.loadList({ item })}
						// ListEmptyComponent={() => <EmptyList />}
						onEndReachedThreshold={0.5}
						onRefresh={() => {
							this.props.getListPeopleNearMe(this.props.id);
						}}
						refreshing={this.props.getListPeopleNearMeRefreshing}
						// style={{borderWidth: 1}}
					/>
				);
			}
		} else {
			// load view of saved profile
			return <SavedProfile closeModal={this.props.closeModal} />;
		}
	};

	closeFilter = () => {
		this.setState({
			filterVisible: false
		});
	};

	render() {
		let { tabSelected } = this.state;
		if (this.state.filterVisible) {
			console.log("in arounf you settings", this.props.userProfile.settings);
		}
		return this.state.filterVisible ? (
			// this construction looks a little weird?
			// seems to be an issue with multiple modals stacked
			// up on each other though.
			<AroundMeFilter
				closeModal={this.props.closeModal}
				closeFilter={this.closeFilter}
				aroundMeFilterToDistance={
					this.props.userProfile.settings.aroundMeFilterToDistance
				}
				aroundMeFilterFromAge={
					this.props.userProfile.settings.aroundMeFilterFromAge
				}
				aroundMeFilterToAge={
					this.props.userProfile.settings.aroundMeFilterToAge
				}
				aroundMeFilterGender={
					this.props.userProfile.settings.aroundMeFilterGender
				}
			/>
		) : (
			<View style={styles.container}>
				<View style={appCss.appColor}>
					<View style={appCss.header}>
						<View style={{ flex: 1 }} />
						<Text style={appCss.headerTitle}>
							{tabSelected === "AroundMe" ? "Around Me" : "Saved Profiles"}
						</Text>
						{tabSelected === "AroundMe" ? (
							<View style={styles.filterModalButtonContainer}>
								<View style={{ flex: 1 }} />
								<View style={{ flex: 1 }} />
								<TouchableOpacity
									style={styles.filterModalButton}
									onPress={() => {
										this.setState({ filterVisible: true });
									}}
								>
									<Image
										source={filterIcon}
										style={styles.filterModalButtonImage}
									/>
								</TouchableOpacity>
							</View>
						) : (
							<View style={{ flex: 1 }} />
						)}
					</View>
				</View>
				<View style={{ flex: 2 }}>
					<View style={styles.container}>
						<SavedProfile closeModal={this.props.closeModal} />
						{this.changeList(tabSelected)}
					</View>
					<View style={appCss.closeButtonBox}>
						<TouchableOpacity onPress={this.props.closeModal}>
							<View style={appCss.closeButton}>
								<Image style={appCss.closeButtonIcon} source={logo} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}
