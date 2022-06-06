import React, { useCallback, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from 'next/router';
import styled, { createGlobalStyle } from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";

import { useInput , useDidUpdateEffect } from "../hooks";
import AppLayout from "../components/AppLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../reducers/user";

const ErrorMessage = styled.div`
	color: red;
`;

const Signup = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isSignupLoading, isSignupDone, isSignupError, isLogin } = useSelector((state) => state.user);

    useDidUpdateEffect(() => {
        if(isLogin) {
            router.replace('/');
        }
    }, [isLogin]);

    useDidUpdateEffect(() => {
        console.log(isSignupDone);
        if(isSignupDone) {
            alert('front ok: 회원가입 완료! 로그인 해주세요');
            router.push('/');
        }
    },[isSignupDone]);

    useDidUpdateEffect(() => {
        if(isSignupError) {
            alert(isSignupError);
        }
    }, [ isSignupError]);

	const [email, onChangeEmail] = useInput("");
	const [nickname, onChangeNickname] = useInput("");

	const [password, onChangePassword] = useInput("");
	const [passwordCheck, onChangePasswordCheck] = useInput("");
	const [passwordError, setPasswordError] = useState(false);

	useEffect(() => {
		setPasswordError(false);
	}, [password, passwordCheck]);

	const [term, setTerm] = useState(false);
	const [termError, setTermError] = useState(false);
	const onChangeTerm = useCallback((event) => {
		setTerm(event.target.checked);
		setTermError(false);
	}, []);

    const onSubmit = useCallback(() => {
		if (password !== passwordCheck) {
			return setPasswordError(true);
		}
		if (!term) {
			return setTermError(true);
		}
        dispatch(signupAction(email,password, nickname));
	}, [email, nickname, password, passwordCheck, term]);

	return (
		<>
			<Head>
				<title>회원가입 | nordbird</title>
			</Head>
			<AppLayout>
				<Form onFinish={onSubmit}>
					<div>
						<label htmlFor="user-email">이메일</label>
						<Input
							name="user-email"
							value={email}
							required
							onChange={onChangeEmail}
                            // type="email"
						/>
					</div>

                    <div>
						<label htmlFor="user-nickname">닉네임</label>
						<Input
							name="user-nickname"
							value={nickname}
							required
							onChange={onChangeNickname}
						/>
					</div>

					<div>
						<label htmlFor="user-password">비밀번호</label>
						<Input
							name="user-password"
							value={password}
							required
							onChange={onChangePassword}
						/>
					</div>

					<div>
						<label htmlFor="user-password-check">
							비밀번호 확인
						</label>
						<Input
							name="user-password-check"
							value={passwordCheck}
							required
							onChange={onChangePasswordCheck}
						/>
						{passwordError && (
							<ErrorMessage>
								비밀번호가 일치하지 않습니다.
							</ErrorMessage>
						)}
					</div>

					<div>
						<Checkbox
							name="user-term"
							checked={term}
							onChange={onChangeTerm}
						>
							약관에 동의합니다.
						</Checkbox>
						{termError && (
							<ErrorMessage>
								약관에 동의하셔야 합니다.
							</ErrorMessage>
						)}
					</div>
					<div style={{ marginTop: 10 }}>
						<Button type="primary" htmlType="submit" loading={isSignupLoading}>
							가입하기
						</Button>
 					</div>
				</Form>
			</AppLayout>
		</>
	);
};

export default Signup;
