import React, { Component } from "react";
import {
	Dimensions,
	Image,
	SectionList,
	Text,
	TouchableOpacity,
	View,
	Modal
} from "react-native";
import { NavigationActions } from "react-navigation";
import Avatar from "../Avatar";
import appCss from "../../../app.css";
import styles from "./style";
// import ImageCropPic from "../ImageCropPic";
import Ionicons from "react-native-vector-icons/Ionicons";
import changeNameRed from "../../assets/images/icons/profileRed.png";
import changeNameBlue from "../../assets/images/icons/profileBlue.png";
import changePassword from "../../assets/images/icons/LockOther.png";
import termsOfUseSwirl from "../../assets/images/icons/termOfUse.png";
import privacyPolicySwirl from "../../assets/images/icons/privacyPolicy.png";
import editIcon from "../../assets/images/icons/edit.png";
import feedback from "../../assets/images/icons/feedBack.png";
import logout from "../../assets/images/icons/logout.png";
import ImagePicker from "react-native-image-picker";
var CryptoJS = require("crypto-js");
import ImageCropPicker from "react-native-image-crop-picker";

import { CONFIG } from "../../../config";
const COLORS = CONFIG.colors;
const { width, height } = Dimensions.get("window");

const options = {
	title: "Select Avatar",
	storageOptions: {
		skipBackup: true,
		path: "images"
	}
};

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingUpdateAvatar: true,
			avatarSource: "" // a uri content
			// cropImage: false
			// ghost: false,
			// ghostNotif: false
		};
	}

	componentDidMount() {
		this.props.callGetProfile(this.props.id);
	}

	componentWillReceiveProps(nextProps) {
		// if (
		// 	nextProps.userProfile &&
		// 	nextProps.userProfile.isInGhostMode !== undefined &&
		// 	nextProps.userProfile.isInGhostMode !== this.state.ghost
		// ) {
		// 	this.setState({
		// 		ghost: nextProps.userProfile.isInGhostMode
		// 	});
		//
		// 	// read updated ghostmode notification and update profile page
		// 	if (
		// 		nextProps.ghostNotif !== undefined &&
		// 		nextProps.ghostNotif !== this.state.ghostNotif
		// 	) {
		// 		this.setState({
		// 			ghostNotif: nextProps.ghostNotif
		// 		});
		// 	}
		// }

		if (nextProps.loadingUpdateAvatar !== this.state.loadingUpdateAvatar) {
			this.setState({
				loadingUpdateAvatar: nextProps.loadingUpdateAvatar
			});
		}
	}

	goTo(screenName) {
		this.props.navigation.navigate(screenName);
	}

	renderOptionTitle = ({ section: { title } }) => {
		return <Text style={styles.sectionHeaderText}>{title}</Text>;
	};

	renderOption = ({ item, index }) => {
		return (
			<View style={styles.optionContainer}>
				<View style={styles.optionIconContainer}>
					<Image
						source={item.icon}
						style={styles.optionIcon}
						resizeMode="contain"
					/>
				</View>
				<TouchableOpacity
					style={styles.optionButton}
					onPress={item.clickHandler}
				>
					<Text style={styles.optionText}>{item.name}</Text>
					<Ionicons
						size={25}
						style={styles.optionArrow}
						color={COLORS.borderColor}
						name="ios-arrow-forward"
					/>
				</TouchableOpacity>
			</View>
		);
	};

	handleSignOut = flag => {
		// Cookie.clear();
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName: "WelcomeStack" })],
			key: null
		});
		this.props.callLogout({
			navigation: this.props.navigation,
			resetAction,
			id: this.props.id
		});
	};

	// changeGhostMode = () => {
	// 	this.props.updateGhostMode({
	// 		id: this.props.id,
	// 		isInGhostMode: !this.state.ghost
	// 	});
	// };
	//
	// closeGhostModePopup = () => {
	// 	this.props.updateGhostModeNotification(false);
	// 	this.setState({
	// 		ghostNotif: false
	// 	});
	// };

	// showGhostModePopup = () => {
	// 	let { ghost, ghostNotif } = this.state;
	// 	if (ghostNotif) {
	// 		return (
	// 			<Popup
	// 				popupIcon={ghost ? ghostFill : ghostEmpty}
	// 				popupText={
	// 					ghost ? "Nobody can see you!" : "People can see you again!"
	// 				}
	// 				popupCallback={() => this.closeGhostModePopup()}
	// 				//reducing height so ghost icon overlaps
	// 				containerStyle={{
	// 					height: 44
	// 				}}
	// 			/>
	// 		);
	// 	} else {
	// 		return null;
	// 	}
	// };

	uploadImageToCloud = uri => {
		let timestamp = ((Date.now() / 1000) | 0).toString();
		let api_key = CONFIG.cloudinary.api_key;
		let api_secret = CONFIG.cloudinary.api_secret;
		let cloud = CONFIG.cloudinary.cloud;
		let hash_string = "timestamp=" + timestamp + api_secret;
		let signature = CryptoJS.SHA1(hash_string).toString();
		let upload_url =
			CONFIG.cloudinary.upload_url_prefix +
			cloud +
			CONFIG.cloudinary.upload_url_suffix;

		let xhr = new XMLHttpRequest();
		xhr.open("POST", upload_url);
		xhr.onload = () => {
			try {
				let resp = JSON.parse(xhr._response);
				console.log("onload >", resp);

				this.props.updateMember({
					id: this.props.id,
					avatarName: `v${resp.version}/${resp.public_id}`,
					avatarExtension: resp.format,
					blockRedirect: true
				});
			} catch (e) {
				console.log("error in update avatar image");
			}
		};

		let formdata = new FormData();
		formdata.append("file", {
			uri: uri,
			type: "image/png",
			name: `${timestamp}.png`
		});

		// formdata.append("upload_preset", "test_apz");
		formdata.append("timestamp", timestamp);
		formdata.append("api_key", api_key);
		formdata.append("signature", signature);
		xhr.send(formdata);
	};

	uploadImage = () => {
		/**
		 * The first arg is the options object for customization (it can also be null or omitted for default options),
		 * The second arg is the callback which sends object: response (more info in the API Reference)
		 */
		ImagePicker.showImagePicker(options, response => {
			// console.log("Response = ", response);

			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {
				// const source = { uri: response.uri };
				// this.setState({
				// 	avatarSource: response.uri
				// 	//cropImage: true
				// });

				ImageCropPicker.openCropper({
					path: response,
					width: 256,
					height: 256,
					cropperCircleOverlay: true,
					mediaType: "photo",
					loadingLabelText: "Processing..."
					// cropperChooseText: this.state.loadingUpdateAvatar
					// 	? "Loading..."
					// 	: "Choose" // it is IOS only
				}).then(image => {
					if (image && image.path) {
						// console.log("after crop get image:", image, {
						// 	uri: "file://" + image.path
						// });
						this.setState({
							avatarSource: { uri: "file://" + image.path },
							loadingUpdateAvatar: true
							//cropImage: true
						});
						this.uploadImageToCloud("file://" + image.path);
					}
				});

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };
				// this.uploadImageToCloud(response.uri);
			}
		});
	};

	render() {
		let { userProfile } = this.props;
		let options = [
			{
				title: "Account info",
				data: [
					// {
					//     icon: changeNameBlue,
					//     name: "Change Name",
					//     clickHandler: () => this.goTo("ChangeInfoScreen")
					// },
					{
						icon: changeNameRed,
						name: "Change Username",
						clickHandler: () => this.goTo("ChangeInfoScreen")
					},
					{
						icon: changePassword,
						name: "Change Password",
						clickHandler: () => this.goTo("ChangePasswordFromProfileScreen")
					}
				]
			},
			{
				title: "Legal stuff",
				data: [
					{
						icon: termsOfUseSwirl,
						name: "Terms of Use",
						clickHandler: () => this.goTo("TermsAndConditionsScreen")
					},
					{
						icon: privacyPolicySwirl,
						name: "Privacy Policy",
						clickHandler: () => this.goTo("PrivacyPolicyScreen")
					}
				]
			},
			{
				title: "Things you would never do",
				data: [
					{
						icon: feedback,
						name: "Feedback",
						clickHandler: () => this.goTo("FeedbackScreen")
					},
					{
						icon: logout,
						name: "Logout",
						clickHandler: () => this.handleSignOut()
					}
				]
			}
		];

		return (
			<View style={{ flex: 1 }}>
				{/*this.showGhostModePopup()*/}
				<View style={{ flex: 1 }}>
					{/* <Modal visible={this.state.cropImage} animationType="slide">
						<ImageCropPic imageSource={this.state.avatarSource} />
					</Modal> */}
					<View style={styles.imageContainer}>
						<View style={[appCss.header, { marginBottom: 0 }]}>
							<TouchableOpacity
								style={appCss.headerIconBox}
								onPress={() => this.props.navigation.goBack()}
							>
								<Ionicons
									size={30}
									color={COLORS.bodyColor}
									name="ios-arrow-back"
								/>
							</TouchableOpacity>
						</View>
						<View
							style={{
								borderWidth: 0,
								height: height * 0.15,
								alignSelf: "center",
								position: "relative"
							}}
						>
							{(this.state.avatarSource && (
								<Avatar
									userId={this.state.avatarSource}
									imageType="data"
									size={height * 0.15}
									position="profile"
								/>
							)) || (
								<Avatar
									userId={this.props.id}
									size={height * 0.15}
									position="profile"
								/>
							)}

							<TouchableOpacity
								onPress={() => this.uploadImage()}
								style={styles.editButton}
							>
								<Image
									style={styles.editIcon}
									resizeMode={"contain"}
									source={editIcon}
								/>
							</TouchableOpacity>
						</View>
						<Text style={styles.nameText}>{userProfile.username}</Text>
					</View>
					<View
						style={{
							borderWidth: 0,
							borderColor: "blue"
						}}
					>
						<SectionList
							renderItem={this.renderOption}
							renderSectionHeader={this.renderOptionTitle}
							keyExtractor={(item, index) => item + index}
							sections={options}
							contentContainerStyle={{
								height: "100%"
							}}
							scrollEnabled={false}
						/>
					</View>
				</View>
			</View>
		);
	}
}
