import Head from "next/head";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout.jsx";

import PostForm  from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
	const { isLogin } = useSelector((state) => (state.user));
    const post = useSelector((state) => (state.post));

	return (
		<AppLayout>

            {
                isLogin ? <PostForm /> : <div>로그인하시면 PostForm을 볼수 있습니다</div>
            }
            {
                post.mainPosts.map((post,idx) => {
                    return <PostCard  key={post.id + idx} post={post}/>
                })
            }
		</AppLayout>
	);
};

export default Home;
