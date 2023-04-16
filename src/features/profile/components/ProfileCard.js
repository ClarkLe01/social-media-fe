import React, { useState, useEffect, useCallback } from 'react';
import {
    IconUserPlus,
    IconUserCheck,
    IconBrandMessenger,
    IconPlus,
    IconPencil,
    IconFriends,
    IconBookmark,
    IconBrandYoutube,
    IconPhoto,
    IconId,
} from '@tabler/icons-react';
import {
    Button,
    Text,
    Group,
    Menu,
    Modal,
} from '@mantine/core';

import { useAuth, useFriend } from '@services/controller';
import { useQueryClient } from '@tanstack/react-query';
import AvatarComponent from './AvatarComponent';
import CoverComponent from './CoverComponent';

function ProfileCard(props) {
    const queryClient = useQueryClient();

    const { user } = props;
    const { profile } = useAuth();

    const { friendList, requestList, responseList, addFriend, acceptRequest, deleteFriend } = useFriend(profile.data.id);

    const [ dimensions, setDimensions ] = useState({ width: 400, height: 182 });
    const isHide = dimensions.width < 405 ? true : false;

    const [ groupButtonType, setGroupButtonType ] = useState(null);

    const updateDimensions = () => {
        let update_width = window.innerWidth - 100;
        let update_height = Math.round(update_width / 4.4);
        setDimensions({ width: update_width, height: update_height });
    };

    const handleAcceptRequest = useCallback(() => {
        const instances = [ ...friendList.data, ...requestList.data, ...responseList.data ];
        const target = instances.find(
            (instance) =>
                (instance.requestID === user.id && instance.responseID === profile.data.id) ||
                (instance.requestID === profile.data.id && instance.responseID === user.id),
        );
        acceptRequest({
            pathParams: { instanceId: target.id },
        });
    }, [ user, friendList, responseList, requestList ]);
    const handleDeleteFriend = useCallback(() => {
        const instances = [ ...friendList.data, ...requestList.data, ...responseList.data ];
        const target = instances.find(
            (instance) =>
                (instance.requestID === user.id && instance.responseID === profile.data.id) ||
                (instance.requestID === profile.data.id && instance.responseID === user.id),
        );
        deleteFriend({
            pathParams: { instanceId: target.id },
        });
    }, [ user, friendList, responseList, requestList ]);
    const handleAddFriend = useCallback(() => {
        addFriend({
            data: { responseID: user.id },
        });
    }, [ user ]);

    const getGroupButtonNum = useCallback(() => {
        switch (groupButtonType) {
                        case 'friend':
                            return (
                                <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                    <Button color="green" leftIcon={<IconUserCheck size={23} />}>
                            Friend
                                    </Button>
                                    <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button>
                                </Group>
                            );
                        case 'request':
                            return (
                                <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                    <Button
                                        onClick={handleDeleteFriend}
                                        color="red"
                                        leftIcon={<IconUserCheck size={23} />}
                                    >
                            Cancel Request
                                    </Button>
                                    <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button>
                                </Group>
                            );
                        case 'response':
                            return (
                                <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                    <Menu>
                                        <Menu.Target>
                                            <Button color="violet" leftIcon={<IconUserCheck size={23} />}>
                                    Respond
                                            </Button>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item onClick={handleAcceptRequest}>Confirm</Menu.Item>
                                            <Menu.Item onClick={handleDeleteFriend}>Delete Request</Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                    <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button>
                                </Group>
                            );
                        case 'me':
                            return (
                                <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                    <Button leftIcon={<IconPlus size={23} />}>Add your story</Button>
                                    <Button color="pink" leftIcon={<IconPencil size={23} />}>
                            Edit profile
                                    </Button>
                                </Group>
                            );
                        case 'no':
                            return (
                                <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                    <Button
                                        onClick={handleAddFriend}
                                        color="gray"
                                        leftIcon={<IconUserPlus size={23} />}
                                    >
                            Add Friend
                                    </Button>
                                    <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button>
                                </Group>
                            );
                        default:
                            return <></>;
        }
    }, [ groupButtonType ]);

    useEffect(() => {
        if (friendList && requestList && responseList) {
            if (user.id != profile.data.id) {
                let isFriend = friendList.data.find(
                    (friend) =>
                        (friend.responseID == user.id && friend.requestID == profile.data.id) ||
                        (friend.responseID == profile.data.id && friend.requestID == user.id),
                );
                let isRequest = requestList.data.find((request) => request.responseID == user.id);
                let isResponse = responseList.data.find(
                    (response) => response.requestID == user.id,
                );

                isFriend && setGroupButtonType('friend');
                isRequest && setGroupButtonType('request');
                isResponse && setGroupButtonType('response');
                !isFriend && !isRequest && !isResponse && setGroupButtonType('no');
            } else {
                setGroupButtonType('me');
            }
        }
    }, [ friendList, requestList, responseList, user ]);

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);
    return (
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl m-3">
                <CoverComponent user={user} />
            </div>
            <div className="card-body p-0 position-relative d-sm-flex">
                <AvatarComponent user={user} />

                <h4 className="d-inline-block fw-700 font-sm mt-2 mb-lg-2 mb-0 pl-15 me-2">
                    {user.first_name} {user.last_name}
                    {}{' '}
                    <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
                        {user.email}
                    </span>
                </h4>
                {groupButtonType && getGroupButtonNum(groupButtonType)}
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
