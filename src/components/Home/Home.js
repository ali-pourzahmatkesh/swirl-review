import React, {Component} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./style";
import appCss from "../../../app.css";
import logo from "../../assets/images/logo_bigger.png";
import profile from "../../assets/images/icons/profile.png";
import addMessage from "../../assets/images/icons/Group.png";
import Avatar from "../Avatar";
import {CONFIG} from "../../../config";
const COLORS = CONFIG.colors;
// import Discussion from "../Discussion";

const test = [
    {
    	id:1,
        name: "VALA RAHMANI",
        desc: 'tap to unswirl!',
        time: '2h',
		status : 'block'
    },{
        id:2,
        name: "MIGUEL MACK",
        desc: '7:02 left',
        time: 'now',
        status : 'unread'
    },{
        id:3,
        name: "THEODORE FRANCIS",
        desc: 'screenshot!',
        time: '20h',
        status : 'read'
    },
]
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSubmit = () => {
		this.props.navigation.push("ProfileScreen", {
			userId: 1, //item.memberId,
			x: 1
		});
	};

    loadHeader = () => {

        return (
			<View style={appCss.header}>
				<TouchableOpacity
					onPress={() => {
                        this.changeGhostMode();
                    }}
					style={appCss.headerIconBox}
				>
					<Image
						style={appCss.headerIcon}
						resizeMode={"contain"}
						source={addMessage}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={appCss.headerLogoBox}
					onPress={this.handleSubmit}
				>
					<Image
						style={appCss.headerIcon}
						resizeMode={"contain"}
						source={logo}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={appCss.headerIconBox}
					onPress={this.handleSubmit}
				>
					<Image
						style={appCss.headerIcon}
						resizeMode={"contain"}
						source={profile}
					/>
				</TouchableOpacity>
			</View>
        );

    };

    loadContentItem = (data) => {
        return (
			<View style={[styles.chatListBox, data['status']==='block' && styles.chatListBlockBox]} key={data['id'].toString()}>
				<View style={styles.avatarBox}>
					<Avatar
						userId={this.state.profileUserId || this.props.id}
						size={57}
						position="profile"
					/>
				</View>
				<View style={styles.chatListSubjectBox}>
					<View>
						<Text style={[styles.chatSubject,data['status']==='block' && {color:COLORS.bodyColor}]}>{data['name']}</Text>
						<Text style={[styles.chatDesc,data['status']==='block' && {color:COLORS.bodyColor}]}>{data['desc']}</Text>
					</View>
					<View style={styles.otherInfo}>
						{
							data['status'] !== 'read' && <Image source={logo} style={{ width: 43, height: 43, marginRight: 5, marginTop: 5 }}/>
						}
						{/*<View>*/}
							{/*<Text style={[styles.chatTime,data['status']==='block' && {color:COLORS.bodyColor}]}>{data['time']}</Text>*/}
						{/*</View>*/}
					</View>

				</View>
			</View>
        )
    };

    render() {
        return (
			<View style={styles.container}>
                {this.loadHeader()}
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.chatList}>
					{
                        test.map(item=>this.loadContentItem(item))
					}
					</View>

				</ScrollView>
			</View>
		);
	}
}

export default Home;
