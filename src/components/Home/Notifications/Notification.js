import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    Animated
} from "react-native";
import momentTz from "moment-timezone";
import Avatar from "../../Avatar";
import appCss from "../../../../app.css";
import styles from "./style";
import {CONFIG} from "../../../../config";

import logo from "../../../assets/images/logo3/fullSat.png";
const COLORS = CONFIG.colors;
const { height, width } = Dimensions.get('window');

export default class Notification extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps){

    }

    loadPostTypeEmoji = postType => {
		if(postType === 'text'){
			return '✉️';
		}
		else if(postType === 'image'){
			return '📷';
		}
	}

	loadDetail = data => {
		console.log("start showing a message detail", data);
		this.props.navigation.push(this.props.destination, { data });
		if (data.isSeen === false) {
            console.log("this message need to update with new status isSeen");
            // todo
			this.props.visitMessage(this.props.visitProps);
		}
    };

    render(){
        let item = this.props.item;

        

        const isAvailable =
			new Date(item["availableAt"]).getTime() <= new Date().getTime();
		let messageHint = "";
		let messageOnpress;
		let messageStyle;
		const BOX_HEIGT = 30 + (height * 0.06);
		if (isAvailable) {
			if (item.isSeen) {
				messageHint = () => {
					return (
						" " + "Unswirled " +
						// momentTz(item["availableAt"], "YYYYMMDD")
						// 	.startOf("hour")
                        // 	.fromNow(true) +
                        momentTz(item["createdAt"]).fromNow(true) +
						" ago"
					);
				};
				messageOnpress = () => {
					this.props.setHomeState({ newMessageModalVisible: true });
				};
				messageStyle = "Archived";
            } 
            else {
				messageHint = () => {
					return " " + "Tap to unswirl! ";
				};
				messageOnpress = () => {
					this.loadDetail(item);
				};
				messageStyle = "Ready";
			}
		}

		return (
			<View
				style={[
					styles.chatListBox,
					isAvailable && !item.isSeen && styles.chatListBlockBox
				]}
			>
				<TouchableOpacity
					onPress={messageOnpress}
					style={styles.chatListSubjectBox}
				>
					<View style={styles.avatarBox}>
						<Avatar userId={item.senderMemberId} size={BOX_HEIGT * 0.8} position='image'/>
					</View>
					<View style={[styles.messageInfoBox, !isAvailable && {paddingTop: BOX_HEIGT * 0.13, paddingBottom: BOX_HEIGT * 0.07}]}>
						<Text
							style={[
								styles.chatSubject,
								messageStyle == "Ready" && { color: COLORS.bodyColor }
							]}
						> {item.senderName}
						</Text>
						<View style={styles.messageHintContainer}>
					{isAvailable ?
							<Text
								style={[
									styles.chatDesc,
									messageStyle == "Ready" && { color: COLORS.bodyColor },
								]}
							>
								{messageHint()}
							</Text>
						:
                        messageHint()
					}
						</View>
					</View>
					<View style={styles.otherInfo}>
                        <Text
                            style={[
                                styles.chatTime,
                                messageStyle == "Ready" && { color: COLORS.bodyColor }
                            ]}
                        >
                            {momentTz(item["createdAt"]).fromNow(true)}
                        </Text>
                    {
                        !item.isSeen &&
                        <Image
                            source={logo}
                            style={[
                                styles.otherInfoLogo,
                            ]}
                        />
                    }
					</View>
				</TouchableOpacity>
			</View>
		);
    }
}