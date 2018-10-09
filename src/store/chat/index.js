export const GET_LIST = "CHAT_GET_LIST",
	GET_LIST_SUCCESS = "CHAT_GET_LIST_SUCCESS",
	GET_LIST_FAILED = "CHAT_GET_LIST_FAILED",
	VISIT_MESSAGE = "CHAT_VISIT_MESSAGE",
	VISIT_MESSAGE_SUCCESS = "CHAT_VISIT_MESSAGE_SUCCESS",
	VISIT_MESSAGE_FAILED = "CHAT_VISIT_MESSAGE_FAILED",
	RECEIVE_NEW_CHAT_MESSAGE = "CHAT_RECEIVE_NEW_CHAT_MESSAGE",
	RELOAD_CHAT_LIST = "CHAT_RELOAD_CHAT_LIST";

// INITIAL_STATE = "CHAT_INITIAL_STATE",
// CALL_GET_STATUS = "CHAT_CALL_GET_STATUS",
// GET_STATUS_SUCCESS = "CHAT_GET_STATUS_SUCCESS",
// GET_STATUS_FAILED = "CHAT_GET_STATUS_FAILED",
// ADD_CHAT_COUNT = "CHAT_ADD_CHAT_COUNT",
// HAS_FRIEND_SHIP_REQUEST = "CHAT_HAS_FRIEND_SHIP_REQUEST",
// CALL_DELETE_CHAT = "CHAT_CALL_DELETE_CHAT",
// DELETE_CHAT_SUCCESS = "CHAT_DELETE_CHAT_SUCCESS",
// DELETE_CHAT_FAILED = "CHAT_DELETE_CHAT_FAILED",
// SET_TAB_OF_PAGE = "CHAT_SET_TAB_OF_PAGE";

import {
	// get
	getData,
	put
	// restDelete,
	// post
} from "../appService";

import { CONFIG } from "../../../config";

export const reloadChatList = () => ({
	type: RELOAD_CHAT_LIST,
	payload: null
});

export const chatReceiveNewMessage = data => ({
	type: RECEIVE_NEW_CHAT_MESSAGE,
	payload: data
});

export const chatGetList = (data, tab) => ({
	type: GET_LIST,
	payload: data
});

export const serverChatGetList = data => {
	return new Promise((resolve, reject) => {
		let params = {
			randomNmber: Math.random(),
			limit: CONFIG.chat.receiveMessageLimit || 50,
			memberOwner: data.id
		};
		if (data.identifier) {
			params.identifier = data.identifier;
		}
		console.log("serverChatGetList params", params);

		getData("/api/v1/chats", params)
			.then(resp => {
				console.log("serverChatGetList response", resp);
				// resolve(resp.data);
				resolve({
					data: resp.data,
					refreshing: data.refreshing || false
				});
			})
			.catch(err => {
				console.log("serverChatGetList EEEEEERRRORRRR", err);
				reject(err);
			});
	});
};

export const serverChatGetListSuccess = data => {
	return {
		type: GET_LIST_SUCCESS,
		payload: data
	};
};

export const serverChatGetListFailed = err => {
	return {
		type: GET_LIST_FAILED,
		payload: err
	};
};

// ------------------------------

export const visitMessage = data => ({
	type: VISIT_MESSAGE,
	payload: data
});

export const serverVisitMessage = data => {
	console.log(
		"------------------------------------- serverVisitMessage -----------"
	);
	return new Promise((resolve, reject) => {
		put("/api/v1/chats/action/seen", {
			chatListId: data.listOfId
		})
			.then(resp => {
				console.log("serverVisitMessage response", resp);
				resolve(data.listOfId);
			})
			.catch(err => {
				console.log("serverVisitMessage EEEEEERRRORRRR", err);
				reject(err);
			});
	});
};

export const serverVisitMessageSuccess = data => {
	return {
		type: VISIT_MESSAGE_SUCCESS,
		payload: data
	};
};

export const serverVisitMessageFailed = err => {
	return {
		type: VISIT_MESSAGE_FAILED,
		payload: err
	};
};

// export const setTabOfPage = tabName => ({
// 	type: SET_TAB_OF_PAGE,
// 	payload: tabName
// });
//
// export const callDeleteChat = data => ({
// 	type: CALL_DELETE_CHAT,
// 	payload: data
// });
//
// export const deleteChat = data => {
// 	return new Promise((resolve, reject) => {
// 		restDelete("/api/v1/chats", data)
// 			.then(() => {
// 				resolve(data);
// 			})
// 			.catch(err => {
// 				reject(err);
// 			});
// 	});
// };
//
// export const deleteChatSuccess = data => ({
// 	type: DELETE_CHAT_SUCCESS,
// 	payload: data
// });
//
// export const deleteChatFailed = data => ({
// 	type: DELETE_CHAT_FAILED,
// 	payload: data
// });
//
// export const addChatCount = () => ({
// 	type: ADD_CHAT_COUNT
// });
//
// export const hasFriendShipRequest = () => ({
// 	type: HAS_FRIEND_SHIP_REQUEST
// });
//
// export const callGetStatus = id => ({
// 	type: CALL_GET_STATUS,
// 	payload: id
// });
//
// /*
// result : {
//   chatCount: integer,
//   friendshipRequestCount: integer,
//   hasFriendshipRequest: boolean
// }
//  */
// export const fetchGetStatus = id => {
// 	return new Promise((resolve, reject) => {
// 		get(`/api/v1/members/action/status/${id}`)
// 			.then(resp => {
// 				resolve({ ...resp, id });
// 			})
// 			.catch(err => {
// 				reject(err);
// 			});
// 	});
// };
//
// export const fetchGetStatusSuccess = data => ({
// 	type: GET_STATUS_SUCCESS,
// 	payload: data
// });
//
// export const fetchGetStatusFailed = err => ({
// 	type: GET_STATUS_FAILED,
// 	payload: err
// });
//
// export const initialStateChat = data => ({
// 	type: INITIAL_STATE
// });
