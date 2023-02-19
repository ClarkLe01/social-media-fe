import React, { Fragment } from 'react';
import Header from './common/Header';
import MainLogo from '@common/components/MainLogo';
import NavButton from '@common/components/NavMenuButton';
import { Link } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <>
            <div className="main-wrap">
                <Header>
                    <MainLogo />
                    <NavButton />
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
                </Header>
                <div className="row">
                </div>
            </div>
        </>
    );
};
export default AuthLayout;
