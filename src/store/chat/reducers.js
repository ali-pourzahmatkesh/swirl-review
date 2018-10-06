import {
	GET_LIST,
	GET_LIST_SUCCESS,
	GET_LIST_FAILED,
	serverChatGetList,
	serverChatGetListSuccess,
	serverChatGetListFailed
	// ADD_CHAT_COUNT,
	// CALL_GET_STATUS,
	// fetchGetListData,
	// fetchGetListDataFailed,
	// fetchGetListDataSuccess,
	// fetchGetStatus,
	// fetchGetStatusFailed,
	// fetchGetStatusSuccess,
	// GET_LIST_DATA,
	// GET_LIST_DATA_FAILED,
	// GET_LIST_DATA_SUCCESS,
	// GET_STATUS_FAILED,
	// GET_STATUS_SUCCESS,
	// HAS_FRIEND_SHIP_REQUEST,
	// INITIAL_STATE,
	// CALL_DELETE_CHAT,
	// DELETE_CHAT_SUCCESS,
	// DELETE_CHAT_FAILED,
	// deleteChat,
	// deleteChatSuccess,
	// deleteChatFailed,
	// SET_TAB_OF_PAGE
} from "./";

import { callGetProfile } from "../member";
import { showToast } from "../toast";
import { Cmd, loop } from "redux-loop";
// import defaultMoment from "moment";
// import moment from "moment-timezone";

let initialState = {
	isLoadingFetch: false,
	errorMessage: "",
	hasError: false,
	list: [],
	refreshing: false
	// userData: {},
	// loading: false,
	// count: 0,
	// listAddFriend: [],
	// refreshingAddFriend: false,
	// loadingAddFriend: false,
	// countAddFriend: 0,
	// chatCount: 0,
	// friendshipRequestCount: 0,
	// hasFriendshipRequest: false,
	// deleteChat: false,
	// currentTabOfPage: "Chats"
};

