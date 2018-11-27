import React, { Component } from "react";
import {
	Dimensions,
	Image,
	ImageBackground,
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Keyboard,
	Animated,
	TouchableWithoutFeedback
} from "react-native";
import styles from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import close from "../../assets/images/icons/close_red.png";
import closeWhite from "../../assets/images/icons/close.png";
import chat from "../../assets/images/icons/chat2.png";
import chatToggleFromCamera from "../../assets/images/icons/chat1.png";
import chatDisable from "../../assets/images/icons/chatDisable.png";
import camera from "../../assets/images/icons/camera.png";
import changeCamera from "../../assets/images/icons/changeCamera.png";
import cameraDisable from "../../assets/images/icons/cameraDisable.png";
import cameraBtn from "../../assets/images/icons/cameraBtn.png";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import background from "../../assets/images/swirlBackground.png";
import logo from "../../assets/images/logo1.png";
import next from "../../assets/images/icons/next1.png";
import { CONFIG } from "../../../config";
import SendTo from "../SendTo";
import TimePicker from "../TimePicker/TimePicker";
import appCss from "../../../app.css";
import Camera from "react-native-camera";
import moment from "moment-timezone";
import Toast from "../Toast";
import ImageCropPicker from "react-native-image-crop-picker";
import ImagePicker from "react-native-image-picker";

import accessCam from "../../assets/images/icons/accessCam1.png";
const colors = CONFIG.colors;
const { height, width } = Dimensions.get("window");
var CryptoJS = require("crypto-js");

const options = {
	// title: "Select Avatar",
	// customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
	// storageOptions: {
	// 	skipBackup: true,
	// 	path: "images"
	// }
};

