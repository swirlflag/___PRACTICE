import axios from "axios";
import {
	all,
	put,
	fork,
	delay,
	takeLatest,
	throttle,
    call,
} from "redux-saga/effects";

import {
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
	LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
	LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE,

    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,

    NICKNAME_CHANGE_REQUEST, NICKNAME_CHANGE_SUCCESS, NICKNAME_CHANGE_FAILURE,
    LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,

} from "../reducers/user";

// api
const API_login = (email,password) => {
	return axios.post("/api/user/login", {email, password});
};
const API_logout = () => {
	return axios.post("/api/user/logout");
};
const API_loadUser = () => {
    return axios.get("/api/user");
}
const API_signup = (email,password, nickname) => {
    return axios.post("/api/user", { email, password, nickname});
};
const API_changeNickname = (nickname) => {
    return axios.patch("/api/user/nickname" , { nickname })
};
const API_follow = (followId) => {
    return axios.patch(`/api/user/${followId}/follow`);
};
const API_unfollow = (followId) => {
    return axios.delete(`/api/user/${followId}/follow`);
};
const API_removeFollower = (followId) => {
    return axios.delete(`/api/user/follower/${followId}`);
};
const API_loadFollowers = () => {
    return axios.get(`/api/user/followers`);
};
const API_loadFollowings = () => {
    return axios.get(`/api/user/followings`);
};

// flow
function* loadUser() {
    try {
		const { data: resData } = yield call(API_loadUser);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: resData,
        });
	} catch (err) {
		yield put({
			type: LOAD_MY_INFO_FAILURE,
			error: err.response.data,
		});
	}
};

function* login(action) {
    const { email, password } = action.data;
	try {
		const { data: resData } = yield call(API_login, email, password);
		yield put({
			type: LOG_IN_SUCCESS,
			data: resData,
		});
	} catch (err) {
		yield put({
			type: LOG_IN_FAILURE,
			error: err.response.data,
		});
	}
};

function* logout() {
	try {
		yield call(API_logout);
		yield put({
			type: LOG_OUT_SUCCESS,
		});
	} catch (err) {
		yield put({
			type: LOG_OUT_FAILURE,
			error: err.response.data,
		});
	}
};

function* signup(action) {
    const { email, password, nickname } = action.data;
    try {
        yield call(API_signup , email, password, nickname);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch(err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
};

function* signout(action) {
    try {
        // yield call(API_logout );
        yield put({
            type: SIGN_OUT_SUCCESS,
        });
    } catch(err) {
        yield put({
            type: SIGN_OUT_FAILURE,
            error: err.response.data,
        });
    }
};

function* follow(action) {
    const { followId } = action.data;
    try {
        const { data: resData } = yield call(API_follow, followId);
        yield put({
            type: FOLLOW_SUCCESS,
            data: resData,
        });
    } catch(err) {
        console.error(err);
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
};

function* unfollow(action) {
    const { followId } = action.data;
    try {
        const { data: resData } = yield call(API_unfollow, followId);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: resData,
        });
    } catch(err) {
        console.error(err);
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
};
function* removeFollower(action) {
    const { followId } = action.data;
    try {
        const { data: resData } = yield call(API_removeFollower, followId);
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: resData,
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: err.response.data,
        });
    }
};

function* changeNickname(action) {
    const { nickname } = action.data;
    try {
        const { data: resData } = yield call(API_changeNickname, nickname);

        yield put({
            type: NICKNAME_CHANGE_SUCCESS,
            data: resData,
        });
    }catch(err) {
        yield put({
            type: NICKNAME_CHANGE_FAILURE,
            error: err.response.data,
        });
    }
};

function* loadFollowings() {
    try {
        const { data: resData } = yield call(API_loadFollowings);
        console.log(resData);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: resData,
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data,
        });
    }
};

function* loadFollowers() {
    try {
        const { data: resData } = yield call(API_loadFollowers);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: resData,
        });
    }catch(err) {
        console.error(err);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data,
        });
    }
};

// watch
function* watchLoadUserAction() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadUser);
}
function* watchLoginAction() {
	yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchLogoutAction() {
	yield takeLatest(LOG_OUT_REQUEST, logout);
};
function* watchSignupAction() {
	yield takeLatest(SIGN_UP_REQUEST, signup);
};
function* watchSignoutAction() {
	yield takeLatest(SIGN_OUT_REQUEST, signout);
};
function* watchFollowAction() {
    yield takeLatest(FOLLOW_REQUEST, follow);
};
function* watchUnfollowAction() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
};
function* watchRemoveFollowerAction() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
};
function* watchChangeNickname() {
    yield takeLatest(NICKNAME_CHANGE_REQUEST,changeNickname);
};
function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

export default function* userSaga() {
	yield all([
        fork(watchLoginAction),
        fork(watchLogoutAction),
        fork(watchSignupAction),
        fork(watchSignoutAction),
        fork(watchFollowAction),
        fork(watchUnfollowAction),
        fork(watchLoadUserAction),
        fork(watchChangeNickname),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollowerAction),
    ]);
}
