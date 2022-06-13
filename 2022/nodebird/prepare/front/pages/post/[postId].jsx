import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AppLayout from "../../components/AppLayout";
import { globalGetServerSideProps } from "../../store/configureStore";
import { loadPostAction } from "../../reducers/post";
import { useDispatch, useSelector } from "react-redux"; 
import PostCard from "../../components/PostCard";

const Post = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { singlePost: post } = useSelector((state) => state.post);
    const { postId } = router.query;
    // useEffect(() => {
    //     dispatch(loadPostAction(1));
    // },[]);

    return (
        <AppLayout>
            <Head>
                {
                    post.id && (<>
                        <title>{`${post.User.nickname}님의 포스트` }</title>
                        <meta name="description" content={post.content}/>
                        <meta property="og.title" content={`${post.User.nickname}님의 포스트 입니다.`}/>
                        <meta property="og.description" content={post.content} />
                        <meta property="og.image" content={post.Images.length && post.Images[0]} />
                        <meta property="og.url" content={`https://nodebird.com/post/${post.id}`} />
                    </>)
                }
                {
                    !post.id && (<>
                        <title>존재하지 않는 포스트</title>
                        <meta name="description" content="포스트 내용 없음"/>
                        <meta property="og.title" content="존재하지 않는 포스트 입니다."/>
                        <meta property="og.description" content="포스트 내용 없음" />
                        {/* <meta property="og.image" content={post.Images.length && post.Image[0]} /> */}
                        <meta property="og.url" content="https://nodebird.com/post/err404" />
                    </>)
                }
            </Head>
            {
                post.id ? (<PostCard post={post}/>) : <div>포스트가 존재하지 않습니다.</div>
            }
        </AppLayout>
    )
};

export const getServerSideProps = globalGetServerSideProps((store, context ) => {
    const { postId } = context.params;
    store.dispatch(loadPostAction(postId));
});

export default Post;