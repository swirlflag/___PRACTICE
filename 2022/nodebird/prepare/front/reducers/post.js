const initialState = {
	mainPosts: [
		{
			id: 1,
			User: {
				id: 1,
				nickname: "제련소",
			},
			content: "첫번째 게시글",
			Images: [
				{
					src: "https://i.picsum.photos/id/985/200/300.jpg?hmac=lb8fpWYv02mksKzlZbeEoz95iCF79_svqRJetHcEvnQ",
				},
				{
					src: "https://i.picsum.photos/id/559/200/300.jpg?hmac=lNV_-XwwjsYJn2cX4Pq7EFx4GA57ekwh_ZoR1dc09H0",
				},
				{
					src: "https://i.picsum.photos/id/660/200/300.jpg?hmac=j7s3I-0KukW6B1Vt4AJzCYxM8kbZz5kTMOEl9Y7zUOg",
				},
			],
			Comments: [
				{
					User: {
						nickname: "ㅇㅇ",
					},
					content: "안녕하세요",
				},
				{
					User: {
						nickname: "ㅇㅇ2",
					},
					content: "안녕하세요2",
				},
				{
					User: {
						nickname: "ㅇㅇ3~",
					},
					content: "안녕하세요3~ㅎㅎ",
				},
			],
			imagePaths: [],
			postAdded: false,
		},
	],
};

const dummypost = {
    id: 2,
    User: {
        id: 1,
        nickname: "제련소",
    },
    content: "두번째 게시글",
    Images: [
        {
            src: "https://i.picsum.photos/id/102/200/300.jpg?hmac=nMR8Al8ea36mJZJbJNFVaddoG8aP4gUCDiEm4r6PUbk",
        },
        {
            src: "https://i.picsum.photos/id/42/200/300.jpg?hmac=RFAv_ervDAXQ4uM8dhocFa6_hkOkoBLeRR35gF8OHgs",
        },
        {
            src: "https://i.picsum.photos/id/955/200/300.jpg?hmac=I4JBGrEHxErLo6XCZM73YcpyhJjX3GxLPggnlxcdU24",
        },
    ],
    Comments: [
        {
            User: {
                nickname: "ee",
            },
            content: "e안녕하세요",
        },
        {
            User: {
                nickname: "e2",
            },
            content: "e안녕하세요2",
        },
        {
            User: {
                nickname: "e3~",
            },
            content: "안e녕하세요3~ㅎㅎ",
        },
    ],
    imagePaths: [],
    postAdded: false,
};

const ADD_POST = "ADD_POST";

export const addPost = {
	type: ADD_POST,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
            return {
                ...state,
                postAdded: true,
                mainPosts : [
                    dummyPost,
                    ...state.mainPosts,
                ],
            }
		}
		default: {
			return state;
		}
	}
};

export default reducer;
