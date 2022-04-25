import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = (props) => {
    const {
        children,
    } = props;
    return (
        <div>
            <div>
                공통 메뉴
            </div>
            {children}
        </div>
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;

