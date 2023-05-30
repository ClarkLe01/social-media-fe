import { navigatePath } from '@app/routes/config';
import AvatarDisplay from '@features/messages/components/AvatarDisplay';
import RoomNameDisplay from '@features/messages/components/RoomNameDisplay';
import { ActionIcon, Avatar, Group, Modal, Text, Tooltip } from '@mantine/core';
import { useAuth, useMessage } from '@services/controller';
import useCall from '@services/controller/useCall';
import { IconPhoneOff } from '@tabler/icons-react';
import { IconPhoneIncoming } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

const InComingCall = ({
    opened,
    setOpened,
    roomId,
    roomChatId,
    token,
    fromUser,
    sessionId,
    hasVideo,
    isGroup,
    socket,
    callData,
}) => {
    const { profile } = useAuth();
    const { RoomDetail, RoomDetailError, RoomDetailLoading } = useMessage(roomChatId);
    const [ roomChatCall, setRoomChatCall ] = useState(null);
    const { validateMeeting, endMeeting, acceptCall, rejectCall } = useCall();
    const handleAcceptCall = async () => {
        setOpened(false);
        const response = await validateMeeting(token, roomId);
        if(response && response.roomId === roomId){
            const properties = `?hasVideo=${hasVideo}&isGroup=${isGroup}&roomChatId=${roomChatId}&sessionId=${sessionId}`;
            const url = navigatePath.videoCall.replace(":roomCallId", roomId).replace(":roomCallToken", token)+properties;
            window.open(url,"_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=600");
            await acceptCall(token, roomId);
        } else alert("Invalid Meeting Id");
    };

    const handleRejectCall = async () => {
        await rejectCall(token, roomId);
        setOpened(false);
    };

    useEffect(() => {
        if (RoomDetail && !RoomDetailLoading) {
            setRoomChatCall(RoomDetail?.data);
            console.log('RoomDetail', RoomDetail.data);
        }
    }, [ roomChatId, RoomDetailLoading, RoomDetail ]);


    return (
        <Modal
            opened={opened}
            closeOnClickOutside={false}
            centered
            onClose={() => setOpened(false)}
            styles={{
                body: {
                    background: "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
                },
                header: {
                    background: "radial-gradient(rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
                },
                
            }}
        >
            <div 
                className='d-flex justify-content-center align-items-center'
            >
                <div className='px-auto pt-2'>
                    <Group position="center">
                        {roomChatCall ? (
                            <AvatarDisplay
                                size={"xl"}
                                isGroup={roomChatCall.isGroup}
                                members={roomChatCall.members}
                                currentUser={profile.data}
                                avatar={roomChatCall.roomAvatar}
                            />
                        ) : (
                            <Avatar
                                size={"xl"}
                                src="avatar.png"
                                alt="it's me"
                            />
                        )}
                    </Group>
                    <Group position="center" className='mt-2'>
                        {roomChatCall && RoomDetail.data && (
                            <RoomNameDisplay
                                members={RoomDetail.data.members}
                                currentUser={profile.data}
                                isGroup={RoomDetail.data.isGroup}
                                roomName={RoomDetail.data.roomName}
                                size={"xl"}
                                fw={700} 
                                color="white"
                            />
                        )}
                    </Group>
                    <Group position="center" className='pt-2'>
                        <Text c="dimmed" size={"xs"} color='white'>Incoming...</Text>
                    </Group>
                    <div className='d-flex justify-content-evenly pt-3'>
                        <Group position="center">
                            <Tooltip label="Accept Call">
                                <ActionIcon 
                                    variant="filled" 
                                    size={45} 
                                    radius={"100%"} 
                                    color="teal"
                                    onClick={handleAcceptCall}
                                >
                                    <IconPhoneIncoming size={24} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="End Call">
                                <ActionIcon 
                                    variant="filled" 
                                    size={45} 
                                    radius={"100%"} 
                                    color="red"
                                    onClick={handleRejectCall}
                                >
                                    <IconPhoneOff size={24} />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default InComingCall;
