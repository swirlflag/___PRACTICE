import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "../reducers";

const isProduction = process.env.NODE_ENV === "production";

const configureStoreAction = () => {
	const middlewares = [];
	const enhancer = isProduction
		? compose(applyMiddleware(...middlewares))
		: composeWithDevTools(applyMiddleware(...middlewares));
	const store = createStore(reducer, enhancer);
	return store;
};

const wrapper = createWrapper(configureStoreAction, {
	debug: process.env.NODE_ENV === "development",
});

export default wrapper;
