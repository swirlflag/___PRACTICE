import React, { useCallback } from "react";
import Link from "next/link";
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
					<Link href={`/user/${me.id}`}>
						<a>
                            트윗
                            <br />
                            {me.Posts.length}
                        </a>
					</Link>
				</div>,
				<div key="followings">
					<Link href="/profile">
						<a>
							팔로잉
							<br />
							{me.Followings.length}
						</a>
					</Link>
					<br />
				</div>,
				<div key="followers">
					<Link href="/profile">
						<a>
                            팔로워
                            <br />
                            {me.Followers.length}
                        </a>
					</Link>
				</div>,
			]}
		>
			<Card.Meta
				avatar={<Avatar>{me.nickname || me.id}</Avatar>}
				title={me.nickname || me.id}
			/>
			<Button onClick={onLogout} loading={isLogoutLoading}>
				로그아웃
			</Button>
		</Card>
	);
};

UserProfile.propTypes = {
	// setIsLoggedIn: PropTypes.func.isRequired,
};

export default UserProfile;
