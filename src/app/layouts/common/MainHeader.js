import React from 'react';
import { Link } from 'react-router-dom';
import { IconHome, IconSearch, IconDeviceTv, IconBellFilled, IconMoon, IconMessageCircle, IconBrandZoom, IconUsers } from '@tabler/icons-react';

import Input from '@common/components/Input';
import MainLogo from '@common/components/MainLogo';
import NavMenuButton from '@common/components/NavMenuButton';

const MainHeader = () => {
    return (
        <div className="nav-header bg-white shadow-xs border-0">
            <div className="nav-top">
                <MainLogo />
                <NavMenuButton />
            </div>
            <form action="#" className="float-left header-search ms-3 mt-3">
                <Input
                    icon={<IconSearch />}
                    type="text"
                    name="search"
                    placeHolder="Search in Sociala"
                    className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xsss fw-500 rounded-xl w350 theme-dark-bg h-auto"
                />
            </form>
            <Link
                to="/home"
                className="p-2 text-center ms-0 menu-icon center-menu-icon active"
            >
                <IconHome
                    className="p-2 font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500 active"
                />
            </Link>
            <Link
                to="/story"
                className="p-2 text-center ms-0 menu-icon center-menu-icon"
            >
                <IconDeviceTv
                    className="p-2 font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"
                />
            </Link>
            <Link
                to="/register"
                className="p-2 text-center ms-0 menu-icon center-menu-icon"
            >
                <IconBrandZoom
                    className="p-2 font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"
                />
            </Link>
            <Link
                to="/register"
                className="p-2 text-center ms-0 menu-icon center-menu-icon"
            >
                <IconUsers
                    className="p-2 font-lg bg-greylight btn-round-lg theme-dark-bg text-grey-500"
                />
            </Link>
            <span className="p-2 pointer text-center ms-auto menu-icon">
                <IconBellFilled />
            </span>
            <Link to="/" className="p-2 text-center ms-3 menu-icon chat-active-btn">
                <IconMessageCircle />
            </Link>
            <span className="pointer p-2 text-center ms-3 menu-icon chat-active-btn ">
                <IconMoon />
            </span>
        </div>
    );
};

export default MainHeader;
