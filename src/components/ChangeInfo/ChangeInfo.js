import React, { Component } from "react";
import {
	Image,
	KeyboardAvoidingView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Dimensions
} from "react-native";
import BubbleInput from "../_common/BubbleInput";
import KeyboardAwareButton from "../_common/KeyboardAwareButton";

import logo from "../../assets/images/logo_bigger.png";
// import usernameIcon from "../../assets/images/icons/Mask.png";
import usernameIcon from "../../assets/images/icons/profile3.png";
import appCss from "../../../app.css";
import styles from "./style";
import { CONFIG } from "../../../config";
const colors = CONFIG.colors;
const { width, height } = Dimensions.get("window");
import LoadingCircles3 from "../../components/LoadingCircles3";

export default class ChangeInfo extends Component {
    state = {
        username: this.props.username
    };
    onPressButton = () => {
        this.props.updateMember({
            id: this.props.id,
            username: this.state.username,
            navigation: this.props.navigation
        });
    };

	render() {
		let { username } = this.state;
		let disabledBtn = false;
		if (!username || username.length === 0) disabledBtn = true;

		return (
			<View style={styles.container}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={height === 812 ? 85 : 65}
					style={{ flex: 1 }}
					behavior="padding"
				>
					<View style={styles.imageContainer}>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo} />
						</View>
					</View>
					<View style={[appCss.formInputContainer]}>
						{/* <View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={usernameIcon} />
							<TextInput
								style={[ appCss.textInput ]}
								placeholder='Username here'
								placeholderTextColor={colors.highlightColorTwo + '66'}
								autoCorrect={false}
								value={this.props.username}
								blurOnSubmit={true}
								autoFocus={true}
								onChangeText={username => this.setState({ username })}
							/>
						</View> */}
						<BubbleInput
							icon={usernameIcon}
							inputProps={{
								placeholder: "Username here",
								value: this.props.username,
								onChangeText: username => this.setState({ username })
							}}
						/>
					</View>
					<KeyboardAwareButton
						title='Save'
						onPress={this.onPressButton}
						disabled={disabledBtn}
						beginOnPage={true}
						loading={this.props.isLoadingFetch}
					/>
				</KeyboardAvoidingView>
			</View>
		);
	}
}
