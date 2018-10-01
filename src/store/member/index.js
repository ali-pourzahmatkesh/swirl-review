export const CHAT_GET_LIST_DATA = "CHAT_CHAT_GET_LIST_DATA",
	CHAT_GET_LIST_DATA_SUCCESS = "CHAT_CHAT_GET_LIST_DATA_SUCCESS",
	CHAT_GET_LIST_DATA_FAILED = "CHAT_CHAT_GET_LIST_DATA_FAILED",
	CHAT_INITIAL_STATE = "CHAT_CHAT_INITIAL_STATE",
	CALL_GET_STATUS = "CHAT_CALL_GET_STATUS",
	GET_STATUS_SUCCESS = "CHAT_GET_STATUS_SUCCESS",
	GET_STATUS_FAILED = "CHAT_GET_STATUS_FAILED",
	ADD_CHAT_COUNT = "CHAT_ADD_CHAT_COUNT",
	HAS_FRIEND_SHIP_REQUEST = "CHAT_HAS_FRIEND_SHIP_REQUEST",
	CALL_DELETE_CHAT = "CHAT_CALL_DELETE_CHAT",
	DELETE_CHAT_SUCCESS = "CHAT_DELETE_CHAT_SUCCESS",
	DELETE_CHAT_FAILED = "CHAT_DELETE_CHAT_FAILED",
	SET_TAB_OF_PAGE = "CHAT_SET_TAB_OF_PAGE",
	// ----
	CALL_LOGIN = "APP_CALL_LOGIN",
	LOGIN_SUCCESS = "APP_LOGIN_SUCCESS",
	LOGIN_FAILED = "APP_LOGIN_FAILED",
	CHECK_IS_LOGIN = "APP_CHECK_IS_LOGIN",
	IS_LOGIN_SUCCESS = "APP_IS_LOGIN_SUCCESS",
	IS_LOGIN_FAILED = "APP_IS_LOGIN_FAILED",
	CALL_LOGOUT = "APP_CALL_LOGOUT",
	LOGOUT_SUCCESS = "APP_LOGOUT_SUCCESS",
	LOGOUT_FAILED = "APP_LOGOUT_FAILED",
	FETCH_LOGOUT = "APP_FETCH_LOGOUT",
	CALL_DELETE_ACCOUNT = "APP_CALL_DELETE_ACCOUNT",
	DELETE_ACCOUNT_SUCCESS = "APP_DELETE_ACCOUNT_SUCCESS",
	DELETE_ACCOUNT_FAILED = "APP_DELETE_ACCOUNT_FAILED",
	// ----
	SEND_VERIFY_CODE = "FORGOT_SEND_VERIFY_CODE",
	SEND_VERIFY_CODE_SUCCESS = "FORGOT_SEND_VERIFY_CODE_SUCCESS",
	SEND_VERIFY_CODE_FAILED = "FORGOT_SEND_VERIFY_CODE_FAILED",
	// -----
	UPDATE_CODE_GET_USER = "FORGOT_PASSWORD_UPDATE_CODE_GET_USER",
	UPDATE_CODE_GET_USER_SUCCESS = "FORGOT_PASSWORD_UPDATE_CODE_GET_USER_SUCCESS",
	UPDATE_CODE_GET_USER_FAILED = "FORGOT_PASSWORD_UPDATE_CODE_GET_USER_FAILED",
	// -------
	SEND_USER = "SIGN_UP_SEND_USER",
	USER_SUCCESS = "SIGN_UP_USER_SUCCESS",
	USER_FAILED = "SIGN_UP_USER_FAILED",
	GET_IP_DATA = "SIGN_UP_GET_IP_DATA",
	IP_DATA_SUCCESS = "SIGN_UP_IP_DATA_SUCCESS",
	IP_DATA_FAILED = "SIGN_UP_IP_DATA_FAILED",
	GET_COUNTRIES = "SIGN_UP_COUNTRIES",
	COUNTRIES_SUCCESS = "SIGN_UP_COUNTRIES_SUCCESS",
	COUNTRIES_FAILED = "SIGN_UP_COUNTRIES_FAILED",
	// -------
	CALL_GET_PROFILE = "APP_CALL_GET_PROFILE",
	GET_PROFILE_SUCCESS = "APP_GET_PROFILE_SUCCESS",
	GET_PROFILE_FAILED = "APP_GET_PROFILE_FAILED",
	GET_LIST_DATA = "PROFILE_GET_LIST_DATA",
	GET_LIST_DATA_SUCCESS = "PROFILE_GET_LIST_DATA_SUCCESS",
	GET_LIST_DATA_FAILED = "PROFILE_GET_LIST_DATA_FAILED",
	INITIAL_STATE = "PROFILE_INITIAL_STATE",
	GET_LIST_ADD_FRIEND_DATA = "PROFILE_GET_LIST_ADD_FRIEND_DATA",
	GET_LIST_ADD_FRIEND_DATA_SUCCESS = "PROFILE_GET_LIST_ADD_FRIEND_DATA_SUCCESS",
	GET_LIST_ADD_FRIEND_DATA_FAILED = "PROFILE_GET_LIST_ADD_FRIEND_DATA_FAILED",
	INITIAL_ADD_FRIEND_STATE = "PROFILE_ADD_FRIEND_INITIAL_STATE",
	SAVE_NAVIGATION_FOR_NAVIGATE = "PROFILE_SAVE_NAVIGATION_FOR_NAVIGATE",
	CHANGE_PAGE_WITH_NAVIGATION = "ADD_FRIENDS_CHANGE_PAGE_WITH_NAVIGATION",
	SEARCH_TEXT = "PROFILE_SEARCH_TEXT",
	CLOSE_MODAL = "PROFILE_SET_CLOSE_MODAL",
	LOAD_LIST_AFTER_NAVIGATE = "PROFILE_LOAD_LIST_AFTER_NAVIGATE",
	CALL_PROFILE_VISIT = "PROFILE_CALL_PROFILE_VISIT",
	POST_PROFILE_VISIT_SUCCESS = "PROFILE_POST_PROFILE_VISIT_SUCCESS",
	POST_PROFILE_VISIT_FAILED = "PROFILE_POST_PROFILE_VISIT_FAILED",
	VISIT_COUNT = "PROFILE_VISIT_COUNT",
	VISIT_COUNT_SUCCESS = "PROFILE_VISIT_COUNT_SUCCESS",
	VISIT_COUNT_FAILED = "PROFILE_VISIT_COUNT_FAILED",
	SOCKET_VISIT_COUNT = "PROFILE_SOCKET_VISIT_COUNT",
	UPDATE_INSTAGRAM_TOKEN = "PROFILE_UPDATE_INSTAGRAM_TOKEN",
	UPDATE_INSTAGRAM_TOKEN_SUCCESS = "PROFILE_UPDATE_INSTAGRAM_TOKEN_SUCCESS",
	UPDATE_INSTAGRAM_TOKEN_FAILED = "PROFILE_UPDATE_INSTAGRAM_TOKEN_FAILED",
	GET_INSTAGRAM_FEED = "PROFILE_GET_INSTAGRAM_FEED",
	GET_INSTAGRAM_FEED_SUCCESS = "PROFILE_GET_INSTAGRAM_FEED_SUCCESS",
	GET_INSTAGRAM_FEED_FAILED = "PROFILE_GET_INSTAGRAM_FEED_FAILED",
	RESET_INSTAGRAM_FEED = "PROFILE_RESET_INSTAGRAM_FEED",
	UPDATE_BIO = "PROFILE_UPDATE_BIO",
	UPDATE_BIO_SUCCESS = "PROFILE_UPDATE_BIO_SUCCESS",
	UPDATE_BIO_FAILED = "PROFILE_UPDATE_BIO_FAILED",
	UPDATE_GHOST_MODE = "PROFILE_UPDATE_GHOST_MODE",
	UPDATE_GHOST_MODE_SUCCESS = "PROFILE_UPDATE_GHOST_MODE_SUCCESS",
	UPDATE_GHOST_MODE_FAILED = "PROFILE_UPDATE_GHOST_MODE_FAILED",
	UPDATE_GHOST_MODE_NOTIFICATION = "PROFILE_UPDATE_GHOST_MODE_NOTIFICATION",
	// ------------
	SEND_PASSWORD = "SIGN_IN_SEND_PASSWORD",
	PASSWORD_SUCCESS = "SIGN_IN_PASSWORD_SUCCESS",
	PASSWORD_FAILED = "SIGN_IN_PASSWORD_FAILED";

