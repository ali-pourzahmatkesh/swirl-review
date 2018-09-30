export const GET_LIST_DATA = "CHAT_GET_LIST_DATA",
	GET_LIST_DATA_SUCCESS = "CHAT_GET_LIST_DATA_SUCCESS",
	GET_LIST_DATA_FAILED = "CHAT_GET_LIST_DATA_FAILED",
	INITIAL_STATE = "CHAT_INITIAL_STATE",
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
	COUNTRIES_FAILED = "SIGN_UP_COUNTRIES_FAILED";

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

export const getListData = (data, tab) => ({
	type: GET_LIST_DATA,
	payload: data,
	tab
});

export const initialStateChat = data => ({
	type: INITIAL_STATE
});

export const fetchGetListData = (data, tab) => {
	console.log(
		"------------------------------------- fetchGetListData -----------"
	);
	return new Promise((resolve, reject) => {
		let isInRequestMode = tab === "Chats" ? "false" : "true";
		//console.log(isInRequestMode);
		post(`/api/v1/chats/${data}`, {
			isInRequestMode: isInRequestMode,
			randomNmber: Math.random()
		})
			.then(resp => {
				console.log("resprespresprespresp fetchGetListData", resp);
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
	return {
		type: GET_IP_DATA
	};
};

export const fetchIpData = () => {
	return new Promise((resolve, reject) => {
		fetch(
			"https://api.ipdata.co?api-key=8ea163e43c9ea60ccbfdcb756c76374c0f19b659031fdbc54d4d3f9f",
			{
				method: "GET"
			}
		)
			.then(res => res.json())
			.catch(error => reject(error))
			.then(response => resolve(response));
	});
};

export const fetchIpDataSuccess = data => {
	return {
		type: IP_DATA_SUCCESS,
		payload: data
	};
};

export const fetchIpDataFailed = err => {
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
