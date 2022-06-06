import axios from 'axios';
import { all, fork,put, delay,takeLatest,throttle, call } from "redux-saga/effects";
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

const API_getPosts = (index) => {
    return axios.get("/api/posts", {index});
};

const API_addPost = (content) => {
	return axios.post("/api/post", { content });
};
const API_addComment = ({content, postId, userId}) => {
	return axios.post(`/api/post/${postId}/comment`, { content, postId, userId });
};


function* loadPosts(action) {
    try {
        // const dummy = generateDummyPost(action.data.number);
        const result = yield call(API_getPosts, action.data.number);
        const resData = result.data;
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: resData,
        });
    }catch(err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.error,
        });
    }
}

function* addPost(action) {
	try {
		const { data : resData } = yield call(API_addPost, action.data.content);
        const postId = resData.id;

		yield put({
			type: ADD_POST_SUCCESS,
            data: { ...resData, postId, },
		});
        yield put({
			type: ADD_POST_ME,
            data: { postId },
		});
	} catch (err) {
        console.log(err);
		yield put({
			type: ADD_POST_FAILURE,
            error: err.response.error,
		});
	}
};


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
    }catch(err) {
        yield put({
			type: REMOVE_POST_FAILURE,
            error: err.response.error,
		});
    }
};

function* addComment(action) {
    try {
		const { data: resData } = yield call(API_addComment, action.data);
		yield put({
			type: ADD_COMMENT_SUCCESS,
            data : {
                ...resData,
            },
		});
	} catch (err) {
        console.error(err);
		yield put({
			type: ADD_COMMENT_FAILURE,
            error: err.response.error,
		});
	}
};

function* watchLoadPosts() {
    yield takeLatest( LOAD_POSTS_REQUEST, loadPosts);
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