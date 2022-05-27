import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, Button } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { requestChangeNickname } from "/reducers/user";

const StyledForm = styled(Form)`
	margin-bottom: 20px;
	border: 1px solid #d9d9d9;
	padding: 20px;
`;

const NicknameEditForm = () => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);

	const [wantNickname, setWantNickname] = useState(user.me.nickname);

	useEffect(() => {
		setWantNickname(user.me.nickname);
	}, [user.me.nickname]);

	const onChangeInput = (event) => {
		setWantNickname(event.target.value);
	};

	const onClickButton = useCallback(() => {
		if (user.me === wantNickname) {
			return;
		}
		dispatch(requestChangeNickname(wantNickname));
	}, [wantNickname]);

	return (
		<StyledForm>
			<Input.Search
				addonBefore="닉네임"
				enterButton="수정"
				onSearch={onClickButton}
				value={wantNickname}
				onChange={onChangeInput}
			/>
		</StyledForm>
	);
};

export default NicknameEditForm;
