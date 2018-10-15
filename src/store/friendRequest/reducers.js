import {
	GET_LIST_DATA,
	GET_LIST_DATA_SUCCESS,
	GET_LIST_DATA_FAILED,
	fetchGetListData,
	fetchGetListDataSuccess,
	fetchGetListDataFailed,
	// -------------------------------------------------------------------------
	CALL_ADD_FRIEND,
	CALL_ADD_FRIEND_SUCCESS,
	CALL_ADD_FRIEND_FAILED,
	fetchAddFriend,
	fetchAddFriendSuccess,
	fetchAddFriendFailed,
	// -------------------------------------------------------------------------
	CALL_APPROVE,
	APPROVE_SUCCESS,
	APPROVE_FAILED,
	fetchApprove,
	fetchApproveSuccess,
	fetchApproveFailed,
	// -------------------------------------------------------------------------
	CALL_CANCEL,
	CANCEL_SUCCESS,
	CANCEL_FAILED,
	fetchCancel,
	fetchCancelSuccess,
	fetchCancelFailed
	// -------------------------------------------------------------------------
	// INITIAL_STATE,
	// GET_FRIENDSHIP_STATUS,
	// GET_FRIENDSHIP_STATUS_SUCCESS,
	// GET_FRIENDSHIP_STATUS_FAILED,
	// serverGetFriendshipStatus,
	// getFriendshipStatusSuccess,
	// getFriendshipStatusFailed,
	// CANCEL_FRIENDSHIP,
	// CANCEL_FRIENDSHIP_SUCCESS,
	// CANCEL_FRIENDSHIP_FAILED,
	// serverCancelFriendship,
	// serverCancelFriendshipSuccess,
	// serverCancelFriendshipFailed,
	// CANCEL_REQUESTED_FRIENDSHIP,
	// CANCEL_REQUESTED_FRIENDSHIP_SUCCESS,
	// CANCEL_REQUESTED_FRIENDSHIP_FAILED,
	// serverCancelRequestedFriendship,
	// serverCancelRequestedFriendshipSuccess,
	// serverCancelRequestedFriendshipFailed
} from "./";
import { showToast } from "../toast";
import { loop, Cmd } from "redux-loop";
const _ = require("lodash");

const friendRequest = (
	state = {
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
		friendshipRequestStatus: "connect"
	},
	action
) => {
	switch (action.type) {
		// ---------------------------------------------------------------------------

		case GET_LIST_DATA: {
			return loop(
				{
					...state,
					errorMessage: "",
					hasError: false,
					loading: true
				},
				Cmd.run(fetchGetListData, {
					successActionCreator: fetchGetListDataSuccess,
					failActionCreator: fetchGetListDataFailed,
					args: [action.payload]
				})
			);
		}

		case GET_LIST_DATA_SUCCESS: {
			return {
				...state,
				list: action.payload,
				loading: false
			};
		}

		case GET_LIST_DATA_FAILED: {
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

		// ---------------------------------------------------------------------------

		case CALL_ADD_FRIEND: {
			return loop(
				{ ...state, loading: true },
				Cmd.run(fetchAddFriend, {
					successActionCreator: fetchAddFriendSuccess,
					failActionCreator: fetchAddFriendFailed,
					args: [action.payload]
				})
			);
		}

		case CALL_ADD_FRIEND_SUCCESS: {
			return {
				...state,
				errorMessage: "",
				hasError: false,
				loading: false
			};
		}

		case CALL_ADD_FRIEND_FAILED: {
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

		// ---------------------------------------------------------------------------

		// case CANCEL_REQUESTED_FRIENDSHIP: {
		// 	return loop(
		// 		{ ...state },
		// 		Cmd.run(serverCancelRequestedFriendship, {
		// 			successActionCreator: serverCancelRequestedFriendshipSuccess,
		// 			failActionCreator: serverCancelRequestedFriendshipFailed,
		// 			args: [action.payload]
		// 		})
		// 	);
		// }
		//
		// case CANCEL_REQUESTED_FRIENDSHIP_SUCCESS: {
		// 	return { ...state, friendshipRequestStatus: "connect" };
		// }
		//
		// case CANCEL_REQUESTED_FRIENDSHIP_FAILED: {
		// 	return loop(
		// 		{ ...state, errorMessage: action.payload.message, hasError: true },
		// 		Cmd.action(showToast(true, action.payload.message))
		// 	);
		// }
		//
		// case CANCEL_FRIENDSHIP: {
		// 	return loop(
		// 		{ ...state },
		// 		Cmd.run(serverCancelFriendship, {
		// 			successActionCreator: serverCancelFriendshipSuccess,
		// 			failActionCreator: serverCancelFriendshipFailed,
		// 			args: [action.payload]
		// 		})
		// 	);
		// }
		//
		// case CANCEL_FRIENDSHIP_SUCCESS: {
		// 	return { ...state, friendshipRequestStatus: "connect" };
		// }
		//
		// case CANCEL_FRIENDSHIP_FAILED: {
		// 	return loop(
		// 		{ ...state, errorMessage: action.payload.message, hasError: true },
		// 		Cmd.action(showToast(true, action.payload.message))
		// 	);
		// }
		//
		// case GET_FRIENDSHIP_STATUS: {
		// 	return loop(
		// 		{ ...state },
		// 		Cmd.run(serverGetFriendshipStatus, {
		// 			successActionCreator: getFriendshipStatusSuccess,
		// 			failActionCreator: getFriendshipStatusFailed,
		// 			args: [action.payload]
		// 		})
		// 	);
		// }
		//
		// case GET_FRIENDSHIP_STATUS_SUCCESS: {
		// 	return { ...state, friendshipRequestStatus: action.payload };
		// }
		//
		// case GET_FRIENDSHIP_STATUS_FAILED: {
		// 	return loop(
		// 		{ ...state, errorMessage: action.payload.message, hasError: true },
		// 		Cmd.action(showToast(true, action.payload.message))
		// 	);
		// }

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
		// ---------------------------------------------------------------------------

		case CALL_APPROVE: {
			return loop(
				{ ...state },
				Cmd.run(fetchApprove, {
					successActionCreator: fetchApproveSuccess,
					failActionCreator: fetchApproveFailed,
					args: [action.payload]
				})
			);
		}

		case APPROVE_SUCCESS: {
			let list = state.list.filter(item => {
				return item.id !== action.payload;
			});
			return { ...state, errorMessage: "", hasError: false, list };
		}

		case APPROVE_FAILED: {
			return loop(
				{ ...state, errorMessage: action.payload.message, hasError: true },
				Cmd.action(showToast(true, action.payload.message))
			);
		}

		// ---------------------------------------------------------------------------

		case CALL_CANCEL: {
			return loop(
				{ ...state },
				Cmd.run(fetchCancel, {
					successActionCreator: fetchCancelSuccess,
					failActionCreator: fetchCancelFailed,
					args: [action.payload]
				})
			);
		}

		case CANCEL_SUCCESS: {
			let list = state.list.filter(item => item.id !== action.payload);
			return { ...state, errorMessage: "", hasError: false, list };
		}

		case CANCEL_FAILED: {
			return loop(
				{ ...state, errorMessage: action.payload.message, hasError: true },
				Cmd.action(showToast(true, action.payload.message))
			);
		}

		// ---------------------------------------------------------------------------

		default: {
			return { ...state };
		}
	}
};

export default friendRequest;
