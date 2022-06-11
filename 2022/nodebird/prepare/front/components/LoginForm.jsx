import PropTypes from "prop-types";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import wrapper from "../store/configureStore";
import Link from "next/link";
import { Form, Input, Button } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { useInput, useDidUpdateEffect } from '/hooks';

import { loginAction , loginSuccessAction} from "/reducers/user";

const FormButtons = styled.div`
	margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginForm = (props) => {
    const dispatch = useDispatch();

    const { isLoginLoading , isLoginError } = useSelector((state) => state.user);

    useDidUpdateEffect(() => {
        if(isLoginError) {
            alert(isLoginError);
        }
    },[isLoginError]);

	const [email, onChangeEmail] = useInput("swirlflag@gmail.com");
    const [password, onChangePassword] = useInput("1");

	const onSubmitForm = useCallback(() => {
        dispatch(loginAction(email,password));
    },[email, password]);

	return (
		<FormWrapper onFinish={onSubmitForm}>
			<div>
				<label htmlFor="user-email">이메일</label>
				<br />
				<Input
					name="user-email"
					type="text"
					value={email}
					onChange={onChangeEmail}
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
				<Button type="primary" htmlType="submit" loading={isLoginLoading}>
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

export const getServerSideProps = wrapper.getServerSideProps((context) => async (c) => {
console.log(1)
    // console.log(Object.keys(c));
    // context.dispatch(loadPostsAction());
    // context.dispatch(END);
    // await context.sagaTask.toPromise();
});

LoginForm.propTypes = {
	// setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
