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
import background from "../../assets/images/logo1.png";
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
			<ImageBackground
				style={styles.cameraActionBox}
				resizeMode="cover"
				source={{ uri: imageSource }}
			>
				<View style={styles.messageBoxHeader}>
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
						<Image style={styles.closeIcon} source={close} />
					</TouchableOpacity>
					<View />
					<View />
				</View>
			</ImageBackground>
		);
	};

	loadTextContent = data => {
		return (
			<View style={styles.container}>
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
			</View>
		);
	};

	render() {
		return this.loadContent();
	}
}
