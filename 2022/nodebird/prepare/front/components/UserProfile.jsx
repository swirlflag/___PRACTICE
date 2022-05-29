import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Card, Avatar, Button } from "antd";

import { logoutAction } from "/reducers/user";

const UserProfile = (props) => {
	const dispatch = useDispatch();

    const { me, isLogoutLoading } = useSelector((state) => state.user);

	const onLogout = useCallback(() => {
		dispatch(logoutAction());
	}, []);

	return (
		<Card
			actions={[
				<div key="twit">
					짹쨱
					<br />0
				</div>,
				<div key="followings">
					팔로잉
					<br />0
				</div>,
				<div key="followers">
					팔로워
					<br />0
				</div>,
			]}
		>
			<Card.Meta
				avatar={<Avatar>{me.nickname || me.id}</Avatar>}
				title={me.nickname || me.id}
			/>
			<Button onClick={onLogout} loading={isLogoutLoading}>로그아웃</Button>
		</Card>
	);
};

UserProfile.propTypes = {
	// setIsLoggedIn: PropTypes.func.isRequired,
};

export default UserProfile;
