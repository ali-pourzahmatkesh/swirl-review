import {
	//UPDATE_GPS_STATUS,
	UPDATE_APP_STATUS,
	SET_CURRENT_PAGE,
	FINISH_ENTRY,
	SET_NAV,
	FRIEND_REQUEST_FROM_TOAST
} from "./";

const initialState = {
	// gps: true, // boolean
	// gpsMode: "always", // "never", "inApp", "always"
	app: "active", // "active", "inactive"
	currentPage: "Home",
	finishedEntry: false,
	nav: null,
	fromToast: false
};

const app = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_PAGE: {
			return { ...state, currentPage: action.payload };
		}

		case UPDATE_APP_STATUS: {
			// receive one of : "active" || "inactive"
			console.log("UPDATE_APP_STATUS", { ...state, app: action.payload });
			return { ...state, app: action.payload };
		}

		case FINISH_ENTRY: {
			return {...state, finishedEntry: true};
		}

		case SET_NAV: {
			return {...state, nav: action.payload}
		}

		case FRIEND_REQUEST_FROM_TOAST: {
			return {...state, fromToast: action.payload}
		}

		default:
			return state;
	}
};

export default app;
