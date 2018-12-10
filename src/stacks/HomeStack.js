console.log("HomeStack");
import { StackNavigator } from "react-navigation";
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
import {
	Easing,
	Animated
} from "react-native";
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
import MessageDetailScreen from "../screens/MessageDetailScreen";
import InviteTabsScreen from "../screens/InviteTabsScreen";
import { CONFIG } from "../../config";
const COLORS = CONFIG.colors;

const transitionConfig = () => {
	return {
		transitionSpec: {
			duration: 500,
			easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
			timing: Animated.timing,
			// useNativeDriver: true
		},
		screenInterpolator: sceneProps => {  
			// console.log('scene props', sceneProps) 
			const { layout, position, scene, scenes, index } = sceneProps
			if(
				(index === 1 &&
				scenes[1].route.routeName === 'InviteTabsScreen') ||
				(index === 0 &&
				scenes[1] &&
				scenes[1].route.routeName === 'InviteTabsScreen')
			){
				console.log('going to tabs')
				const thisSceneIndex = scene.index
				const width = layout.initWidth
	
				const translateX = position.interpolate({
					inputRange: [thisSceneIndex - 1, thisSceneIndex],
					outputRange: [-1 * width, 0],
				})
	
				return { transform: [ { translateX } ] }
			}
			// else if(
			// 	index === 0 &&
			// 	scenes[1] &&
			// 	scenes[1].route.routeName === 'InviteTabsScreen'
			// ){
			// 	console.log('coming from tabs')
			// 	const thisSceneIndex = scene.index
			// 	const width = layout.initWidth
	
			// 	const translateX = position.interpolate({
			// 		inputRange: [thisSceneIndex - 1, thisSceneIndex],
			// 		outputRange: [-1 * width, 0],
			// 	})
	
			// 	return { transform: [ { translateX } ] }
			// }
			else{
				return {
					transform: StackViewStyleInterpolator.forHorizontal(sceneProps).transform
				};
			}
			// return {
			// 	transform: StackViewStyleInterpolator.forHorizontal(sceneProps).transform
			// };
		},
	}
}

export default StackNavigator(
	{
		HomeScreen: { screen: HomeScreen },
		ProfileScreen: { screen: ProfileScreen },
		ChangeInfoScreen: { screen: ChangeInfoScreen },
		FeedbackScreen: { screen: FeedbackScreen },
		ChangePasswordScreen: { screen: ChangePasswordScreen },
		ChangePasswordFromProfileScreen: {
			screen: ChangePasswordFromProfileScreen
		},
		TermsAndConditionsScreen: { screen: TermsAndConditionsScreen },
		PrivacyPolicyScreen: { screen: PrivacyPolicyScreen },
		InviteTabsScreen: { screen: InviteTabsScreen },
		MessageDetailScreen: { screen: MessageDetailScreen }
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
		},
		transitionConfig
	}
);

