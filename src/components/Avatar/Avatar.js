import React, { Component } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import styles from "./style";
import { CONFIG } from "../../../config";

export default class Avatar extends Component {
	state = {
		updateAvatarRandom: Math.floor(Math.random() * 10000000) + 1
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.hasInstagramToken != nextProps.hasInstagramToken) {
			this.setState({
				updateAvatarRandom: Math.floor(Math.random() * 10000000) + 1
			});
		}
	}

	avatarUrl = id => {
		return {
			url: `${CONFIG.serverUrl}/api/v1/general/members/action/avatar/${id}?${
				this.state.updateAvatarRandom
			}`
		};
	};

	prepareForRedirectToProfile = () => {
		let userId = this.props.userId;
		// this.props.homeSetCloseModal(true);
		// this.props.profileSetCloseModal(true);
		this.props.navigation.push("ProfileScreen", { userId: userId, x: 1 });
	};

	render() {
		let {
			userId,
			avatarContainerStyle,
			avatarImageStyle,
			disabled
		} = this.props;
		let myStyleSheet = styles.getSheet(this.props.size);
		if (this.props.position == "profile") {
			return (
				<TouchableOpacity
					onPress={()=>this.prepareForRedirectToProfile()}
					style={[myStyleSheet.avatarItem, avatarContainerStyle]}>
					<Image
						style={[myStyleSheet.avatarImage, avatarImageStyle]}
						source={this.avatarUrl(userId)}
					/>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity
					style={[myStyleSheet.avatarItem, avatarContainerStyle]}
					onPressIn={this.props.onPressIn}
					onPressOut={this.props.onPressOut}
					disabled={disabled}
				>
					<Image
						style={[myStyleSheet.avatarImage, avatarImageStyle]}
						source={this.avatarUrl(userId)}
					/>
				</TouchableOpacity>
			);
		}
	}
}
