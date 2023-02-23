import React, { Fragment } from 'react';
import ImageCover from '@common/components/ImageCover';
import { Outlet } from 'react-router-dom';
import NoAuthHeader from './common/NoAuthHeader';
const NoAuthLayout = () => {
    return (
        <Fragment>
            <div className="main-wrap">
                <NoAuthHeader />
                <div className="row">
                    <ImageCover
                        className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        url="http://sociala.uitheme.net/assets/images/login-bg-2.jpg"
                    />
                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 ">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card overflow-scoll">
                            <div
                                className="card-body rounded-0 text-left"
                                style={{ marginTop: '100px', marginBottom: '100px' }}
                            >
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default NoAuthLayout;
