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
    email: 1,
    Posts: [],
    Followers: [],
    Followings: [],
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

const reducer = (state = initialState, action) => {
	switch (action.type) {
        case LOG_IN_REQUEST: {
            const { email, password, nickname } = action.data;
			return {
				...state,
                isLoginLoading: true,
                isLoginDone: false,
                isLoginError: false,
			};
		}
        case LOG_IN_SUCCESS: {
            const { email, password, nickname } = action.data;
			return {
				...state,
				isLoginLoading: false,
                isLoginDone: true,
                isLoginError: false,
                isLogin: true,
                me: dummyUser(action.data),
			};
		}
        case LOG_IN_FAILURE: {
			return {
				...state,
				isLoginLoading: false,
                isLoginDone: false,
                isLoginError: true,
                me: {
                    ...emptyMe,
                }
			};
		}
		case LOG_OUT_REQUEST: {
			return {
				...state,
                isLogoutLoading: true,
                isLogoutDone: false,
                isLogoutError: false,
			};
		}
        case LOG_OUT_SUCCESS: {
			return {
				...state,
                isLogoutLoading: false,
                isLogoutDone: true,
                isLogoutError: false,
                isLogin: false,
                me: {
                    ...emptyMe,
                }
			};
		}
        case LOG_OUT_FAILURE: {
			return {
				...state,
                isLogoutLoading: false,
                isLogoutDone: false,
                isLogoutError: true,
			};
		}
        case SIGN_UP_REQUEST: {
			return {
				...state,
                isSignupLoading: true,
                isSignupDone: false,
                isSignupError: false,
			};
		}
        case SIGN_UP_SUCCESS: {
			return {
				...state,
                isSignupLoading: false,
                isSignupDone: true,
                isSignupError: false,
                isLogin: false,
                me: {
                    ...emptyMe,
                }
			};
		}
        case SIGN_UP_FAILURE: {
			return {
				...state,
                isSignupLoading: false,
                isSignupDone: false,
                isSignupError: true,
			};
		}
        case SIGN_OUT_REQUEST: {
			return {
				...state,
                isSignoutLoading: true,
                isSignoutDone: false,
                isSignoutError: false,
			};
		}
        case SIGN_OUT_SUCCESS: {
			return {
				...state,
                isSignoutLoading: false,
                isSignoutDone: true,
                isSignoutError: false,
                isLogin: false,
                me: {
                    ...emptyMe,
                }
			};
		}
        case SIGN_OUT_FAILURE: {
			return {
				...state,
                isSignoutLoading: false,
                isSignoutDone: false,
                isSignoutError: true,
			};
		}
		case CHANGE_NICKNAME_REQUEST: {
			return {
				...state,
				me: {
                    ...state.me,
                    nickname : action.data,
                },
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
