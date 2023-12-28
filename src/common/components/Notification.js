import { 
    IconBellFilled, 
} from '@tabler/icons-react';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ScrollArea, Popover, ActionIcon, Image, AspectRatio } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useNotification } from '@services/controller';
import Socket, { connections } from '@services/socket';
import NotificationItem from './NotificationItem';
import { useQueryClient } from '@tanstack/react-query';
import EmptyStateIllustration from '@assets/svgs/empty-state.svg';
import InComingCall from '@features/call/components/InComingCall';
import useCall from '@services/controller/useCall';

function Notification() {

    const queryClient = useQueryClient();
    const { notificationList, notificationListLoading } = useNotification();
    const [ notifications, setNotifications ] = useState([]);
    const socketClientRef = useRef(null);
    const [ waitingToReconnect, setWaitingToReconnect ] = useState(null);
    const [ openedNotification, setOpenedNotification ] = useState(false);

    const [ incomingCallModal, setIncomingCallModal ] = useState(false);

    const [ callData, setCallData ] = useState(null);
    
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
                    if(data.value && data.type == 'notify'){
                        queryClient.invalidateQueries({ queryKey: [ "notifications" ] });
                        // setNotifications([ data.value, ...notifications ]);
                    }
                    if(data.value && data.type == 'calling'){
                        if(callData == null){
                            setCallData(data.value);
                            setIncomingCallModal(true);
                        } 
                    }
                    if(data.value && data.type == 'endCall' && callData.roomId == data.value.roomId){
                        setCallData(null);
                        setIncomingCallModal(false);
                    }
                    if(data.type == 'message'){
                        queryClient.invalidateQueries({ queryKey: [ "room/list" ] });
                    }
                }
                
            };

            const alertOnlineInterval = setInterval(() => {
                socket.send(JSON.stringify({ type: 'ping' }));
            }, 20000);
            
            return () => {
                console.log('Cleanup');
                // Dereference, so it will set up next time
                clearInterval(alertOnlineInterval);
                socketClientRef.current = null;
                socket.close();
            };
        }
    
    }, [ waitingToReconnect, notifications ]);
    if (notificationListLoading) return <div>Loading...</div>;
    return (
        <React.Fragment>
            {callData && socketClientRef.current && (
                <InComingCall 
                    opened={incomingCallModal}
                    setOpened={setIncomingCallModal}
                    roomId={callData.roomId}
                    roomChatId={callData.toRoomChat}
                    token={callData.token}
                    fromUser={callData.fromUser}
                    sessionId={callData.sessionId}
                    hasVideo={true}
                    isGroup={false}
                    socket={socketClientRef.current}
                    callData={callData}
                />
            )}
            
            <Popover 
                classNames = {{
                    dropdown: 'pt-0',
                }}
                position="bottom-end" 
                width={370}
                withArrow
                opened={openedNotification} onChange={setOpenedNotification}
            >
                <Popover.Target>
                    <ActionIcon className="ms-auto" onClick={() => setOpenedNotification((o) => !o)}>
                        <IconBellFilled />
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown className='px-0 '>
                    <div className="d-flex px-3 pt-3 border-bottom">
                        <h4 className="fw-700 font-xss mb-4 me-auto">Notification</h4>
                        <Link to="/notification" onClick={() => setOpenedNotification(false)} className="fw-700 font-xssss mb-4">
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
