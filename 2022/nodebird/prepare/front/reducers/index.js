import { HYDRATE } from "next-redux-wrapper";

const initialState = {
	user: {
		isLoggedIn: null,
		user: null,
		signUpData: {},
		loginData: {},
	},
	post: {
		mainPosts: [],
	},
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

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE: {
			return {
				...state,
				...action.payload,
			};
		}
		case "LOG_IN": {
			return {
				...state,
				user: {
					...state.user,
					isLoggedIn: true,
					user: action.data,
				},
			};
		}
		case "LOG_OUT": {
			return {
				...state,
				user: {
					...state.user,
					isLoggedIn: false,
					user: null,
				},
			};
		}
		default: {
			return state;
		}
	}
};

export default rootReducer;