export default class MessagePopup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			tabSelected: "chat",
			selectedHours: 0,
			selectedMinutes: 0,
			messageType: "",
			memberListId: [],
			messageImageSource: {},
			loadingSendMessage: false,
			cameraType: Camera.constants.Type.front,
			cameraZoom: 0,
			lastTap: null
		};
		this.bodyHeight = new Animated.Value(height * 0.88);
	}

	componentWillReceiveProps(nextProps) {
		console.log(
			"messagePopup > componentWillReceiveProps nextProps",
			nextProps
		);
		if (nextProps.loadingSendMessage !== this.state.loadingSendMessage) {
			this.setState({
				loadingSendMessage: nextProps.loadingSendMessage
			});
		}
	}

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
		//+ "/messages"; //?upload_preset=" +
		//"messages";

		let xhr = new XMLHttpRequest();
		xhr.open("POST", upload_url);
		xhr.onload = () => {
			try {
				let resp = JSON.parse(xhr._response);
				console.log("onload >", resp);

				if (resp.error && resp.error.message) {
					console.log("errorrrrr", resp.error, resp.error.message);
					this.props.showToast(resp.error.message);
				} else {
					let availableAt = moment()
						.add(this.state.selectedHours, "hours")
						.add(this.state.selectedMinutes, "minutes")
						.toDate();

					this.props.newMessage({
						senderMemberId: this.props.id,
						receiverMemberList: this.state.memberListId,
						availableAt: availableAt,
						postType: "image",
						imageContentName: `v${resp.version}/${resp.public_id}`,
						imageContentExtension: resp.format
					});
					this.props.closeMessageModal();
				}
			} catch (e) {
				console.log("error in update message image");
			}
		};

		let formdata = new FormData();
		formdata.append("file", {
			uri: uri,
			type: "image/jpg",
			name: `${timestamp}.jpg`
			// folder: "messages"
		});

		// formdata.append("upload_preset", "test_apz");
		// formdata.append("folder", "messages");
		formdata.append("timestamp", timestamp);
		formdata.append("api_key", api_key);
		formdata.append("signature", signature);
		xhr.send(formdata);
	};

	tabSelectedFunction = tabSelected => {
		this.setState({ tabSelected, messageImageSource: "" });

		if (tabSelected === "chat") {
		} else {
			/**
			 * The first arg is the options object for customization (it can also be null or omitted for default options),
			 * The second arg is the callback which sends object: response (more info in the API Reference)
			 */
			// ImagePicker.launchCamera(options, response => {
			// 	console.log("Response = ", response);
			//
			// 	if (response.error) {
			// 		console.log("ImagePicker Error: ", response.error);
			// 	} else {
			// 		//const source = { uri: response.uri };
			//
			// 		// You can also display the image using data:
			// 		// const source = { uri: 'data:image/jpeg;base64,' + response.data };
			//
			// 		this.setState({
			// 			messageImageSource: {
			// 				pathUri: { uri: response.uri },
			// 				dataUri: { uri: "data:image/jpeg;base64," + response.data }
			// 			}
			// 		});
			// 	}
			// });
		}
	};

	componentWillMount() {
		this.keyboardWillShowSub = Keyboard.addListener(
			"keyboardWillShow",
			this.keyboardWillShow
		);
		this.keyboardWillHideSub = Keyboard.addListener(
			"keyboardWillHide",
			this.keyboardWillHide
		);
	}

	componentWillUnmount() {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
	}

	keyboardWillShow = e => {
		Animated.parallel([
			Animated.timing(this.bodyHeight, {
				duration: e.duration,
				toValue: height * 0.91 - e.endCoordinates.height
			})
		]).start();
	};

	keyboardWillHide = e => {
		Animated.parallel([
			Animated.timing(this.bodyHeight, {
				duration: e.duration,
				toValue: height * 0.91
			})
		]).start();
	};

	loadMessageContent = () => {
		const { message, tabSelected, messageImageSource } = this.state;
		console.log("this.state.messageImageSource", this.state.messageImageSource);
		const count = message.length;
		return (
			<Animated.View style={[styles.messageBox, { height: this.bodyHeight }]}>
				<View style={styles.messageBoxHeader}>
					<TouchableOpacity onPress={this.props.closeMessageModal}>
						<Image style={styles.closeIcon} source={close} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => this.myTextInput.focus()}
						style={styles.subjectBox}
					>
						<MaterialCommunityIcons
							size={27}
							style={{ marginTop: 3 }}
							color={colors.combinatorialColor}
							name="playlist-edit"
						/>
						<Text style={styles.headerSubject}>Type here…</Text>
					</TouchableOpacity>
					<View />
				</View>
				<View style={styles.textInputBox}>
					<TextInput
						style={styles.textInput}
						placeholderTextColor="#000"
						autoCorrect={false}
						value={this.state.message}
						autoFocus={true}
						blurOnSubmit={true}
						returnKeyType="next"
						maxLength={250}
						numberOfLines={10}
						multiline={true}
						ref={ref => {
							this.myTextInput = ref;
						}}
						onChangeText={message => {
							this.setState({ message: message.slice(0, 250) });
						}}
					/>
					<View style={styles.footer}>
						<View style={styles.footerCounter}>
							<Text style={styles.footerCounterText}>{count} / 250</Text>
						</View>
						<View style={styles.footerActions}>
							<View style={styles.nextButton} />
							<View style={styles.footerActions}>
								<TouchableOpacity
									onPress={() => this.tabSelectedFunction("chat")}
									style={styles.actionBox}
								>
									<Image
										resizeMode="contain"
										style={styles.actionBoxIcon}
										source={(tabSelected === "chat" && chat) || chatDisable}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.tabSelectedFunction("camera")}
									style={styles.actionBox}
								>
									<Image
										resizeMode="contain"
										style={styles.actionBoxIcon}
										source={
											(tabSelected === "camera" && camera) || cameraDisable
										}
									/>
								</TouchableOpacity>
							</View>

							{/* go to next page */}
							<TouchableOpacity
								onPress={() => {
									if (this.state.message != "") {
										this.setState({
											tabSelected: "timePicker",
											messageType: "chat"
										});
									}
								}}
								style={[styles.nextButton]}
							>
								<Image style={styles.iconButton} source={next} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Animated.View>
		);
	};

	takePicture() {
		const options = {};
		this.camera
			.capture({ metadata: options })
			.then(data => {
				// this.uploadImageToCloud(data['mediaUri'])
				this.setState({
					tabSelected: "image",
					messageImageSource: {
						pathUri: { uri: data.path },
						mediaUri: { uri: data.path, isStatic: true } //uri: "data:image/jpeg;base64," + data.mediaUri
					}
				});
				console.log("messageImageSource:::", data);
			})
			.catch(err => console.error(err));
	}

	selectPictureFromGallery() {
		let option = {
			mediaType: "photo",
			allowsEditing: true
		};
		/**
		 * The first arg is the options object for customization (it can also be null or omitted for default options),
		 * The second arg is the callback which sends object: response (more info in the API Reference)
		 */
		ImagePicker.launchImageLibrary(options, response => {
			// console.log("Response = ", response);

			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {
				this.setState({
					tabSelected: "image",
					messageImageSource: {
						pathUri: { uri: response.uri },
						mediaUri: { uri: response.uri, isStatic: true } //uri: "data:image/jpeg;base64," + data.mediaUri
					}
				});

				/*
				// activate cropping image
				// ------------------------------

				ImageCropPicker.openCropper({
					cropping: true,
					path: response,
					mediaType: "photo",
					loadingLabelText: "Processing..."
					// cropperChooseText: this.state.loadingUpdateAvatar
					// 	? "Loading..."
					// 	: "Choose" // it is IOS only
				}).then(image => {
					if (image && image.path) {
						this.setState({
							tabSelected: "image",
							messageImageSource: {
								pathUri: { uri: "file://" + image.path },
								mediaUri: { uri: "file://" + image.path, isStatic: true } //uri: "data:image/jpeg;base64," + data.mediaUri
							}
						});
					}
				});

				// ------------------------------
						*/
				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };
				// this.uploadImageToCloud(response.uri);
			}
		});
	}

	changeCamera = () => {
		this.setState({
			cameraType:
				this.state.cameraType == Camera.constants.Type.front
					? Camera.constants.Type.back
					: Camera.constants.Type.front
		});
	};

	handleDoubleTap = () => {
		const NOW = Date.now();
		const DOUBLE_TAP_DELAY = 300;
		if (this.state.lastTap && (NOW - this.state.lastTap) < DOUBLE_TAP_DELAY) {
			this.changeCamera();
		}
		else {
			this.setState({
				lastTap: NOW
			})
		}
	}

	loadCameraContent = () => {
		const { tabSelected, cameraType, cameraZoom } = this.state;
		return (
			<TouchableWithoutFeedback onPress={this.handleDoubleTap}>
				<Camera
					ref={cam => {
						this.camera = cam;
					}}
					style={styles.cameraActionBox}
					aspect={Camera.constants.Aspect.fill}
					captureTarget={Camera.constants.CaptureTarget.disk}
					type={cameraType}
					zoom={cameraZoom /* between 0 to 1 */}
				>
					<View style={styles.messageBoxHeader}>
						<TouchableOpacity onPress={this.props.closeMessageModal}>
							<Image style={styles.closeIcon} source={closeWhite} />
						</TouchableOpacity>
						<View />
						{/* <View /> */}
						<TouchableOpacity onPress={this.changeCamera.bind(this)}>
							<Image
								source={changeCamera}
								resizeMode="contain"
								style={{
									height: 35,
									width: 35
								}}
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.cameraActions}>
						<TouchableOpacity onPress={this.selectPictureFromGallery.bind(this)}>
							<Image
								source={accessCam}
								resizeMode="contain"
								style={{
									height: 35,
									width: 35
								}}
							/>
						</TouchableOpacity>
						
						<TouchableOpacity onPress={this.takePicture.bind(this)}>
							<Image
								resizeMode="contain"
								style={styles.cameraBtn}
								source={cameraBtn}
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.tabSelectedFunction("chat")}>
							<Image
								source={chatToggleFromCamera}
								resizeMode="contain"
								style={{
									height: 35,
									width: 35
								}}
							/>
						</TouchableOpacity>
					</View>
				</Camera>
			</TouchableWithoutFeedback>
		);
	};

	loadImageContent = () => {
		return (
			<View style={styles.cameraActionBox}>
				<View style={styles.selectedPhotoAsBackgroundContainer}>
					<ImageBackground
						style={styles.selectedPhotoAsBackground}
						source={this.state.messageImageSource.mediaUri}
					/>
				</View>
				<View style={styles.messageBoxHeader}>
					<TouchableOpacity
						onPress={() => this.setState({ tabSelected: "camera" })}
					>
						<Image style={styles.closeIcon} source={closeWhite} />
					</TouchableOpacity>
					<View />
					<View />
				</View>
				<View style={styles.footer}>
					<View
						style={[
							styles.footerActions,
							{ justifyContent: "flex-end", width, paddingRight: 30 }
						]}
					>
						<TouchableOpacity
							onPress={() =>
								this.setState({
									tabSelected: "timePicker",
									messageType: "camera"
								})
							}
							style={[
								styles.nextButton,
								{ backgroundColor: colors.combinatorialColor }
							]}
						>
							<Image style={styles.iconButton} source={next} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};

	loadContacts = () => {
		const { loadingSendMessage } = this.state;

		return (
			<View style={styles.containerOtherPage}>
				<View style={[appCss.header, { width, borderWidth: 0 }]}>
					<View style={{ borderWidth: 0, flex: 1 }}>
						<TouchableOpacity
							onPress={() => this.setState({ tabSelected: "timePicker" })}
							style={[
								appCss.otherHeaderIconBox,
								{ height: 33, width: 33, borderWidth: 0 }
							]}
						>
							<Ionicons
								size={30}
								color={colors.bodyColor}
								name="ios-arrow-back"
							/>
						</TouchableOpacity>
					</View>
					<View style={{ borderWidth: 0 }}>
						<Text style={appCss.headerTitle}>Send To</Text>
					</View>
					<View style={{ borderWidth: 0, flex: 1 }} />
				</View>
				<Toast />
				<SendTo
					friendList={this.friendList}
					loadingSendMessage={loadingSendMessage}
				/>
			</View>
		);
	};

	friendList = list => {
		console.log("get the list from SendTo component", list);
		let memberListId = [];
		list.forEach(i =>
			i["data"].forEach(ii => ii["checked"] && memberListId.push(ii["id"]))
		);
		console.log("memberListId", memberListId);
		if (memberListId.length) {
			this.setState({ memberListId, loadingSendMessage: true }, () => {
				console.log("message type is", this.state.messageType);
				if (this.state.messageType != "chat") {
					this.uploadImageToCloud(this.state.messageImageSource.pathUri.uri);
				} else {
					let availableAt = moment()
						.add(this.state.selectedHours, "hours")
						.add(this.state.selectedMinutes, "minutes")
						.toDate();

					this.props.newMessage({
						senderMemberId: this.props.id,
						receiverMemberList: this.state.memberListId,
						availableAt: availableAt,
						postType: "text",
						textContent: this.state.message
					});
					this.props.closeMessageModal();
				}
			});
		}
	};

	loadTimePicker = () => {
		const { selectedHours, selectedMinutes, messageType } = this.state;
		return (
			<View style={styles.containerOtherPage}>
				<View style={[appCss.header, { width }]}>
					<TouchableOpacity
						onPress={() => {
							let tabSelected = "";
							if (messageType === "chat") {
								tabSelected = "chat";
							} else if (messageType === "camera") {
								tabSelected = "image";
							}

							this.setState({
								tabSelected
							});
						}}
						style={[appCss.otherHeaderIconBox, { height: 33, width: 33 }]}
					>
						<Ionicons
							size={30}
							color={colors.bodyColor}
							name="ios-arrow-back"
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
					/>
				</View>
				<Text style={styles.pickerText}>⏳ Time until unswirl... </Text>
				<View style={{ flex: 1, borderWidth: 0 }}>
					<TimePicker
						selectedHours={selectedHours}
						selectedMinutes={selectedMinutes}
						onChange={
							(hours, minutes) =>
								this.setState({
									selectedHours: hours,
									selectedMinutes: minutes
								})
							// this.setState({
							// 	selectedHours: 0,
							// 	selectedMinutes: .2
							// })
						}
					/>
				</View>

				<View
					style={{
						height: height * 0.15,
						width,
						flexDirection: "row",
						justifyContent: "flex-end",
						borderWidth: 0
					}}
				>
					<View style={styles.footer}>
						<View
							style={[
								styles.footerActions,
								{ justifyContent: "flex-end", width, paddingRight: 15 }
							]}
						>
							<TouchableOpacity
								onPress={() => this.setState({ tabSelected: "contacts" })}
								style={[styles.nextButton]}
							>
								<Image style={styles.iconButton} source={next} />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	};

	render() {
		const { tabSelected } = this.state;
		let contentLoader = "";
		switch (tabSelected) {
			case "chat":
				contentLoader = this.loadMessageContent();
				break;
			case "camera":
				contentLoader = this.loadCameraContent();
				break;
			case "image":
				contentLoader = this.loadImageContent();
				break;
			case "contacts":
				contentLoader = this.loadContacts();
				break;
			case "timePicker":
				contentLoader = this.loadTimePicker();
				break;
		}

		// if we are in Text mode we active background image and if not we set the background source param with null
		return (
			<ImageBackground
				style={styles.container}
				source={tabSelected != "image" ? background : ""}
			>
				{contentLoader}
			</ImageBackground>
		);
	}
}
