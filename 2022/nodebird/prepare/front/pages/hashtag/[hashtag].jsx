import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import wrapper, { globalGetServerSideProps, globalGetStaticProps } from "../../store/configureStore";
import { loadHashtagPostsAction } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/PostCard";

const world = {
    isLoadPostsLoading : false,
    isNoMorePost : false,
};

const Hashtag = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const { hashtag } = router.query;
    const { mainPosts, isLoadPostsLoading, isNoMorePost } = useSelector((state) => (state.post));

    // useEffect(() => {
    //     dispatch(loadHashtagPostsAction(hashtag));
    // },[]);

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
                dispatch(loadHashtagPostsAction(hashtag, lastId));
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    },[mainPosts]);

    if(router.isFallback) {
        return (<div>로딩중..</div>)
    }

    return (
        <AppLayout>
            <Head>

            </Head>
            <div>
                #{hashtag} 해시태그 포스트
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
                <div>해시태그와 일치하는 포스트가 존재하지 않습니다.</div>
            }
        </AppLayout>
    )
};

// export const getStaticPaths = async () => {
//     return {
//         paths: [
//             { params : {hashtag: "a"} },
//         ],
//         fallback: true,
//     }
// }

// export const getStaticProps = globalGetStaticProps((store, context) => {
//     const { hashtag } = context.params
//     store.dispatch(loadHashtagPostsAction(hashtag));
// });

export const getServerSideProps = globalGetServerSideProps((store, context ) => {
    const { hashtag } = context.params;
    store.dispatch(loadHashtagPostsAction(hashtag));
});

export default Hashtag;