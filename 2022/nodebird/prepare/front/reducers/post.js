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
};

const dummyPost = {
    id: 9999,
    User: {
        id: 9999,
        nickname: "dummy bot",
    },
    content: "더미 데이터입니다!!!",
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
                mainPosts : [
                    ...state.mainPosts,
                    dummyPost,
                ],
            }
		}
		default: {
			return state;
		}
	}
};

export default reducer;
