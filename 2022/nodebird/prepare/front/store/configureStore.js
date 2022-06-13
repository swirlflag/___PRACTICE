import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import createSagaMiddleware, { END } from 'redux-saga';

import { loadPostsAction } from "../reducers/post";
import { loadMyInfoAction } from "../reducers/user";

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

export const globalGetServerSideProps = (local) => wrapper.getServerSideProps((store) => async (context) => {
    // 브라우저에서는 자동으로 넣어주는 쿠키를 직접 넣어줘야 한다.
    axios.defaults.headers.Cookie = "";
    const cookie = context?.req?.headers.cookie;
    if(cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    store.dispatch(loadMyInfoAction());

    if(local) {
        await local(store, context);
    }

    store.dispatch(END);
    await store.sagaTask.toPromise();
});

export const globalGetStaticProps = (local) => wrapper.getStaticProps((store) => async (context) => {
    if(local) {
        await local(store, context);
    }
});


export default wrapper;
