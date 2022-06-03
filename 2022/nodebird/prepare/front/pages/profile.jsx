import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from "next/link";
import Router from "next/router";
import { useSelector } from 'react-redux';
import { useDidUpdateEffect } from '../hooks';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {

    const { me, isLogin } =  useSelector((state) => state.user);

    useDidUpdateEffect(() => {
        if(!isLogin) {
            Router.push('/');
        }
    },[isLogin]);

    return (
        <>
            <Head>
                <title>내 프로필 | nordbird</title>
            </Head>
            <AppLayout>
            {
                isLogin ?
                (
                <>
                    <NicknameEditForm/>
                    <FollowList header="팔로잉 목록" data={me.Followers}/>
                    <FollowList header="팔로워 목록" data={me.Followings}/>
                </>
                ):
                (
                    <div>
                        [로그인이 필요합니다.]
                        <br /><br />
                        <Link href="/"><a>홈으로</a></Link>
                    </div>
                )
            }
            </AppLayout>
        </>
    )
};

export default Profile;
