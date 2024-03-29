import React , { useState , useEffect,} from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import wrapper from "/store/configureStore";
import 'antd/dist/antd.css';
import { useDispatch } from "react-redux";
import { loadMyInfoAction, } from '../reducers/user';
import axios from "axios";

const App = (props) => {
    const dispatch = useDispatch();
	const { Component } = props;
    const [showChild, setShowChild] = useState(false);

    // https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render
    // useEffect(() => {
    //     setShowChild(true);
    //     // dispatch(loadMyInfoAction());
    // }, []);

    // if (!showChild) {
    //     return null;
    // }

    // if (typeof window === 'undefined') {
    //     return <>loading..</>;
    // }

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
                <title>nordbird</title>
			</Head>
			<Component />
		</>
	);
};

App.propTypes = {
	Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);





