import {
	//UPDATE_GPS_STATUS,
	UPDATE_APP_STATUS,
	SET_CURRENT_PAGE
} from "./";

const initialState = {
	// gps: true, // boolean
	// gpsMode: "always", // "never", "inApp", "always"
	app: "active", // "active", "inactive"
	currentPage: "Home"
};

const app = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_PAGE: {
			return { ...state, currentPage: action.payload };
		}

		// case UPDATE_GPS_STATUS: {
		// 	// receive something like
		// 	// {status: 3, enabled: true, gps: true, network: true}
		// 	let gpsStatus =
		// 		action.payload.enabled || action.payload.status == 4 ? true : false;
		// 	let gpsMode =
		// 		action.payload.status == 2
		// 			? "never"
		// 			: action.payload.status == 4
		// 				? "inApp"
		// 				: "always";
		// 	console.log("UPDATE_GPS_STATUS", {
		// 		...state,
		// 		gps: gpsStatus,
		// 		gpsMode: gpsMode
		// 	});
		// 	return { ...state, gps: gpsStatus, gpsMode: gpsMode };
		// }

		case UPDATE_APP_STATUS: {
			// receive one of : "active" || "inactive"
			console.log("UPDATE_APP_STATUS", { ...state, app: action.payload });
			return { ...state, app: action.payload };
		}

		default:
			return state;
	}
};

export default app;
