import React, { Component } from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	ImageBackground
} from "react-native";
import styles from "./style";
import close from "../../assets/images/icons/close_red.png";
import { CONFIG } from "../../../config";
import background from "../../assets/images/swirlBackground.png";
const colors = CONFIG.colors;
export default class MessageDetail extends Component {
	loadContent = () => {
		const { navigation } = this.props;
		const data = navigation.getParam("data");
		if (data && data["postType"] === "text") {
			return this.loadTextContent(data);
		} else {
			return this.loadImageContent(data);
		}
	};

	loadImageContent = data => {
		let imageSource = `${CONFIG.cloudinary.resource_url_prefix}/${
			CONFIG.cloudinary.cloud
		}/image/upload/${CONFIG.cloudinary.resource_url_params_message}${
			data["imageContentName"]
		}.${data["imageContentExtension"]}`;
		console.log("data.imageContentName", imageSource);
		return (
			<View style={styles.containerCamera}>
				<View style={styles.cameraActionBox}>
					<View style={styles.selectedPhotoAsBackgroundContainer}>
						{"gallery" === "gallery" ? (
							<Image
								style={styles.selectedPhotoAsBackgroundGallery}
								resizeMode={"contain"}
								source={{ uri: imageSource }}
							/>
						) : (
							<ImageBackground
								style={styles.selectedPhotoAsBackground}
								source={{ uri: imageSource }}
							/>
						)}
					</View>

					<View style={styles.messageBoxHeader}>
						<TouchableOpacity
							onPress={() => this.props.navigation.goBack()}
							style={styles.closeButton}
						>
							<Image style={styles.closeIcon} source={close} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};

	loadTextContent = data => {
		return (
			<ImageBackground style={styles.container} source={background}>
				<View style={styles.messageBox}>
					<View style={styles.messageBoxHeader}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Image style={styles.closeIcon} source={close} />
						</TouchableOpacity>
					</View>
					<View style={styles.textInputBox}>
						<Text style={styles.messageText}>{data.textContent}</Text>
					</View>
				</View>
			</ImageBackground>
		);
	};

	render() {
		return this.loadContent();
	}
}
