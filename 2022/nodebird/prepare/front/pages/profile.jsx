import Head from 'next/head';
import AppLayout from '../components/AppLayout.jsx';

import NicknameEditForm from '../components/NicknameEditForm.jsx';
import FollowList from '../components/FollowList.jsx';
import { useSelector } from 'react-redux';

const Profile = () => {

    const { me, isLogin } =  useSelector((state) => state.user);

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
                    </div>
                )
            }
            </AppLayout>
        </>
    )
};

export default Profile;
