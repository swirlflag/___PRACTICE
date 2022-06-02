import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = (props) => {
	const { postData } = props;

    const hashtagRegexp = /(#[^\s#]+)/g;

	return (
		<div>
			{postData.split(hashtagRegexp).map((text,idx) => {
                if(text.match(hashtagRegexp)) {
                    return <Link href={`/hashtag/${text.slice(1)}`} key={text+idx}><a>{text}</a></Link>
                }
                return text;
            })}
		</div>
	);
};

PostCardContent.propsTypes = {
	postData: PropTypes.string.isRequired,
};

export default PostCardContent;
