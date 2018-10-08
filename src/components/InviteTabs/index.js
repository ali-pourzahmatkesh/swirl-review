import { TabNavigator } from "react-navigation";
import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import appCss from "../../../app.css";
import FriendRequest from '../FriendRequest/FriendRequest'
import InviteFromContacts from '../InviteFromContacts/InviteFromContacts'
const {width, height} = Dimensions.get("window");
let marginBottom = height === 812 && -25 || 10;
import { CONFIG } from "../../../config";
const COLORS = CONFIG.colors;

const ViewStyle = {
	borderBottomWidth: 1,
	width: "100%",
	height: 60,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	paddingBottom: 15,
	paddingTop: 20
};
class AddFriendN extends Component{
	render(){
		return(
			<View style={{flex:1}}><Text>AddFriendN</Text></View>
		)
	}
}
class AddFriendNew extends Component{
	render(){
		return(
			<View style={{flex:1}}><Text>AddFriendNew66666666</Text></View>
		)
	}
}
export default TabNavigator(
	{
		"AddFriends": {
			screen: InviteFromContacts,
			navigationOptions: {
				tabBarLabel: props => (
					<View
						style={[
							ViewStyle,
							{ borderBottomColor: (props.focused && COLORS.bodyColor) || "transparent" }
						]}
					>
						<Text
							style={[
								appCss.defaultFontApp,
								{
									color: COLORS.bodyColor,
									opacity: props.focused && 1 || 0.8
								}
							]}
						>
							Add friends
						</Text>
					</View>
				)
			}
		},
		"FriendRequests": {
			screen: FriendRequest,
			navigationOptions: {
				tabBarLabel: props => (
					<View
						style={[
                            ViewStyle,
                            { borderBottomColor: (props.focused && COLORS.bodyColor) || "transparent" }
                        ]}
					>
						<Text
							style={[
                                appCss.defaultFontApp,
                                {
                                    color: COLORS.bodyColor,
                                    opacity: props.focused && 1 || 0.8
                                }
                            ]}
						>
							Requests
						</Text>
					</View>
				)
			}
		}
	},
	{
		initialRouteName: "AddFriends",
		tabBarPosition: "top",
		animationEnabled: false,
		swipeEnabled: true,
		tabBarOptions: {
			activeTintColor: "#4a4444",
			inactiveTintColor: "gray",
			labelStyle: {
				fontSize: 12,
				fontFamily: "museoSansRounded"
			},
			style: {
				backgroundColor: COLORS.appColor,
				marginBottom: marginBottom
			},
			tabStyle: {
				width: width / 2,
			}
		}
	}
);
