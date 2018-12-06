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
		// console.log("data.imageContentName", imageSource);
		// return (
		// 	<ImageBackground
		// 		style={styles.cameraActionBox}
		// 		resizeMode="cover"
		// 		// source={{ uri: imageSource }}
		// 		source={image2}
		// 	>
		// 		<View style={styles.messageBoxHeader}>
		// 			<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
		// 				<Image style={styles.closeIcon} source={close} />
		// 			</TouchableOpacity>
		// 			<View />
		// 			<View />
		// 		</View>
		// 	</ImageBackground>
		// );
		return (
			<View style={{ backgroundColor: "#000", flex: 1 }}>
				<View style={styles.messageBoxHeader}>
					<View style={styles.messageBoxHeaderActions}>
						<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
							<Image style={styles.closeIcon} source={close} />
						</TouchableOpacity>
						<View />
						<View />
					</View>
				</View>
				<Image
					style={{ width: "100%", height: "100%" }}
					resizeMode={"contain"}
					source={{ uri: imageSource }}
				/>
			</View>
		);
	};

	loadTextContent = data => {
		return (
			<ImageBackground style={styles.container} source={background}>
				<View style={styles.messageBox}>
					<TouchableOpacity
						onPress={() => {this.props.navigation.goBack()}}
						style={styles.closeButton}
					>
						<Image style={styles.closeIconText} source={close} />
					</TouchableOpacity>
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
