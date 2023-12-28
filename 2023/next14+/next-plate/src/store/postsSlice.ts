import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = [
	{ id: "1", userId: "1", title: "First Post!", content: "Hello!" },
	{ id: "2", userId: "2", title: "Second Post", content: "More text" },
];

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost: {
			reducer(state, action) {
				state.push({ ...action.payload });
			},
			prepare({ title, content, userId }): any {
				const id = nanoid();
				const date = new Date().toISOString();
				return {
					payload: {
						id,
						date,
						title,
						content,
						userId,
					},
				};
			},
		},

		// 	postAdded: {
		//   reducer(state, action) {
		//     state.push(action.payload)
		//   },
		//   prepare(title, content) {
		//     return {
		//       payload: {
		//         id: nanoid(),
		//         title,
		//         content
		//       }
		//     }
		//   }
		// }
		editPost: (state, action) => {
			const payload = action.payload;
			const id = payload.id;
			const target = state.find((post) => post.id === id);
			if (target) {
				target.title = payload.title;
				target.content = payload.content;
				target.userId = payload.userId;
			}
		},
	},
});

export const { addPost, editPost } = postsSlice.actions;

export default postsSlice.reducer;
