import React from 'react';
import {
    IconChecks,
    IconCheck,
    IconSquareX,
    IconTrashX,
    IconDots,
    IconThumbUp,
    IconMoodAngry,
    IconHeart,
    IconMoodCry,
    IconMoodHappy,
    IconSettings,
} from '@tabler/icons-react';
import { ActionIcon, Menu, Group, Avatar } from '@mantine/core';

const notiList = [
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '12 minute ago',
        read: 'bg-lightblue theme-light-bg',
    },
    {
        imageUrl: 'user.png',
        name: 'Victor Exrixon',
        status: 'feather-thumbs-up bg-primary-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '45 minute ago',
        read: '',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        status: 'feather-thumbs-up bg-primary-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '1 hour ago',
        read: '',
    },
    {
        imageUrl: 'user.png',
        name: 'Goria Coast',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '2 hour ago',
        read: '',
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '5 hour ago',
        read: '',
    },
    {
        imageUrl: 'user.png',
        name: 'David Goria',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '12 hour ago',
        read: '',
    },

    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '12 minute ago',
        read: 'bg-lightblue theme-light-bg',
    },
    {
        imageUrl: 'user.png',
        name: 'Victor Exrixon',
        status: 'feather-thumbs-up bg-primary-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '45 minute ago',
        read: '',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir',
        status: 'feather-thumbs-up bg-primary-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '1 hour ago',
        read: '',
    },
    {
        imageUrl: 'user.png',
        name: 'Goria Coast',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '2 hour ago',
        read: '',
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '5 hour ago',
        read: '',
    },
    {
        imageUrl: 'user.png',
        name: 'David Goria',
        status: 'feather-heart bg-red-gradiant',
        subject: 'Mobile App Design',
        des: 'UI/UX Community : Mobile Apps UI Designer is required for Tech… ',
        attach: 'attach',
        time: '12 hour ago',
        read: 'bg-lightblue theme-light-bg',
    },
];
function Notification() {
    return (
        <div className="col-lg-12">
            <div className="chat-wrapper p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                <h2 className="fw-700 mb-4 mt-2 font-md text-grey-900 d-flex align-items-center">
                    Notification
                    <span className="circle-count bg-warning text-white font-xsssss rounded-3 ms-2 ls-3 fw-600 p-2 mt-0">
                        23
                    </span>
                    <div className="ms-auto me-2">
                        <Menu position="left-start" withArrow arrowPosition="center">
                            <Menu.Target>
                                <ActionIcon>
                                    <IconSettings />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    icon={<IconChecks color="blue" size={24} />}
                                    onClick={() => console.log('Marks all as read')}
                                >
                                    Marks all as read
                                </Menu.Item>
                                <Menu.Item
                                    icon={<IconTrashX color="red" size={24} />}
                                    onClick={() => console.log('Clear All')}
                                >
                                    Clear All
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </h2>

                <ul className="notification-box">
                    {notiList.map((value, index) => (
                        <li key={index}>
                            <div
                                className={`d-flex align-items-center p-3 rounded-3 p-0 m-0 ${value.read}`}
                            >
                                <Group>
                                    <Avatar
                                        src={`assets/images/${value.imageUrl}`}
                                        radius="xl"
                                        alt="user"
                                        classNames={{
                                            root: 'me-3',
                                        }}
                                        style={{
                                            position: 'absolute',
                                        }}
                                    />
                                    <IconThumbUp 
                                        color='blue' 
                                        size={14}
                                        style={{
                                            position: 'relative',
                                            bottom: -10,
                                            right: -25,
                                        }}
                                    />
                                </Group>

                                {/* <i
                                    className={`text-white me-2 font-xssss notification-react ${value.status}`}
                                ></i> */}
                                <a
                                    className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-500 lh-20"
                                    href="/notification"
                                >
                                    <strong>{value.name}</strong> posted in : {value.des}
                                    <span className="d-block text-grey-500 font-xssss fw-600 mb-0 mt-0 0l-auto">
                                        {' '}
                                        {value.time}
                                    </span>{' '}
                                </a>
                                <div className="ms-auto me-2">
                                    <Menu position="left-start" withArrow arrowPosition="center">
                                        <Menu.Target>
                                            <ActionIcon>
                                                <IconDots />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item
                                                icon={<IconCheck color="blue" size={24} />}
                                                onClick={() => console.log('Marks as read')}
                                            >
                                                Marks as read
                                            </Menu.Item>
                                            <Menu.Item
                                                icon={<IconSquareX color="red" size={24} />}
                                                onClick={() =>
                                                    console.log('Remove this notification')
                                                }
                                            >
                                                Remove this notification
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Notification;
