const CONFIG = {
	// --------------------------------------------------------------------------
	// PRODUCTION
	// --------------------------------------------------------------------------
	// serverUrl: "http://api.develop.realswirlapp.us",
	// oneSignalAppId: "68614767-28c4-458c-8e7c-0b49d4de2fc2", // this was active
	// --------------------------------------------------------------------------
	// DEVELOPMENT
	// --------------------------------------------------------------------------
	serverUrl: "http://192.168.1.103:5000",
	oneSignalAppId: "68614767-28c4-458c-8e7c-0b49d4de2fc2",
	// --------------------------------------------------------------------------

	animationDuration: 1000,
	popupTime: 3000,
	colors: {
		disableColor: "#d5dbdf",
		grayColor: "#9d9d9d",
		combinatorialColor: "#ff4674",

		tapeWhite: "#fff",
		tapeDarkGrey: "#5a5a5a",
		tapeOffWhite: "#e6e7e9",
		tapeBlack: "#000",

		//currently blue
		appColor: "#01c7fe",
		//currently yellow
		highlightColor: "#f0f0f0",
		//currently grey
		borderColor: "#ddd",
		//currently white
		bodyColor: "#fff",
		//currently red
		// highlightColorTwo: "#ff4674",
		highlightColorTwo: "#ff0066",
		//currently white
		formInputUnderline: "#fff",
		selectedBoxBorder: "#ff345e",
		inactiveButtonText: "#c6015a"
	},
	chat: {
		receiveMessageLimit: 8
	},
	// --------------------------------------------------------------------------
	// PRODUCTION
	// --------------------------------------------------------------------------
	cloudinary: {
		api_key: "248553457246534",
		api_secret: "2Zr5Cy9LlMM7_UfZTju3yfj9gRc",
		cloud: "hacpzsvp6",
		upload_url_prefix: "https://api.cloudinary.com/v1_1/",
		upload_url_suffix: "/image/upload",
		// ----------
		resource_url_prefix: "https://res.cloudinary.com/",
		resource_url_params_message: "h_2016,w_1512,q_auto:best/" // if it has value must end with /
	}
	// --------------------------------------------------------------------------
	// DEVELOPMENT
	// --------------------------------------------------------------------------
	// cloudinary: {
	// 	api_key: "217834353568179",
	// 	api_secret: "PrlxifCrJbQvhaB88DD_LwBqiPY",
	// 	cloud: "nncs",
	// 	upload_url_prefix: "https://api.cloudinary.com/v1_1/",
	// 	upload_url_suffix: "/image/upload",
	// 	// ----------
	// 	resource_url_prefix: "https://res.cloudinary.com",
	// 	resource_url_params_message: "q_auto:best/" // if it has value must end with / , h_2016,w_1512,
	// }
};

export { CONFIG };
