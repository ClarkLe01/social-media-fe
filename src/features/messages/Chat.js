import React, { useEffect } from 'react';
import {
    Grid,
    Text,
    ScrollArea,
    ActionIcon,
    Input,
} from '@mantine/core';
import {
    IconEdit,
    IconSearch,
} from '@tabler/icons-react';
import { useScrollLock } from '@mantine/hooks';

import { useRoom } from '@services/controller';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MainChat, Rooms } from './components';
import { navigatePath } from '@app/routes/config';


function Chat() {
    useScrollLock(true);
    let { roomId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { RoomList, RoomListLoading } = useRoom();

    const handleNavigateToCreateRoom = () => {
        navigate(`../${navigatePath.newChat}`, { state: { from: undefined } });
    };
    
    useEffect(() => {
        if (roomId === undefined && !RoomListLoading && RoomList.data.length > 0) {
            roomId = RoomList.data[0].id;
            navigate(`${location.pathname}/${roomId}`, { state: { from: undefined } });
        }
    }, [ roomId, RoomList, RoomListLoading, location.pathname, navigate ]);

    return (
        <div className="row">
            <Grid grow gutter="sm" className="p-0" columns={24}>
                <Grid.Col span={'content'} className="border border-1 border-bottom-0 p-0 py-1">
                    <div className="aside-chat-heading mb-2">
                        <div className="d-flex mx-3">
                            <Text fw={700} fz="xl" className="me-auto">
                                Chats
                            </Text>
                            <div>
                                <ActionIcon
                                    onClick={handleNavigateToCreateRoom}
                                >
                                    <IconEdit />
                                </ActionIcon>
                            </div>
                        </div>
                        <div className="mx-3">
                            <Input
                                icon={<IconSearch size={12} />}
                                placeholder="Search Messenger"
                                radius="xl"
                                size="xs"
                            />
                        </div>
                    </div>
                    <div className="list-messengers">
                        <ScrollArea
                            style={{ height: 'calc(100vh - 140px)' }}
                            type="scroll"
                            offsetScrollbars
                            scrollbarSize={4}
                        >
                            {RoomList && <Rooms rooms={RoomList.data} />}
                        </ScrollArea>
                    </div>
                </Grid.Col>
                <Grid.Col span={16} className="border-bottom-0 p-0 py-0">
                    {roomId ? <MainChat roomId={roomId} /> :<>  </>}
                </Grid.Col>
            </Grid>
        </div>
    );
}

export default Chat;
