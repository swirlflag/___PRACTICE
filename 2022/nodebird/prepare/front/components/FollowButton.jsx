import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { followAction, unfollowAction } from '../reducers/user';

const FollowButton = (props) => {
    const dispatch = useDispatch();
    const {
        post
    } = props;

    const { me , isFollowLoading , isUnfollowLoading } = useSelector((state) => state.user);
    const isFollowing = me.Followings.find((v) => {
        return parseInt(v.id,10) === post.User.id
    });

    const onClick = useCallback(() => {
        if(isFollowing) {
            dispatch(unfollowAction(post.User.id));
        }else {
            dispatch(followAction(post.User.id));
        }
    },[isFollowing]);

    return (
        <Button onClick={onClick} loading={isFollowLoading || isUnfollowLoading}>
            { isFollowing ? '언팔로우' : '팔로우' }
        </Button>
    );
};

FollowButton.propTypes = {
    post: PropTypes.shape({
        // id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		User: PropTypes.object,
		// content: PropTypes.string,
		// createdAt: PropTypes.object,
		// Comments: PropTypes.arrayOf(PropTypes.object),
		// imagePaths: PropTypes.arrayOf(PropTypes.object),
        // Images: PropTypes.array
    }).isRequired,
};

export default FollowButton;