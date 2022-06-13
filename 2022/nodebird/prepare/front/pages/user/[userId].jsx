import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import { globalGetServerSideProps } from "../../store/configureStore";
import { loadUserPostsAction } from "../../reducers/post";
import { loadUserAction } from "../../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/PostCard";

const world = {
    isLoadPostsLoading : false,
    isNoMorePost : false,
};

const User = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { userId } = router.query;

    const { mainPosts, isLoadPostsLoading, isNoMorePost } = useSelector((state) => (state.post));
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        world.isLoadPostsLoading = isLoadPostsLoading;
        world.isNoMorePost = isNoMorePost;
    }, [isLoadPostsLoading,isNoMorePost]);

    useEffect(() => {
        const scrollEndDistance = 400;
        const onScroll = () => {
            if(world.isLoadPostsLoading || world.isNoMorePost) {
                return;
            }
            const { scrollY } = window;
            const { scrollHeight , clientHeight } = document.scrollingElement;
            const isScrollNeedMorePost = scrollY >= scrollHeight - clientHeight - scrollEndDistance;
            const lastId = mainPosts.length ? mainPosts[mainPosts.length - 1].id : 0;
            if(isScrollNeedMorePost) {
                dispatch(loadUserPostsAction(userId, lastId));
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    },[mainPosts]);

    return (
        <AppLayout>
            <Head>

            </Head>
            <div>
                {userInfo.nickname} 님의 포스트
                <br />
            </div>
            {
                mainPosts.length ? (
                    <>
                        {
                            mainPosts.map((post,idx) => (
                                <PostCard key={'' + post.id + idx} post={post}/>
                            ))
                        }
                        {
                            isNoMorePost && <div>더 이상 포스트가 없습니다</div>
                        }
                    </>
                ) :
                <div>유저의 포스트가 존재하지 않습니다.</div>
            }
        </AppLayout>
    )
};

export const getServerSideProps = globalGetServerSideProps((store, context ) => {
    const { userId } = context.params;
    store.dispatch(loadUserPostsAction(userId));
    store.dispatch(loadUserAction(userId));
});

export default User;