import { setItem, getItem, removeItem } from "../storage";
import {
	// getData,
	put,
	get,
	restDelete,
	post
} from "../appService";

export const setTabOfPage = tabName => ({
	type: SET_TAB_OF_PAGE,
	payload: tabName
});

export const callDeleteChat = data => ({
	type: CALL_DELETE_CHAT,
	payload: data
});

export const deleteChat = data => {
	return new Promise((resolve, reject) => {
		restDelete("/api/v1/chats", data)
			.then(() => {
				resolve(data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const deleteChatSuccess = data => ({
	type: DELETE_CHAT_SUCCESS,
	payload: data
});

export const deleteChatFailed = data => ({
	type: DELETE_CHAT_FAILED,
	payload: data
});

export const addChatCount = () => ({
	type: ADD_CHAT_COUNT
});

export const hasFriendShipRequest = () => ({
	type: HAS_FRIEND_SHIP_REQUEST
});

export const callGetStatus = id => ({
	type: CALL_GET_STATUS,
	payload: id
});

/*
result : {
  chatCount: integer,
  friendshipRequestCount: integer,
  hasFriendshipRequest: boolean
}
 */
export const fetchGetStatus = id => {
	return new Promise((resolve, reject) => {
		get(`/api/v1/members/action/status/${id}`)
			.then(resp => {
				resolve({ ...resp, id });
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchGetStatusSuccess = data => ({
	type: GET_STATUS_SUCCESS,
	payload: data
});

export const fetchGetStatusFailed = err => ({
	type: GET_STATUS_FAILED,
	payload: err
});

export const getChatListData = (data, tab) => ({
	type: CHAT_GET_LIST_DATA,
	payload: data,
	tab
});

export const initialStateChat = data => ({
	type: CHAT_INITIAL_STATE
});

export const fetchChatGetListData = (data, tab) => {
	console.log(
		"------------------------------------- fetchChatGetListData -----------"
	);
	return new Promise((resolve, reject) => {
		let isInRequestMode = tab === "Chats" ? "false" : "true";
		//console.log(isInRequestMode);
		post(`/api/v1/chats/${data}`, {
			isInRequestMode: isInRequestMode,
			randomNmber: Math.random()
		})
			.then(resp => {
				console.log("resprespresprespresp fetchChatGetListData", resp);
				resolve(resp.data);
				// resolve({
				// 	...resp,
				// 	refreshing: data.refreshing,
				// 	id: data.receiverMemberOwner
				// });
			})
			.catch(err => {
				console.log("EEEEEERRRORRRR", err);
				reject(err);
			});
	});
};

export const fetchChatGetListDataSuccess = data => {
	return {
		type: CHAT_GET_LIST_DATA_SUCCESS,
		payload: data
	};
};

export const fetchChatGetListDataFailed = err => {
	return {
		type: CHAT_GET_LIST_DATA_FAILED,
		payload: err
	};
};

export const callDeleteAccount = id => {
	return {
		type: CALL_DELETE_ACCOUNT,
		payload: id
	};
};

export const deleteAccount = id => {
	return new Promise((resolve, reject) => {
		restDelete("/api/v1/members", { id })
			.then(() => {
				resolve();
			})
			.catch(err => {
				// console.log('err', err);
				reject(err);
			});
	});
};

export const deleteAccountSuccess = () => {
	return {
		type: DELETE_ACCOUNT_SUCCESS
	};
};

export const deleteAccountFailed = err => {
	return {
		type: DELETE_ACCOUNT_FAILED,
		payload: err
	};
};

export const callLogout = data => {
	return {
		type: CALL_LOGOUT,
		payload: data
	};
};

export const removeUserData = data => {
	return new Promise((resolve, reject) => {
		removeItem("AUTH:TAPE")
			.then(() => {
				resolve(data);
			})
			.catch(() => {
				reject(data);
			});
	});
};

export const removeUserDataSuccess = data => {
	return {
		type: LOGOUT_SUCCESS,
		payload: data
	};
};

export const fetchLogout = id => {
	put("/api/v1/members/action/logout", { id });
	return {
		type: FETCH_LOGOUT
	};
};

export const removeUserDataFailed = data => {
	return {
		type: LOGOUT_FAILED,
		payload: data
	};
};

export const checkIsLogin = data => {
	return {
		type: CHECK_IS_LOGIN,
		payload: data
	};
};

export const getUserDataStorage = data => {
	return new Promise((resolve, reject) => {
		getItem("AUTH:TAPE")
			.then(resp => {
				let userData = JSON.parse(resp);
				if (userData && userData.id) {
					resolve({ userData: userData, ...data });
				} else {
					reject({ userData: {}, ...data });
				}
			})
			.catch(() => {
				reject({ userData: {}, ...data });
			});
	});
};

export const isLoginSuccess = data => {
	return {
		type: IS_LOGIN_SUCCESS,
		payload: data
	};
};

export const isLoginFailed = data => {
	return {
		type: IS_LOGIN_FAILED,
		payload: data
	};
};

export const callLogin = (navigation, resetAction, data) => {
	return {
		type: CALL_LOGIN,
		payload: { navigation, resetAction, data }
	};
};

export const setAuth = data => {
	return new Promise((resolve, reject) => {
		setItem("AUTH:TAPE", JSON.stringify(data.data))
			.then(() => {
				resolve(data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const setAuthSuccess = data => {
	return {
		type: LOGIN_SUCCESS,
		payload: data
	};
};

export const setAuthFailed = err => {
	return {
		type: LOGIN_FAILED,
		payload: err
	};
};

// -----

export const sendVerifyCode = data => {
	return {
		type: SEND_VERIFY_CODE,
		payload: data
	};
};

export const fetchSendVerifyCode = data => {
	return new Promise((resolve, reject) => {
		put("/api/v2/members/action/signup/resend-verify-code", {
			cellphone: data.cellphone
		})
			.then(resp => {
				resolve({
					...resp,
					navigation: data.navigation,
					cellphone: data.cellphone
				});
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchSendVerifyCodeSuccess = data => {
	return {
		type: SEND_VERIFY_CODE_SUCCESS,
		payload: data
	};
};

export const fetchSendVerifyCodeFailed = data => {
	return {
		type: SEND_VERIFY_CODE_FAILED,
		payload: data
	};
};

// --------

export const updateCodeGetUser = data => {
	return {
		type: UPDATE_CODE_GET_USER,
		payload: data
	};
};

export const fetchUpdateCodeGetUser = data => {
	return new Promise((resolve, reject) => {
		put("/api/v1/members/action/forgot-password/verify-code", {
			cellphone: data.cellphone,
			verifyCode: data.verifyCode
		})
			.then(resp => {
				resolve({
					...resp,
					navigation: data.navigation,
					cellphone: data.cellphone
				});
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchUpdateCodeGetUserSuccess = data => {
	return {
		type: UPDATE_CODE_GET_USER_SUCCESS,
		payload: data
	};
};

export const fetchUpdateCodeGetUserFailed = err => {
	return {
		type: UPDATE_CODE_GET_USER_FAILED,
		payload: err
	};
};

// ------
export const getCountries = () => {
	return {
		type: GET_COUNTRIES
	};
};

export const fetchCountries = () => {
	return new Promise((resolve, reject) => {
		fetch("https://restcountries.eu/rest/v2/all", {
			method: "GET"
		})
			.then(res => res.json())
			.catch(error => reject(error))
			.then(response => resolve(response));
	});
};

export const fetchCountriesSuccess = data => {
	return {
		type: COUNTRIES_SUCCESS,
		payload: data
	};
};

export const fetchCountriesFailed = err => {
	return {
		type: COUNTRIES_FAILED,
		payload: err
	};
};

export const getIpData = () => {
	console.log("getIpData index got ot action");
	return {
		type: GET_IP_DATA
	};
};

export const fetchIpData = () => {
	console.log("in fetchIpData");
	return new Promise((resolve, reject) => {
		fetch(
			"https://api.ipdata.co?api-key=8ea163e43c9ea60ccbfdcb756c76374c0f19b659031fdbc54d4d3f9f",
			{
				method: "GET"
			}
		)
			.then(res => res.json())
			.catch(error => reject(error))
			.then(response => {
				console.log("response", response);
				return resolve(response);
			});
	});
};

export const fetchIpDataSuccess = data => {
	console.log("fetchIpDataSuccess", data);

	return {
		type: IP_DATA_SUCCESS,
		payload: data
	};
};

export const fetchIpDataFailed = err => {
	console.log("fetchIpDataFailed", err);

	return {
		type: IP_DATA_FAILED,
		payload: err
	};
};

export const sendUser = data => ({
	type: SEND_USER,
	payload: data
});

export const fetchSendUser = data => {
	// console.log(data, 'in signupv2 store')
	return new Promise((resolve, reject) => {
		post("/api/v2/members/action/signup/profile", {
			user: data.user
		})
			.then(resp => {
				resolve({
					...resp,
					password: data.user.password,
					navigation: data.navigation,
					resetAction: data.resetAction
				});
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchSendUserSuccess = data => {
	return {
		type: USER_SUCCESS,
		payload: data
	};
};

export const fetchSendUserFailed = err => {
	return {
		type: USER_FAILED,
		payload: err
	};
};

export const updateGhostModeNotification = status => ({
	type: UPDATE_GHOST_MODE_NOTIFICATION,
	payload: status
});

export const updateGhostMode = data => ({
	type: UPDATE_GHOST_MODE,
	payload: data
});

export const serverUpdateGhostMode = data => {
	return new Promise((resolve, reject) => {
		put(`/api/v1/members/${data.id}`, { isInGhostMode: data.isInGhostMode })
			.then(resp => {
				resolve(true);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const serverUpdateGhostModeSuccess = data => ({
	type: UPDATE_GHOST_MODE_SUCCESS,
	payload: data
});

export const serverUpdateGhostModeFailed = error => ({
	type: UPDATE_GHOST_MODE_FAILED,
	payload: error
});

export const updateBio = data => ({
	type: UPDATE_BIO,
	payload: data
});

export const serverUpdateBio = data => {
	return new Promise((resolve, reject) => {
		put(`/api/v1/members/${data.id}`, { bio: data.bio })
			.then(resp => {
				resolve(true);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const serverUpdateBioSuccess = data => ({
	type: UPDATE_BIO_SUCCESS,
	payload: data
});

export const serverUpdateBioFailed = error => ({
	type: UPDATE_BIO_FAILED,
	payload: error
});

export const resetInstagramFeed = () => ({
	type: RESET_INSTAGRAM_FEED
});

export const getInstagramFeed = instagramToken => ({
	type: GET_INSTAGRAM_FEED,
	payload: instagramToken
});

export const serverGetInstagramFeed = data => {
	return new Promise((resolve, reject) => {
		getUri(
			`https://api.instagram.com/v1/users/self/media/recent/?access_token=${
				data.instagramToken
			}`
		)
			.then(resp => {
				if (resp.meta && resp.meta.code == 200) {
					resolve(resp.data);
				} else {
					reject(resp.meta);
				}
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const serverGetInstagramFeedSuccess = feed => ({
	type: GET_INSTAGRAM_FEED_SUCCESS,
	payload: feed
});

export const serverGetInstagramFeedFailed = error => ({
	type: GET_INSTAGRAM_FEED_FAILED,
	payload: error
});

export const serverUpdateInstagramToken = data => {
	return new Promise((resolve, reject) => {
		put("/api/v1/members/action/instagram-token", data)
			.then(resp => {
				resolve(resp.data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const serverUpdateInstagramTokenSuccess = memberRecord => ({
	type: UPDATE_INSTAGRAM_TOKEN_SUCCESS,
	payload: memberRecord
});

export const serverUpdateInstagramTokenFailed = error => ({
	type: UPDATE_INSTAGRAM_TOKEN_FAILED,
	payload: error
});

export const updateInstagramToken = data => ({
	type: UPDATE_INSTAGRAM_TOKEN,
	payload: data
});

export const socketVisitCount = data => ({
	type: SOCKET_VISIT_COUNT,
	payload: data
});

export const callVisitCount = id => ({
	type: VISIT_COUNT,
	payload: id
});

export const getVisitCount = id => {
	return new Promise((resolve, reject) => {
		get(`/api/v1/members/action/profile-count/${id}`)
			.then(resp => {
				resolve(resp.data);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const getVisitCountSuccess = data => ({
	type: VISIT_COUNT_SUCCESS,
	payload: data
});

export const getVisitCountFailed = data => ({
	type: VISIT_COUNT_FAILED,
	payload: data
});

export const callProfileVisit = data => ({
	type: CALL_PROFILE_VISIT,
	payload: data
});

export const postProfileVisit = data => {
	return new Promise((resolve, reject) => {
		post("/api/v1/members/action/profile-visit", data)
			.then(resp => {
				resolve(resp);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const postProfileVisitSuccess = data => ({
	type: POST_PROFILE_VISIT_SUCCESS,
	payload: data
});

export const postProfileVisitFailed = data => ({
	type: POST_PROFILE_VISIT_FAILED,
	payload: data
});

export const callGetProfile = id => ({
	type: CALL_GET_PROFILE,
	payload: id
});

export const fetchProfileUser = id => {
	return new Promise((resolve, reject) => {
		get(`/api/v1/members/${id}`)
			.then(resp => {
				resolve(resp);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchProfileUserSuccess = data => ({
	type: GET_PROFILE_SUCCESS,
	payload: data
});

export const fetchProfileUserFailed = err => ({
	type: GET_PROFILE_FAILED,
	payload: err
});

export const getListData = data => ({
	type: GET_LIST_DATA,
	payload: data
});

export const initialState = data => ({
	type: INITIAL_STATE
});

export const fetchGetListData = data => {
	return new Promise((resolve, reject) => {
		post(`/api/v1/members/action/friends`, data)
			.then(resp => {
				resolve({ ...resp, refreshing: data.refreshing });
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

export const fetchGetAddFriendListData = data => {
	return new Promise((resolve, reject) => {
		post(`/api/v1/members/action/friends`, data)
			.then(resp => {
				resolve({ ...resp, refreshingAddFriend: data.refreshingAddFriend });
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchGetAddFriendListDataSuccess = data => {
	return {
		type: GET_LIST_ADD_FRIEND_DATA_SUCCESS,
		payload: data
	};
};

export const fetchGetAddFriendListDataFailed = err => {
	return {
		type: GET_LIST_ADD_FRIEND_DATA_FAILED,
		payload: err
	};
};

export const searchText = text => ({
	type: SEARCH_TEXT,
	payload: text
});

export const saveNavigationForNavigate = navigate => ({
	type: SAVE_NAVIGATION_FOR_NAVIGATE,
	payload: navigate
});

export const changePageWithNavigation = data => {
	return {
		type: CHANGE_PAGE_WITH_NAVIGATION,
		payload: data
	};
};

export const loadListAfterNavigate = () => ({
	type: LOAD_LIST_AFTER_NAVIGATE
});

export const profileSetCloseModal = data => {
	return {
		type: CLOSE_MODAL,
		payload: data
	};
};

// ------------

export const sendPassword = data => ({
	type: SEND_PASSWORD,
	payload: data
});

export const fetchSendPassword = data => {
	return new Promise((resolve, reject) => {
		// post('/api/v1/members/action/login', {username: data.username, password: data.password}).then(resp => {
		post("/api/v1/members/action/login", {
			cellphone: data.cellphone,
			cellphoneCountryCode: data.cellphoneCountryCode,
			password: data.password
		})
			.then(resp => {
				resolve({
					...resp,
					navigation: data.navigation,
					resetAction: data.resetAction
				});
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const fetchSendPasswordSuccess = data => {
	return {
		type: PASSWORD_SUCCESS,
		payload: data
	};
};

export const fetchSendPasswordFailed = err => {
	return {
		type: PASSWORD_FAILED,
		payload: err
	};
};