const chat = (state = initialState, action) => {
	switch (action.type) {
		case GET_LIST: {
			return loop(
				{
					...state,
					isLoadingFetch: true,
					errorMessage: "",
					hasError: false,
					refreshing: action.payload.refreshing || false
					// loading: action.payload.loading
				},
				Cmd.run(serverChatGetList, {
					successActionCreator: serverChatGetListSuccess,
					failActionCreator: serverChatGetListFailed,
					args: [action.payload]
				})
			);
		}

		case GET_LIST_SUCCESS: {
			// let list = [
			// 	{
			// 		id: "1",
			// 		senderMemberId: "2",
			// 		senderName: "VALA RAHMANI", // username
			// 		receiverMemberId: "3",
			// 		receiverName: "testReceiver", // username
			// 		postType: "text", // or "image"
			// 		textContent: "hello world!",
			// 		imageContentName: "testImage1",
			// 		imageContentExtension: "png",
			// 		isSeen: false,
			// 		availableAt: "2018-12-03T19:36:39.326Z",
			// 		identifier: "1"
			// 	},
			//
			// 	{
			// 		id: "2",
			// 		senderMemberId: "2",
			// 		senderName: "VALA RAHMANI", // username
			// 		receiverMemberId: "3",
			// 		receiverName: "testReceiver", // username
			// 		postType: "text", // or "image"
			// 		textContent: "hello world!",
			// 		imageContentName: "testImage1",
			// 		imageContentExtension: "png",
			// 		isSeen: false,
			// 		availableAt: "2018-10-03T19:36:39.326Z",
			// 		identifier: "2"
			// 	},
			//
			// 	{
			// 		id: "3",
			// 		senderMemberId: "2",
			// 		senderName: "THEODORE FRANCIS", // username
			// 		receiverMemberId: "3",
			// 		receiverName: "testReceiver", // username
			// 		postType: "text", // or "image"
			// 		textContent: "hello world!",
			// 		imageContentName: "testImage1",
			// 		imageContentExtension: "png",
			// 		isSeen: true,
			// 		availableAt: "2018-10-03T19:36:39.326Z",
			// 		identifier: "3"
			// 	},
			//
			// 	{
			// 		id: "4",
			// 		senderMemberId: "2",
			// 		senderName: "THEODORE FRANCIS2", // username
			// 		receiverMemberId: "3",
			// 		receiverName: "testReceiver", // username
			// 		postType: "text", // or "image"
			// 		textContent: "hello world!",
			// 		imageContentName: "testImage1",
			// 		imageContentExtension: "png",
			// 		isSeen: true,
			// 		availableAt: "2018-10-03T19:36:39.326Z",
			// 		identifier: "4"
			// 	}
			// ];

			let list = state.list;
			if (action.payload.refreshing) list = [];
			let updateList = [...list, ...action.payload.data];

			return {
				...state,
				isLoadingFetch: false,
				list: updateList,
				refreshing: false
			};
		}

		case GET_LIST_FAILED: {
			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: action.payload.message,
					hasError: true,
					refreshing: false
				},
				Cmd.action(showToast(true, action.payload.message))
			);
		}

		// case SET_TAB_OF_PAGE: {
		// 	return { ...state, currentTabOfPage: action.payload };
		// }
		//
		// case CALL_DELETE_CHAT: {
		// 	return loop(
		// 		{ ...state, deleteChat: true },
		// 		Cmd.run(deleteChat, {
		// 			successActionCreator: deleteChatSuccess,
		// 			failActionCreator: deleteChatFailed,
		// 			args: [action.payload]
		// 		})
		// 	);
		// }
		//
		// case DELETE_CHAT_SUCCESS: {
		// 	// console.log('chasts', state.list);
		// 	// console.log('payload', action.payload);
		// 	let list = state.list.filter(
		// 		item => item.memberId !== action.payload.memberId2
		// 	);
		// 	return {
		// 		...state,
		// 		deleteChat: false,
		// 		errorMessage: "",
		// 		hasError: false,
		// 		list
		// 	};
		// }
		//
		// case DELETE_CHAT_FAILED: {
		// 	return loop(
		// 		{
		// 			...state,
		// 			deleteChat: false,
		// 			errorMessage: action.payload.message,
		// 			hasError: true
		// 		},
		// 		Cmd.action(showToast(true, action.payload.message))
		// 	);
		// }
		// case ADD_CHAT_COUNT: {
		// 	let chatCount = state.chatCount + 1;
		// 	return { ...state, chatCount };
		// }
		//
		// case HAS_FRIEND_SHIP_REQUEST: {
		// 	return { ...state, hasFriendshipRequest: true };
		// }
		//
		// case CALL_GET_STATUS: {
		// 	return loop(
		// 		{ ...state },
		// 		Cmd.run(fetchGetStatus, {
		// 			successActionCreator: fetchGetStatusSuccess,
		// 			failActionCreator: fetchGetStatusFailed,
		// 			args: [action.payload]
		// 		})
		// 	);
		// }
		//
		// case GET_STATUS_SUCCESS: {
		// 	return loop(
		// 		{
		// 			...state,
		// 			chatCount: action.payload.data.chatCount,
		// 			friendshipRequestCount: action.payload.data.friendshipRequestCount,
		// 			hasFriendshipRequest: action.payload.data.hasFriendshipRequest
		// 		},
		// 		Cmd.action(callGetProfile(action.payload.id))
		// 	);
		// }
		//
		// case GET_STATUS_FAILED: {
		// 	return { ...state };
		// }
		//
		//
		// case INITIAL_STATE: {
		// 	return {
		// 		...state,
		// 		isLoadingFetch: false,
		// 		errorMessage: "",
		// 		hasError: false,
		// 		list: [],
		// 		refreshing: false,
		// 		loading: false,
		// 		count: 0
		// 	};
		// }

		default: {
			return { ...state };
		}
	}
};

export default chat;
