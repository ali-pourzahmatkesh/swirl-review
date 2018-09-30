export const SHOW_TOAST = "APP_SHOW_TOAST",
	HIDE_TOAST = "APP_HIDE_TOAST";

export const showToast = (hasError, errorMessage) => {
	return {
		type: SHOW_TOAST,
		payload: {
			hasError,
			errorMessage
		}
	};
};

export const hideToast = () => {
	return {
		type: HIDE_TOAST
	};
};
