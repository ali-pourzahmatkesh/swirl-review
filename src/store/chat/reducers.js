import {
	GET_LIST,
	GET_LIST_SUCCESS,
	GET_LIST_FAILED,
	serverChatGetList,
	serverChatGetListSuccess,
	serverChatGetListFailed,
	// -----------
	VISIT_MESSAGE,
	VISIT_MESSAGE_SUCCESS,
	VISIT_MESSAGE_FAILED,
	serverVisitMessage,
	serverVisitMessageSuccess,
	serverVisitMessageFailed,
	// ------------
	RECEIVE_NEW_CHAT_MESSAGE,
	// ------------
	reloadChatList,
	RELOAD_CHAT_LIST,
	CHAT_SET_STORE,
	// ------------
	NEW_MESSAGE,
	NEW_MESSAGE_SUCCESS,
	NEW_MESSAGE_FAILED,
	serverNewMessage,
	serverNewMessageSuccess,
	serverNewMessageFailed,
	// ---------
	SET_FROM_LOCAL,
	SET_FROM_LOCAL_SUCCESS,
	SET_FROM_LOCAL_FAILED,
	performSetFromLocal,
	setFromLocalSuccess,
	setFromLocalFailed
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

import {FETCH_LOGOUT} from "../member";

import { callGetProfile } from "../member";
import { showToast } from "../toast";
import { Cmd, loop } from "redux-loop";
// import defaultMoment from "moment";
// import moment from "moment-timezone";
import sortChatList from "../../util/sortChatList";
const _ = require("lodash");

let initialState = {
	isLoadingFetch: false,
	errorMessage: "",
	hasError: false,
	list: [],
	refreshing: false,
	loading: false,
	timers: {},
	timersFunctions: {},
	isNewMessage: false,
	resorted: false
	// userData: {},
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
		case SET_FROM_LOCAL: {
			return loop(
				{
					...state
				},
				Cmd.run(performSetFromLocal, {
					successActionCreator: setFromLocalSuccess,
					failActionCreator: setFromLocalFailed,
					args: [action.payload]
				})
			);
		}

		case SET_FROM_LOCAL_SUCCESS: {
			console.log('finished setting from local successfully', action.payload)
			return {
				...state,
				...action.payload
			}
		}

		case SET_FROM_LOCAL_FAILED: {
			console.log('failed setting from local')
			return {
				...state
			}
		}


		case NEW_MESSAGE: {
			return loop(
				{
					...state,
					errorMessage: "",
					hasError: false,
					loading: true
				},
				Cmd.run(serverNewMessage, {
					successActionCreator: serverNewMessageSuccess,
					failActionCreator: serverNewMessageFailed,
					args: [action.payload]
				})
			);
		}

		case NEW_MESSAGE_SUCCESS: {
			return {
				...state,
				loading: false
			};
		}

		case NEW_MESSAGE_FAILED: {
			return loop(
				{
					...state,
					loading: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(showToast(true, action.payload.message))
			);
		}

		// ---------------------------------

		case CHAT_SET_STORE: {
			return {
				...state,
				...action.payload
			};
		}

		case RECEIVE_NEW_CHAT_MESSAGE: {
			let updatedList = [action.payload, ...state.list];
			updatedList = _.uniqBy(updatedList, "id");

			console.log(
				"RECEIVE_NEW_CHAT_MESSAGE",
				"old list count",
				state.list.length,
				"new list count",
				updatedList.length,
				"data is",
				action.payload
			);

			return {
				...state,
				list: updatedList,
				isNewMessage: true
			};
		}

		case GET_LIST: {
			return loop(
				{
					...state,
					isLoadingFetch: true,
					errorMessage: "",
					hasError: false,
					refreshing: true
				},
				Cmd.run(serverChatGetList, {
					successActionCreator: serverChatGetListSuccess,
					failActionCreator: serverChatGetListFailed,
					args: [action.payload]
				})
			);
		}

		case GET_LIST_SUCCESS: {
			let list = state.list;
			if (action.payload.refreshing) {
				list = [];
			}
			let updateList = _.uniqBy([...list, ...action.payload.data], "id");

			console.log(
				"--------- old list",
				list,
				"------------ new data",
				action.payload.data,
				"updated",
				updateList
			);

			return {
				...state,
				isLoadingFetch: false,
				list: updateList,
				refreshing: false
			};
		}

		case RELOAD_CHAT_LIST: {
			console.log("RELOAD_CHAT_LIST");
			return {
				...state,
				list: [...state.list],
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

		// ----------------------

		case VISIT_MESSAGE: {
			return loop(
				{
					...state,
					loading: true,
					errorMessage: "",
					hasError: false
				},
				Cmd.run(serverVisitMessage, {
					successActionCreator: serverVisitMessageSuccess,
					failActionCreator: serverVisitMessageFailed,
					args: [action.payload]
				})
			);
		}

		case VISIT_MESSAGE_SUCCESS: {
			let list = [];
			if (action.payload.length == 1) {
				list = state.list.map(item => {
					if (item.id === action.payload[0]) {
						console.log("find id in list", action.payload[0], item);
						item.isSeen = true;
					}
					return item;
				});
			}

			return {
				...state,
				list,
				loading: false,
				resorted: true
			};
		}

		case VISIT_MESSAGE_FAILED: {
			return loop(
				{
					...state,
					errorMessage: action.payload.message,
					hasError: true,
					loading: false
				},
				Cmd.action(showToast(true, action.payload.message))
			);
		}

		// ------------------------------

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

		case FETCH_LOGOUT: {
			console.log('fetching logout from member while inside chat');
			return { ...state, ...initialState};
		}

		default: {
			return { ...state };
		}
	}
};

export default chat;
