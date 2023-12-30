import { 
    IconBellFilled, 
} from '@tabler/icons-react';

import React, { useEffect, useState } from 'react';
import { ScrollArea, Popover, ActionIcon, Image, AspectRatio, Indicator } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useNotification } from '@services/controller';
import NotificationItem from './NotificationItem';

import EmptyStateIllustration from '@assets/svgs/empty-state.svg';
import InComingCall from '@features/call/components/InComingCall';

function Notification(props) {
    const { notificationList, notificationListLoading } = useNotification();
    const [ notifications, setNotifications ] = useState([]);
    const [ openedNotification, setOpenedNotification ] = useState(false);
    
    useEffect(() => {
        if (!notificationListLoading) {
            setNotifications([ ...notificationList.data ]);
        }
    }, [ notificationList ]);
    
    
    if (notificationListLoading) return <div>Loading...</div>;
    return (
        <React.Fragment>
            {props.callData && props.socketClientRef.current && (
                <InComingCall 
                    opened={props.incomingCallModal}
                    setOpened={props.setIncomingCallModal}
                    roomId={props.callData.roomId}
                    roomChatId={props.callData.toRoomChat}
                    token={props.callData.token}
                    fromUser={props.callData.fromUser}
                    sessionId={props.callData.sessionId}
                    hasVideo={true}
                    isGroup={false}
                    socket={props.socketClientRef.current}
                    callData={props.callData}
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
                        <Indicator
                            inline
                            offset={4}
                            position="bottom-start"
                            color="red"
                            withBorder
                            disabled={props.isNewNotification}
                        >
                            <IconBellFilled />
                        </Indicator>
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
