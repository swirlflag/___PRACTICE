import PropTypes from "prop-types";
import Head from "next/head";
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

export default App;
