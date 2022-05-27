import React, { useCallback, useState ,useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Card, Popover, Button, Avatar, List ,Comment} from "antd";
import {
	RetweetOutlined,
	HeartOutlined,
	MessageOutlined,
	EllipsisOutlined,
	HeartTwoTone,
} from "@ant-design/icons";

import PostImages from "./PostImages";
import CommentForm from './CommentForm';
import PostCardContent from "./PostCardContent";

const PostCard = (props) => {
	const { post } = props;
	const [liked, setLiked] = useState(false);
	const [commentFormOpened, setCommentFormOpened] = useState(false);
	const user = useSelector((state) => state.user);
	const id = useMemo(() => user?.me.id, [user]);

	const onToggleLiked = useCallback(() => {
		setLiked((prev) => !prev);
	}, []);

	const onToggleComment = useCallback(() => {
		setCommentFormOpened((prev) => !prev);
	}, []);

	return (
        <>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked ? (
                        <HeartTwoTone twoToneColor="red" onClick={onToggleLiked} />
                    ) : (
                        <HeartOutlined key="heart" onClick={onToggleLiked} />
                    ),
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover
                        key="more"
                        content={
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger">삭제</Button>
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
            >
                {/* <Image></Image> */}
                {/* <Content></Content> */}
                {/* <Buttons></Buttons> */}
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content}/>}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post}/>
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <Comment
                                author={item.User.nickname}
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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
		id: PropTypes.number,
		User: PropTypes.object,
		content: PropTypes.string,
		createdAt: PropTypes.object,
		Comments: PropTypes.arrayOf(PropTypes.object),
		imagePaths: PropTypes.arrayOf(PropTypes.object),
		postAdded: PropTypes.bool,
	}).isRequired,
};

export default PostCard;
