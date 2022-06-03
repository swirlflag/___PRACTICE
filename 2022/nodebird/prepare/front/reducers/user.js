import produce from "immer";

const emptyMe = {
    id: null,
    email: null,
    nickname: null,
};

const dynamicStates = {
    isLoginLoading: false,
    isLoginDone: false,
    isLoginError: false,
    isLogoutLoading: false,
    isLogoutDone: false,
    isLogoutError: false,
    isSignupLoading: false,
    isSignupDone: false,
    isSignupError: false,
    isSignoutLoading: false,
    isSignoutDone: false,
    isSignoutError: false,
};

const initialState = {
    ...dynamicStates,

    isLogin: false,
    me: {
        ...emptyMe
    },
    signUpData: {},
    loginData: {},
};

const dummyUser = (data) => ({
    ...data,
    nickname: '제련소',
    id: 10,
    email: 'swirlflag@gmail.com',
    Posts: [
        {id: 1,}
    ],
    Followers: [
        {nickname: '모르가나' }, {nickname: '직스'}, {nickname: '다리우스'},
    ],
    Followings: [
        {nickname: '하이머딩거' },
    ],
});

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE";

export const CHANGE_NICKNAME_REQUEST = "CHANGE_NICKNAME_REQUEST";
export const CHANGE_NICKNAME_SUCCESS = "CHANGE_NICKNAME_SUCCESS";
export const CHANGE_NICKNAME_FAILURE = "CHANGE_NICKNAME_FAILURE";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const ADD_POST_ME = "ADD_POST_ME";
export const REMOVE_POST_ME = "REMOVE_POST_ME";

export const loginAction = (email, password) => ({
	type: LOG_IN_REQUEST,
	data: {email, password},
});

export const logoutAction = () => ({
	type: LOG_OUT_REQUEST,
});

export const changeNicknameAction = (nickname) => ({
	type: CHANGE_NICKNAME_REQUEST,
	data: nickname,
});

export const signupAction = (email,password,nickname) => ({
    type: SIGN_UP_REQUEST,
    data: {email,password,nickname},
});

const reducer = (state = initialState, action) => (
    produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST: {
                // const { email, password, nickname } = action.data;
                draft.isLoginLoading = true;
                draft.isLoginDone = false;
                draft.isLoginError = false;
                break;
            }
            case LOG_IN_SUCCESS: {
                // const { email, password, nickname } = action.data;
                draft.me = dummyUser(action.data);
                draft.isLogin = true;
                draft.isLoginLoading = false;
                draft.isLoginDone = true;
                draft.isLoginError = false;
                break;
            }
            case LOG_IN_FAILURE: {
                draft.me = {...emptyMe,};
                draft.isLoginLoading = false;
                draft.isLoginDone = false;
                draft.isLoginError = true;
                break;
            }
            case LOG_OUT_REQUEST: {
                draft.isLogoutLoading = true;
                draft.isLogoutDone = false;
                draft.isLogoutError = false;
                break;
            }
            case LOG_OUT_SUCCESS: {
                draft.me = {...emptyMe,};
                draft.isLogin = false;
                draft.isLogoutLoading = false;
                draft.isLogoutDone = true;
                draft.isLogoutError = false;
                break;
            }
            case LOG_OUT_FAILURE: {
                draft.isLogoutLoading = false;
                draft.isLogoutDone = false;
                draft.isLogoutError = true;
                break;
            }
            case SIGN_UP_REQUEST: {
                draft.isSignupLoading = true;
                draft.isSignupDone = false;
                draft.isSignupError = false;
                break;
            }
            case SIGN_UP_SUCCESS: {
                draft.me = { ...emptyMe };
                draft.isLogin = false;
                draft.isSignupLoading = false;
                draft.isSignupDone = true;
                draft.isSignupError = false;
                break;
            }
            case SIGN_UP_FAILURE: {
                draft.isSignupLoading = false;
                draft.isSignupDone = false;
                draft.isSignupError = true;
                break;
            }
            case SIGN_OUT_REQUEST: {
                draft.isSignoutLoading = true;
                draft.isSignoutDone = false;
                draft.isSignoutError = false;
                break;
            }
            case SIGN_OUT_SUCCESS: {
                draft.me = {...emptyMe};
                draft.isLogin = false;
                draft.isSignoutLoading = false;
                draft.isSignoutDone = true;
                draft.isSignoutError = false;
                break;
            }
            case SIGN_OUT_FAILURE: {
                draft.isSignoutLoading = false;
                draft.isSignoutDone = false;
                draft.isSignoutError = true;
                break;
            }
            case CHANGE_NICKNAME_REQUEST: {
                draft.me.nickname = action.data;
                break;
            }
            case ADD_POST_ME : {
                const { postId } = action.data;
                draft.me.Posts.unshift({id: postId});
                break;
            }
            case REMOVE_POST_ME: {
                const { postId } = action.data;
                const changePosts = draft.me.Posts.filter((v) => v.id !== postId);
                draft.me.Posts = changePosts;
                break;
            }
            default: {
                break;
            }
        }
        return draft;
    })
);

export default reducer;
