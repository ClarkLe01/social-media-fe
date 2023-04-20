import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    IconChecks,
    IconTrashX,
    IconSettings,
} from '@tabler/icons-react';
import { ActionIcon, Menu } from '@mantine/core';
import useNotification from '@services/controller/useNotification';
import Socket, { connections } from '@services/socket';
import NotificationItem from './components/NotificationItem';
import { useQueryClient } from '@tanstack/react-query';

function Notification() {
    const queryClient = useQueryClient();
    const { 
        notificationList, 
        notificationListLoading, 
        updateNotificationItem,
        deleteNotificationItem,
    } = useNotification();
    const [ notifications, setNotifications ] = useState([]);
    const socketClientRef = useRef(null);
    const [ waitingToReconnect, setWaitingToReconnect ] = useState(null);

    const handleMaskAllAsRead = useCallback(() => {
        if(notifications.length > 0){
            notifications.map(item => {
                if(item.read === false){
                    updateNotificationItem({
                        pathParams: { instanceId: item.id },
                    });
                }
            });
        }
        
        
    }, [ notificationList ]);

    const handleDeleteAll = useCallback(() => {
        if(notifications.length > 0){
            notifications.map(item => {
                deleteNotificationItem({
                    pathParams: { instanceId: item.id },
                });
            });
        }
    }, [ notificationList ]);

    useEffect(() => {
        if (!notificationListLoading) {
            setNotifications([ ...notificationList.data ]);
        }
    }, [ notificationList ]);

    useEffect(() => {
        if (waitingToReconnect) {
            return;
        }

        if (!socketClientRef.current) {
            const socket = new Socket(connections.notification).private();
            socketClientRef.current = socket;

            socketClientRef.current.onerror = (e) => console.error(e);
            socketClientRef.current.onopen = () => {
                console.log('open connection');
            };

            socketClientRef.current.close = () => {
                if (socketClientRef.current) {
                    // Connection failed
                    console.log('ws closed by server');
                } else {
                    // Cleanup initiated from app side, can return here, to not attempt a reconnect
                    console.log('ws closed by app component unmount');
                    return;
                }
                if (waitingToReconnect) {
                    return;
                }
                console.log('ws closed');
                setWaitingToReconnect(true);
            };
            socketClientRef.current.onmessage = (data) => {
                console.log('data notification', data);
                if (data) {
                    data = JSON.parse(data.data);
                    if (data.value) {
                        queryClient.invalidateQueries({ queryKey: [ "notifications" ] });
                        setNotifications([ data.value, ...notifications ]);
                    }
                }
            };

            return () => {
                console.log('Cleanup');
                // Dereference, so it will set up next time
                socketClientRef.current.close();
                socketClientRef.current = null;

                socket.close();
            };
        }
    }, [ waitingToReconnect, notifications ]);

    if (notificationListLoading) return <div>Loading...</div>;

    return (
        <div className='mx-sm-2'>
            <div className="chat-wrapper py-3 scroll-bar bg-white theme-dark-bg">
                <h2 className="fw-700 pb-4 mt-2 px-4 font-md text-grey-900 d-flex align-items-center border-bottom">
                    Notification
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
                                    onClick={() => handleMaskAllAsRead()}
                                >
                                    Marks all as read
                                </Menu.Item>
                                <Menu.Item
                                    icon={<IconTrashX color="red" size={24} />}
                                    onClick={() => handleDeleteAll()}
                                >
                                    Clear All
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </h2>
                {notifications.map((item, index) => (
                    <div key={index}>
                        <NotificationItem item={item} />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Notification;
