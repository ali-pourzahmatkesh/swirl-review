console.log("RootStack");
import { StackNavigator } from "react-navigation";
import WelcomeStack from "./WelcomeStack";
import HomeStack from "./HomeStack";
import SplashScreen from "../screens/SplashScreen";

export default StackNavigator(
	{
		SplashScreen: { screen: SplashScreen },
		WelcomeStack: { screen: WelcomeStack },
		HomeStack: {
			screen: HomeStack
			// navigationOptions: {
			//     gesturesEnabled: false,
			// }
		}
	},
	{
		//     initialRouteName: 'WelcomeStack',
		headerMode: "none"
	}
);

//sent params ==> this.props.navigation.navigate('RouteName', { /* params go here */ })
//get params ==> this.props.navigation.state.params

//title for header in any component ==> static navigationOptions = { title: 'Home'};
