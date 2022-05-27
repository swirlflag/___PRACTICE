import React, { useCallback, useState, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";
import { CommentForm } from './CommentForm';

const PostForm = (props) => {
    const dispatch = useDispatch();

	const [text, setText] = useState("");
	const post = useSelector((state) => state.post);
    const $imageInput = useRef(null);

	const imagePaths = [];

	const onChangeText = useCallback((event) => {
		setText(event.target.value);
	}, []);

    const onClickImageUpload = useCallback((event) => {
        $imageInput.current.click();
    },[$imageInput.current]);

    const onSubmit = useCallback(() => {
		dispatch(addPost);
        setText("");
	}, [text]);

	return (
		<Form
			style={{ margin: "10px 0 20px" }}
			encType="multipart/form-data"
			onFinish={onSubmit}
		>
			<Input.TextArea
				value={text}
				onChange={onChangeText}
				maxLength={140}
				placeholder="어떤 신기한 일이 있었나요?"
			/>
			<div>
				<input type="file" multiple hidden ref={$imageInput}/>
				<Button onClick={onClickImageUpload}>이미지 업로드</Button>
				<Button
					type="primary"
					style={{ float: "right" }}
					htmlType="submit"
				>
					트윗!
				</Button>
			</div>
			<div>
				{imagePaths.map((value) => (
					<div key={value} style={{ display: "inline-block" }}>
						<img src={value} style={{ width: "200px" }} alt="" />
					</div>
				))}
			</div>
		</Form>
	);
};

export default PostForm;