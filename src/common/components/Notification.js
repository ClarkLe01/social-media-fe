import { 
    IconBellFilled, 
} from '@tabler/icons-react';

import React, { useEffect, useState, useRef } from 'react';
import { ScrollArea, Popover, ActionIcon, Grid, Avatar, Image, AspectRatio } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useNotification } from '@services/controller';
import Socket, { connections } from '@services/socket';
import NotificationItem from './NotificationItem';
import { useQueryClient } from '@tanstack/react-query';
import EmptyStateIllustration from '@assets/svgs/empty-state.svg';

function Notification() {

    const queryClient = useQueryClient();
    const { notificationList, notificationListLoading } = useNotification();
    const [ notifications, setNotifications ] = useState([]);
    const socketClientRef = useRef(null);
    const [ waitingToReconnect, setWaitingToReconnect ] = useState(null);
    
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

            socket.onerror = (e) => console.error(e);
            socket.onopen = () => {
                console.log('open connection');
            };
            
            socket.close = () => {
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
            socket.onmessage = (data) => {
                if(data){
                    data = JSON.parse(data.data);
                    if(data.value){
                        queryClient.invalidateQueries({ queryKey: [ "notifications" ] });
                        setNotifications([ data.value, ...notifications ]);
                    }
                }
                
            };
            
            return () => {
                console.log('Cleanup');
                // Dereference, so it will set up next time
                socketClientRef.current = null;
        
                socket.close();
            };
        }
    
    }, [ waitingToReconnect, notifications ]);
    if (notificationListLoading) return <div>Loading...</div>;
    return (
        <React.Fragment>
            <Popover 
                classNames = {{
                    dropdown: 'pt-0',
                }}
                position="bottom-end" 
                width={370} 
                withArrow
            >
                <Popover.Target>
                    <ActionIcon className="ms-auto">
                        <IconBellFilled />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown className='px-0 '>
                    <div className="d-flex px-3 pt-3 border-bottom">
                        <h4 className="fw-700 font-xss mb-4 me-auto">Notification</h4>
                        <Link to="/notification" className="fw-700 font-xssss mb-4">
                            See all
                        </Link>
                    </div>
                    {notifications.length == 0 ? (
                        <AspectRatio ratio={4/3}>
                            <Image src={EmptyStateIllustration}/>
                        </AspectRatio>
                        
                    ) : (
                        <ScrollArea
                            style={{ height: 500 }}
                            type="scroll"
                            offsetScrollbars
                            scrollbarSize={6}
                        >
                            {notifications.map((item, index) => {
                                return <NotificationItem key={index} item={item} />;
                            })}
                        </ScrollArea>
                    )}
                </Popover.Dropdown>
            </Popover>
        </React.Fragment>
    );
}
export default Notification;
