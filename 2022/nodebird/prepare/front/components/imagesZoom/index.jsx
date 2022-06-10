import React, { useState } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";

import {
    Overlay,
    Header,
    CloseButton,
    SlickWrapper,
    ImageWrapper,
    GlobalStyle,
    Indicator,
} from './styles.js';

const withHost = (src) => {
    return `http://localhost:3065/${src}`;
};

const ImagesZoom = (props) => {
	const { images, onClose } = props;

	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<>
            <GlobalStyle/>
			<Overlay>
				<Header>
					<h1>상세 이미지</h1>
					<CloseButton onClick={onClose}>X</CloseButton>
				</Header>
				<SlickWrapper>
					<Slick
						initialSlide={0}
						afterChange={(slide) => setCurrentSlide(slide)}
						infinite={true}
						arrows={false}
						slidesToScroll={1}
					>
						{images.map((image, idx) => {
							return (
								<ImageWrapper key={image.src + idx}>
									<img src={withHost(image.src)} alt={withHost(image.src)} />
								</ImageWrapper>
							);
						})}
					</Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1}
                            {' / '}
                            {images.length}
                        </div>
                    </Indicator>
				</SlickWrapper>
			</Overlay>
		</>
	);
};

ImagesZoom.propTypes = {
	images: PropTypes.array.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
