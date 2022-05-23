const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {},
};

export const loginAction = (value) => ({
	type: "LOG_IN",
	data: value,
});

export const logoutAction = () => ({
	type: "LOG_OUT",
});

export const changeNickname = (value) => ({
	type: "CHANGE_NICKNAME",
	data: value,
});


const reducer = (state = initialState, action) => {
	switch (action.type) {
        case "LOG_IN": {
			return {
				...state,
				isLoggedIn: true,
                me: action.data,
			};
		}
		case "LOG_OUT": {
			return {
				...state,
				isLoggedIn: false,
                me: null,
			};
		}
		case "CHANGE_NICKNAME": {
			return {
				...state,
				me: action.data,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
