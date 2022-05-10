import PropTypes from 'prop-types';

const PostCard = (props) => {
    const {
        post,
    } = props;

    return (
        <div>
            {post.id}
            {/* {post} */}
        </div>
    )
};

PostCard.propTypes = {
    post : PropTypes.object.isRequired,
};

export default PostCard; 