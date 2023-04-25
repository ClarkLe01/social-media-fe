import React, { Fragment } from 'react';
import ImageCover from '@common/components/ImageCover';
import { Outlet } from 'react-router-dom';
const ErrorLayout = () => {
    return (
        <Fragment>
            <div className="main-wrap">
                <Outlet />
            </div>
        </Fragment>
    );
};
export default ErrorLayout;
