import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from './imagesZoom/index';

const ImagesWrap = styled.div`
	display: flex;
	flex-wrap: nowrap;
	> div,
	img {
		min-width: 50%;
		width: 100%;
	}
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

const PostImages = (props) => {
	const { images } = props;
	const [showImageZoom, setShowImageZoom] = useState(false);

	const onZoom = useCallback(() => {
		setShowImageZoom(true);
	}, []);

    const onZoomClose = useCallback(() => {
        setShowImageZoom(false);
    }, []);

	return (
		<>
			<ImagesWrap>
				<img
					role="presentation"
					src={images[0].src}
					alt={images[0].src}
				/>
				{images.length === 2 && (
					<img
						role="presentation"
						src={images[1].src}
						alt={images[1].src}
					/>
				)}
				{images.length > 2 && (
					<div role="presentation" onClick={onZoom}>
						<PlusOutlined />
						<br />
						{images.length - 1} 개의 사진 더보기
					</div>
				)}
			</ImagesWrap>
            {
                showImageZoom && <ImagesZoom images={images} onClose={onZoomClose}/>
            }
		</>
	);
};

PostImages.propTypes = {
	images: PropTypes.any,
};

export default PostImages;
