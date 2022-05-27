import styled ,  {createGlobalStyle} from "styled-components";
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = styled.div`
    position: fixed;
    z-index: 5000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

export const Header = styled.header`
    position: relative;
    height: 44px;
    padding: 0;
    background-color: #fff;
    text-align: center;
    z-index: 6000;

    h1 {
        margin: 0;
        font-size: 17px;
        color: #333;
        line-height: 44px;
    }
`;

export const CloseButton = styled(CloseOutlined)`
    position: absolute;
    right: 0;
    top:0;
    height: 100%;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
`

export const SlickWrapper = styled.div`
    height: calc(100% - 44px);
    background-color: #090909;
    .slick-slider,
    .slick-list,
    .slick-track,
    .slick-slide {
        height: 100%;
    }
    .slick-slide  {
        display: inline-flex;
        justify-content: center;
    }
`;

export const ImageWrapper = styled.div`
    padding: 60px;
    text-align: center;
    height: 100%;
    display: inline-flex !important;
    align-items: center;

    img {
        height: 100%;
        height: auto;
        max-height: 750px;
        max-width: 100%;
        /* min-width: 300px; */
    }
`;

export const GlobalStyle = createGlobalStyle`
    .slick-slide {
        display: inline-block;
    }
    .ant-card-cover {
        transform: none !important;
    }
`;

export const Indicator = styled.div`
    text-align: center;
    position: absolute;
    bottom: 15px;
    display: flex;
    justify-content: center;
    width: 100%;

    div {
        width: 75px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        background-color: #313131;
        display: inline-block;
        text-align:center;
        color: #fff;
        font-size: 15px;
    }
`;