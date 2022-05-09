import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import {
	MailOutlined,
	AppstoreOutlined,
	SettingOutlined,
} from "@ant-design/icons";

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`;

const Mymenu = () => {
	const onSearch = (e) => {};

	const items = [
		{
			label: (
				<Link href="/">
					<a>홈</a>
				</Link>
			),
			icon: <AppstoreOutlined />,
		},
		{
			label: (
				<Link href="/profile">
					<a>프로필</a>
				</Link>
			),
		},
		{
			label: <SearchInput enterButton onSearch={onSearch} />,
		},
		{
			label: (
				<Link href="/signup">
					<a>회원가입</a>
				</Link>
			),
		},
	];

	const options = {
		mode: "horizontal",
		// defaultSelectedKeys: ["mail"],
		items,
	};

	return <Menu {...options} />;
};

const AppLayout = (props) => {
	const { children } = props;

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<div>
			<Mymenu />
			<Row gutter={[8]}>
				<Col xs={24} md={6}>
					{isLoggedIn ? (
						<UserProfile setIsLoggedIn={setIsLoggedIn} />
					) : (
						<LoginForm setIsLoggedIn={setIsLoggedIn} />
					)}
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					오른쪽 메뉴
				</Col>
			</Row>
		</div>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppLayout;
