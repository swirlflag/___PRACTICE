import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "/store/configureStore";
import "antd/dist/antd.css";

const App = (props) => {
	const { Component } = props;

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
