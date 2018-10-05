import React, {Component} from "react";
import {Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Dimensions} from "react-native";
import logo from "../../assets/images/logo_bigger.png";
import usernameIcon from "../../assets/images/icons/Mask.png";
import appCss from "../../../app.css";
import styles from "./style";
import {CONFIG} from "../../../config";
const { width, height } = Dimensions.get("window");

// import moment from "moment";

const colors = CONFIG.colors;

export default class ChangeInfo extends Component {
    state = {
        username: ""
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
        if( !username || username.length === 0 ) disabledBtn = true;

        return (
			<View style={styles.container}>
				<KeyboardAvoidingView keyboardVerticalOffset={height === 812 ? 85 : 65} style={{ flex: 1 }} behavior="padding">
					<View
						style={
                            styles.imageContainer
                        }
					>
						<View style={styles.imagesContent}>
							<Image style={styles.imageItem} source={logo}/>
						</View>
					</View>
					<View style={[ appCss.formInputContainer ]}>
						<View style={appCss.iconFormInput}>
							<Image style={appCss.formInputIcon} source={usernameIcon}/>
							<TextInput
								style={[ appCss.textInput ]}
								placeholder={this.props.username}
								placeholderTextColor={colors.combinatorialColor}
								autoCorrect={false}
								value={username}
								blurOnSubmit={true}
								autoFocus={true}
								onChangeText={username => this.setState({ username })}
							/>
						</View>

					</View>
					<TouchableOpacity
						style={[ styles.nextButton ]}
						onPress={this.onPressButton}
						disabled={!this.props.username}
					>
						<Text style={[ styles.nextText, !this.props.username && { opacity: 0.5 } ]}>save</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</View>
		);
	}
}
