import Head from "next/head";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout.jsx";

import PostForm  from "../components/PostForm";
import PostCard from "../components/PostCard";


const Home = () => {
	const user = useSelector((state) => (state.user));
    const post = useSelector((state) => (state.post));
	const { isLoggedIn } = user;
    const { mainPosts } = post;

	return (
		<AppLayout>

            {
                isLoggedIn ? <PostForm /> : <div>로그인하시면 PostForm을 볼수 있습니다</div>
            }
            {
                mainPosts.map((post) => {
                    return <PostCard  key={post.id} post={post}/>
                })
            }
		</AppLayout>
	);
};

export default Home;
