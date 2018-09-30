import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";
import { CONFIG } from "../../../config";
export default class SocketWatcher extends Component {
	state = {
		io: "",
		id: ""
	};
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isLogin && nextProps.id && !this.state.id) {
			this.setState({ id: nextProps.id }, () => {
				if (this.state.io) {
					this.updateSocket(this.state.io);
				} else {
					this.setState({ io: sailsIOClient(socketIOClient) }, () => {
						this.connectSocket(this.state.io);
					});
				}
			});
		} else if (!nextProps.auth.isLogin) {
			if (this.state.io && this.state.id) {
				this.setState({ id: "" });
			}
		}
	}

	connectSocket = io => {
		io.sails.url = CONFIG.serverUrl;
		io.sails.autoConnect = true;
		io.sails.reconnection = true;
		io.sails.initialConnectionHeaders = { nosession: true };
		// io.sails.headers = {
		// 	"x-csrf-token": "someToken"
		// };

		// disabling jsonp and set it to false
		// it prevent error of document not found
		io.sails.transports = ["websocket"];
		io.sails.useCORSRouteToGetCookie = false;
		// -------------------------------------

		io.socket.on("connect", () => {
			this.updateSocket(io);
		});
		this.listenerList(io);
	};

	updateSocket = io => {
		let userId = this.state.id;
		let updatePath = `${CONFIG.serverUrl}/api/v1/members/${userId}/socket`;
		io.socket.put(updatePath, {}, () => {
			// console.log('** update socketId successfully **')
		});
	};

	listenerList = io => {
		// this method is not use anymore in new version
		// io.socket.on("new_video", data => {
		// 	// console.log("new_video::", data)
		// 	this.props.addNotificationCount();
		// });

		io.socket.on("new_friend", data => {
			console.log("new friend data", data);
			this.props.hasFriendShipRequest();
			// this.props.getListOfFriendRequests({
			// 	receiverMemberId: this.props.id,
			// 	refreshing: true
			// });
			this.props.getFriendshipStatus({
				receiverMemberId: data.senderId,
				senderMemberId: this.props.id
			});
		});

		io.socket.on("new_visit", data => {
			this.props.socketVisitCount(data.profileViewCount);
		});

		io.socket.on("member_movement", data => {
			/*
				output format
				{
					memberId: '5b3a787a88f3df6708de2812',
					name: "test",
					distance: 43,
					location: {
						type: 'Point',
						coordinates: [ 51.521201, 35.749212 ],
						heading: 20
					}
				}
			 */
			console.log(" receive member_movement event::", data);
			this.props.updatePersonNearMe(data);
		});

		io.socket.on("new_chat", data => {
			let tab = data.isInRequestMode === false ? "Chats" : "Requests";
			console.log("receive new chat message", data, tab);
			// TODO: need to check the page I am in and reaction related to that
			if (this.props.currentTabOfPage == tab) {
				this.props.getListData(this.state.id, tab);
			}
			this.props.addChatCount();
			this.props.newChat(data);

			// if are in Home page add this notification to list of notify them
			//console.log("in page", this.props.currentPage);
			//if (this.props.currentPage == "Home") {
			this.props.addNotificationToStack({
				name: data.senderUsername,
				userId: data.senderMemberId,
				messageType: tab,
				message: data.textContent
			});
			//}
		});

		io.socket.on("cancel_friendship_request", data => {
			console.log("cancel friendship request data", data);

			this.props.callGetStatus(this.props.id);
			// this.props.getListOfFriendRequests({
			// 	receiverMemberId: this.props.id,
			// 	refreshing: true
			// });
			this.props.getFriendshipStatus({
				receiverMemberId:
					data.senderMemberId == this.props.id
						? data.receiverMemberId
						: data.senderMemberId,
				senderMemberId: this.props.id
			});
		});

		io.socket.on("cancel_friendship", data => {
			console.log("cancel friendship data", data);

			this.props.callGetStatus(this.props.id);
			this.props.getFriendshipStatus({
				receiverMemberId:
					data.senderMemberId == this.props.id
						? data.receiverMemberId
						: data.senderMemberId,
				senderMemberId: this.props.id
			});
		});

		io.socket.on("approve_friendship", data => {
			console.log("approve friendship data", data);

			this.props.callGetStatus(this.props.id);
			this.props.getFriendshipStatus({
				receiverMemberId:
					data.senderMemberId == this.props.id
						? data.receiverMemberId
						: data.senderMemberId,
				senderMemberId: this.props.id
			});
		});
	};

	render() {
		return null;
	}
}
