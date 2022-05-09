import React, { useCallback, useState, useEffect } from "react";
import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";

import { useInput } from "../hooks";
import AppLayout from "../components/AppLayout.jsx";

const ErrorMessage = styled.div`
	color: red;
`;

const Signup = () => {
	const [id, onChangeId] = useInput("");
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
	}, [password, passwordCheck, term]);

	return (
		<>
			<Head>
				<title>회원가입 | nordbird</title>
			</Head>
			<AppLayout>
				<Form onFinish={onSubmit}>
					<div>
						<label htmlFor="user-id">아이디</label>
						<Input
							name="user-id"
							value={id}
							required
							onChange={onChangeId}
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
						<Button type="primary" htmlType="submit">
							가입하기
						</Button>
					</div>
				</Form>
			</AppLayout>
		</>
	);
};

export default Signup;
