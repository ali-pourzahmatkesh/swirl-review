import {
	ADD_CHAT_COUNT,
	CALL_GET_STATUS,
	fetchChatGetListData,
	fetchChatGetListDataFailed,
	fetchChatGetListDataSuccess,
	fetchGetStatus,
	fetchGetStatusFailed,
	fetchGetStatusSuccess,
	CHAT_GET_LIST_DATA,
	CHAT_GET_LIST_DATA_FAILED,
	CHAT_GET_LIST_DATA_SUCCESS,
	GET_STATUS_FAILED,
	GET_STATUS_SUCCESS,
	HAS_FRIEND_SHIP_REQUEST,
	CHAT_INITIAL_STATE,
	CALL_DELETE_CHAT,
	DELETE_CHAT_SUCCESS,
	DELETE_CHAT_FAILED,
	deleteChat,
	deleteChatSuccess,
	deleteChatFailed,
	SET_TAB_OF_PAGE,
	// -----
	CALL_LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	setAuth,
	setAuthSuccess,
	setAuthFailed,
	CHECK_IS_LOGIN,
	IS_LOGIN_SUCCESS,
	IS_LOGIN_FAILED,
	getUserDataStorage,
	isLoginSuccess,
	isLoginFailed,
	CALL_LOGOUT,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	removeUserData,
	removeUserDataSuccess,
	removeUserDataFailed,
	fetchLogout,
	CALL_DELETE_ACCOUNT,
	DELETE_ACCOUNT_SUCCESS,
	DELETE_ACCOUNT_FAILED,
	deleteAccount,
	deleteAccountSuccess,
	deleteAccountFailed,
	// -------
	SEND_VERIFY_CODE,
	SEND_VERIFY_CODE_SUCCESS,
	SEND_VERIFY_CODE_FAILED,
	fetchSendVerifyCode,
	fetchSendVerifyCodeSuccess,
	fetchSendVerifyCodeFailed,
	// ----------
	UPDATE_CODE_GET_USER,
	UPDATE_CODE_GET_USER_SUCCESS,
	UPDATE_CODE_GET_USER_FAILED,
	fetchUpdateCodeGetUser,
	fetchUpdateCodeGetUserSuccess,
	fetchUpdateCodeGetUserFailed,
	// ------
	SEND_USER,
	USER_SUCCESS,
	USER_FAILED,
	fetchSendUser,
	fetchSendUserSuccess,
	fetchSendUserFailed,
	GET_IP_DATA,
	IP_DATA_SUCCESS,
	IP_DATA_FAILED,
	fetchIpData,
	fetchIpDataSuccess,
	fetchIpDataFailed,
	GET_COUNTRIES,
	COUNTRIES_SUCCESS,
	COUNTRIES_FAILED,
	fetchCountries,
	fetchCountriesSuccess,
	fetchCountriesFailed,
	// ------
	CALL_GET_PROFILE,
	GET_PROFILE_SUCCESS,
	GET_PROFILE_FAILED,
	fetchProfileUser,
	fetchProfileUserSuccess,
	fetchProfileUserFailed,
	GET_LIST_DATA,
	GET_LIST_DATA_SUCCESS,
	GET_LIST_DATA_FAILED,
	INITIAL_STATE,
	fetchGetListData,
	fetchGetListDataSuccess,
	fetchGetListDataFailed,
	GET_LIST_ADD_FRIEND_DATA,
	GET_LIST_ADD_FRIEND_DATA_SUCCESS,
	GET_LIST_ADD_FRIEND_DATA_FAILED,
	INITIAL_ADD_FRIEND_STATE,
	fetchGetAddFriendListData,
	fetchGetAddFriendListDataSuccess,
	fetchGetAddFriendListDataFailed,
	SEARCH_TEXT,
	SAVE_NAVIGATION_FOR_NAVIGATE,
	CHANGE_PAGE_WITH_NAVIGATION,
	LOAD_LIST_AFTER_NAVIGATE,
	CLOSE_MODAL,
	CALL_PROFILE_VISIT,
	postProfileVisit,
	POST_PROFILE_VISIT_SUCCESS,
	POST_PROFILE_VISIT_FAILED,
	postProfileVisitSuccess,
	postProfileVisitFailed,
	VISIT_COUNT,
	VISIT_COUNT_SUCCESS,
	VISIT_COUNT_FAILED,
	getVisitCount,
	getVisitCountSuccess,
	getVisitCountFailed,
	SOCKET_VISIT_COUNT,
	UPDATE_INSTAGRAM_TOKEN,
	UPDATE_INSTAGRAM_TOKEN_SUCCESS,
	UPDATE_INSTAGRAM_TOKEN_FAILED,
	serverUpdateInstagramToken,
	serverUpdateInstagramTokenSuccess,
	serverUpdateInstagramTokenFailed,
	GET_INSTAGRAM_FEED,
	GET_INSTAGRAM_FEED_SUCCESS,
	GET_INSTAGRAM_FEED_FAILED,
	serverGetInstagramFeed,
	serverGetInstagramFeedSuccess,
	serverGetInstagramFeedFailed,
	RESET_INSTAGRAM_FEED,
	UPDATE_BIO,
	UPDATE_BIO_SUCCESS,
	UPDATE_BIO_FAILED,
	serverUpdateBio,
	serverUpdateBioSuccess,
	serverUpdateBioFailed,
	UPDATE_GHOST_MODE,
	UPDATE_GHOST_MODE_SUCCESS,
	UPDATE_GHOST_MODE_FAILED,
	serverUpdateGhostMode,
	serverUpdateGhostModeSuccess,
	serverUpdateGhostModeFailed,
	UPDATE_GHOST_MODE_NOTIFICATION,
	// --------
	SEND_PASSWORD,
	PASSWORD_SUCCESS,
	PASSWORD_FAILED,
	fetchSendPassword,
	fetchSendPasswordSuccess,
	fetchSendPasswordFailed,
	// ------
	callLogin,
	callGetStatus,
	callGetProfile,
	// ------
	CONFIRM_CHANGE_PASSWORD,
	CONFIRM_PASSWORD_SUCCESS,
	CONFIRM_PASSWORD_FAILED,
	fetchChangePassword,
	fetchChangePasswordSuccess,
	fetchChangePasswordFailed,
	// ------
	UPDATE_MEMBER_PASSWORD,
	UPDATE_MEMBER_PASSWORD_SUCCESS,
	UPDATE_MEMBER_PASSWORD_FAILED,
	serverChangePasswordFromProfile,
	serverChangePasswordFromProfileSuccess,
	serverChangePasswordFromProfileFailed,
	// -------
	UPDATE_MEMBER,
	UPDATE_MEMBER_SUCCESS,
	UPDATE_MEMBER_FAILED,
	serverUpdateMember,
	serverUpdateMemberSuccess,
	serverUpdateMemberFailed,
	// --------
	GET_MEMBERS_FROM_CONTACTS,
	GET_MEMBERS_FROM_CONTACTS_SUCCESS,
	GET_MEMBERS_FROM_CONTACTS_FAILED,
	serverGetMemberFromContacts,
	serverGetMemberFromContactsSuccess,
	serverGetMemberFromContactsFailed,
	// ---------
	GET_FRIENDS,
	GET_FRIENDS_SUCCESS,
	GET_FRIENDS_FAILED,
	serverGetFriends,
	serverGetFriendsSuccess,
	serverGetFriendsFailed,
	sendPassword,
	// ---------
	GET_MEMBER_BY_USERNAME,
	GET_MEMBER_BY_USERNAME_SUCCESS,
	GET_MEMBER_BY_USERNAME_FAILED,
	serverSearchInDB,
	serverSearchInDBSuccess,
	serverSearchInDBFailed,
	// ---------
	SET_FROM_LOCAL,
	SET_FROM_LOCAL_SUCCESS,
	SET_FROM_LOCAL_FAILED,
	performSetFromLocal,
	setFromLocalSuccess,
	setFromLocalFailed,
	// ---------
	VISIT_NOTIFICATION,
	VISIT_NOTIFICATION_SUCCESS,
	VISIT_NOTIFICATION_FAILED,
	fetchVisitNotification,
	fetchVisitiNotificationSuccess,
	fetchVisitiNotificationFailed,
	// ---------
	FETCH_LOGOUT
} from "./";

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
	currentTabOfPage: "Chats",
	isLogin: false,
	// -------
	currentMember: {},
	verifyCode: "",
	// --------
	ipData: {},
	countries: [],
	// ------
	navigationData: {},
	closeModal: false,
	navigateInviteContact: false,
	closeModalFromOther: false,
	visitCount: 0,
	instagramFeed: [],
	ghostNotif: false,
	membersFromContactsAreNotFriend: [],
	membersThatAreFriends: []
};

