import React, { Component } from "react";
import {
	Dimensions,
	Image,
	KeyboardAvoidingView,
	Modal,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import appCss from "../../../app.css";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Avatar from "../Avatar";
import GestureRecognizer from "react-native-swipe-gestures";
import styles from "./style";
import ProfileImageList from "../ProfileImageList";
import InstagramLogin from "react-native-instagram-login";
import instageram from "../../assets/images/instageram.png";
// import lightening from "../../assets/images/lightening.png";
import Popup from "../Popup";
import setting from "../../assets/images/setting.png";
import ghostFill from "../../assets/images/ghost.png";
import edit from "../../assets/images/edit.png";
import defaultChat from "../../assets/images/defaultChat.png";
import save from "../../assets/images/save.png";
import saveProfile from "../../assets/images/saveProfile.png";

import ghostEmpty from "../../assets/images/ghostEmpty.png";
import logo from "../../assets/images/tape-logo.png";
import Cookie from "react-native-cookie";
import { CONFIG } from "../../../config";
const { width, height } = Dimensions.get("window");
const colors = CONFIG.colors;

const gestureRecognizerConfig = {
	velocityThreshold: 0.3,
	directionalOffsetThreshold: 80
};

export default class Profile extends Component {
	state = {
		// name: "",
		// index: 0,
		bioText: "",
		maxBioText: 350,
		bioTextProfile: "",
		showBio: false,
		ghost: false,
		ghostNotif: false,
		modalVisibleFriendRequest: false,
		loading: false,
		profileButtonStatus: "connect",
		instagramToken: null,
		profileUserId: this.props.id,
		listSavedProfile: [],

		editMode: false
	};

	componentDidMount() {
		let { navigation } = this.props;
		const profileUserId =
			(navigation &&
				navigation.state &&
				navigation.state.params &&
				navigation.state.params.userId) ||
			this.props.id;
		this.setState({ profileUserId: profileUserId });
		// console.log(
		// 	"SET profileUserId",
		// 	profileUserId,
		// 	" - ",
		// 	this.state.profileUserId
		// );

		this.props.callGetProfile(profileUserId || this.props.id);
		this.props.getListSavedProfile(this.props.id);

		// console.log("profileUserId vs id", profileUserId, " - ", this.props.id);
		if (profileUserId && this.props.id != this.state.profileUserId) {
			// console.log(">> getFriendshipStatus", {
			// 	receiverMemberId: profileUserId,
			// 	senderMemberId: this.props.id
			// });
			this.props.getFriendshipStatus({
				receiverMemberId: profileUserId,
				senderMemberId: this.props.id
			});
			this.setState({
				profileButtonStatus: this.state.friendshipRequestStatus
			});

			this.props.callProfileVisit({
				viewerMemberOwner: this.props.id,
				memberOwner: profileUserId
			});
		} else {
			this.props.callVisitCount(this.props.id);
		}

		// read friend list
		//this.getListRequest();

		setTimeout(() => {
			this.props.setCurrentPage("Profile");
		}, 1);
	}

	componentWillReceiveProps(nextProps) {
		// if instagram token change, it should reload page with instagram data
		if (
			nextProps.userProfile &&
			nextProps.userProfile.instagramToken &&
			this.state.instagramToken != nextProps.userProfile.instagramToken
		) {
			this.setState({ instagramToken: nextProps.userProfile.instagramToken });
		}

		// read updated bio and update profile page
		if (
			nextProps.userProfile &&
			//nextProps.userProfile.bio &&
			//nextProps.userProfile.bio.length > 0 &&
			this.state.bioTextProfile !== nextProps.userProfile.bio
		) {
			this.setState({ bioTextProfile: nextProps.userProfile.bio });
		}

		// read updated ghostmode and update profile page
		if (
			nextProps.userProfile &&
			nextProps.userProfile.isInGhostMode !== undefined &&
			nextProps.userProfile.isInGhostMode !== this.state.ghost
		) {
			this.setState({
				ghost: nextProps.userProfile.isInGhostMode
			});

			// read updated ghostmode notification and update profile page
			if (
				nextProps.ghostNotif !== undefined &&
				nextProps.ghostNotif !== this.state.ghostNotif
			) {
				this.setState({
					ghostNotif: nextProps.ghostNotif
				});
			}
		}

		if (
			nextProps.listSavedProfile &&
			nextProps.listSavedProfile.length != this.state.listSavedProfile.length
		) {
			this.setState({
				listSavedProfile: nextProps.listSavedProfile
			});
		}
	}

	openModal = () => {
		this.setState({ modalVisibleFriendRequest: true }, () => {
			this.props.initialState();
		});
	};

	closeModal = () => {
		this.setState({ modalVisibleFriendRequest: false, page: 1 }, () => {
			this.props.profileSetCloseModal(false);
			this.props.navigation.setParams({ modalVisibleFriendRequest: false });
			this.props.initialStateFriendRequest();
			this.props.callGetProfile(this.state.profileUserId || this.props.id);
		});
	};

	onSwipeRight = () => {
		if (!this.state.modalVisibleFriendRequest) {
			this.props.navigation.goBack();
		}
	};

	disconnectInstagram = () => {
		this.setState({ instagramToken: null });
		this.props.updateInstagramToken({
			id: this.props.id,
			token: null
		});
		Cookie.clear();
	};

	getBioEdit = () => {
		if (this.props.id === this.state.profileUserId) {
			return (
				<TouchableOpacity
					style={{
						height: 26,
						width: 26,
						position: "absolute",
						bottom: 0,
						right: 0
					}}
					// onPress={() => this.loadBioForm()}
					onPress={() => {
						this.setState({
							editMode: true
						});
					}}
				>
					{this.state.instagramToken &&
						<Image
							style={appCss.headerIcon}
							resizeMode={"contain"}
							source={edit}
						/>
					}
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	};

	goToChatPage = () => {
		this.props.navigation.navigate("DiscussionScreen", {
			friendMemberOwner: this.props.userProfile.id,
			name: this.props.userProfile.name
		});
	};

	addToSavedProfile = () => {
		this.props.createNewSavedProfile({
			myId: this.props.id,
			saveProfileId: this.props.userProfile.id
		});
		setTimeout(() => {
			this.props.getListSavedProfile(this.props.id);
		}, 500);
	};

	removeFromSavedProfile = id => {
		this.props.callDeleteSavedProfile(id);
		setTimeout(() => {
			this.props.getListSavedProfile(this.props.id);
		}, 500);
	};

	getSavedProfileView = () => {
		let isInList = false;
		var currentItemId;
		for (item of this.state.listSavedProfile) {
			if (item.saveProfileId.id == this.props.userProfile.id) {
				isInList = true;
				currentItemId = item.id;
				break;
			}
		}

		let allowAddToSavedProfile = (
			<TouchableOpacity
				style={styles.profileActionItem}
				onPress={() => this.addToSavedProfile()}
			>
				<Image style={appCss.headerIcon} resizeMode={"contain"} source={save} />
			</TouchableOpacity>
		);

		let itIsCurrentlyInSavedProfile = (
			<TouchableOpacity
				style={styles.profileActionItem}
				onPress={() => this.removeFromSavedProfile(currentItemId)}
			>
				<Image
					style={appCss.headerIcon}
					resizeMode={"contain"}
					source={saveProfile}
				/>
			</TouchableOpacity>
		);

		if (isInList) {
			return itIsCurrentlyInSavedProfile;
		} else {
			return allowAddToSavedProfile;
		}
	};

	profileActions = () => {
		if (this.props.id !== this.state.profileUserId) {
			return (
				<View>
					{this.bioFunc()}
					<View style={styles.profileActions}>
						{/* Show Bio if it has a value */}

						{/* Show Chat button */}
						<TouchableOpacity
							style={styles.profileActionItem}
							onPress={() => this.goToChatPage()}
						>
							<Image
								style={appCss.headerIcon}
								resizeMode={"contain"}
								source={defaultChat}
							/>
						</TouchableOpacity>

						{/* Show Saved to Profile button */}
						{this.getSavedProfileView()}
					</View>
				</View>
			);
		} else {
			return this.bioFunc();
		}
	};

	bioFunc = () => {
		let { bioTextProfile } = this.state;
		if (!bioTextProfile) {
			if (this.props.id === this.state.profileUserId) {
				return (
					<TouchableOpacity onPress={() => this.loadBioForm()}>
						<Text style={styles.bioText}>Tap edit to add bio</Text>
					</TouchableOpacity>
				);
			} else {
				return null;
			}
		} else {
			return (
				<TouchableOpacity onPress={() => this.loadBioForm()}>
					<Text style={[styles.bioText, { color: colors.appColor }]}>
						{bioTextProfile}
					</Text>
				</TouchableOpacity>
			);
		}
	};

	loadBioForm = status => {
		let { showBio, bioTextProfile } = this.state;
		this.setState({ showBio: !showBio, bioText: bioTextProfile });
	};

	saveBioForm = () => {
		let { showBio, bioText, bioTextProfile } = this.state;
		// call update profile with new bio entry
		this.props.updateBio({ id: this.props.id, bio: bioText });
		this.setState({ showBio: !showBio, bioText: "", bioTextProfile: bioText });
	};

	closeBioForm = status => {
		let { showBio, bioText } = this.state;
		this.setState({ showBio: !showBio, bioText: "" });
	};

	instageramList = userProfile => {
		return (
			<ProfileImageList user={userProfile} editMode={this.state.editMode} />
		);
	};
	instageramConnection = userProfile => {
		if (
			userProfile &&
			!userProfile["instagramToken"] &&
			this.props.id === this.state.profileUserId
		) {
			let connectInstagramView = (
				<View style={styles.instagramBox}>
					<View style={styles.instageramLogoBox}>
						<Image
							style={styles.logoIcon}
							resizeMode={"contain"}
							source={logo}
						/>
						<Text style={styles.logoIconPlus}>+</Text>
						<Image
							style={styles.logoIcon}
							resizeMode={"contain"}
							source={instageram}
						/>
					</View>
					<Text style={styles.instageramDesc}>
						Connect with Instagram to add pictures to your profile.
					</Text>
					<TouchableOpacity
						style={[styles.profileButton]}
						onPress={() => this.refs.instagramLogin.show()}
					>
						<Text style={styles.profileButtonText}>Connect</Text>
					</TouchableOpacity>

					<InstagramLogin
						ref="instagramLogin"
						clientId={CONFIG.instagram.clientId}
						scopes={CONFIG.instagram.scopes}
						redirectUrl={CONFIG.instagram.redirectUrl}
						onLoginSuccess={token => {
							console.log("instagram token", token);
							this.props.updateInstagramToken({
								id: this.props.id,
								token: token
							});
							this.setState({ instagramToken: token });
						}}
						onLoginFailure={data =>
							console.log("instagram onLoginFailure error", data)
						}
					/>
				</View>
			);

			let disconnectInstagramView = (
				<View>
					<TouchableOpacity
						// idk what this color is supposed to be and I'm not seeing it anywhere else
						style={[styles.profileButton, { backgroundColor: "#edb91b" }]}
						onPress={() => this.disconnectInstagram()}
					>
						<Text style={styles.profileButtonText}>Disconnect Instagram</Text>
					</TouchableOpacity>
				</View>
			);

			if (this.state.instagramToken) {
				return disconnectInstagramView;
			} else {
				return connectInstagramView;
			}
		} else if (
			userProfile &&
			!userProfile["instagramToken"] &&
			this.props.id !== this.state.profileUserId
		) {
			let colorsList = [
				"#f4f6f9",
				"#e7ebf2",
				"#f4f6f9",
				"#e7ebf2",
				"#e0e3eb",
				"#dedede",
				"#e0e3eb",
				"#e7ebf2",
				"#f4f6f9",
				"#f4f6f9",
				"#e0e3eb",
				"#e7ebf2",
				"#e0e3eb",
				"#e7ebf2",
				"#f4f6f9"
			];
			return (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.imageList}>
						{colorsList.map((i, index) => {
							return (
								<View
									key={index}
									style={[
										styles.imageBox,
										index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }
									]}
								>
									<View style={[styles.imageBox, { backgroundColor: i }]} />
								</View>
							);
						})}
					</View>
				</ScrollView>
			);
		} else {
			return null;
		}
	};

	changeGhostMode = () => {
		this.props.updateGhostMode({
			id: this.props.id,
			isInGhostMode: !this.state.ghost
		});
	};

	closeGhostModePopup = () => {
		this.props.updateGhostModeNotification(false);
		this.setState({
			ghostNotif: false
		});
	};

	showGhostModePopup = () => {
		let { ghost, ghostNotif } = this.state;
		if (ghostNotif) {
			return (
				<Popup
					popupIcon={ghost ? ghostFill : ghostEmpty}
					popupText={
						ghost ? "Nobody can see you!" : "People can see you again!"
					}
					popupCallback={() => this.closeGhostModePopup()}
					//reducing height so ghost icon overlaps
					containerStyle={{
						height: 44
					}}
				/>
			);
		} else {
			return null;
		}
	};

	//todo: hook up to api to save the excluded pictures
	handleSaveFeed = () => {
		this.setState({ editMode: false });
	};

	loadHeader = () => {
		if (this.props.id !== this.state.profileUserId) {
			return <View style={styles.withoutHeader} />;
		} else {
			let { ghost } = this.state;
			if (this.state.editMode) {
				return (
					<View style={appCss.header}>
						<View style={{ flex: 1 }} />
						<View style={styles.promptContainer}>
							<Text style={styles.promptText}>Pictures shown!</Text>
						</View>
						<TouchableOpacity
							onPress={this.handleSaveFeed}
							style={styles.saveFeedButton}
						>
							<Text style={styles.saveFeedText}>Save</Text>
						</TouchableOpacity>
					</View>
				);
			} else {
				return (
					<View style={appCss.header}>
						<TouchableOpacity
							onPress={() => {
								this.changeGhostMode();
							}}
							style={appCss.headerIconBox}
						>
							<Image
								style={appCss.headerIcon}
								resizeMode={"contain"}
								source={ghost ? ghostFill : ghostEmpty}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={appCss.headerIconBox}
							onPress={() => {
								this.props.navigation.navigate("SettingScreen");
							}}
						>
							<Image
								style={appCss.headerIcon}
								resizeMode={"contain"}
								source={setting}
							/>
						</TouchableOpacity>
					</View>
				);
			}
		}
	};

	closePage = userProfile => {
		if (
			this.props.id == this.state.profileUserId &&
			userProfile &&
			!userProfile["instagramToken"]
		) {
			return null;
		} else {
			return (
				<View style={appCss.closeButtonBox}>
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
						<View style={appCss.closeButton}>
							<Image style={appCss.closeButtonIcon} source={logo} />
						</View>
					</TouchableOpacity>
				</View>
			);
		}
	};
	render() {
		let { userProfile } = this.props;
		let { bioText, maxBioText } = this.state;
		console.log(this.state);
		return (
			<View style={styles.container}>
				<Modal
					visible={this.state.showBio}
					animationType={"fade"}
					transparent={true}
				>
					<KeyboardAvoidingView
						behavior="padding"
						style={[styles.profileInfoBox, styles.modalBio]}
					>
						<View style={styles.modalClose}>
							<TouchableOpacity onPress={() => this.closeBioForm()}>
								<FontAwesome size={25} color={colors.appColor} name="close" />
							</TouchableOpacity>
						</View>
						<View style={{ alignItems: "center", width: width }}>
							<Avatar
								userId={this.state.profileUserId || this.props.id}
								size={width / 4}
								position="profile"
							/>
							<View style={{ alignItems: "center" }}>
								<Text style={styles.profileTitle}>
									{(userProfile && userProfile.name) || "-"}
								</Text>
							</View>
							<Text style={styles.bioText}>
								Share something about yourself!
							</Text>
							<View style={styles.textInputBox}>
								<TextInput
									style={styles.textInput}
									autoCorrect={false}
									value={bioText}
									blurOnSubmit={true}
									multiline={true}
									autoFocus={true}
									returnKeyType="send"
									onChangeText={bioText => {
										this.setState({ bioText: bioText.slice(0, maxBioText) });
									}}
								/>
							</View>
						</View>

						<View>
							<View
								style={{
									alignItems: "flex-end",
									marginLeft: 16,
									marginRight: 16,
									marginBottom: 16
								}}
							>
								<Text style={{ color: colors.borderColor }}>
									{bioText ? bioText.length : 0}/{maxBioText}
								</Text>
							</View>
							<TouchableOpacity
								style={styles.saveBioButton}
								onPress={() => this.saveBioForm()}
							>
								<Text style={styles.saveBioText}>Save</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</Modal>

				{this.showGhostModePopup()}
				{this.loadHeader()}
				<View style={{ flex: 2, marginTop: 20 }}>
					<GestureRecognizer
						onSwipeRight={this.onSwipeRight}
						config={gestureRecognizerConfig}
						style={styles.profileInfoBox}
					>
						<View>
							<Avatar
								userId={this.state.profileUserId || this.props.id}
								size={width / 4}
								position="profile"
							/>
							{this.getBioEdit()}
						</View>

						<View style={{ alignItems: "center" }}>
							<Text style={styles.profileTitle}>
								{(userProfile && userProfile.name) || "-"}
							</Text>

							{this.profileActions()}
						</View>
					</GestureRecognizer>
					<View style={{ flex: 1 }}>
						{this.instageramList(userProfile)}
						{this.instageramConnection(userProfile)}
						{this.closePage(userProfile)}
					</View>
				</View>
			</View>
		);
	}
}
