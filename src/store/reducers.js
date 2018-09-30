import { combineReducers } from "redux-loop";

import appReducer from "./app/reducers";
import toast from "./toast/reducers";
import member from "./member/reducers";
import chat from "./chat/reducers";
import feedback from "./feedBack/reducers";

const appReducers = combineReducers({
	appReducer,
	toast,
	member,
	chat,
	feedback
});

const app = (state, action) => {
	// if (action.type === USER_LOGGED_OUT) {
	//     state = undefined;
	// }
	return appReducers(state, action);
};

const reducers = combineReducers({
	app
});

export default reducers;
