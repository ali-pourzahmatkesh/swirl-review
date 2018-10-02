import React, { Component } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Dimensions,
	ImageBackground,
	SectionList
} from "react-native";
import { NavigationActions } from "react-navigation";
import Avatar from "../Avatar";
import Popup from "../Popup";
import appCss from "../../../app.css";
import styles from "./style";
import ghostFill from "../../assets/images/ghost.png";
import ghostEmpty from "../../assets/images/ghostEmpty.png";
import logo from "../../assets/images/tape-logo.png";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import background from "../../assets/images/background.png";
import changeName from "../../assets/images/changeName.png";
import changePassword from "../../assets/images/changePassword.png";
import termsOfUse from "../../assets/images/termsOfUse.png";
import privacyPolicy from "../../assets/images/privacyPolicy.png";
import feedback from "../../assets/images/feedback.png";
import logout from "../../assets/images/logout.png";

import { CONFIG } from "../../../config";
const COLORS = CONFIG.colors;
const { width, height } = Dimensions.get("window");

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ghost: false,
			ghostNotif: false
		};
	}

	componentDidMount() {
		this.props.callGetProfile(this.props.id);
	}

	componentWillReceiveProps(nextProps) {
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

	render() {
		let { userProfile } = this.props;
		console.log(userProfile);
		let options = [
			{
				title: "Account info",
				data: [
					{
						icon: changeName,
						name: "Change Username",
						clickHandler: () => {} // todo make name change
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
						icon: termsOfUse,
						name: "Terms of Use",
						clickHandler: () => this.goTo("TermsAndConditionsScreen")
					},
					{
						icon: privacyPolicy,
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
				{this.showGhostModePopup()}
				<View style={{ flex: 1 }}>
					<ImageBackground style={{ width: "100%" }} source={background}>
						<View style={[appCss.header, { marginBottom: 0 }]}>
							<TouchableOpacity
								style={appCss.headerIconBox}
								onPress={() => this.props.navigation.goBack()}
							>
								<Image
									style={appCss.headerIcon}
									resizeMode={"contain"}
									source={logo}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => this.changeGhostMode()}
								style={appCss.headerIconBox}
							>
								<Image
									style={appCss.headerIcon}
									resizeMode={"contain"}
									source={this.state.ghost ? ghostFill : ghostEmpty}
								/>
							</TouchableOpacity>
						</View>
						<View
							style={{
								borderWidth: 0,
								height: height * 0.15,
								alignSelf: "center"
							}}
						>
							<Avatar
								userId={this.props.id}
								size={height * 0.15}
								position="profile"
							/>
						</View>
						<Text style={styles.nameText}>{userProfile.name}</Text>
					</ImageBackground>
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
