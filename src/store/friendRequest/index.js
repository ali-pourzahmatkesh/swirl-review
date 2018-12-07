export const GET_LIST_DATA = "FRIEND_REQUEST_GET_LIST_DATA",
	GET_LIST_DATA_SUCCESS = "FRIEND_REQUEST_GET_LIST_DATA_SUCCESS",
	GET_LIST_DATA_FAILED = "FRIEND_REQUEST_GET_LIST_DATA_FAILED",
	// -------------------------------------------------------------------------
	CALL_ADD_FRIEND = "ADD_FRIENDS_CALL_ADD_FRIEND",
	CALL_ADD_FRIEND_SUCCESS = "ADD_FRIENDS_CALL_ADD_FRIEND_SUCCESS",
	CALL_ADD_FRIEND_FAILED = "ADD_FRIENDS_CALL_ADD_FRIEND_FAILED",
	// -------------------------------------------------------------------------
	CALL_APPROVE = "FRIEND_REQUEST_CALL_APPROVE",
	APPROVE_SUCCESS = "FRIEND_REQUEST_APPROVE_SUCCESS",
	APPROVE_FAILED = "FRIEND_REQUEST_APPROVE_FAILED",
	// -------------------------------------------------------------------------
	CALL_CANCEL = "FRIEND_REQUEST_CALL_CANCEL",
	CANCEL_SUCCESS = "FRIEND_REQUEST_CANCEL_SUCCESS",
	CANCEL_FAILED = "FRIEND_REQUEST_CANCEL_FAILED",
	// -------------------------------------------------------------------------
	RESET_ADDED_IDS = "FRIEND_RESET_ADDED_IDS";
// -------------------------------------------------------------------------
// INITIAL_STATE = "FRIEND_REQUEST_INITIAL_STATE",
// GET_FRIENDSHIP_STATUS = "FRIEND_REQUEST_GET_FRIENDSHIP_STATUS",
// GET_FRIENDSHIP_STATUS_SUCCESS =
// 	"FRIEND_REQUEST_GET_FRIENDSHIP_STATUS_SUCCESS",
// GET_FRIENDSHIP_STATUS_FAILED = "FRIEND_REQUEST_GET_FRIENDSHIP_STATUS_FAILED",
// CANCEL_FRIENDSHIP = "FRIEND_REQUEST_CANCEL_FRIENDSHIP",
// CANCEL_FRIENDSHIP_SUCCESS = "FRIEND_REQUEST_CANCEL_FRIENDSHIP_SUCCESS",
// CANCEL_FRIENDSHIP_FAILED = "FRIEND_REQUEST_CANCEL_FRIENDSHIP_FAILED",
// CANCEL_REQUESTED_FRIENDSHIP = "FRIEND_REQUEST_CANCEL_REQUESTED_FRIENDSHIP",
// CANCEL_REQUESTED_FRIENDSHIP_SUCCESS =
// 	"FRIEND_REQUEST_CANCEL_REQUESTED_FRIENDSHIP_SUCCESS",
// CANCEL_REQUESTED_FRIENDSHIP_FAILED =
// 	"FRIEND_REQUEST_CANCEL_REQUESTED_FRIENDSHIP_FAILED";

import { getData, put, post } from "../appService";

export const resetAddedIds = () => {
	return {
		type: RESET_ADDED_IDS
	}
}

// ---------------------------------------------------------------------------

export const getListData = data => ({
	type: GET_LIST_DATA,
	payload: data
});

