import produce from "immer";

const emptyMe = {
    id: null,
    email: null,
    nickname: null,
    Posts: [],
    Followers: [],
    Followings: [],
};

const dynamicStates = {
    isLoadUserLoading: false,
    isLoadUserDone: false,
    isLoadUserError: false,
    isLoginLoading: false,
    isLoginDone: false,
    isLoginError: null,
    isLogoutLoading: false,
    isLogoutDone: false,
    isLogoutError: null,
    isSignupLoading: false,
    isSignupDone: false,
    isSignupError: null,
    isSignoutLoading: false,
    isSignoutDone: false,
    isSignoutError: null,
    isFollowLoading: false,
    isFollowDone: false,
    isFollowError: null,
    isUnfollowLoading: false,
    isUnfollowDone: false,
    isUnfollowError: null,
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
    nickname: '더미더미',
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

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";

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


export const loadUserAction = () => ({
    type: LOAD_MY_INFO_REQUEST,
})
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

export const followAction = (userId) => ({
    type: FOLLOW_REQUEST,
    data: { userId },
});

export const unfollowAction = (userId) => ({
    type: UNFOLLOW_REQUEST,
    data: { userId }
});

const reducer = (state = initialState, action) => (
    produce(state, (draft) => {
        switch (action.type) {
            case LOAD_MY_INFO_REQUEST: {
                draft.isLoadUserLoading = true;
                draft.isLoadUserDone = false;
                draft.isLoadUserError = null;
                break;
            }
            case LOAD_MY_INFO_SUCCESS: {
                const isLogin = !!action.data;
                if(isLogin) {
                    draft.me = action.data
                }
                draft.isLogin = isLogin;
                draft.isLoadUserLoading = false;
                draft.isLoadUserDone = true;
                draft.isLoadUserError = null;
                break;
            }
            case LOAD_MY_INFO_FAILURE: {
                draft.isLogin = false;
                draft.isLoadUserLoading = false;
                draft.isLoadUserDone = false;
                draft.isLoadUserError = action.error;
                break;
            }
            case LOG_IN_REQUEST: {
                // const { email, password, nickname } = action.data;
                draft.isLoginLoading = true;
                draft.isLoginDone = false;
                draft.isLoginError = null;
                break;
            }
            case LOG_IN_SUCCESS: {
                draft.me = action.data;
                draft.isLogin = true;
                draft.isLoginLoading = false;
                draft.isLoginDone = true;
                draft.isLoginError = null;
                break;
            }
            case LOG_IN_FAILURE: {
                draft.me = {...emptyMe,};
                draft.isLoginLoading = false;
                draft.isLoginDone = false;
                draft.isLoginError = action.error;
                break;
            }
            case LOG_OUT_REQUEST: {
                draft.isLogoutLoading = true;
                draft.isLogoutDone = false;
                draft.isLogoutError = null;
                break;
            }
            case LOG_OUT_SUCCESS: {
                draft.me = {...emptyMe,};
                draft.isLogin = false;
                draft.isLogoutLoading = false;
                draft.isLogoutDone = true;
                draft.isLogoutError = null;
                break;
            }
            case LOG_OUT_FAILURE: {
                draft.isLogoutLoading = false;
                draft.isLogoutDone = false;
                draft.isLogoutError = action.error;
                break;
            }
            case SIGN_UP_REQUEST: {
                draft.isSignupLoading = true;
                draft.isSignupDone = false;
                draft.isSignupError = null;
                break;
            }
            case SIGN_UP_SUCCESS: {
                draft.me = { ...emptyMe };
                draft.isLogin = false;
                draft.isSignupLoading = false;
                draft.isSignupDone = true;
                draft.isSignupError = null;
                break;
            }
            case SIGN_UP_FAILURE: {
                draft.isSignupLoading = false;
                draft.isSignupDone = false;
                draft.isSignupError = action.error;
                break;
            }
            case SIGN_OUT_REQUEST: {
                draft.isSignoutLoading = true;
                draft.isSignoutDone = false;
                draft.isSignoutError = null;
                break;
            }
            case SIGN_OUT_SUCCESS: {
                draft.me = {...emptyMe};
                draft.isLogin = false;
                draft.isSignoutLoading = false;
                draft.isSignoutDone = true;
                draft.isSignoutError = null;
                break;
            }
            case SIGN_OUT_FAILURE: {
                draft.isSignoutLoading = false;
                draft.isSignoutDone = false;
                draft.isSignoutError = action.error;
                break;
            }
            case CHANGE_NICKNAME_REQUEST: {
                draft.me.nickname = action.data;
                break;
            }
            case ADD_POST_ME : {
                const { PostId } = action.data;
                draft.me.Posts.unshift({id: PostId});
                break;
            }
            case REMOVE_POST_ME: {
                const { postId } = action.data;
                const changePosts = draft.me.Posts.filter((v) => v.id !== postId);
                draft.me.Posts = changePosts;
                break;
            }
            case FOLLOW_REQUEST: {
                draft.isFollowLoading = true;
                draft.isFollowDone = false;
                draft.isFollowError = null;
                break;
            }
            case FOLLOW_SUCCESS: {
                const { userId } = action.data;
                draft.me.Followings.push({id: userId});
                draft.isFollowLoading = false;
                draft.isFollowDone = true;
                draft.isFollowError = null;
                break;
            }
            case FOLLOW_FAILURE: {
                draft.isFollowLoading = false;
                draft.isFollowDone = false;
                draft.isFollowError = action.error;
                break;
            }
            case UNFOLLOW_REQUEST: {
                draft.isUnfollowLoading = true;
                draft.isUnfollowDone = false;
                draft.isUnfollowError = null;
                break;
            }
            case UNFOLLOW_SUCCESS: {
                const { userId } = action.data;
                draft.me.Followings = draft.me.Followings.filter((v) => v.id !== userId);
                draft.isUnfollowLoading = false;
                draft.isUnfollowDone = true;
                draft.isUnfollowError = null;
                break;
            }
            case UNFOLLOW_FAILURE: {
                draft.isUnfollowLoading = false;
                draft.isUnfollowDone = false;
                draft.isUnfollowError = action.error;
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
