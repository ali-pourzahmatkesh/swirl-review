import React, {Component} from "react";
import {FlatList, Image, Text, TouchableOpacity, View, Modal} from "react-native";
import {NavigationActions, SafeAreaView} from "react-navigation";
import styles from "./style";
import appCss from "../../../app.css";
import logo from "../../assets/images/logo_bigger.png";
import logoOther from "../../assets/images/logo_bigger_other.png";
import profile from "../../assets/images/icons/profile.png";
import addMessage from "../../assets/images/icons/Group.png";
import Avatar from "../Avatar";
import {CONFIG} from "../../../config";
import EmptyList from "../EmptyList";
// import defaultMoment from "moment";
import moment from "moment-timezone";
import MessagePopup from "../MessagePopup/MessagePopup";
import InviteFromContacts from "../InviteFromContacts/InviteFromContacts";
const COLORS = CONFIG.colors;

// import Discussion from "../Discussion";

class Home extends Component {
	constructor(props) {
		super(props);
        this.state = {
            refreshing: true,
            messageVisible:false,
            // list1: [],
            list: [

                {
                    id: "1",
                    senderMemberId: "2",
                    senderName: "VALA RAHMANI", // username
                    receiverMemberId: "3",
                    receiverName: "testReceiver", // username
                    postType: "text", // or "image"
                    textContent: "hello world!",
                    imageContentName: "testImage1",
                    imageContentExtension: "png",
                    isSeen: false,
                    availableAt: "2018-12-03T19:36:39.326Z",
                    identifier: "1"
                },

                {
                    id: "2",
                    senderMemberId: "2",
                    senderName: "VALA RAHMANI", // username
                    receiverMemberId: "3",
                    receiverName: "testReceiver", // username
                    postType: "text", // or "image"
                    textContent: "hello world!",
                    imageContentName: "testImage1",
                    imageContentExtension: "png",
                    isSeen: false,
                    availableAt: "2018-10-03T19:36:39.326Z",
                    identifier: "1"
                },

                {
                    id: "3",
                    senderMemberId: "2",
                    senderName: "THEODORE FRANCIS", // username
                    receiverMemberId: "3",
                    receiverName: "testReceiver", // username
                    postType: "text", // or "image"
                    textContent: "hello world!",
                    imageContentName: "testImage1",
                    imageContentExtension: "png",
                    isSeen: true,
                    availableAt: "2018-10-03T19:36:39.326Z",
                    identifier: "1"
                },

                {
                    id: "4",
                    senderMemberId: "2",
                    senderName: "THEODORE FRANCIS2", // username
                    receiverMemberId: "3",
                    receiverName: "testReceiver", // username
                    postType: "text", // or "image"
                    textContent: "hello world!",
                    imageContentName: "testImage1",
                    imageContentExtension: "png",
                    isSeen: true,
                    availableAt: "2018-10-03T19:36:39.326Z",
                    identifier: "1"
                },
            ]
        };
	}

    componentDidMount() {
        this.refreshing()
    };
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
                    onPress={()=>this.setState({messageVisible : true})}
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

    loadContentItem = ( { item } ) => {
        console.log("isAvailable", item)
        const isAvailable = new Date(item[ "availableAt" ]).getTime() < new Date().getTime();

        return (
			<TouchableOpacity onPress={() => {
                this.loadDetail(item, isAvailable)
            }} style={[ styles.chatListBox, !isAvailable && styles.chatListBlockBox ]}>
				<View style={styles.avatarBox}>
					<Avatar
						userId={item.id}
						size={57}
						position="profile"
					/>
				</View>
				<View style={styles.chatListSubjectBox}>
					<View>
						<Text
							style={[ styles.chatSubject, !isAvailable && { color: COLORS.bodyColor } ]}>{item[ 'senderName' ]}</Text>
						<Text style={[ styles.chatDesc, !isAvailable && { color: COLORS.bodyColor } ]}>
                            {!isAvailable && 'Tap to unswirl!' || moment(item[ "availableAt" ], "YYYYMMDD").startOf('hour').fromNow()}
						</Text>
					</View>
					<View style={styles.otherInfo}>
						<View><Text
							style={[ styles.chatTime, !isAvailable && { color: COLORS.bodyColor } ]}>{moment(item[ "availableAt" ], "YYYYMMDD").fromNow()}</Text></View>
						{
                            (
                            !item[ 'isSeen' ] || !isAvailable) && <Image source={!isAvailable && logo || logoOther}
																		 style={styles.otherInfoLogo}/>
						}

					</View>

				</View>
			</TouchableOpacity>
        )
    };
    onRefresh = () => {
    };
    refreshing = () => {
        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 2000);
    };

    loadDetail = ( data, isAvailable ) => {
        if( !isAvailable ) {
            alert("not Available");
        } else {
            alert("Available");
        }

    };


    render() {
        const { list, refreshing } = this.state;
        return (
			<View style={styles.container}>
                <Modal
                    visible={this.state.messageVisible}
                    animationType="slide"
                    transparent={true}
                >
                    {/*<InviteFromContacts/>*/}
                        <MessagePopup closeMessageModal={()=>{this.setState({ messageVisible: false })}}/>
                </Modal>
                {this.loadHeader()}
				<View style={styles.chatList}>
					{
                        list.length &&
						<FlatList
							data={list}
							keyExtractor={( item, index ) => {
                                return item.id;
                            }}
							renderItem={( { item } ) => this.loadContentItem({ item })}
							ListEmptyComponent={() => <EmptyList />}
							onEndReachedThreshold={0.5}
							onRefresh={() => {
                                this.onRefresh();
                            }}
							refreshing={refreshing}
						/> ||
						<View style={styles.chatListEmpty}><Text style={styles.chatListEmptyText}>Nobody swirled you…
							Yet.. </Text></View>
					}

				</View>
                {
                    list.length &&
					<View style={styles.homeBottomBox}>
						<TouchableOpacity onPress={()=>this.setState({messageVisible : true})}>
							<View style={styles.iconBottomBox}>
								<Image style={styles.iconBottom} source={addMessage}/>
							</View>
						</TouchableOpacity>
					</View>
                }

			</View>
		);
	}
}

export default Home;
