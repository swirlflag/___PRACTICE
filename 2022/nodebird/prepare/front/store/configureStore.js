import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';

import reducer from "../reducers";
import rootSaga from '../sagas';

const loggerMiddleware = ({dispatch , getState}) => (next) => (action) => {
    // console.log(action);
    return next(action);
};

const isProduction = process.env.NODE_ENV === "production";

const configureStoreAction = () => {
    const sagaMiddleware = createSagaMiddleware();
	const middlewares = [loggerMiddleware,sagaMiddleware];
	const enhancer = isProduction
		? compose(applyMiddleware(...middlewares))
		: composeWithDevTools(applyMiddleware(...middlewares));
	const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

const wrapper = createWrapper(configureStoreAction, {
	// debug: process.env.NODE_ENV === "development",
    debug: false,
});

export default wrapper;
