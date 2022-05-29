import axios from 'axios';
import { all, fork,put, delay,takeLatest } from "redux-saga/effects";
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,

    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
} from '../reducers/post';

const API_addPost = (data) => {
	return axios.post("/api/post");
};

function* addPost(action) {
	try {
		// const result = yield call(API_addPost, action.data);
        yield delay(1000);
		yield put({
			type: ADD_POST_SUCCESS,
            data: action.data,
		});
	} catch (error) {
		yield put({
			type: ADD_POST_FAILURE,
		});
	}
};

function* addComment(action) {
    try {
		// const result = yield call(API_addPost, action.data);
        yield delay(1000);
		yield put({
			type: ADD_COMMENT_SUCCESS,
            data: action.data,
		});
	} catch (error) {
		yield put({
			type: ADD_COMMENT_FAILURE,
		});
	}
};


function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
};
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
};

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
};