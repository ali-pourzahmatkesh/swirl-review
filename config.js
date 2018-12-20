const CONFIG = {


	serverUrl: "http://api.develop.realswirlapp.us",
	// oneSignalAppId: "611ce4fc-3c05-4484-b409-3d70bb387706",
	oneSignalAppId: "68614767-28c4-458c-8e7c-0b49d4de2fc2",
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

	// -------------------
	// production config for cloudinary
	// -------------------
	// cloudinary: {
	// 	api_key: "146219712138947",
	// 	api_secret: "S6sKgJXAZxvKRq_2F7LGrtZpJpa",
	// 	cloud: "tape-inc",
	// 	upload_url_prefix: "https://api.cloudinary.com/v1_1/tape-inc",
	// 	upload_url_suffix: "/image/upload",
	// // 	// ----------
	// 	resource_url_prefix: "https://res.cloudinary.com/tape-inc",
	// 	resource_url_params_message: "h_2016,w_1512,q_auto:best/" // if it has value must end with /
	// }

	// cloudinary: {
	// 	api_key: "322521584386426",
	// 	api_secret: "OECllD42JYzRD_eMgdFyPN_5rSs",
	// 	cloud: "noavaran",
	// 	upload_url_prefix: "https://api.cloudinary.com/v1_1/",
	// 	upload_url_suffix: "/image/upload",
	// 	// ----------
	// 	resource_url_prefix: "https://res.cloudinary.com",
	// 	resource_url_params_message: "h_2016,w_1512,q_auto:best/" // if it has value must end with /
	// }
    cloudinary: {
        api_key: "248553457246534",
        api_secret: "2Zr5Cy9LlMM7_UfZTju3yfj9gRc",
        cloud: "hacpzsvp6",
        upload_url_prefix: "https://api.cloudinary.com/v1_1/hacpzsvp6",
        upload_url_suffix: "/image/upload",
        // 	// ----------
        resource_url_prefix: "https://res.cloudinary.com/hacpzsvp6",
        resource_url_params_message: "h_2016,w_1512,q_auto:best/" // if it has value must end with /
    }
};

export { CONFIG };
