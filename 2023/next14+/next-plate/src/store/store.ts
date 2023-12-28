import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.ts";
import postsReducer from "./postsSlice.ts";
import usersReducer from "./usersSlice.ts";

const rootReducer = combineReducers({
	counter: counterReducer,
	posts: postsReducer,
	users: usersReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
