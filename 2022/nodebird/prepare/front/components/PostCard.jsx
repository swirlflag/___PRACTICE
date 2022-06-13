import React, { useCallback, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';

import { Card, Popover, Button, Avatar, List, Comment } from "antd";
import {
	RetweetOutlined,
	HeartOutlined,
	MessageOutlined,
	EllipsisOutlined,
	HeartTwoTone,
} from "@ant-design/icons";

import {
	removePostAction,
	retweetAction,
	likePostAction,
	unlikePostAction,
} from "../reducers/post";

import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import FollowButton from "./FollowButton";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const RetweetCard = (props) => {
	const { post } = props;

	return (
		<Card cover={post.Images[0] && <PostImages images={post.Images} />}>
			<Card.Meta
				avatar={
					<Avatar>
						<Link href={`/user/${post.User.id}`}>
							<a>{post.User.nickname[0]}</a>
						</Link>
					</Avatar>
				}
				title={post.User.nickname}
				description={<PostCardContent postData={post.content} />}
			/>
		</Card>
	);
};

const PostCard = (props) => {
	const dispatch = useDispatch();
	const { isLogin } = useSelector((state) => state.user);
	const { isRemovePostLoading, isLikeError, isUnlikeError, isRetweetError } = useSelector((state) => state.post);
	const user = useSelector((state) => state.user);
	const userId = useMemo(() => user?.me.id, [user]);
	const { post } = props;
	const liked = post.Likers.find((v) => v.id === userId);

	const [commentFormOpened, setCommentFormOpened] = useState(false);

	const onLike = useCallback(() => {
		if (!isLogin) {
			alert("로그인이 필요합니다");
			return;
		}
		dispatch(likePostAction(post.id));
	}, [isLogin]);

	const onUnlike = useCallback(() => {
		if (!isLogin) {
			alert("로그인이 필요합니다");
			return;
		}
		dispatch(unlikePostAction(post.id));
	}, [isLogin]);

	const onToggleComment = useCallback(() => {
		setCommentFormOpened((prev) => !prev);
	}, [isLogin]);

	const onRemovePost = useCallback(() => {
		if (!isLogin) {
			alert("로그인이 필요합니다");
			return;
		}
		dispatch(removePostAction(post.id));
	}, [isLogin]);

	const onRetweet = useCallback(
		(postId) => () => {
			if (!isLogin) {
				alert("로그인이 필요합니다");
				return;
			}
			dispatch(retweetAction(postId));
		},
		[isLogin]
	);

	return (
		<>
			<Card
				style={{ marginTop: 20 }}
				cover={post.Images[0] && <PostImages images={post.Images} />}
				actions={[
					<RetweetOutlined
						key="retweet"
						onClick={onRetweet(post.id)}
					/>,
					liked ? (
						<HeartTwoTone twoToneColor="red" onClick={onUnlike} />
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
										<Button
											type="danger"
											onClick={onRemovePost}
											loading={isRemovePostLoading}
										>
											삭제
										</Button>
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
				extra={
					isLogin &&
					post.User.id !== userId && <FollowButton post={post} />
				}
				title={
					post.RetweetId && `${post.User.nickname}님이 리트윗 하셨습니다.`
				}
			>
				{/* <Image></Image> */}
				{/* <Content></Content> */}
				{/* <Buttons></Buttons> */}
				POST ID: {post.id}

                <div>
                    { dayjs(post.createdAt).format("YYYY.MM.DD") } / 
                    { dayjs(post.createdAt).fromNow() }
                </div>
				{post.RetweetId ? (
					<RetweetCard post={post.Retweet} />
				) : (
					<Card.Meta
						avatar={
							<Avatar>
								<Link href={`/user/${post.User.id}`}>
									<a>{post.User.nickname[0]}</a>
								</Link>
							</Avatar>
						}
						title={post.User.nickname}
						description={
							<PostCardContent postData={post.content} />
						}
					/>
				)}
			</Card>

			{commentFormOpened && (
				<div>
					{isLogin ? (
						<CommentForm post={post} />
					) : (
						<div>로그인 하시면 댓글을 다실수 있습니다</div>
					)}
					<List
						header={`${post.Comments.length}개의 댓글`}
						itemLayout="horizontal"
						dataSource={post.Comments}
						renderItem={(item) => (
							<Comment
								author={item.User.nickname}
								avatar={
									<Avatar>
										<Link href={`/user/${post.User.id}`}>
											<a>{item.User.nickname[0]}</a>
										</Link>
									</Avatar>
								}
								content={item.content}
							/>
						)}
					/>
				</div>
			)}
		</>
	);
};

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
