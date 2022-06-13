import React  , { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { Menu, Input, Row, Col } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { useInput } from "../hooks";

import UserProfile from "/components/UserProfile";
import LoginForm from "/components/LoginForm";
import { logoutAction } from "/reducers/user";

const GlobalStyle = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }
    .ant-col:first-child {
        padding-left: 0 !important;
    }
    .ant-col:last-child {
        padding-right: 0 !important;
    }
`;

const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`;

const Mymenu = () => {
    const router = useRouter();

	const [searchValue, onChangeSearchValue] = useInput("1");

	const onSearch = useCallback(() => {
        router.push(`/hashtag/${searchValue}`);
    },[searchValue]);

	const style = {
		position: "sticky",
		top: 0,
		zIndex: 2,
	};

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
			label: (
				<SearchInput
					enterButton
					onSearch={onSearch}
					onChange={onChangeSearchValue}
					value={searchValue}
				/>
			),
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

	return <Menu {...options} style={style} />;
};

const AppLayout = (props) => {
	const { children } = props;

	const { isLogin } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	return (
		<>
			<GlobalStyle />
			<Mymenu />
			<Row gutter={[8]}>
				<Col xs={24} md={6}>
					<div style={{ position: "sticky", top: "46px" }}>
						{isLogin ? <UserProfile /> : <LoginForm />}
					</div>
				</Col>
				<Col xs={24} md={12}>
					{children}
				</Col>
				<Col xs={24} md={6}>
					오른쪽 메뉴
				</Col>
			</Row>
		</>
	);
};

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppLayout;
