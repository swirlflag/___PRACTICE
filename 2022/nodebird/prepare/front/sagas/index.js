import { all, fork, call, put, take, takeEvery, takeLatest, throttle, delay} from "redux-saga/effects";
import axios from 'axios';
import userSaga from "./user";
import postSaga from "./post";
// put = dispatch
// call = 동기모양 처럼 함수 호출 (await처럼)
// fork = 비동기모양처럼 함수 호출 : 일반 이벤트루프 스타일
// takeEvery : while(true)의 효과를 래핑. 비동기로 동작
// takeLatest: 마지막 호출만 실행됨
// takeLeading : 첫째 호출만 실행

axios.defaults.baseURL = "http://localhost:3065";

export default function* rootSaga() {
	yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
};
