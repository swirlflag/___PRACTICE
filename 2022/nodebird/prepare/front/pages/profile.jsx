import Head from 'next/head';
import AppLayout from '../components/AppLayout.jsx';

import NicknameEditForm from '../components/NicknameEditForm.jsx';
import FollowList from '../components/FollowList.jsx';

const Profile = () => {

    const followerList = [
        {
            nickname:'hello',
        },
        {
            nickname:'hello2',
        },
        {
            nickname:'hello2',
        },
    ];
    const followingList = [
        {
            nickname:'hello',
        },
    ];
    return (
        <>
            <Head>
                <title>내 프로필 | nordbird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm/>
                <FollowList header="팔로잉 목록" data={followingList}/>
                <FollowList header="팔로워 목록" data={followerList}/>
            </AppLayout>
        </>
    )
};

export default Profile;
