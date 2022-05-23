import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Form, Input , Button} from "antd";
import PropTypes from 'prop-types';

import { useInput } from "/hooks";

const CommentForm = (props) => {
	const { post } = props;

    const user = useSelector((state) => (state.user));

	const [commentText, onChangeCommentText] = useInput("");

	const onSubmitComment = useCallback(() => {
		console.log(post.id,commentText);

        console.log(user.isLoggedIn);
	}, [commentText]);

	return (
		<Form onFinish={onSubmitComment}>
			<Input.TextArea
				value={commentText}
				onChange={onChangeCommentText}
				rows={4}
			/>
            <Button
                type="primary"
                htmlType="submit"
            >
                tweet!
            </Button>
		</Form>
	);
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm;
