const initialState = {
	mainPosts: [
		{
			id: 1,
			User: {
				id: 1,
				nickname: "제련소",
			},
			content: "첫번째 게시글 입니다.. #첫번째 #해시태그_되나?",
			Images: [
				{
					src: "https://i.picsum.photos/id/702/800/800.jpg?hmac=I3zFzdBlDPMNZCcLdhkhcOmpV1rGpMXY557ilz9JA9Y",
				},
				{
					src: "https://i.picsum.photos/id/960/800/800.jpg?hmac=Wk7vp2DErAMJMv3rV1_OivBuvOWrAOLY0KqRYh_W77o",
				},
				{
					src: "https://i.picsum.photos/id/876/800/800.jpg?hmac=On__m7iyhPlTIQpzjmHwRHqB1HvqSQaA3SvHzPIClMM",
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
    isAddPostLoading: false,
    isAddPostDone: false,
    isAddPostError: false,
    isAddCommentLoading: false,
    isAddCommentDone: false,
    isAddCommentError: false,
};

const dummyPost = {
    id: 9999,
    User: {
        id: 9999,
        nickname: "dummy bot",
    },
    content: "더미 데이터입니다!!!",
    Images: [
    ],
    Comments: [
    ],
    imagePaths: [],
    postAdded: false,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPostAction = (text) => ({
	type: ADD_POST_REQUEST,
    data : text,
});

export const addCommentAction = (content, postId, userId) => ({
	type: ADD_COMMENT_REQUEST,
    data : {
        content, postId, userId,
    },
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST_REQUEST: {
            return {
                ...state,
                isAddPostLoading: true,
                isAddPostDone: false,
                isAddPostError: false,
            }
		}
        case ADD_POST_SUCCESS: {
            return {
                ...state,
                isAddPostLoading: false,
                isAddPostDone: true,
                isAddPostError: false,
                mainPosts : [
                    ...state.mainPosts,
                    {
                        ...dummyPost,
                        content: action.data,
                    }
                ],
            }
		}
        case ADD_POST_FAILURE: {
            return {
                ...state,
                isAddPostLoading: false,
                isAddPostDone: false,
                isAddPostError: true,
            }
		}
        case ADD_COMMENT_REQUEST: {
            return {
                ...state,
                isAddCommentLoading: true,
                isAddCommentDone: false,
                isAddCommentError: false,
            }
		}
        case ADD_COMMENT_SUCCESS: {
            return {
                ...state,
                isAddCommentLoading: false,
                isAddCommentDone: true,
                isAddCommentError: false,
            }
		}
        case ADD_COMMENT_FAILURE: {
            return {
                ...state,
                isAddCommentLoading: false,
                isAddCommentDone: false,
                isAddCommentError: true,
            }
		}
		default: {
			return state;
		}
	}
};

export default reducer;
