import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    IconUserPlus,
    IconUserCheck,
    IconBrandMessenger,
    IconPencil,
    IconFriends,
    IconBookmark,
    IconBrandYoutube,
    IconPhoto,
    IconId,
    IconUser,
    IconCake,
    IconGenderMale,
    IconCheck,
    IconX,
    IconSquare,
    IconSquarePlus,
    IconSquareCheck,
    IconSquareCheckFilled,
    IconChevronDown,
    IconAlarmSnooze,
    IconAlarm,
} from '@tabler/icons-react';
import {
    Button,
    Group,
    Menu,
    Modal,
    Divider,
    ActionIcon,
} from '@mantine/core';

import { useAuth, useFriend, useProfile } from '@services/controller';

import AvatarComponent from './AvatarComponent';
import CoverComponent from './CoverComponent';
import Input from '@common/components/Input';
import DateTimePicker from '@common/components/DatetimePicker';
import Selector from '@common/components/Selector';
import { notifications } from '@mantine/notifications';

function ProfileCard(props) {

    const { user } = props;
    const { profile } = useAuth();
    const { friendList, requestList, responseList, addFriend, acceptRequest, deleteFriend } = useFriend(profile.data.id);
    const [ dimensions, setDimensions ] = useState({ width: 400, height: 182 });
    const isHide = dimensions.width < 405 ? true : false;
    const [ groupButtonType, setGroupButtonType ] = useState(null);


    const [ openedEditProfile, setOpenedEditProfile ] = useState(false);
    const { saveLoading } = useAuth();
    const { updateProfile } = useProfile(profile.data.id);
    const [ firstName, setFirstName ] = useState(profile.data.first_name);
    const [ lastName, setLastName ] = useState(profile.data.last_name);
    const [ gender, setGender ] = useState(profile.data.gender);
    const [ birthday, setBirthday ] = useState(new Date(profile.data.birthday));

    const genderOptions = [ 
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'nonbinary', label: 'Non-binary' },
    ];

    const dateString = birthday.getFullYear() + "-" +
        ("0" + (birthday.getMonth() + 1)).slice(-2) + "-" +
        ("0" + birthday.getDate()).slice(-2);

    const handleChangeGender = (e) => {
        setGender(e);
    };

    const handleUpdateProfile = () => {
        const form = new FormData();
        if (firstName != "") form.append('first_name', firstName);
        if (lastName != "") form.append('last_name', lastName);
        if (gender != "") form.append('gender', gender);
        if (dateString != "") form.append('birthday', dateString);
        updateProfile(
            {
                data: form,
            }, 
            {
                onSuccess: (data) => {
                    notifications.show({
                        id: 'notify-success-update-profile',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: "Success ",
                        message: 'You updated your profile successfully!',
                        color: 'teal',
                        icon: <IconCheck />,
                        loading: false,
                    });
                },
                onError: (error) => {
                    notifications.show({
                        id: 'notify-failed-update-profile',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: "Failed",
                        message: 'You updated your profile unsuccessfully!',
                        color: 'red',
                        icon: <IconX />,
                        loading: false,
                    });
                },
            });
        setOpenedEditProfile(false);
    };


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

    const getGroupButtonNum = () => {
        switch (groupButtonType) {
                        case 'friend':
                            return (
                                <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                    <Button color="green" leftIcon={<IconUserCheck size={23} />}>
                                        Friend
                                    </Button>
                                    {/* <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button> */}
                                </Group>
                            );
                        case 'request':
                            return (
                                <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                    <Button leftIcon={<IconSquareCheckFilled size={23} />}>Following</Button>
                                    <Button
                                        onClick={handleDeleteFriend}
                                        color="red"
                                        leftIcon={<IconUserCheck size={23} />}
                                    >
                                        Cancel Request
                                    </Button>
                                    {/* <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button> */}
                                </Group>
                            );
                        case 'response':
                            return (
                                <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                    <Button leftIcon={<IconBrandMessenger size={23} />}>Follow</Button>
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
                                    {/* <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button> */}
                                </Group>
                            );
                        case 'me':
                            return (
                                <>
                                    <Modal
                                        opened={openedEditProfile}
                                        onClose={() => setOpenedEditProfile(false)}
                                        title={<div
                                            className="d-flex justify-content-center ">
                                            <h1 className="fw-bold mx-auto pt-2">
                                                Edit Your Profile
                                            </h1>
                                        </div>
                                        }
                                        classNames={{
                                            header: 'd-flex justify-content-between',
                                            title: 'flex-fill mx-auto pe-2 mt-1',
                                        }}
                                    >

                                        <form onSubmit={handleUpdateProfile}
                                            className='pt-1'>
                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                <div>
                                                    <Divider my="xs" label="First name" />
                                                    <Input
                                                        name="firstName"
                                                        icon={<IconUser />}
                                                        type="text"
                                                        placeHolder="First Name"
                                                        value={firstName}
                                                        onChange={e => setFirstName(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <Divider my="xs" label="Last name" />
                                                    <Input
                                                        name="lastName"
                                                        icon={<IconUser />}
                                                        type="text"
                                                        placeHolder="Last Name"
                                                        value={lastName}
                                                        onChange={e => setLastName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <Divider my="xs" label="Gender" />
                                            <Selector
                                                name="gender"
                                                icon={<IconGenderMale />}
                                                placeHolder="Choose your gender"
                                                options={genderOptions}
                                                value={gender}
                                                onChange={e => handleChangeGender(e)}
                                            />
                                            <div className='pb-4'>
                                                <Divider my="xs" label="Birthday" />
                                                <DateTimePicker
                                                    name="birthday"
                                                    icon={<IconCake />}
                                                    placeHolder="Pick your birthday"
                                                    value={birthday}
                                                    onChange={e => setBirthday(e)}
                                                />
                                            </div>

                                            <div className="col-sm-12 p-0 text-left">
                                                <Button
                                                    // type="submit"
                                                    className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                                                    loading={saveLoading}
                                                    onClick={handleUpdateProfile}
                                                >
                                                    {saveLoading ? 'Save...' : 'Save'}
                                                </Button>
                                            </div>
                                        </form>
                                    </Modal>
                                    <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                        {/* <Button onClick={() => console.log(openedEditProfile)} leftIcon={<IconPlus size={23} />}>Add your story</Button> */}
                                        <Button onClick={() => setOpenedEditProfile(true)} color="pink" leftIcon={<IconPencil size={23} />}>
                                            Edit your profile
                                        </Button>
                                    </Group>
                                </>
                            );
                        case 'no':
                            return (
                                <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                    <Button leftIcon={<IconSquarePlus size={23} />}>Follow</Button>     
                                    <Button
                                        onClick={handleAddFriend}
                                        color="gray"
                                        leftIcon={<IconUserPlus size={23} />}
                                    >
                                        Add Friend
                                    </Button>

                                    <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button>
                                    <Menu>
                                        <Menu.Target>
                                            <ActionIcon variant="filled">
                                                <IconChevronDown size={23} />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item 
                                                onClick={handleAcceptRequest}
                                                icon={<IconAlarmSnooze color="red" size={23}/>}
                                            >
                                                Turn off notification
                                            </Menu.Item>
                                            <Menu.Item 
                                                onClick={handleAcceptRequest}
                                                icon={<IconAlarm color="blue" size={23}/>}
                                            >
                                                Turn on notification
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                    

                                </Group>
                            );
                        default:
                            return <></>;
        }
    };

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
    }, [  ]);
    return (
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl m-3">
                <CoverComponent user={user} />
            </div>
            <div className="card-body p-0 position-relative d-sm-flex">
                <AvatarComponent user={user} />

                <h4 className="d-inline-block fw-700 font-sm mt-2 mb-lg-2 mb-0 pl-15 me-2">
                    {user.first_name} {user.last_name}
                    { }{' '}
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
                        <Link
                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                            to={`/profile/${user.id}`}
                        >
                            Posts
                        </Link>
                    </li>
                    <li className="list-inline-item me-5">
                        <Link
                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                            to={`/profile/${user.id}/about`}
                        >
                            About
                        </Link>
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
                                <Link
                                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                    to={`/profile/${user.id}/friends`}
                                >
                                    Friends
                                </Link>
                            </li>
                            <li className="list-inline-item me-5">
                                <Link
                                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                    to={`/profile/${user.id}/photos`}
                                >
                                    Photos
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
export default ProfileCard;
