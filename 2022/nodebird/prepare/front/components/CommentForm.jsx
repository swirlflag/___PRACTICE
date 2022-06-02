import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input , Button} from "antd";
import PropTypes from 'prop-types';

import { useInput } from "../hooks";
import { addCommentAction } from '../reducers/post';

const CommentForm = (props) => {
    const dispatch = useDispatch();

	const { post } = props;

    const { email } = useSelector((state) => (state.user?.me));
    const { isAddCommentDone }= useSelector((state) => (state.post));

	const [commentText, onChangeCommentText, setCommentText] = useInput("");

	const onSubmitComment = useCallback(() => {
		dispatch(addCommentAction(commentText, post.id, id));
	}, [commentText]);

    useEffect(() => {
        if(isAddCommentDone) {
            setCommentText("");
        }
    }, [isAddCommentDone]);

	return (
		<Form onFinish={onSubmitComment}>
            ~~~email : {email}
			<Input.TextArea
				value={commentText}
				onChange={onChangeCommentText}
				rows={4}
			/>
            <Button
                type="primary"
                htmlType="submit"
            >
                tweet!11
            </Button>
		</Form>
	);
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm;
