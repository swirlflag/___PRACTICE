const initialState = {
    isLoggedIn: false,
    me: {
        id: null,
        nickname: null,
    },
    signUpData: {},
    loginData: {},
};

export const loginAction = (id, password) => ({
	type: "LOG_IN",
	data: {id, password},
});

export const logoutAction = () => ({
	type: "LOG_OUT",
});

export const changeNickname = (nickname) => ({
	type: "CHANGE_NICKNAME",
	data: nickname,
});


const reducer = (state = initialState, action) => {
	switch (action.type) {
        case "LOG_IN": {
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
		case "LOG_OUT": {
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
