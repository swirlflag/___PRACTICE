import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import wrapper, { globalGetServerSideProps } from '../store/configureStore';
import { loadUserAction } from "../reducers/user";

const About = () => {
    const { me , isLogin} = useSelector((state) => state.user);
    console.log(me);
    return (
        <AppLayout>
            {
                isLogin ?
                (
                    <Card
                        actions={[
                            (<div key="twit">쨱쨱<br/>{me.Posts.length}</div>),
                            (<div key="followings">팔로잉<br/>{me.Followings.length}</div>),
                            (<div key="followers">팔로워<br/>{me.Followers.length}</div>),
                        ]}
                    >
                        <Card.Meta
                            avatar={(<Avatar>{me.nickname[0]}</Avatar>)}
                            title={me.nickname}
                            description={me.nickname}
                        />
                    </Card>
                )
                :

                (<div>로그인 하셈</div>)
            }
        </AppLayout>
    )
};

export const getServerSideProps = globalGetServerSideProps();

export default About;