import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import { install } from "redux-loop";
import logger from 'redux-logger';

const middleware = compose(
	applyMiddleware(logger),
	install()
);

let store = createStore(reducers, /*{},*/ middleware);

export default store;