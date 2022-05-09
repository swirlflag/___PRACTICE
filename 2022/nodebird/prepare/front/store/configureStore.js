import { createWrapper } from "next-redux-wrapper";
import { createStore } from 'redux';
// import { composeWithDevTools } from "@redux-devtools/extension";

import reducer from '../reducers';

const isProduction = process.env.NODE_ENV === "production";

const configureStoreAction = () => {
    const store = createStore(reducer);
    return store;
};

const wrapper = createWrapper(configureStoreAction, {
	debug: process.env.NODE_ENV === "development",
});

export default wrapper;
