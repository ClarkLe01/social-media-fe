import React, { useState, useEffect } from 'react';
import {
    IconUserPlus,
    IconBrandMessenger,
    IconPlus,
    IconPencil,
    IconFriends,
    IconBookmark,
    IconBrandYoutube,
    IconPhoto,
    IconId,
} from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { Menu } from '@mantine/core';

function ProfileCard() {
    const [ dimensions, setDimensions ] = useState({ width: 400, height: 182 });
    const isHide = dimensions.width < 405 ? true : false;

    const updateDimensions = () => {
        let update_width = window.innerWidth - 100;
        let update_height = Math.round(update_width / 4.4);
        setDimensions({ width: update_width, height: update_height });
    };

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);
    return (
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
                <img src="https://via.placeholder.com/1200x250.png" alt="avater" />
            </div>
            <div className="card-body p-0 position-relative">
                <figure
                    className="avatar position-absolute w100 z-index-1"
                    style={{ top: '-40px', left: '30px' }}
                >
                    <img
                        src="assets/images/user.png"
                        alt="avater"
                        className="float-right p-1 bg-white rounded-circle w-100"
                    />
                </figure>
                <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                    Mohannad Zitoun{' '}
                    <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
                        support@gmail.com
                    </span>
                </h4>
                <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2 mb-">
                    <Button
                        leftIcon={<IconUserPlus size={18} />}
                        classNames={{
                            root: 'd-inline bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3 m-1 py-0',
                        }}
                        styles={{
                            root: { height: '40px' },
                        }}
                    >
                        Add Friend
                    </Button>
                    <Button
                        leftIcon={<IconBrandMessenger size={18} />}
                        classNames={{
                            root: 'd-inline bg-primary p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3 m-1 py-0',
                        }}
                        styles={{
                            root: {
                                height: '40px',
                            },
                        }}
                    >
                        Message
                    </Button>
                </div>
            </div>

            <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                <ul
                    className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
                    id="pills-tab"
                    role="tablist"
                >
                    <li className="active list-inline-item me-5">
                        <a
                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                            href="#navtabs1"
                            data-toggle="tab"
                        >
                            Posts
                        </a>
                    </li>
                    <li className="list-inline-item me-5">
                        <a
                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                            href="#navtabs2"
                            data-toggle="tab"
                        >
                            About
                        </a>
                    </li>
                    {isHide ? (
                        <li className="list-inline-item me-5">
                            <Menu withArrow>
                                <Menu.Target>
                                    <div className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block">
                                        More
                                    </div>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item icon={<IconBookmark />}>Posts</Menu.Item>
                                    <Menu.Item icon={<IconId />}>About</Menu.Item>
                                    <Menu.Item icon={<IconFriends />}>Friends</Menu.Item>
                                    <Menu.Item icon={<IconPhoto />}>Photos</Menu.Item>
                                    <Menu.Item icon={<IconBrandYoutube />}>Videos</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </li>
                    ) : (
                        <>
                            <li className="list-inline-item me-5">
                                <a
                                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                    href="#navtabs3"
                                    data-toggle="tab"
                                >
                                    Friends
                                </a>
                            </li>
                            <li className="list-inline-item me-5">
                                <a
                                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                    href="#navtabs4"
                                    data-toggle="tab"
                                >
                                    Photos
                                </a>
                            </li>
                            <li className="list-inline-item me-5">
                                <a
                                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                    href="#navtabs3"
                                    data-toggle="tab"
                                >
                                    Videos
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
export default ProfileCard;
