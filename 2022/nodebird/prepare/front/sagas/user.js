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
	LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
	LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE, 

    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,

} from "../reducers/user";

const API_login = (data) => {
	return axios.post("/api/login");
};
const API_logout = () => {
	return axios.post("/api/logout");
};
const API_signup = (options) => {
    return axios.post("/api/signup", options);
};

function* login(action) {
	try {
		// const result = yield call(API_login, action.data);
		yield delay(1000);
		yield put({
			type: LOG_IN_SUCCESS,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: LOG_IN_FAILURE,
			error: err.response.data,
		});
	}
}

function* logout() {
	try {
		// const result = yield call(API_logout);
		yield delay(300);
		yield put({
			type: LOG_OUT_SUCCESS,
		});
	} catch (err) {
		yield put({
			type: LOG_OUT_FAILURE,
			error: err.response.data,
		});
	}
}

function* signup(action) {
    try {
        // const result = yield call(API_signup , {...action.data});
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data,
        });
    } catch(err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

function* signout(action) {
    try {
        yield delay(1000);
        yield put({
            type: SIGN_OUT_SUCCESS,
            data: action.data,
        });
    } catch(err) {
        yield put({
            type: SIGN_OUT_FAILURE,
            error: err.response.data,
        });
    }
};

function* follow(action) {
    try {
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        });
    } catch(err) {
        yield put({
            type: FOLLOW_FAILURE,
            data: err.response.data,
        });
    }
};

function* unfollow(action) {
    try {
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
        });
    } catch(err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            data: err.response.data,
        });
    }
};

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

export default function* userSaga() {
	yield all([
        fork(watchLoginAction),
        fork(watchLogoutAction),
        fork(watchSignupAction),
        fork(watchSignoutAction),
        fork(watchFollowAction),
        fork(watchUnfollowAction),
    ]);
}
