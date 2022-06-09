import React, { useCallback, useState, useRef, useEffect } from "react";
import { useInput } from '../hooks';
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useDidUpdateEffect } from "../hooks";
import { addPostAction, uploadImage } from "../reducers/post";
import { CommentForm } from './CommentForm';

const PostForm = (props) => {
    const dispatch = useDispatch();

	const [text, onChangeText, setText] = useInput("");
	const { imagePaths, isAddPostLoading, isAddPostDone, isUploadIamgeDone } = useSelector((state) => state.post);
    const $imageInput = useRef(null);

    const onClickImageUpload = useCallback((event) => {
        $imageInput.current.click();
    },[$imageInput.current]);

    const onSubmit = useCallback(() => {
		dispatch(addPostAction(text));
	}, [text]);

    const onChangeImage = useCallback((e) => {
        const formData = new FormData();

        [...e.target.files].forEach((file) => {
            const encodeName = encodeURI(encodeURIComponent(file.name));
            formData.append("image" , file);
        });
        console.log(formData);

        dispatch(uploadImage(formData));
    },[]);

    useEffect(() => {
        if(isAddPostDone) {
            setText("");
        }
    }, [isAddPostDone]);

    useDidUpdateEffect(() => {
        if(isUploadIamgeDone) {
            setImagePaths([]);
        }
    },[isUploadIamgeDone]);

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
				{imagePaths.map((value) => (
                    <div key={value} style={{ display: "inline-block" }}>
						<img src={`http://localhost:3065/${value}`} style={{ width: "200px" }} alt="" />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
				))}
			</div>
		</Form>
	);
};

export default PostForm;
