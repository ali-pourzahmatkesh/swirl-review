console.log("WelcomeStack");
import { CONFIG } from "../../config";
import { StackNavigator } from "react-navigation";

import SignUpScreen from "../screens/SignUpScreen";
import SignUpConfirmScreen from "../screens/SignUpConfirmScreen";
import SignInScreen from "../screens/SignInScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ForgotPasswordVerifyScreen from "../screens/ForgotPasswordVerifyScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

const COLORS = CONFIG.colors;

export default StackNavigator(
	{
		SignUpScreen: {
			screen: SignUpScreen
		},
		SignUpConfirmScreen: {
			screen: SignUpConfirmScreen
		},
		SignInScreen: {
			screen: SignInScreen
		},
		ForgotPasswordScreen: {
			screen: ForgotPasswordScreen
		},
		ForgotPasswordVerifyScreen: {
			screen: ForgotPasswordVerifyScreen
		},
		ChangePasswordScreen: {
			screen: ChangePasswordScreen
		}
	},
	{
		initialRouteName: "SignInScreen",
		headerMode: "screen",
		// headerMode: 'none',
		navigationOptions: {
			headerStyle: {
				// backgroundColor: "#ed1b34",
				backgroundColor: COLORS.appColor,
				paddingRight: 20,
				paddingLeft: 20,
				borderBottomWidth: 1,
				borderBottomColor: "rgba(255,255,255,.1)"
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold",
				color: "#fff",
				fontSize: 20
			}
		}
	}
);
