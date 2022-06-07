import axios from 'axios';
import { all, fork,put, delay,takeLatest,throttle, call } from "redux-saga/effects";
import shortid from 'shortid';
import {
    LOAD_POSTS_REQUEST,LOAD_POSTS_SUCCESS,LOAD_POSTS_FAILURE,
    ADD_POST_REQUEST, ADD_POST_SUCCESS,ADD_POST_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,

    generateDummyPost,
} from '../reducers/post';

import {
    ADD_POST_ME,
    REMOVE_POST_ME,
} from '../reducers/user';

const API_getPosts = (index) => {
    return axios.get("/api/posts", {index});
};

const API_addPost = (content) => {
	return axios.post("/api/post", { content });
};
const API_removePost = (postId) => {
    return axios.delete(`/api/post/${postId}`);
};
const API_addComment = (content, postId) => {
	return axios.post(`/api/post/${postId}/comment`, { content, });
};
const API_likePost = (postId) => {
    return axios.patch(`/api/post/${postId}/like`);
};
const API_unlikePost = (postId) => {
    return axios.delete(`/api/post/${postId}/like`);
};


function* loadPosts(action) {
    const { number } = action.data;
    try {
        const { data: resData } = yield call(API_getPosts, number);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: resData,
        });
    }catch(err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data,
        });
    }
};

function* addPost(action) {
    const { content } = action.data;
	try {
		const { data : resData } = yield call(API_addPost, content);
        console.log(resData);

		yield put({
			type: ADD_POST_SUCCESS,
            data: resData,
		});
        yield put({
			type: ADD_POST_ME,
            data: { id: resData.id },
		});
	} catch (err) {
        console.log(err);
		yield put({
			type: ADD_POST_FAILURE,
            error: err.response.data,
		});
	}
};

function* removePost(action) {
    const { postId } = action.data;
    try {
        const { data: resData } = yield call(API_removePost, postId);

        yield put({
            type: REMOVE_POST_SUCCESS,
            data: resData
        });
        yield put({
            type: REMOVE_POST_ME,
            data: action.data
        })
    }catch(err) {
        yield put({
			type: REMOVE_POST_FAILURE,
            error: err.response.data,
		});
    }
};

function* addComment(action) {
    const { content , postId } = action.data;
    try {
		const { data: resData } = yield call(API_addComment, content, postId);

		yield put({
			type: ADD_COMMENT_SUCCESS,
            data : resData,
		});
	} catch (err) {
        console.error(err);
		yield put({
			type: ADD_COMMENT_FAILURE,
            error: err.response.data,
		});
	}
};

function* likePost(action) {
    const { postId } = action.data;
    try {
        const { data: resData } = yield call(API_likePost, postId);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: resData,
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response.data,
        });
    }
};

function* unlikePost(action) {
    const { postId } = action.data;
    try {
        const { data: resData } = yield call(API_unlikePost, postId);

        console.log(resData)
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: resData,
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response.data,
        });
    }
};



function* watchLoadPosts() {
    yield takeLatest( LOAD_POSTS_REQUEST, loadPosts);
};
function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
};
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
};
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
};
function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
};
function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
};
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLoadPosts),
        fork(watchLikePost),
        fork(watchUnlikePost),
    ])
};