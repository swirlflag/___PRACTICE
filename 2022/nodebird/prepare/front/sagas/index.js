import axios from "axios";
import { all, fork, call, put, take, takeEvery, takeLatest} from "redux-saga/effects";
// put = dispatch
// call = 동기모양 처럼 함수 호출 (await처럼)
// fork = 비동기모양처럼 함수 호출 : 일반 이벤트루프 스타일
// takeEvery : while(true)의 효과를 래핑. 비동기로 동작
// takeLatest: 마지막 호출만 실행됨
// takeLeading : 첫째 호출만 실행

const API_logIn = (data) => {
	return axios.post("/api/login");
};
const API_logOut = () => {
	return axios.post("/api/logout");
};
const API_addPost = (data) => {
	return axios.post("/api/post");
};

function* logIn(action) {
	try {
		const result = yield call(API_logIn, action.data);
		yield put({
			type: "LOG_IN_SUCCESS",
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: "LOG_IN_FAILURE",
			data: err.response.data,
		});
	}
}

function* logOut() {};

function* addPost(action) {
	try {
		const result = yield call(API_addPost, action.data);
		yield put({
			type: "ADD_POST_SUCCESS",
            data: result.data,
		});
	} catch (error) {
		yield put({
			type: "ADD_POST_FAILURE",
		});
	}
}

function* watchLogIn() {
    yield takeLatest("LOG_IN_REQUEST", logIn);
};

function* watchLogOut() {
	yield takeLatest("LOG_OUT_REQUEST", logOut);
};

function* watchAddPost() {
	yield takeLatest("ADD_POST_REQUEST", addPost);
};

export default function* rootSaga() {
	yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchAddPost)
    ]);
}
