import React from 'react';

const Header = ({ children }) => {
    return (
        <div className="nav-header bg-transparent shadow-none border-0">
            <div className="nav-top w-100">{children}</div>
        </div>
    );
};

export default Header;
