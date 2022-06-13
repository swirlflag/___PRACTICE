import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import wrapper, { globalGetServerSideProps } from "../store/configureStore";
// import Head from "next/head";
import { loadPostsAction } from '../reducers/post';
import AppLayout from "../components/AppLayout";
import PostForm  from "../components/PostForm";
import PostCard from "../components/PostCard";
import axios from "axios";

const world = {
    isLoadPostsLoading : false,
    isNoMorePost : false,
};

const Home = () => {
    const dispatch = useDispatch();
	const { isLogin } = useSelector((state) => (state.user));
    const { mainPosts, isLoadPostsLoading, isNoMorePost, isRetweetError } = useSelector((state) => (state.post));

    useEffect(() => {
        world.isLoadPostsLoading = isLoadPostsLoading;
        world.isNoMorePost = isNoMorePost;
    }, [isLoadPostsLoading,isNoMorePost]);

    useEffect(() => {
        if(isRetweetError) {
            alert(isRetweetError)
        }
    }, [isRetweetError]);

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
                dispatch(loadPostsAction(lastId));
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    },[mainPosts]);

	return (
		<AppLayout>
            {
                isLogin ? <PostForm /> : <div>로그인하시면 PostForm을 볼수 있습니다</div>
            }
            {
                (!isLoadPostsLoading && !mainPosts.length) && <div>* 포스트가 없습니다.</div>
            }
            {
                mainPosts.map((post,idx) => (
                    <PostCard key={'' + post.id + idx} post={post}/>
                ))
            }
            {
                isLoadPostsLoading && <div>* 포스트 로딩중...</div>
            }
            {
                isNoMorePost && <div>더이상 포스트가 없습니다.</div>
            }
            <div>전체 포스트 수 : {mainPosts.length}</div>
		</AppLayout>
	);
};

// SSR next 문법
// export const getServerSideProps = async (context) => {
//     return {
//         props: {  }
//     }
// }
// export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
//     // 브라우저에서는 자동으로 넣어주는 쿠키를 직접 넣어줘야 한다.
//     axios.defaults.headers.Cookie = "";
//     const cookie = context?.req?.headers.cookie;
//     if(cookie) {
//         axios.defaults.headers.Cookie = cookie;
//     }

//     store.dispatch(loadPostsAction());
//     // store.dispatch(loadMyInfoAction());
//     store.dispatch(END);
//     await store.sagaTask.toPromise();
// });

const localServerSideProps = async (store, context) => {
    store.dispatch(loadPostsAction());
}
export const getServerSideProps = globalGetServerSideProps(localServerSideProps);

export default Home;

