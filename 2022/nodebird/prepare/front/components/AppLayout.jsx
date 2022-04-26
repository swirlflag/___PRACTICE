import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const AppLayout = (props) => {
    const {
        children,
    } = props;
    return (
        <div>
            <div>
                <Link href="/"><a>홈</a></Link>
                <Link href="/profile"><a>프로필</a></Link>
                <Link href="/signup"><a>회원가입</a></Link>
            </div>
            {children}
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;

