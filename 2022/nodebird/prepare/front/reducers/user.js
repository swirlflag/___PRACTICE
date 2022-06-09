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
    isChangeNicknameLoading: false,
    isChangeNicknameDone: false,
    isChangeNicknameError: null,
    isLoadFollowersLoading: false,
    isLoadFollowersDone: false,
    isLoadFollowersError: null,
    isLoadFollowingsLoading: false,
    isLoadFollowingsDone: false,
    isLoadFollowingsError: null,
    isRemoveFollowerLoading: false,
    isRemoveFollowerDone: false,
    isRemoveFollowerError: null,
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

export const NICKNAME_CHANGE_REQUEST = "NICKNAME_CHANGE_REQUEST";
export const NICKNAME_CHANGE_SUCCESS = "NICKNAME_CHANGE_SUCCESS";
export const NICKNAME_CHANGE_FAILURE = "NICKNAME_CHANGE_FAILURE";

export const ADD_POST_ME = "ADD_POST_ME";
export const REMOVE_POST_ME = "REMOVE_POST_ME";

export const FOLLOW_REQUEST = "FOLLOW_REQUEST";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";

export const UNFOLLOW_REQUEST = "UNFOLLOW_REQUEST";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const loadUserAction = () => ({
    type: LOAD_MY_INFO_REQUEST,
});
export const loginAction = (email, password) => ({
	type: LOG_IN_REQUEST,
	data: {email, password},
});
export const logoutAction = () => ({
	type: LOG_OUT_REQUEST,
});
export const signupAction = (email,password,nickname) => ({
    type: SIGN_UP_REQUEST,
    data: {email,password,nickname},
});
export const followAction = (followId) => ({
    type: FOLLOW_REQUEST,
    data: { followId },
});
export const unfollowAction = (followId) => ({
    type: UNFOLLOW_REQUEST,
    data: { followId },
});
export const removeFollowerAction = (followId) => ({
    type: REMOVE_FOLLOWER_REQUEST,
    data: { followId },
});
export const changeNicknameAction = (nickname) => ({
    type: NICKNAME_CHANGE_REQUEST,
    data: { nickname },
});
export const loadFollowersAction = () => ({
    type: LOAD_FOLLOWERS_REQUEST,
});
export const loadFollowingsAction = () => ({
    type: LOAD_FOLLOWINGS_REQUEST,
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
            case ADD_POST_ME : {
                const { id } = action.data;
                draft.me.Posts.unshift({id});
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
                const { followId } = action.data;
                draft.me.Followings.push({id: followId});
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
                const { followId } = action.data;
                draft.me.Followings = draft.me.Followings.filter((v) => v.id !== followId);
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
            case NICKNAME_CHANGE_REQUEST: {
                draft.isChangeNicknameLoading = true;
                draft.isChangeNicknameDone = false;
                draft.isChangeNicknameError = null;
                break;
            }
            case NICKNAME_CHANGE_SUCCESS: {
                const { nickname } = action.data;
                draft.me.nickname = nickname;
                draft.isChangeNicknameLoading = false;
                draft.isChangeNicknameDone = true;
                draft.isChangeNicknameError = null;
                break;
            }
            case NICKNAME_CHANGE_FAILURE: {
                draft.isChangeNicknameLoading = false;
                draft.isChangeNicknameDone = false;
                draft.isChangeNicknameError = action.error;
                break;
            }
            case LOAD_FOLLOWINGS_REQUEST: {
                draft.isLoadFollowingsLoading = false;
                draft.isLoadFollowingsDone = false;
                draft.isLoadFollowingsError = action.error;
                break;
            }
            case LOAD_FOLLOWINGS_SUCCESS: {
                const { list } = action.data;
                const followings = list.map(({id,nickname}) => ({id,nickname}));
                draft.me.Followings = followings;
                draft.isLoadFollowingsLoading = false;
                draft.isLoadFollowingsDone = false;
                draft.isLoadFollowingsError = action.error;
                break;
            }
            case LOAD_FOLLOWINGS_FAILURE: {
                draft.isLoadFollowingsLoading = false;
                draft.isLoadFollowingsDone = false;
                draft.isLoadFollowingsError = action.error;
                break;
            }
            case LOAD_FOLLOWERS_REQUEST: {
                draft.isLoadFollowersLoading = false;
                draft.isLoadFollowersDone = false;
                draft.isLoadFollowersError = action.error;
                break;
            }
            case LOAD_FOLLOWERS_SUCCESS: {
                const { list } = action.data;
                const followers = list.map(({id,nickname}) => ({id,nickname}));
                draft.me.Followers = followers;
                draft.isLoadFollowersLoading = false;
                draft.isLoadFollowersDone = false;
                draft.isLoadFollowersError = action.error;
                break;
            }
            case LOAD_FOLLOWERS_FAILURE: {
                draft.isLoadFollowersLoading = false;
                draft.isLoadFollowersDone = false;
                draft.isLoadFollowersError = action.error;
                break;
            }
            case REMOVE_FOLLOWER_REQUEST: {
                draft.isRemoveFollowerLoading = false;
                draft.isRemoveFollowerDone = false;
                draft.isRemoveFollowerError = action.error;
                break;
            }
            case REMOVE_FOLLOWER_SUCCESS: {
                const { followId } = action.data;
                draft.me.Followers = draft.me.Followers.filter((v) => v.id !== followId);
                draft.isRemoveFollowerLoading = false;
                draft.isRemoveFollowerDone = false;
                draft.isRemoveFollowerError = action.error;
                break;
            }
            case REMOVE_FOLLOWER_FAILURE: {
                draft.isRemoveFollowerLoading = false;
                draft.isRemoveFollowerDone = false;
                draft.isRemoveFollowerError = action.error;
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
