import React from 'react';
import MainLogo from '@common/components/MainLogo';
import NavMenuButton from '@common/components/NavMenuButton';
import { Link } from 'react-router-dom';
const NoAuthHeader = () => {
    return (
        <div className="nav-header bg-transparent shadow-none border-0">
            <div className="row nav-top w-100 px-3">
                <MainLogo />
                <NavMenuButton />
                <Link
                    to="/login"
                    className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default NoAuthHeader;
