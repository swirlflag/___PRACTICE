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

    NICKNAME_CHANGE_REQUEST, NICKNAME_CHANGE_SUCCESS, NICKNAME_CHANGE_FAILURE,

} from "../reducers/user";

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
}

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
}

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
}

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
    try {
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        });
    } catch(err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
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
function* watchChangeNickname() {
    yield takeLatest(NICKNAME_CHANGE_REQUEST,changeNickname);
};

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
    ]);
}
