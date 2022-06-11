import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from './user';
import post from './post';
// import users from './user';

const initialState = {
};
const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE: {
            // console.log("HYDRATE")
            return action.payload; // { user , post}
        }
        default: {
            const combineReducer = combineReducers({
                user,
                post,
            });
            return combineReducer(state, action);
        }
    }
};

export default rootReducer;
