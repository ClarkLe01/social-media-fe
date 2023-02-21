import React, { Fragment } from 'react';
import Header from './common/Header';
import ImageCover from '@common/components/ImageCover';
import MainLogo from '@common/components/MainLogo';
import NavButton from '@common/components/NavMenuButton';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
const AuthLayout = () => {
    return (
        <Fragment>
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
                    <ImageCover
                        className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        url="http://sociala.uitheme.net/assets/images/login-bg-2.jpg"
                    />
                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 ">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card overflow-scoll">
                            <div className="card-body rounded-0 text-left" style={{ marginTop:'100px', marginBottom:'100px' }}>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default AuthLayout;
