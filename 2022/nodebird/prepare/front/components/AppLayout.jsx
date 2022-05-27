import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import { Menu, Input, Row, Col } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

import UserProfile from "/components/UserProfile";
import LoginForm from "/components/LoginForm";
import { logoutAction } from '/reducers/user';

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

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const dispatch = useDispatch();

	return (
		<>
            <GlobalStyle/>
			<Mymenu />
			<Row gutter={[8]}>
				<Col xs={24} md={6}>
					{isLoggedIn ? <UserProfile /> : <LoginForm />}
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
