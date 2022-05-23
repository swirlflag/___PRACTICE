import React from 'react';
import PropTypes from 'prop-types';

const PostImages = (props) => {
    const {images} = props;

    return (
        <div style={{border: '1px solid #d3d' }}>
            [PostImages 구현중]
        </div>
    )
};

PostImages.propTypes = {
    images : PropTypes.any
}

export default PostImages;