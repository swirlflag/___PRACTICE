import shortid from 'shortid';
import produce from 'immer';
import { faker } from '@faker-js/faker';

const mainPostsExample = [
    {
        id: 1,
        User: {
            id: 10,
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
    },
]

const dynamicState = {
    isNoMorePost: false,
    isLoadPostLoading: false,
    isLoadPostDone: false,
    isLoadPostError: null,
    isAddPostLoading: false,
    isAddPostDone: false,
    isAddPostError: null,
    isRemovePostLoading: false,
    isRemovePostDone: false,
    isRemovePostError: null,
    isAddCommentLoading: false,
    isAddCommentDone: false,
    isAddCommentError: null,
    isLikeLoading: false,
    isLikeDone: false,
    isLikeError: null,
    isUnlikeLoading: false,
    isUnlikeDone: false,
    isUnlikeError: null,
};

const initialState = {
    ...dynamicState,
	mainPosts: [],
};

export const generateDummyPost = (number) => (
    new Array(number).fill().map(() => {
        const dummey = {
			id: shortid.generate(),
			User: {
				id: faker.datatype.number(),
				nickname: faker.name.findName(),
			},
			content: faker.lorem.paragraph(),
			Images: [
                {
                    src : `https://via.placeholder.com/100/${faker.color.rgb().split('#')[1]}`,
                },
                {
                    src: faker.image.image(),
                },
            ],
			Comments: [
                {
                    User: {
                        id : shortid.generate(),
                        nickname: faker.name.findName(),
                    },
                    content: faker.lorem.sentence(),
                },
            ],
			imagePaths: [],
		};
        return dummey;
    })
);

const dummyPost = ({postId, content}) => {
    return {
        id: postId,
        User: {
            id: 10,
            nickname: "제련소 클론 봇",
        },
        content,
        Images: [],
        Comments: [],
        imagePaths: [],
    }
};
const dummyComment = (content) => {
    return {
        User: {
            nickname: "ㅇㅇ",
        },
        content,
    }
};

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const addPostAction = (content) => ({
	type: ADD_POST_REQUEST,
    data : { content },
});

export const removePostAction = (postId) => ({
    type: REMOVE_POST_REQUEST,
    data : { postId },
});

export const loadPostsAction = (number = 5) => ({
    type: LOAD_POSTS_REQUEST,
    data: { number },
})

export const addCommentAction = (content, postId, userId) => ({
	type: ADD_COMMENT_REQUEST,
    data : {
        content, postId, userId,
    },
});

export const likePostAction = (postId) => ({
    type: LIKE_POST_REQUEST,
    data: { postId, },
});
export const unlikePostAction = (postId) => ({
    type: UNLIKE_POST_REQUEST,
    data: { postId, },
});

// 이전 상태를 받은 액션을 통해 다음 상태로 만들어주는 함수
const reducer = (state = initialState, action) => (
    produce(state , (draft) => {
        switch (action.type) {
            case LOAD_POSTS_REQUEST : {
                draft.isLoadPostLoading = true;
                draft.isLoadPostDone = false;
                draft.isLoadPostError = null;
                break;
            }
            case LOAD_POSTS_SUCCESS : {
                // [...{ content, id, User, Images, Comments , Likers }]
                draft.mainPosts.push(...action.data);
                draft.isNoMorePost = draft.mainPosts.length >= 30;
                draft.isLoadPostLoading = false;
                draft.isLoadPostDone = true;
                draft.isLoadPostError = null;
                break;
            }
            case LOAD_POSTS_FAILURE : {
                draft.isLoadPostLoading = false;
                draft.isLoadPostDone = false;
                draft.isLoadPostError = action.error;
                break;
            }
            case ADD_POST_REQUEST: {
                draft.isAddPostLoading = true;
                draft.isAddPostDone = false;
                draft.isAddPostError = null;
                break;
            }
            case ADD_POST_SUCCESS: {
                // { content, id, User, Images, Comments , Likers }
                const newPost = { ...action.data};
                draft.mainPosts.unshift(newPost);
                draft.isAddPostLoading = false;
                draft.isAddPostDone = true;
                draft.isAddPostError = null;
                break;
            }
            case ADD_POST_FAILURE: {
                draft.isAddPostLoading = false;
                draft.isAddPostDone = false;
                draft.isAddPostError = action.error;
                break;
            }
            case REMOVE_POST_REQUEST: {
                draft.isRemovePostLoading = true;
                draft.isRemovePostDone = false;
                draft.isRemovePostError = null;
                break;
            }
            case REMOVE_POST_SUCCESS: {
                const { id: postId } = action.data;
                const changeMainPosts = draft.mainPosts.filter((v) => v.id !== postId);
                draft.mainPosts = changeMainPosts;
                draft.isRemovePostLoading = false;
                draft.isRemovePostDone = true;
                draft.isRemovePostError = null;
                break;
            }
            case REMOVE_POST_FAILURE: {
                draft.isRemovePostLoading = false;
                draft.isRemovePostDone = false;
                draft.isRemovePostError = action.error;
                break;
            }
            case ADD_COMMENT_REQUEST: {
                draft.isAddCommentLoading = true;
                draft.isAddCommentDone = false;
                draft.isAddCommentError = null;
                break;
            }
            case ADD_COMMENT_SUCCESS: {
                const { content , PostId, User, } = action.data;
                const postIndex = draft.mainPosts.findIndex((v) => v.id.toString() === PostId.toString());
                const newComment = {
                    User,
                    content,
                };
                draft.mainPosts[postIndex].Comments.unshift(newComment);
                draft.isAddCommentLoading = false;
                draft.isAddCommentDone = true;
                draft.isAddCommentError = null;
                break;
            }
            case ADD_COMMENT_FAILURE: {
                draft.isAddCommentLoading = false;
                draft.isAddCommentDone = false;
                draft.isAddCommentError = action.error;
                break;
            }
            case LIKE_POST_REQUEST: {
                draft.isLikeLoading = true;
                draft.isLikeDone = false;
                draft.isLikeError = null;
                break;
            }
            case LIKE_POST_SUCCESS: {
                const { id : PostId, UserId } = action.data;
                const post = draft.mainPosts.find((v) => v.id === PostId );
                post.Likers.push({id: UserId});
                draft.isLikeLoading = false;
                draft.isLikeDone = true;
                draft.isLikeError = null;
                break;
            }
            case LIKE_POST_FAILURE: {
                draft.isLikeLoading = false;
                draft.isLikeDone = false;
                draft.isLikeError = action.error;
                break;
            }
            case UNLIKE_POST_REQUEST: {
                draft.isUnlikeLoading = true;
                draft.isUnlikeDone = false;
                draft.isUnlikeError = null;
                break;
            }
            case UNLIKE_POST_SUCCESS: {
                const { id: PostId, UserId } = action.data;
                const post = draft.mainPosts.find((v) => v.id === PostId);
                post.Likers = post.Likers.filter((v) => v.id !== UserId);
                draft.isUnlikeLoading = false;
                draft.isUnlikeDone = true;
                draft.isUnlikeError = null;
                break;
            }
            case UNLIKE_POST_FAILURE: {
                draft.isUnlikeLoading = false;
                draft.isUnlikeDone = false;
                draft.isUnlikeError = action.error;
                break;
            }

            default: {
                break;
            }
        }
        return draft;
    })
);

export default reducer;
