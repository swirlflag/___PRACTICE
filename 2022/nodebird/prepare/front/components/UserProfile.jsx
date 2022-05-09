import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Card, Avatar, Button } from "antd";

import { logoutAction } from "../reducers";

const UserProfile = (props) => {
    const dispatch = useDispatch();

	const onLogOut = useCallback(() => {
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
			<Card.Meta avatar={<Avatar>swirlflag</Avatar>} title="swirlflag" />
			<Button onClick={onLogOut}>로그아웃</Button>
		</Card>
	);
};

UserProfile.propTypes = {
	// setIsLoggedIn: PropTypes.func.isRequired,
};

export default UserProfile;
