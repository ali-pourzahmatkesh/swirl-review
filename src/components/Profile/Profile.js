import React, { Component } from "react";
import {
	Dimensions,
	Image,
	SectionList,
	Text,
	TouchableOpacity,
	View,
	Modal,
	ScrollView
} from "react-native";
import { NavigationActions } from "react-navigation";
import Avatar from "../Avatar";
import appCss from "../../../app.css";
import styles from "./style";
// import ImageCropPic from "../ImageCropPic";
import Ionicons from "react-native-vector-icons/Ionicons";
import changeName from "../../assets/images/profileIcons/profile.png";
import changePassword from "../../assets/images/profileIcons/password.png";
import termsOfUseSwirl from "../../assets/images/profileIcons/termsOfUse.png";
import privacyPolicySwirl from "../../assets/images/profileIcons/privacyPolicy.png";
// import editIcon from "../../assets/images/icons/edit.png";
import editIcon from "../../assets/images/icons/edit2.png";
import feedback from "../../assets/images/profileIcons/feedback.png";
import logout from "../../assets/images/profileIcons/logout.png";
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
		if(title === null){
			return <View style={{
				height: height * 0.05,
				width: '100%'
			}}/>
		}
		return <Text style={[styles.sectionHeaderText]}>{title}</Text>;
	};

	renderOption = ({ item, index }) => {
		return (
			<View style={[styles.optionContainer, index === 0 && {marginTop: 0}, {backgroundColor: item.backgroundColor}]}>
				<View style={styles.optionIconContainer}>
					<Image
						source={item.icon}
						style={[styles.optionIcon, {borderWidth: 0}, item.name === 'Logout' && {marginRight: width * -0.025}]}
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
						icon: changeName,
						name: "Change Username",
						clickHandler: () => this.goTo("ChangeInfoScreen"),
						backgroundColor: '#01C7FE'
					},
					{
						icon: changePassword,
						name: "Change Password",
						clickHandler: () => this.goTo("ChangePasswordFromProfileScreen"),
						backgroundColor: '#FFB100'
					}
				]
			},
			{
				title: "Legal stuff",
				data: [
					{
						icon: termsOfUseSwirl,
						name: "Terms of Use",
						clickHandler: () => this.goTo("TermsAndConditionsScreen"),
						backgroundColor: '#DA64FF'
					},
					{
						icon: privacyPolicySwirl,
						name: "Privacy Policy",
						clickHandler: () => this.goTo("PrivacyPolicyScreen"),
						backgroundColor: '#4CD964'
					}
				]
			},
			{
				title: "Things you'll never need",
				data: [
					{
						icon: feedback,
						name: "Support",
						clickHandler: () => this.goTo("FeedbackScreen"),
						backgroundColor: '#00AFF0'
					},
					{
						icon: logout,
						name: "Logout",
						clickHandler: () => this.handleSignOut(),
						backgroundColor: '#FC003E'
					}
				]
			},
			{
				title: null,
				data: []
			}
		];

		return (
			<View style={styles.container}>
				<View style={[appCss.header, { borderWidth: 0, position: 'absolute', zIndex: 2, paddingLeft: 0 }]}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => this.props.navigation.goBack()}
					>
						<Ionicons
							style={{textAlign: 'center'}}
							size={30}
							color={COLORS.bodyColor}
							name="ios-arrow-back"
						/>
					</TouchableOpacity>
				</View>
				<ScrollView
					overScrollMode='never' // works on android
					bounces={false} // works on ios
				>
					<View style={[styles.imageContainer, {borderWidth: 0, paddingTop: 0}]}>
						<View style={{flex: 1, borderWidth: 0}}/>
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
						<View style={{borderWidth: 0, justifyContent: 'center', flex: 1}}>
							<Text style={styles.nameText}>{userProfile.username}</Text>
						</View>
					</View>
					<SectionList
						renderItem={this.renderOption}
						renderSectionHeader={this.renderOptionTitle}
						keyExtractor={(item, index) => item + index}
						sections={options}
						style={{
							height: '100%',
							paddingLeft: '5%',
							paddingRight: '5%',
						}}
						contentContainerStyle={{
							alignItems: 'center'
						}}
						stickySectionHeadersEnabled={false}
						scrollEnabled={false}
					/>
				</ScrollView>
			</View>
		);
	}
}
