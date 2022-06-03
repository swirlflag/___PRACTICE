import axios from 'axios';
import { all, fork,put, delay,takeLatest } from "redux-saga/effects";
import shortid from 'shortid';
import {
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,

    generateDummyPost,
} from '../reducers/post';

import {
    ADD_POST_ME,
    REMOVE_POST_ME,
} from '../reducers/user';

const API_addPost = (data) => {
	return axios.post("/api/post");
};

function* addPost(action) {
	try {
		// const result = yield call(API_addPost, action.data);
        yield delay(1000);
        const postId = shortid.generate();
		yield put({
			type: ADD_POST_SUCCESS,
            data: {
                postId,
                content: action.data,
            },
		});
        yield put({
			type: ADD_POST_ME,
            data: {postId},
		});
	} catch (error) {
		yield put({
			type: ADD_POST_FAILURE,
		});
	}
};

function* loadPosts(action) {
    try {
        yield delay(1000);
        const dummy = generateDummyPost(action.data.number);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: {
                loadedPosts : dummy
            },
        });
    }catch(err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
        });
    }
}

function* removePost(action) {
    try {
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        });
        yield put({
            type: REMOVE_POST_ME,
            data: action.data
        })
    }catch(error) {
        yield put({
			type: REMOVE_POST_FAILURE,
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

function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
};
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
};
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
};

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLoadPosts),
    ])
};