import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import { install } from "redux-loop";

const middleware = compose(
	applyMiddleware(),
	install()
);

let store = createStore(reducers, /*{},*/ middleware);

export default store;
