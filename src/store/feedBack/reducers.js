import {
	CALL_SEND_FEED_BACK,
	SEND_FEED_BACK_SUCCESS,
	SEND_FEED_BACK_FAILED,
	fetchSendFeedBack,
	fetchSendFeedBackSuccess,
	fetchSendFeedBackFailed
} from "./";
import { loop, Cmd } from "redux-loop";
import { showToast } from "../toast";

const feedBack = (
	state = { hasError: false, errorMessage: "", loading: false },
	action
) => {
	switch (action.type) {
		case CALL_SEND_FEED_BACK: {
			return loop(
				{ ...state, hasError: false, errorMessage: "", loading: true },
				Cmd.run(fetchSendFeedBack, {
					successActionCreator: fetchSendFeedBackSuccess,
					failActionCreator: fetchSendFeedBackFailed,
					args: [action.payload]
				})
			);
		}
		case SEND_FEED_BACK_SUCCESS: {
			action.payload.goBack();
			return { ...state, hasError: false, errorMessage: "", loading: false };
		}
		case SEND_FEED_BACK_FAILED: {
			return loop(
				{
					...state,
					errorMessage: action.payload.message,
					hasError: true,
					loading: false
				},
				Cmd.action(showToast(true, action.payload.message))
			);
		}
		default: {
			return { ...state };
		}
	}
};

export default feedBack;
