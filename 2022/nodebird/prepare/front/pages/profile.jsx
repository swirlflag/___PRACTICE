import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { useDidUpdateEffect } from "../hooks";
import { globalGetServerSideProps } from "../store/configureStore";
import { loadFollowingsAction, loadFollowersAction } from "../reducers/user";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import axios from "axios";

const fetcher = (url) =>
	axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const { me, isLogin } = useSelector((state) => state.user);

	const [followingsLimit, setFollowingsLimit] = useState(3);
	const [followersLimit, setFollowersLimit] = useState(3);

	const { data: followingsData, error: followingsError } = useSWR(
		`http://localhost:3065/api/user/followings?limit=${followingsLimit}`,
		fetcher
	);
	const { data: followersData, error: followersError } = useSWR(
		`http://localhost:3065/api/user/followers?limit=${followersLimit}`,
		fetcher
	);

	const laodMoreFollowings = useCallback(() => {
		setFollowingsLimit((prev) => prev + 3);
	}, []);

	const laodMoreFollowers = useCallback(() => {
		setFollowersLimit((prev) => prev + 3);
	}, []);

	useEffect(() => {
		if (isLogin) {
			// dispatch(loadFollowingsAction());
			// dispatch(loadFollowersAction());
		}
	}, [isLogin]);

	useDidUpdateEffect(() => {
		if (!isLogin) {
			// router.push('/');
		}
	}, [isLogin]);

	// if(!isLogin) {
	//     return <div>내정보 로딩중?</div>
	// }
	// if(followingsError || followersError) {
	//     // return <div>오류 발생</div>
	// }

	return (
		<>
			<Head>
				<title>내 프로필 | nordbird</title>
			</Head>
			<AppLayout>

				{isLogin ? (
					<>
						<NicknameEditForm />
						{followingsData && (
							<FollowList
								header="팔로잉 목록"
								data={followingsData.list}
								onClickMore={laodMoreFollowings}
								// loading={!followingsError && !followersError}
							/>
						)}
						{followersData && (
							<FollowList
								header="팔로잉 목록"
								data={followersData.list}
								onClickMore={laodMoreFollowers}
								// loading={!followingsError && !followersError}
							/>
						)}
					</>
				) : (
					<div>
						[로그인이 필요합니다.]
						<br />
						<br />
						<Link href="/">
							<a>홈으로</a>
						</Link>
					</div>
				)}
			</AppLayout>
		</>
	);
};

const localServerSideProps = (store, context) => {
	// store.dispatch(loadFollowingsAction());
	// await store.dispatch(loadFollowersAction());
};
export const getServerSideProps =
	globalGetServerSideProps(localServerSideProps);

export default Profile;