export const fetchGetListData = data => {
	return new Promise((resolve, reject) => {
		getData("/api/v1/friendship-requests", data)
			.then(resp => {
				resolve(resp.data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchGetListDataSuccess = data => {
	return {
		type: GET_LIST_DATA_SUCCESS,
		payload: data
	};
};

export const fetchGetListDataFailed = err => {
	return {
		type: GET_LIST_DATA_FAILED,
		payload: err
	};
};

// ---------------------------------------------------------------------------

export const callAddFriend = data => ({
	type: CALL_ADD_FRIEND,
	payload: data
});

export const fetchAddFriend = data => {
	return new Promise((resolve, reject) => {
		post("/api/v1/friendship-requests", data)
			.then(resp => {
				resolve(resp.data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchAddFriendSuccess = data => ({
	type: CALL_ADD_FRIEND_SUCCESS,
	payload: data
});

export const fetchAddFriendFailed = err => ({
	type: CALL_ADD_FRIEND_FAILED,
	payload: err
});

// ---------------------------------------------------------------------------

export const callApprove = id => ({
	type: CALL_APPROVE,
	payload: id
});

export const fetchApprove = id => {
	return new Promise((resolve, reject) => {
		put("/api/v1/friendship-requests/action/approve", { id })
			.then(() => {
				resolve(id);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchApproveSuccess = id => ({
	type: APPROVE_SUCCESS,
	payload: id
});

export const fetchApproveFailed = err => ({
	type: APPROVE_FAILED,
	payload: err
});

// ---------------------------------------------------------------------------

export const callCancel = id => ({
	type: CALL_CANCEL,
	payload: id
});

export const fetchCancel = id => {
	return new Promise((resolve, reject) => {
		put("/api/v1/friendship-requests/action/cancel", { id })
			.then(() => {
				resolve(id);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchCancelSuccess = id => ({
	type: CANCEL_SUCCESS,
	payload: id
});

export const fetchCancelFailed = err => ({
	type: CANCEL_FAILED,
	payload: err
});

// ---------------------------------------------------------------------------
//
//
//
// export const initialStateFriendRequest = data => ({
// 	type: INITIAL_STATE
// });
//
// export const callCancelRequestedFriendship = data => ({
// 	type: CANCEL_REQUESTED_FRIENDSHIP,
// 	payload: data
// });
//
// export const serverCancelRequestedFriendship = data => {
// 	return new Promise((resolve, reject) => {
// 		post("/api/v1/friendship-requests/action/cancel-request", data)
// 			.then(() => {
// 				resolve(true);
// 			})
// 			.catch(err => {
// 				reject(err);
// 			});
// 	});
// };
//
// export const serverCancelRequestedFriendshipSuccess = () => ({
// 	type: CANCEL_REQUESTED_FRIENDSHIP_SUCCESS
// });
//
// export const serverCancelRequestedFriendshipFailed = err => ({
// 	type: CANCEL_REQUESTED_FRIENDSHIP_FAILED,
// 	payload: err
// });
//
// export const callCancelFriendship = data => ({
// 	type: CANCEL_FRIENDSHIP,
// 	payload: data
// });
//
// export const serverCancelFriendship = data => {
// 	return new Promise((resolve, reject) => {
// 		post("/api/v1/friendship-requests/action/cancel-friendship", data)
// 			.then(() => {
// 				resolve(true);
// 			})
// 			.catch(err => {
// 				reject(err);
// 			});
// 	});
// };
//
// export const serverCancelFriendshipSuccess = () => ({
// 	type: CANCEL_FRIENDSHIP_SUCCESS
// });
//
// export const serverCancelFriendshipFailed = err => ({
// 	type: CANCEL_FRIENDSHIP_FAILED,
// 	payload: err
// });
//
// export const getFriendshipStatus = data => ({
// 	type: GET_FRIENDSHIP_STATUS,
// 	payload: data
// });
//
// export const serverGetFriendshipStatus = data => {
// 	console.log(">> call serverGetFriendshipStatus", data);
// 	return new Promise((resolve, reject) => {
// 		getData("/api/v1/friendship-requests/action/status", data)
// 			.then(res => {
// 				console.log(">> success result serverGetFriendshipStatus", res.data);
//
// 				resolve(res.data);
// 			})
// 			.catch(err => {
// 				console.log(">> error result serverGetFriendshipStatus", err);
//
// 				reject(err);
// 			});
// 	});
// };
//
// export const getFriendshipStatusSuccess = friendshipStatus => ({
// 	type: GET_FRIENDSHIP_STATUS_SUCCESS,
// 	payload: friendshipStatus
// });
//
// export const getFriendshipStatusFailed = err => ({
// 	type: GET_FRIENDSHIP_STATUS_FAILED,
// 	payload: err
// });