const chat = (state = initialState, action) => {
	switch (action.type) {
		case VISIT_NOTIFICATION: {
			return loop (
				{
					...state,
					errorMessage: "",
					hasError: false,
					loading: true
				},
				Cmd.run(fetchVisitNotification, {
					successActionCreator: fetchVisitiNotificationSuccess,
					failActionCreator: fetchVisitiNotificationFailed,
					args: [action.payload]
				})
			)
		}

		case VISIT_NOTIFICATION_SUCCESS: {
			let newUserData = {
				...state.userData,
				seenNotifications: action.payload.data
			}
			return {
				...state,
				loading: false,
				userData: newUserData
			}
		}

		case VISIT_NOTIFICATION_FAILED: {
			return {
				...state,
				errorMessage: "error visiting notification",
				hasError: true,
			}
		}
		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

		case GET_MEMBER_BY_USERNAME: {
			return loop(
				{
					...state,
					errorMessage: "",
					hasError: false,
					loading: true
				},
				Cmd.run(serverSearchInDB, {
					successActionCreator: serverSearchInDBSuccess,
					failActionCreator: serverSearchInDBFailed,
					args: [action.payload]
				})
			);
		}

		case GET_MEMBER_BY_USERNAME_SUCCESS: {
			return {
				...state,
				errorMessage: "",
				hasError: false,
				membersFromContactsAreNotFriend: action.payload,
				loading: false
			};
		}

		case GET_MEMBER_BY_USERNAME_FAILED: {
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

		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

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
			console.log("finished setting from local successfully", action.payload);
			return {
				...state,
				...action.payload
			};
		}

		case SET_FROM_LOCAL_FAILED: {
			console.log("failed setting from local");
			return {
				...state
			};
		}

		case GET_FRIENDS: {
			return loop(
				{
					...state,
					errorMessage: "",
					hasError: false,
					loading: true
				},
				Cmd.run(serverGetFriends, {
					successActionCreator: serverGetFriendsSuccess,
					failActionCreator: serverGetFriendsFailed,
					args: [action.payload]
				})
			);
		}

		case GET_FRIENDS_SUCCESS: {
			return {
				...state,
				errorMessage: "",
				hasError: false,
				membersThatAreFriends: action.payload,
				loading: false
			};
		}

		case GET_FRIENDS_FAILED: {
			return loop(
				{
					...state,
					loading: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(showToast(true, "get_friends" + action.payload.message))
			);
		}

		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

		case CHAT_INITIAL_STATE: {
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
				Cmd.action(showToast(true, "delete_chat" + action.payload.message))
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
			return {
				...state,
				chatCount: action.payload.data.chatCount,
				friendshipRequestCount: action.payload.data.friendshipRequestCount,
				hasFriendshipRequest: action.payload.data.hasFriendshipRequest
			};
			// return loop(
			// 	{
			// 		...state,
			// 		chatCount: action.payload.data.chatCount,
			// 		friendshipRequestCount: action.payload.data.friendshipRequestCount,
			// 		hasFriendshipRequest: action.payload.data.hasFriendshipRequest
			// 	},
			// 	Cmd.action(callGetProfile(action.payload.id))
			// );
		}

		case GET_STATUS_FAILED: {
			return { ...state };
		}

		case CALL_DELETE_ACCOUNT: {
			return loop(
				{ ...state },
				Cmd.run(deleteAccount, {
					successActionCreator: deleteAccountSuccess,
					failActionCreator: deleteAccountFailed,
					args: [action.payload]
				})
			);
		}
		case DELETE_ACCOUNT_SUCCESS: {
			return { ...state };
		}
		case DELETE_ACCOUNT_FAILED: {
			return loop(
				{ ...state },
				Cmd.action(showToast(true, "delete_account" + action.payload.message))
			);
		}

		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------
		// -------------------------------------------------------------------------

		case CALL_LOGOUT: {
			return loop(
				{ ...state, loading: true },
				Cmd.run(removeUserData, {
					successActionCreator: removeUserDataSuccess,
					failActionCreator: removeUserDataFailed,
					args: [action.payload]
				})
			);
		}
		case LOGOUT_SUCCESS: {
			action.payload.navigation.dispatch(action.payload.resetAction);
			return loop(
				{
					...state,
					isLogin: false,
					userData: {},
					errorMessage: "",
					hasError: false,
					loading: false
				},
				Cmd.action(fetchLogout(action.payload.id))
			);
		}
		case LOGOUT_FAILED: {
			action.payload.navigation.dispatch(action.payload.resetAction);
			return loop(
				{
					...state,
					isLogin: false,
					userData: {},
					errorMessage: "",
					hasError: false,
					loading: false
				},
				Cmd.action(fetchLogout(action.payload.id))
			);
		}
		case CHECK_IS_LOGIN: {
			return loop(
				{ ...state },
				Cmd.run(getUserDataStorage, {
					successActionCreator: isLoginSuccess,
					failActionCreator: isLoginFailed,
					args: [action.payload]
				})
			);
		}
		case IS_LOGIN_SUCCESS: {
			const actionToDispatch = action.payload.NavigationActions.reset({
				index: 0,
				actions: [
					action.payload.NavigationActions.navigate({ routeName: "HomeStack" })
				]
			});
			action.payload.navigation.dispatch(actionToDispatch);
			return loop(
				{
					...state,
					isLogin: true,
					userData: action.payload.userData,
					errorMessage: "",
					hasError: false
				},
				Cmd.action(callGetStatus(action.payload.userData.id))
			);
		}
		case IS_LOGIN_FAILED: {
			const actionToDispatch = action.payload.NavigationActions.reset({
				index: 0,
				actions: [
					action.payload.NavigationActions.navigate({
						routeName: "WelcomeStack"
					})
				]
			});
			action.payload.navigation.dispatch(actionToDispatch);
			return {
				...state,
				isLogin: false,
				userData: action.payload.userData,
				errorMessage: "",
				hasError: false
			};
		}
		case CALL_LOGIN: {
			return loop(
				{ ...state, errorMessage: "", hasError: false },
				Cmd.run(setAuth, {
					successActionCreator: setAuthSuccess,
					failActionCreator: setAuthFailed,
					args: [action.payload]
				})
			);
		}
		case LOGIN_SUCCESS: {
			action.payload.navigation.dispatch(action.payload.resetAction);
			return loop(
				{
					...state,
					isLogin: true,
					errorMessage: "",
					hasError: false,
					userData: action.payload.data
				},
				Cmd.action(callGetStatus(action.payload.data.id))
			);
		}
		case LOGIN_FAILED: {
			return loop(
				{
					...state,
					isLogin: false,
					errorMessage: "error in storage",
					hasError: true,
					userData: {}
				},
				Cmd.action(showToast(true, "login_failed" + "error in storage"))
			);
		}

		// ----------

		case SEND_VERIFY_CODE: {
			return loop(
				{
					...state,
					isLoadingFetch: true,
					errorMessage: "",
					hasError: false,
					loading: true
				},
				Cmd.run(fetchSendVerifyCode, {
					successActionCreator: fetchSendVerifyCodeSuccess,
					failActionCreator: fetchSendVerifyCodeFailed,
					args: [action.payload]
				})
			);
		}
		case SEND_VERIFY_CODE_SUCCESS: {
			action.payload.navigation.navigate("ForgotPasswordVerifyScreen", {
				verifyCode: action.payload.data,
				cellphone: action.payload.cellphone,
				cellphoneCountryCode: action.payload.cellphoneCountryCode
			});
			return {
				...state,
				verifyCode: action.payload.data,
				isLoadingFetch: false,
				errorMessage: "",
				hasError: false,
				loading: false
			};
		}
		case SEND_VERIFY_CODE_FAILED: {
			return loop(
				{
					...state,
					verifyCode: "",
					isLoadingFetch: false,
					errorMessage: "Error sending verifyCode.",
					hasError: true,
					loading: false
				},
				Cmd.action(
					showToast(true, "Error sending verifyCode.", "send_verify_code")
				)
			);
		}

		// --------

		case UPDATE_CODE_GET_USER: {
			return loop(
				{
					...state,
					isLoadingFetch: true,
					errorMessage: "",
					hasError: false,
					loading: true
				},
				Cmd.run(fetchUpdateCodeGetUser, {
					successActionCreator: fetchUpdateCodeGetUserSuccess,
					failActionCreator: fetchUpdateCodeGetUserFailed,
					args: [action.payload]
				})
			);
		}
		case UPDATE_CODE_GET_USER_SUCCESS: {
			console.log(action.payload);
			action.payload.navigation.navigate("ChangePasswordScreen", {
				cellphoneCountryCode: action.payload.cellphoneCountryCode,
				cellphone: action.payload.cellphone,
				token: action.payload.data.token
			});
			return {
				...state,
				isLoadingFetch: false,
				errorMessage: "",
				hasError: false,
				loading: false
			};
		}
		case UPDATE_CODE_GET_USER_FAILED: {
			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: action.payload.message,
					hasError: true,
					loading: false
				},
				Cmd.action(
					showToast(true, "update_code_get_user" + action.payload.message)
				)
			);
		}

		// -------

		case SEND_USER: {
			return loop(
				{
					...state,
					loading: true,
					isLoadingFetch: true,
					errorMessage: "",
					hasError: false
				},
				Cmd.run(fetchSendUser, {
					successActionCreator: fetchSendUserSuccess,
					failActionCreator: fetchSendUserFailed,
					args: [action.payload]
				})
			);
		}
		case USER_SUCCESS: {
			console.log("inside /store/signUpV2/reducers.js", action.payload);
			// action.payload.navigation.navigate('SignUpConfirmScreen', {currentMember: action.payload.data, currentMemberPassword: action.payload.password});
			// action.payload.navigation.dispatch();
			// return {...state, isLoadingFetch: false, errorMessage: '', hasError: false}

			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: "",
					hasError: false,
					loading: false
				},
				Cmd.action(
					callLogin(
						action.payload.navigation,
						action.payload.resetAction,
						action.payload.data
					)
				)
			);
		}
		case USER_FAILED: {
			console.log(
				"inside /store/signUpV2/reducers.js USER_FAILED",
				action.payload
			);

			return loop(
				{
					...state,
					isLoadingFetch: false,
					loading: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(showToast(true, action.payload.message + " from SEND_USER"))
			);
		}

		case GET_IP_DATA: {
			console.log("in action GET_IP_DATA");
			return loop(
				{ ...state },
				Cmd.run(fetchIpData, {
					successActionCreator: fetchIpDataSuccess,
					failActionCreator: fetchIpDataFailed
				})
			);
		}
		case IP_DATA_SUCCESS: {
			return {
				...state,
				ipData: action.payload,
				errorMessage: "",
				hasError: false
			};
		}
		case IP_DATA_FAILED: {
			return loop(
				{
					...state,
					ipData: {},
					hasError: true,
					errorMessage: "error in get ip data."
				},
				Cmd.action(showToast(true, "ip_data_failed" + "error in get ip data."))
			);
		}
		case GET_COUNTRIES: {
			return loop(
				{ ...state },
				Cmd.run(fetchCountries, {
					successActionCreator: fetchCountriesSuccess,
					failActionCreator: fetchCountriesFailed
				})
			);
		}
		case COUNTRIES_SUCCESS: {
			return {
				...state,
				countries: action.payload,
				errorMessage: "",
				hasError: false
			};
		}
		case COUNTRIES_FAILED: {
			return loop(
				{
					...state,
					countries: [],
					hasError: true,
					errorMessage: "error in get countries."
				},
				Cmd.action(
					showToast(true, "countries_failed" + "error in get countries.")
				)
			);
		}

		// --------
		case UPDATE_GHOST_MODE_NOTIFICATION: {
			return {
				...state,
				ghostNotif: action.payload
			};
		}

		case UPDATE_GHOST_MODE: {
			return loop(
				{ ...state, ghostNotif: false },
				Cmd.run(serverUpdateGhostMode, {
					successActionCreator: serverUpdateGhostModeSuccess,
					failActionCreator: serverUpdateGhostModeFailed,
					args: [action.payload]
				})
			);
		}

		case UPDATE_GHOST_MODE_SUCCESS: {
			state.userData.isInGhostMode = !state.userData.isInGhostMode;
			return {
				...state,
				ghostNotif: true
			};
		}

		case UPDATE_GHOST_MODE_FAILED: {
			return {
				...state
			};
		}

		case UPDATE_BIO: {
			return loop(
				{ ...state },
				Cmd.run(serverUpdateBio, {
					successActionCreator: serverUpdateBioSuccess,
					failActionCreator: serverUpdateBioFailed,
					args: [action.payload]
				})
			);
		}

		case UPDATE_BIO_SUCCESS: {
			return {
				...state
			};
		}

		case UPDATE_BIO_FAILED: {
			return {
				...state
			};
		}

		case RESET_INSTAGRAM_FEED: {
			return {
				...state,
				instagramFeed: []
			};
		}

		case GET_INSTAGRAM_FEED: {
			return loop(
				{ ...state, loading: true },
				Cmd.run(serverGetInstagramFeed, {
					successActionCreator: serverGetInstagramFeedSuccess,
					failActionCreator: serverGetInstagramFeedFailed,
					args: [{ instagramToken: action.payload }]
				})
			);
		}

		case GET_INSTAGRAM_FEED_SUCCESS: {
			return {
				...state,
				loading: false,
				instagramFeed: action.payload
			};
		}

		case GET_INSTAGRAM_FEED_FAILED: {
			return {
				...state,
				loading: false
			};
		}

		case UPDATE_INSTAGRAM_TOKEN: {
			return loop(
				{ ...state, loading: true },
				Cmd.run(serverUpdateInstagramToken, {
					successActionCreator: serverUpdateInstagramTokenSuccess,
					failActionCreator: serverUpdateInstagramTokenFailed,
					args: [
						{ id: action.payload.id, instagramToken: action.payload.token }
					]
				})
			);
		}

		case UPDATE_INSTAGRAM_TOKEN_SUCCESS: {
			console.log(
				"----------------- check reset insta feed after remove token",
				action.payload.instagramToken && action.payload.instagramToken != ""
					? state.instagramFeed
					: []
			);
			return {
				...state,
				userData: action.payload,
				errorMessage: null,
				hasError: false,
				loading: false,
				instagramFeed:
					action.payload.instagramToken && action.payload.instagramToken != ""
						? state.instagramFeed
						: []
			};
		}

		case UPDATE_INSTAGRAM_TOKEN_FAILED: {
			return {
				...state,
				errorMessage: action.payload.message,
				hasError: true,
				loading: false
			};
		}

		case SOCKET_VISIT_COUNT: {
			return { ...state, visitCount: action.payload };
		}

		case VISIT_COUNT: {
			return loop(
				{ ...state },
				Cmd.run(getVisitCount, {
					successActionCreator: getVisitCountSuccess,
					failActionCreator: getVisitCountFailed,
					args: [action.payload]
				})
			);
		}

		case VISIT_COUNT_SUCCESS: {
			let count = action.payload;
			if (typeof count !== "number") {
				count = 0;
			}
			return { ...state, visitCount: count };
		}

		case VISIT_COUNT_FAILED: {
			return { ...state };
		}

		case CALL_PROFILE_VISIT: {
			return loop(
				{ ...state },
				Cmd.run(postProfileVisit, {
					successActionCreator: postProfileVisitSuccess,
					failActionCreator: postProfileVisitFailed,
					args: [action.payload]
				})
			);
		}

		case POST_PROFILE_VISIT_SUCCESS: {
			return { ...state };
		}
		case POST_PROFILE_VISIT_FAILED: {
			return { ...state };
		}

		case CALL_GET_PROFILE: {
			console.log(">>>>> CALL_GET_PROFILE");
			return loop(
				{
					...state,
					isLoadingFetch: true,
					errorMessage: "",
					hasError: false,
					navigateInviteContact: false
				},
				Cmd.run(fetchProfileUser, {
					successActionCreator: fetchProfileUserSuccess,
					failActionCreator: fetchProfileUserFailed,
					args: [action.payload]
				})
			);
		}
		case GET_PROFILE_SUCCESS: {
			return {
				...state,
				isLoadingFetch: false,
				errorMessage: "",
				hasError: false,
				userData: action.payload.data,
				navigateInviteContact: false
			};
		}
		case GET_PROFILE_FAILED: {
			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: action.payload.message,
					hasError: true,
					navigateInviteContact: false
				},
				Cmd.action(showToast(true, "get_profile" + action.payload.message))
			);
		}

		case GET_LIST_DATA: {
			return loop(
				{
					...state,
					isLoadingFetch: true,
					errorMessage: "",
					hasError: false,
					refreshing: action.payload.refreshing,
					loading: action.payload.loading,
					closeModal: false,
					navigateInviteContact: false
				},
				Cmd.run(fetchGetListData, {
					successActionCreator: fetchGetListDataSuccess,
					failActionCreator: fetchGetListDataFailed,
					args: [action.payload]
				})
			);
		}
		case GET_LIST_DATA_SUCCESS: {
			let list = state.list;
			if (action.payload.refreshing) list = [];
			return {
				...state,
				isLoadingFetch: false,
				errorMessage: "",
				hasError: false,
				list: [...list, ...action.payload.data],
				refreshing: false,
				closeModal: false,
				loading: false,
				count: action.payload.metadata.count,
				navigateInviteContact: false,
				test: true
			};
		}
		case GET_LIST_DATA_FAILED: {
			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: action.payload.message,
					hasError: true,
					closeModal: false,
					navigateInviteContact: false
				},
				Cmd.action(showToast(true, "get_list_data" + action.payload.message))
			);
		}
		case INITIAL_STATE: {
			return {
				isLoadingFetch: false,
				errorMessage: "",
				hasError: false,
				list: [],
				refreshing: false,
				loading: false,
				count: 0,
				closeModal: false,
				navigationData: state.navigationData,
				navigateInviteContact: false
			};
		}

		case GET_LIST_ADD_FRIEND_DATA: {
			return loop(
				{
					isLoadingFetch: true,
					errorMessage: "",
					hasError: false,
					refreshingAddFriend: action.payload.refreshingAddFriend,
					loadingAddFriend: action.payload.loadingAddFriend,
					closeModal: false,
					navigateInviteContact: false
				},
				Cmd.run(fetchGetAddFriendListData, {
					successActionCreator: fetchGetAddFriendListDataSuccess,
					failActionCreator: fetchGetAddFriendListDataFailed,
					args: [action.payload]
				})
			);
		}
		case GET_LIST_ADD_FRIEND_DATA_SUCCESS: {
			let list = state.listAddFriend;
			if (action.payload.refreshingAddFriend) list = [];
			// console.log([...list, ...action.payload.data] ,"GET_LIST_ADD_FRIEND_DATA_SUCCESS",action.payload.metadata.count)
			return {
				isLoadingFetch: false,
				errorMessage: "",
				hasError: false,
				listAddFriend: [...list, ...action.payload.data],
				refreshingAddFriend: false,
				loadingAddFriend: false,
				countAddFriend: action.payload.metadata.count,
				closeModal: false,
				navigateInviteContact: false
			};
		}
		case GET_LIST_ADD_FRIEND_DATA_FAILED: {
			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: action.payload.message,
					hasError: true,
					navigateInviteContact: false
				},
				Cmd.action(
					showToast(true, "get_list_add_friend" + action.payload.message)
				)
			);
		}
		case INITIAL_ADD_FRIEND_STATE: {
			return {
				isLoadingFetch: false,
				errorMessage: "",
				hasError: false,
				listAddFriend: [],
				refreshingAddFriend: false,
				loadingAddFriend: false,
				countAddFriend: 0,
				closeModal: false,
				navigateInviteContact: false
			};
		}
		case SEARCH_TEXT: {
			return {
				...state,
				searchText: action.payload,
				closeModal: false,
				navigateInviteContact: false
			};
		}
		case SAVE_NAVIGATION_FOR_NAVIGATE: {
			// console.log("&&&&&action.payload::", action.payload);
			return { ...state, navigationData: action.payload };
		}
		case CHANGE_PAGE_WITH_NAVIGATION: {
			state.navigationData.navigate(action.payload);
			return { ...state, closeModal: true, navigateInviteContact: false };
		}
		case LOAD_LIST_AFTER_NAVIGATE: {
			return { ...state, navigateInviteContact: true, closeModal: false };
		}
		case CLOSE_MODAL: {
			return {
				...state,
				closeModalFromOther: action.payload,
				navigateInviteContact: true,
				closeModal: false
			};
		}

		// --------

		case SEND_PASSWORD: {
			return loop(
				{ ...state, loading: true, errorMessage: "", hasError: false },
				Cmd.run(fetchSendPassword, {
					successActionCreator: fetchSendPasswordSuccess,
					failActionCreator: fetchSendPasswordFailed,
					args: [action.payload]
				})
			);
		}
		case PASSWORD_SUCCESS: {
			return loop(
				{ ...state, loading: false, errorMessage: "", hasError: false },
				Cmd.action(
					callLogin(
						action.payload.navigation,
						action.payload.resetAction,
						action.payload.data
					)
				)
			);
		}
		case PASSWORD_FAILED: {
			return loop(
				{
					...state,
					loading: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(showToast(true, action.payload.message, "password_failed"))
			);
		}

		// ---------

		case CONFIRM_CHANGE_PASSWORD: {
			console.log("action change_passowrd");
			return loop(
				{ ...state, isLoadingFetch: true, errorMessage: "", hasError: false },
				Cmd.run(fetchChangePassword, {
					successActionCreator: fetchChangePasswordSuccess,
					failActionCreator: fetchChangePasswordFailed,
					args: [action.payload]
				})
			);
		}
		case CONFIRM_PASSWORD_SUCCESS: {
			console.log(action.payload, "in pass success **************");
			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: "",
					hasError: false
				},
				Cmd.action(
					sendPassword({
						...action.payload
					})
				)
			);
		}
		case CONFIRM_PASSWORD_FAILED: {
			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(
					showToast(true, "confirm_password_failed" + action.payload.message)
				)
			);
		}

		// ---------

		case UPDATE_MEMBER_PASSWORD: {
			return loop(
				{ ...state, isLoadingFetch: true, errorMessage: "", hasError: false },
				Cmd.run(serverChangePasswordFromProfile, {
					successActionCreator: serverChangePasswordFromProfileSuccess,
					failActionCreator: serverChangePasswordFromProfileFailed,
					args: [action.payload]
				})
			);
		}
		case UPDATE_MEMBER_PASSWORD_SUCCESS: {
			// action.payload.navigation.navigate('ConfirmPasswordScreen');
			action.payload.navigation.goBack();
			return {
				...state,
				isLoadingFetch: false,
				errorMessage: "",
				hasError: false
			};
		}
		case UPDATE_MEMBER_PASSWORD_FAILED: {
			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(
					showToast(true, "update_member_password" + action.payload.message)
				)
			);
		}

		// ---------

		case UPDATE_MEMBER: {
			return loop(
				{ ...state, isLoadingFetch: true, errorMessage: "", hasError: false },
				Cmd.run(serverUpdateMember, {
					successActionCreator: serverUpdateMemberSuccess,
					failActionCreator: serverUpdateMemberFailed,
					args: [action.payload]
				})
			);
		}
		case UPDATE_MEMBER_SUCCESS: {
			// action.payload.navigation.navigate('ConfirmPasswordScreen');

			let arrayOfActions = [];
			arrayOfActions[0] = Cmd.action(callGetProfile(action.payload.id));

			if (!action.payload.blockRedirect) {
				arrayOfActions[1] = Cmd.run(() => {
					action.payload.navigation && action.payload.navigation.goBack();
				});
			}

			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: "",
					hasError: false
				},
				Cmd.list(arrayOfActions, {
					sequence: true
				})
			);
		}

		case UPDATE_MEMBER_FAILED: {
			return loop(
				{
					...state,
					isLoadingFetch: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(
					showToast(true, "update_member_failed" + action.payload.message)
				)
			);
		}

		// ---------

		case GET_MEMBERS_FROM_CONTACTS: {
			return loop(
				{ ...state, loading: true, errorMessage: "", hasError: false },
				Cmd.run(serverGetMemberFromContacts, {
					successActionCreator: serverGetMemberFromContactsSuccess,
					failActionCreator: serverGetMemberFromContactsFailed,
					args: [action.payload]
				})
			);
		}

		case GET_MEMBERS_FROM_CONTACTS_SUCCESS: {
			return {
				...state,
				loading: false,
				errorMessage: "",
				hasError: false,
				membersFromContactsAreNotFriend: action.payload
			};
		}

		case GET_MEMBERS_FROM_CONTACTS_FAILED: {
			return loop(
				{
					...state,
					loading: false,
					errorMessage: action.payload.message,
					hasError: true
				},
				Cmd.action(
					showToast(true, "get_members_from_contacts" + action.payload.message)
				)
			);
		}

		case FETCH_LOGOUT: {
			console.log("fetching logout from member while inside member");
			return { ...state, ...initialState };
		}

		default: {
			return { ...state };
		}
	}
};

export default chat;
