import React, { useEffect, useState } from 'react';
import {
    IconCheck,
    IconSquareX,
    IconDots,
    IconUserPlus,
    IconFriends,
    IconBook,
    IconMessageCircle,
    IconArticle,
    IconX,
    IconAlarmOff,
    IconAlarmSnooze,
    IconAlarm,
} from '@tabler/icons-react';
import { ActionIcon, Menu, Avatar, Grid, Text, Flex, Button } from '@mantine/core';
import {
    ReactHaha,
    ReactLike,
    ReactLove,
    ReactSad,
    ReactWow,
    ReactAngry,
} from '@assets/images/reaction';
import { useProfile, useNotification, useAuth, useFriend } from '@services/controller';
import { useQueryClient } from '@tanstack/react-query';
import { API_URL, MEDIA_URL } from '@constants';
import { notifications } from '@mantine/notifications';

function NotificationItem(props) {
    const { item } = props;
    const { profileId } = useProfile(item.senderID);
    const { profile } = useAuth();
    const { deleteFriend, acceptRequest } = useFriend(profile.data.id);
    const { muteUserIds, muteUserIdsLoading, unMuteUser, muteUser } = useProfile(profile.data.id);
    const [ sender, setSender ] = useState(null);
    const [ muteIds, setMuteIds ] = useState([]);
    const [ timeDifference, setTimeDifference ] = useState(
        Math.floor((new Date() - new Date(item.created)) / 1000),
    );
    const [ isHover, setIsHover ] = useState(false);
    const { updateNotificationItem, deleteNotificationItem } = useNotification();
    const queryClient = useQueryClient();
    const handleMaskReadNotification = () => {
        updateNotificationItem(
            {
                pathParams: { instanceId: item.id },
            },
            {
                onSuccess: (data) => {
                    console.log(data);
                    queryClient.invalidateQueries({ queryKey: [ `notifications` ] });
                },
                onError: (error) => {
                    console.log(error);
                },
            },
        );
    };

    const handleDeleteNotification = () => {
        deleteNotificationItem(
            {
                pathParams: { instanceId: item.id },
            },
            {
                onSuccess: (data) => {
                    console.log(data);
                    queryClient.invalidateQueries({ queryKey: [ `notifications` ] });
                },
                onError: (error) => {
                    console.log(error);
                },
            },
        );
    };

    const handleMuteUserNotification = () => {
        muteUser(
            {
                data: {
                    userId: item.senderID,
                },
            },
            {
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: [ `mutes/${profile.data.id}` ] });
                    notifications.show({
                        id: 'notify-success-mute-user',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: 'Success',
                        message: 'You mute this user successfully!',
                        color: 'teal',
                        icon: <IconCheck />,
                        loading: false,
                    });
                },
                onError: (error) => {
                    queryClient.invalidateQueries({ queryKey: [ `mutes/${profile.data.id}` ] });
                    notifications.show({
                        id: 'notify-failed-mute-user',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: 'Failed',
                        message: 'You mute this user unsuccessfully!',
                        color: 'red',
                        icon: <IconX />,
                        loading: false,
                    });
                },
            },
        );
    };

    const handleUnMuteUserNotification = () => {
        unMuteUser(
            {
                data: {
                    userId: item.senderID,
                },
            },
            {
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: [ `mutes/${profile.data.id}` ] });
                    notifications.show({
                        id: 'notify-success-unmute-user',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: 'Success',
                        message: 'You unmute this user successfully!',
                        color: 'teal',
                        icon: <IconCheck />,
                        loading: false,
                    });
                },
                onError: (error) => {
                    queryClient.invalidateQueries({ queryKey: [ `mutes/${profile.data.id}` ] });
                    notifications.show({
                        id: 'notify-failed-unmute-user',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: 'Failed',
                        message: 'You unmute this user unsuccessfully!',
                        color: 'red',
                        icon: <IconX />,
                        loading: false,
                    });
                },
            },
        );
    };

    const handleCancel = (id) => {
        deleteFriend({
            pathParams: { instanceId: id },
        });
    };
    const handleAccept = (id) => {
        acceptRequest({
            pathParams: { instanceId: id },
        });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const givenDate = new Date(item.created);
            const currentDate = new Date();
            const difference = Math.floor((givenDate - currentDate) / 1000);
            setTimeDifference(Math.abs(difference));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [ item ]);

    useEffect(() => {
        if (muteUserIds && !muteUserIdsLoading) {
            setMuteIds([ ...muteUserIds.data.mute ]);
        }
    }, [ muteUserIds, muteUserIdsLoading ]);

    function formatDuration(durationInSeconds) {
        if (durationInSeconds < 60) return `a seccond ago`;
        else if (durationInSeconds < 60 * 60) {
            const minutes = Math.floor(durationInSeconds / 60);
            return `${minutes} min ago`;
        } else if (durationInSeconds < 60 * 60 * 24) {
            const hours = Math.floor(durationInSeconds / (60 * 60));
            return `${hours} hr ago`;
        } else if (durationInSeconds < 60 * 60 * 24 * 7) {
            const days = Math.floor(durationInSeconds / (60 * 60 * 24));
            return `${days} day ago`;
        } else if (durationInSeconds < 60 * 60 * 24 * 14) {
            const weeks = Math.floor(durationInSeconds / (60 * 60 * 24 * 7));
            return `${weeks} week ago`;
        } else {
            return 'More than 2 weeks ago';
        }
    }

    function getIconCorrespondingToType(type) {
        let value = type.split('-')[1];
        switch (value) {
                        case 'add':
                            return (
                                <div
                                    className="justify-content-center align-items-center d-flex"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        borderRadius: '100%',
                                        width: 22,
                                        height: 22,
                                        background: '#12B886',
                                    }}
                                >
                                    <IconUserPlus color="white" size={14} />
                                </div>
                            );
                        case 'accept':
                            return (
                                <div
                                    className="justify-content-center align-items-center d-flex"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        borderRadius: '100%',
                                        width: 22,
                                        height: 22,
                                        background: '#15AABF',
                                    }}
                                >
                                    <IconFriends color="white" size={14} />
                                </div>
                            );
                        case 'comment':
                            return (
                                <div
                                    className="justify-content-center align-items-center d-flex"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        borderRadius: '100%',
                                        width: 22,
                                        height: 22,
                                        background: '#40C057',
                                    }}
                                >
                                    <IconMessageCircle color="white" size={14} />
                                </div>
                            );
                        case 'story':
                            return (
                                <div
                                    className="justify-content-center align-items-center d-flex"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        borderRadius: '100%',
                                        width: 22,
                                        height: 22,
                                        background: '#BE4BDB',
                                    }}
                                >
                                    <IconBook color="white" size={14} />
                                </div>
                            );
                        case 'post':
                            return (
                                <div
                                    className="justify-content-center align-items-center d-flex"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        borderRadius: '100%',
                                        width: 22,
                                        height: 22,
                                        background: '#3B5BDB',
                                    }}
                                >
                                    <IconArticle color="white" size={14} />
                                </div>
                            );
                        case 'like':
                            return (
                                <div
                                    size="sm"
                                    radius="xl"
                                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                                >
                                    <Avatar src={ReactLike} size={14} />
                                </div>
                            );
                        case 'love':
                            return (
                                <div
                                    size="sm"
                                    radius="xl"
                                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                                >
                                    <Avatar src={ReactLove} size={14} />
                                </div>
                            );
                        case 'haha':
                            return (
                                <div
                                    size="sm"
                                    radius="xl"
                                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                                >
                                    <Avatar src={ReactHaha} size={14} />
                                </div>
                            );
                        case 'sad':
                            return (
                                <div
                                    size="sm"
                                    radius="xl"
                                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                                >
                                    <Avatar src={ReactSad} size={14} />
                                </div>
                            );
                        case 'wow':
                            return (
                                <div
                                    size="sm"
                                    radius="xl"
                                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                                >
                                    <Avatar src={ReactWow} size={14} />
                                </div>
                            );
                        case 'angry':
                            return (
                                <div
                                    size="sm"
                                    radius="xl"
                                    style={{ position: 'absolute', bottom: 0, right: 0 }}
                                >
                                    <Avatar src={ReactAngry} size={14} />
                                </div>
                            );
                        default:
                            return;
        }
    }

    useEffect(() => {
        if (profileId) {
            setSender(profileId.data);
        }
    }, [ profileId ]);
    return (
        <>
            {sender && (
                <Grid
                    columns={12}
                    className="border-bottom py-2 w-100"
                    style={{
                        background: isHover && '#F5F5F5',
                    }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <Grid.Col span="content" className="ms-3">
                        <div style={{ position: 'relative' }}>
                            <Avatar
                                src={MEDIA_URL + sender.avatar.replace(API_URL, '')}
                                radius={'100%'}
                                size={55}
                            />
                            {getIconCorrespondingToType(item.type)}
                        </div>
                    </Grid.Col>
                    <Grid.Col span="auto">
                        <Text
                            fz={12}
                            c={item.read && 'dimmed'}
                            fw={!item.read && 600}
                            lineClamp={3}
                        >
                            <Text fw={700} fz={13} className="d-inline">
                                {sender.first_name} {sender.last_name}
                            </Text>{' '}
                            {item.content}
                        </Text>
                        <Text
                            c={item.read ? 'dimmed' : 'blue'}
                            size={12}
                            className="d-block"
                            fw={700}
                        >
                            {timeDifference !== null && formatDuration(timeDifference)}
                        </Text>
                    </Grid.Col>
                    <Grid.Col
                        span={1}
                        className="d-flex justify-content-center align-items-center p-0 pe-4 pb-4"
                    >
                        <div className="ms-auto me-2">
                            <Menu position="left-start" withArrow arrowPosition="center">
                                <Menu.Target>
                                    <ActionIcon className="pt-4" size={20}>
                                        <IconDots />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        icon={<IconCheck color="blue" size={24} />}
                                        onClick={handleMaskReadNotification}
                                    >
                                        Marks as read
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconSquareX color="red" size={24} />}
                                        onClick={handleDeleteNotification}
                                    >
                                        Remove this notification
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </div>
                    </Grid.Col>
                </Grid>
            )}
        </>
    );
}

export default NotificationItem;
