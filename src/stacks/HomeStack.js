console.log("HomeStack");
import { StackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
// import ChatsScreen from "./ChatsScreen";
// import DiscussionScreen from "./DiscussionScreen";
import ProfileScreen from "../screens/ProfileScreen";
// import MemberSearchScreen from "./MemberSearchScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";

export default StackNavigator(
	{
		HomeScreen: { screen: HomeScreen },
		// ChatsScreen: { screen: ChatsScreen },
		// DiscussionScreen: { screen: DiscussionScreen },
		ProfileScreen: { screen: ProfileScreen },
		// // MemberSearchScreen: { screen: MemberSearchScreen },
		FeedbackScreen: { screen: FeedbackScreen },
		ChangePasswordScreen: { screen: ChangePasswordScreen },
		TermsAndConditionsScreen: { screen: TermsAndConditionsScreen },
		PrivacyPolicyScreen: { screen: PrivacyPolicyScreen }
	},
	{
		initialRouteName: "HomeScreen",
		headerMode: "screen", //none,
		navigationOptions: {
			headerStyle: {
				backgroundColor: "#ed1b34",
				paddingRight: 10,
				paddingLeft: 10,
				borderBottomWidth: 1,
				borderBottomColor: "rgba(255,255,255,.1)"
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontFamily: "museoSansRounded",
				fontWeight: "bold",
				color: "#fff",
				fontSize: 20
			}
		}
	}
);
