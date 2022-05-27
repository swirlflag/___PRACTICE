import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
import { useDispatch } from 'react-redux';
import Link from "next/link";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useInput } from '/hooks';

import { loginRequestAction } from "/reducers/user";

const FormButtons = styled.div`
	margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginForm = (props) => {
    const dispatch = useDispatch();

	const [id, onChangeId] = useInput("");
    const [password, onChangePassword] = useInput("");

	const onSubmitForm = useCallback((event) => {
        dispatch(loginRequestAction(id,password));
    },[id, password]);

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="user-id">아이디</label>
				<br />
				<Input
					name="user-id"
					type="text"
					value={id}
					onChange={onChangeId}
					required
				/>
			</div>
			<div>
				<label htmlFor="user-password">비밀번호</label>
				<Input
					name="user-password"
					type="password"
					value={password}
					onChange={onChangePassword}
					required
				/>
			</div>
			<FormButtons>
				<Button type="primary" htmlType="submit" loading={false}>
					로그인
				</Button>
				<Link href="/signup">
					<a>
						<Button>회원가입</Button>
					</a>
				</Link>
			</FormButtons>
		</FormWrapper>
	);
};

LoginForm.propTypes = {
	// setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
