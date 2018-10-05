console.log("HomeStack");
import {StackNavigator} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
// import ChatsScreen from "./ChatsScreen";
// import DiscussionScreen from "./DiscussionScreen";
import ProfileScreen from "../screens/ProfileScreen";
// import MemberSearchScreen from "./MemberSearchScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangePasswordFromProfileScreen from "../screens/ChangePasswordFromProfileScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import ChangeInfoScreen from "../screens/ChangeInfoScreen";
import { CONFIG } from "../../config";
const COLORS = CONFIG.colors;

export default StackNavigator(
	{
		HomeScreen: { screen: HomeScreen },
		// ChatsScreen: { screen: ChatsScreen },
		// DiscussionScreen: { screen: DiscussionScreen },
		ProfileScreen: { screen: ProfileScreen },
		ChangeInfoScreen: { screen: ChangeInfoScreen },
		// // MemberSearchScreen: { screen: MemberSearchScreen },
		FeedbackScreen: { screen: FeedbackScreen },
		ChangePasswordScreen: { screen: ChangePasswordScreen },
		ChangePasswordFromProfileScreen: {
			screen: ChangePasswordFromProfileScreen
		},
		TermsAndConditionsScreen: { screen: TermsAndConditionsScreen },
		PrivacyPolicyScreen: { screen: PrivacyPolicyScreen }
	},
	{
		initialRouteName: "HomeScreen",
		headerMode: "screen", //none,
		navigationOptions: {
			headerStyle: {
				backgroundColor: COLORS.appColor,
				paddingRight: 10,
				paddingLeft: 10,
				borderBottomWidth: 1,
				borderBottomColor: "rgba(255,255,255,.1)"
			},
			headerTintColor: COLORS.bodyColor,
			headerTitleStyle: {
				fontFamily: "museoSansRounded",
				fontWeight: "bold",
				color: COLORS.bodyColor,
				fontSize: 20
			}
		}
	}
);
