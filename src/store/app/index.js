// export const UPDATE_GPS_STATUS = "APP_UPDATE_GPS_STATUS";
export const UPDATE_APP_STATUS = "APP_UPDATE_APP_STATUS";
export const SET_CURRENT_PAGE = "APP_SET_CURRENT_PAGE";

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
