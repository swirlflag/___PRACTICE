const initialState = {
    isLoggedIn: false,
    user: null,
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
                user: action.data,
			};
		}
		case "LOG_OUT": {
			return {
				...state,
				isLoggedIn: false,
                user: null,
			};
		}
		case "CHANGE_NICKNAME": {
			return {
				...state,
				user: action.data,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;
