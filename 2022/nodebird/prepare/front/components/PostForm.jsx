import React, { useCallback, useState, useRef, useEffect } from "react";
import { useInput } from '../hooks';
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useDidUpdateEffect } from "../hooks";
import { addPostAction, uploadImage, removeImage } from "../reducers/post";
import { CommentForm } from './CommentForm';

const PostForm = (props) => {
    const dispatch = useDispatch();

	const [text, onChangeText, setText] = useInput("");
	const { imagePaths, isAddPostLoading, isAddPostDone, } = useSelector((state) => state.post);
    const $imageInput = useRef(null);

    const onClickImageUpload = useCallback((event) => {
        $imageInput.current.click();
    },[$imageInput.current]);

    const onSubmit = useCallback(() => {
        const formData = new FormData();
        imagePaths.forEach((v) => {
            formData.append("image" , v);
        });
        formData.append("content" , text);
        console.log(formData);
		dispatch(addPostAction(formData));
	}, [text,imagePaths]);

    const onChangeImage = useCallback((e) => {
        const formData = new FormData();

        [...e.target.files].forEach((file) => {
            const encodeName = encodeURI(encodeURIComponent(file.name));
            formData.append("image" , file);
        });

        dispatch(uploadImage(formData));
    },[]);

    const onRemoveImage = useCallback((index) => () => {
        dispatch(removeImage(index));
    },[]);

    useEffect(() => {
        if(isAddPostDone) {
            setText("");
        }
    }, [isAddPostDone]);

	return (
		<Form
			style={{ margin: "10px 0 20px" }}
			encType="multipart/form-data"
            acceptCharset="UTF-8"
			onFinish={onSubmit}
		>
			<Input.TextArea
				value={text}
				onChange={onChangeText}
				maxLength={140}
				placeholder="어떤 신기한 일이 있었나요?"
			/>
			<div>
				<input type="file" multiple hidden ref={$imageInput} onChange={onChangeImage}/>
				<Button onClick={onClickImageUpload}>이미지 업로드</Button>
				<Button
					type="primary"
					style={{ float: "right" }}
					htmlType="submit"
                    loading={isAddPostLoading}
                    disabled={!text}
				>
					트윗!
				</Button>
			</div>
			<div>
				{imagePaths.map((value,index) => (
                    <div key={value} style={{ display: "inline-block" }}>
						<img src={`http://localhost:3065/${value}`} style={{ width: "200px" }} alt="" />
                        <div>
                            <Button onClick={onRemoveImage(index)}>제거</Button>
                        </div>
                    </div>
				))}
			</div>
		</Form>
	);
};

export default PostForm;
