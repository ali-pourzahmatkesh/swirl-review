const CONFIG = {
	//serverUrl: "http://159.65.99.108:7000",
	//serverUrl: "http://192.168.1.100:7000",
	serverUrl: "http://192.168.1.103:5000",
	// serverUrl: "https://tape-api.herokuapp.com/",
	oneSignalAppId: "611ce4fc-3c05-4484-b409-3d70bb387706",
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

		//currently red
		appColor: "#01c7fe",
		//currently yellow
		highlightColor: "#f0f0f0",
		//currently grey
		borderColor: "#ddd",
		//currently white
		bodyColor: "#fff",
		//currently yellow
		highlightColorTwo: "#ff4674",
		//currently white
		formInputUnderline: "#fff",
		selectedBoxBorder: "#ff345e"
	},
	chat: {
		receiveMessageLimit: 8
	},
	cloudinary: {
		api_key: "322521584386426",
		api_secret: "OECllD42JYzRD_eMgdFyPN_5rSs",
		cloud: "noavaran",
		upload_url_prefix: "https://api.cloudinary.com/v1_1/",
		upload_url_suffix: "/image/upload"
	}
};

export { CONFIG };
