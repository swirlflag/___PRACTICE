const initialState = {
    isLoggedIn: false,
    me: {
        id: null,
        nickname: null,
    },
    signUpData: {},
    loginData: {},
};

export const loginAction = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(loginRequestAction());
        axios.post('')
            .then((res) => {
                dispatch(loginSuccessAction(res));
            })
            .catch((err) => {
                dispatch(loginFailureAction(err));
            })
        ;
    }
}

export const loginRequestAction = (id, password) => ({
	type: "LOG_IN_REQUEST",
	data: {id, password},
});

export const loginSuccessAction = (id, password) => ({
	type: "LOG_IN_SUCCESS",
	data: {id, password},
});

export const loginFailureAction = () => ({
	type: "LOG_IN_FAILURE",
	data: {id: null, password: null,},
});

export const logoutRequestAction = () => ({
	type: "LOG_OUT_REQUEST",
});

export const logoutSuccessAction = () => ({
	type: "LOG_OUT_SUCCESS",
});

export const logoutFailureAction = () => ({
	type: "LOG_OUT_FAILURE",
});

export const requestChangeNickname = (nickname) => ({
	type: "CHANGE_NICKNAME",
	data: nickname,
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
        case "LOG_IN_REQUEST": {
            const { id, password, nickname } = action.data;
			return {
				...state,
				isLoggedIn: true,
                me: {
                    ...state.me,
                    id,
                },
			};
		}
		case "LOG_OUT_REQUEST": {
			return {
				...state,
				isLoggedIn: false,
                me: {
                    ...state.me,
                    id: null,
                },
			};
		}
		case "CHANGE_NICKNAME": {
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
