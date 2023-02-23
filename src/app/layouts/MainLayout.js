import React, { Fragment } from 'react';
import MainHeader from './common/MainHeader';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
    return (
        <>
            <div className="main-wrap">
                <MainHeader />
                <div className="row">
                    <Outlet/>
                </div>
            </div>
        </>
    );
};
export default MainLayout;
