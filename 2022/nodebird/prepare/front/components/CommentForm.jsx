import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input , Button} from "antd";
import PropTypes from 'prop-types';

import { useInput } from "../hooks";
import { addCommentAction } from '../reducers/post';

const CommentForm = (props) => {
    const dispatch = useDispatch();

	const { post } = props;

    const { id , email } = useSelector((state) => (state.user?.me));
    const { isAddCommentLoading, isAddCommentDone }= useSelector((state) => (state.post));

	const [commentText, onChangeCommentText, setCommentText] = useInput("");

	const onSubmitComment = useCallback(() => {
        if(!commentText) {
            return;
        }
		dispatch(addCommentAction(commentText, post.id, id));
	}, [commentText]);

    useEffect(() => {
        if(isAddCommentDone) {
            setCommentText("");
        }
    }, [isAddCommentDone]);

	return (
		<Form onFinish={onSubmitComment}>
            {/* ~~~email : {email}
            id: {id} */}
			<Input.TextArea
				value={commentText}
				onChange={onChangeCommentText}
				rows={4}
			/>
            <Button
                type="primary"
                htmlType="submit"
                loading={isAddCommentLoading}
                disabled={!commentText}
            >
                댓글 작성
            </Button>
		</Form>
	);
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm;
