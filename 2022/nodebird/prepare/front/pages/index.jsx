import React, { useCallback, useEffect } from 'react';
// import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { loadPostsAction } from '../reducers/post';
import AppLayout from "../components/AppLayout";

import PostForm  from "../components/PostForm";
import PostCard from "../components/PostCard";

const world = {
    isLoadPostLoading : false,
    isNoMorePost : false,
};

const Home = () => {
    const dispatch = useDispatch();
	const { isLogin } = useSelector((state) => (state.user));
    const { mainPosts, isLoadPostLoading, isNoMorePost } = useSelector((state) => (state.post));

    useEffect(() => {
        dispatch(loadPostsAction(10));
    },[]);

    useEffect(() => {
        world.isLoadPostLoading = isLoadPostLoading;
        world.isNoMorePost = isNoMorePost;
    }, [isLoadPostLoading,isNoMorePost]);

    useEffect(() => {
        const scrollEndDistance = 400;
        const onScroll = () => {
            if(world.isLoadPostLoading || world.isNoMorePost) {
                return;
            }
            const { scrollY } = window;
            const { scrollHeight , clientHeight } = document.scrollingElement;
            const isScrollNeedMorePost = scrollY >= scrollHeight - clientHeight - scrollEndDistance;

            if(isScrollNeedMorePost) {
                dispatch(loadPostsAction(10));
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    },[]);

	return (
		<AppLayout>
            {
                isLogin ? <PostForm /> : <div>로그인하시면 PostForm을 볼수 있습니다</div>
            }
            {
                (!isLoadPostLoading && !mainPosts.length) && <div>* 포스트가 없습니다.</div>
            }
            {
                mainPosts.map((post,idx) => (
                    <PostCard key={'' + post.id + idx} post={post}/>
                ))
            }
            {
                isLoadPostLoading && <div>* 포스트 로딩중...</div>
            }
            {
                isNoMorePost && <div>더이상 포스트가 없습니다.</div>
            }
            <div>전체 포스트 수 : {mainPosts.length}</div>
		</AppLayout>
	);
};

export default Home;
