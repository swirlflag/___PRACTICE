import { Form } from "antd";
import { useCallback } from "react";

const PostForm = () => {
	const onSubmit = useCallback(() => {
		console.log("submit");
	}, []);
	return (
		<Form
			style={{ margin: "10px 0 20px" }}
			encType="multipart/form-data"
			onFinish={onSubmit}
		>
			<div>
                hello post form
            </div>
		</Form>
	);
};

export default PostForm;
