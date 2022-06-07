import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Card, Popover, Button, Avatar, List, Comment } from "antd";
import {
	RetweetOutlined,
	HeartOutlined,
	MessageOutlined,
	EllipsisOutlined,
	HeartTwoTone,
} from "@ant-design/icons";

import { removePostAction } from '../reducers/post';
import { likePostAction, unlikePostAction } from "../reducers/post.js";

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import FollowButton from './FollowButton';

const PostCard = (props) => {
    const dispatch = useDispatch();
    const { isLogin } = useSelector((state) => state.user);
    const { isRemovePostLoading , isLikeError , isUnlikeError} = useSelector((state) => state.post);
	const user = useSelector((state) => state.user);
	const userId = useMemo(() => user?.me.id, [user]);
	const { post } = props;
    const liked = post.Likers.find((v) => v.id === userId);

	const [commentFormOpened, setCommentFormOpened] = useState(false);

    const onLike = useCallback(() => {
        if(!isLogin) {
            alert('front error: 로그인이 필요합니다.');
            return;
        }
        dispatch(likePostAction(post.id));
    },[isLogin]);

    const onUnlike = useCallback(() => {
        dispatch(unlikePostAction(post.id));
    },[]);

	const onToggleComment = useCallback(() => {
		setCommentFormOpened((prev) => !prev);
	}, []);

    const onRemovePost = useCallback(() => {
        dispatch(removePostAction(post.id));
    }, []);

	return (
		<>
			<Card
                style={{marginTop: 20}}
				cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined key="retweet" />,
					liked ? (
						<HeartTwoTone
							twoToneColor="red"
							onClick={onUnlike}
						/>
					) : (
						<HeartOutlined key="heart" onClick={onLike} />
					),
					<MessageOutlined key="comment" onClick={onToggleComment} />,
					<Popover
						key="more"
						content={
							<Button.Group>
								{userId && post.User.id === userId ? (
									<>
										<Button>수정</Button>
										<Button type="danger" onClick={onRemovePost} loading={isRemovePostLoading}>삭제</Button>
									</>
								) : (
									<Button>신고</Button>
								)}
							</Button.Group>
						}
					>
						<EllipsisOutlined />
					</Popover>,
				]}
                extra={isLogin && <FollowButton post={post}/>}
			>
				{/* <Image></Image> */}
				{/* <Content></Content> */}
				{/* <Buttons></Buttons> */}
				<Card.Meta
					avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
					title={post.User.nickname}
					description={<PostCardContent postData={post.content} />}
				/>
			</Card>
			{commentFormOpened && (
				<div>
					{isLogin ? <CommentForm post={post} /> : <div>로그인 하시면 댓글을 다실수 있습니다</div>}
					<List
						header={`${post.Comments.length}개의 댓글`}
						itemLayout="horizontal"
						dataSource={post.Comments}
						renderItem={(item) => (
							<Comment
								author={item.User.nickname}
								avatar={
									<Avatar>{item.User.nickname[0]}</Avatar>
								}
								content={item.content}
							/>
						)}
					/>
				</div>
			)}
		</>
	);
}

PostCard.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.string,
		Comments: PropTypes.arrayOf(PropTypes.object),
		imagePaths: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
        Likers: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
};

export default PostCard;
