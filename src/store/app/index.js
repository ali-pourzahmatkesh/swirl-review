// export const UPDATE_GPS_STATUS = "APP_UPDATE_GPS_STATUS";
export const UPDATE_APP_STATUS = "APP_UPDATE_APP_STATUS";
export const SET_CURRENT_PAGE = "APP_SET_CURRENT_PAGE";
export const FINISH_ENTRY = "APP_FINISH_ENTRY";
export const SET_NAV = "APP_SET_NAV";
export const FRIEND_REQUEST_FROM_TOAST = "APP_FRIEND_REQUEST_FROM_TOAST";

export const setCurrentPage = pageName => {
	return {
		type: SET_CURRENT_PAGE,
		payload: pageName
	};
};

// export const updateGpsStatus = data => {
// 	return {
// 		type: UPDATE_GPS_STATUS,
// 		payload: data
// 	};
// };

export const updateAppStatus = data => {
	return {
		type: UPDATE_APP_STATUS,
		payload: data
	};
};

export const finishEntry = () => {
	return {
		type: FINISH_ENTRY
	};
};

export const setNav = nav => {
	return {
		type: SET_NAV,
		payload: nav
	}
}

export const friendRequestFromToast = fromToast => {
	return {
		type: FRIEND_REQUEST_FROM_TOAST,
		payload: fromToast
	}
}