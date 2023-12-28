"use client";

import { store } from "./store.ts";
import { Provider } from "react-redux";

const ReduxProvider = (props) => {
	const { children } = props;
	return <Provider store={store}>{children}</Provider>;
};
export default ReduxProvider;
