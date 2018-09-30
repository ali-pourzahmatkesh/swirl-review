import {
	ADD_CHAT_COUNT,
	CALL_GET_STATUS,
	fetchGetListData,
	fetchGetListDataFailed,
	fetchGetListDataSuccess,
	fetchGetStatus,
	fetchGetStatusFailed,
	fetchGetStatusSuccess,
	GET_LIST_DATA,
	GET_LIST_DATA_FAILED,
	GET_LIST_DATA_SUCCESS,
	GET_STATUS_FAILED,
	GET_STATUS_SUCCESS,
	HAS_FRIEND_SHIP_REQUEST,
	INITIAL_STATE,
	CALL_DELETE_CHAT,
	DELETE_CHAT_SUCCESS,
	DELETE_CHAT_FAILED,
	deleteChat,
	deleteChatSuccess,
	deleteChatFailed,
	SET_TAB_OF_PAGE
} from "./";
// import { callGetProfile } from "../profile";
import { showToast } from "../toast";
import { Cmd, loop } from "redux-loop";
// import defaultMoment from "moment";
// import moment from "moment-timezone";

let initialState = {
	isLoadingFetch: false,
	errorMessage: "",
	hasError: false,
	userData: {},
	list: [],
	refreshing: false,
	loading: false,
	count: 0,
	listAddFriend: [],
	refreshingAddFriend: false,
	loadingAddFriend: false,
	countAddFriend: 0,
	chatCount: 0,
	friendshipRequestCount: 0,
	hasFriendshipRequest: false,
	deleteChat: false,
	currentTabOfPage: "Chats"
};

const chat = (state = initialState, action) => {
	switch (action.type) {
		case SET_TAB_OF_PAGE: {
			return { ...state, currentTabOfPage: action.payload };
		}

		case CALL_DELETE_CHAT: {
			return loop(
				{ ...state, deleteChat: true },
				Cmd.run(deleteChat, {
					successActionCreator: deleteChatSuccess,
					failActionCreator: deleteChatFailed,
					args: [action.payload]
				})
			);
		}

		case DELETE_CHAT_SUCCESS: {
			// console.log('chasts', state.list);
			// console.log('payload', action.payload);
			let list = state.list.filter(
				item => item.memberId !== action.payload.memberId2
			);
			return {
				...state,
				deleteChat: false,
				errorMessage: "",
				hasError: false,
				list
			};
		}

		case DELETE_CHAT_FAILED: {
			return loop(
				{
					...state,
					deleteChat: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(showToast(true, action.payload.message))
			);
		}
		case ADD_CHAT_COUNT: {
			let chatCount = state.chatCount + 1;
			return { ...state, chatCount };
		}

		case HAS_FRIEND_SHIP_REQUEST: {
			return { ...state, hasFriendshipRequest: true };
		}

		case CALL_GET_STATUS: {
			return loop(
				{ ...state },
				Cmd.run(fetchGetStatus, {
					successActionCreator: fetchGetStatusSuccess,
					failActionCreator: fetchGetStatusFailed,
					args: [action.payload]
				})
			);
		}

		case GET_STATUS_SUCCESS: {
			return loop(
				{
					...state,
					chatCount: action.payload.data.chatCount,
					friendshipRequestCount: action.payload.data.friendshipRequestCount,
					hasFriendshipRequest: action.payload.data.hasFriendshipRequest
				}
				// TODO: commented temporary
				//Cmd.action(callGetProfile(action.payload.id))
			);
		}

		case GET_STATUS_FAILED: {
			return { ...state };
		}

		case GET_LIST_DATA: {
			// console.log(action.payload)
			return loop(
				{
					...state,
					// isLoadingFetch: true,
					errorMessage: "",
					hasError: false
					// refreshing: action.payload.refreshing,
					// loading: action.payload.loading
				},
				Cmd.run(fetchGetListData, {
					successActionCreator: fetchGetListDataSuccess,
					failActionCreator: fetchGetListDataFailed,
					args: [action.payload, action.tab]
				})
			);
		}
		case GET_LIST_DATA_SUCCESS: {
			// let list = state.list;
			// if (action.payload.refreshing) list = [];
			// let updateList = [...list, ...action.payload.data];

			// updateList.forEach(item => {
			// 	if (action.payload.id === item.senderMemberOwner.id) {
			// 		/**
			// 		 * send message
			// 		 */
			// 		if (item["whenSeen"]) {
			// 			let opened = moment(item["whenSeen"]).tz("Europe/London");
			// 			item["relativeDate"] =
			// 				"Was Visited " + defaultMoment(opened, "YYYYMMDD").fromNow();
			// 		} else {
			// 			let created = moment(item["createdAt"]).tz("Europe/London");
			// 			item["relativeDate"] =
			// 				"Created " + defaultMoment(created, "YYYYMMDD").fromNow();
			// 		}
			// 	} else if (action.payload.id === item.receiverMemberOwner) {
			// 		/**
			// 		 * receive message
			// 		 */
			// 		if (item["whenSeen"]) {
			// 			let opened = moment(item["whenSeen"]).tz("Europe/London");
			// 			item["relativeDate"] =
			// 				"Opened " + defaultMoment(opened, "YYYYMMDD").fromNow();
			// 		} else {
			// 			let created = moment(item["createdAt"]).tz("Europe/London");
			// 			item["relativeDate"] =
			// 				"visited you " + defaultMoment(created, "YYYYMMDD").fromNow();
			// 		}
			// 	}
			// });
			// console.log('action==========', action.payload);
			// action.payload = [
			// {
			// 	memberId: '5b44dbe3cd31daf32570447f',
			// 	recentMessage: 'salam khobi?',
			// 	recentMessageAt: '2018-07-12T14:22:25',
			// 	unreadMessageCount: 1
			// }
			// ];
			return {
				...state,
				// isLoadingFetch: false,
				errorMessage: "",
				hasError: false,
				list: action.payload
				// refreshing: false,
				// loading: false,
				// count: action.payload.metadata.count
			};
		}
		case GET_LIST_DATA_FAILED: {
			return loop(
				{
					...state,
					// isLoadingFetch: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(showToast(true, action.payload.message))
			);
		}
		case INITIAL_STATE: {
			return {
				...state,
				isLoadingFetch: false,
				errorMessage: "",
				hasError: false,
				list: [],
				refreshing: false,
				loading: false,
				count: 0
			};
		}

		default: {
			return { ...state };
		}
	}
};

export default chat;
