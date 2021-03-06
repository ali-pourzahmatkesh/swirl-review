import { SHOW_TOAST, HIDE_TOAST } from "./";

const toast = (state = { hasError: false, errorMessage: "" }, action) => {
	switch (action.type) {
		case SHOW_TOAST: {
			return {
				...state,
				hasError: action.payload.hasError,
				errorMessage: action.payload.errorMessage,
				messageData: action.payload.messageData
			};
		}
		case HIDE_TOAST: {
			return { ...state, hasError: false, errorMessage: "", messageData: null };
		}
		default: {
			return { ...state };
		}
	}
};

export default toast;
