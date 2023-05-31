import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Text, Input, Button, useMantineTheme, Group } from '@mantine/core';
import { useRoom } from '@services/controller';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

const ChangeChatRoomNameModal = (props) => {
    const { roomDetail, opened, onClose } = props;
    const [ updateRoomName, setUpdateRoomName ] = useState(roomDetail.roomName);

    const { updateRoom, updateRoomError, updateRoomLoading } = useRoom();

    const theme = useMantineTheme();
    const queryClient = useQueryClient();

    const handleUpdateRoom = () => {
        const form = new FormData();
        form.append('roomName', updateRoomName);
        updateRoom(
            {
                pathParams: { roomId: roomDetail.id },
                data: form,
            },
            {
                onSuccess: (data) => {
                    console.log('ChangeChatRoomNameModal handleUpdateRoom onSuccess', data);
                    notifications.show({
                        id: 'notify-success-update-group-name',
                        withCloseButton: true,
                        autoClose: 5000,
                        title: "Success",
                        message: 'You updated group name successfully!',
                        color: 'teal',
                        icon: <IconCheck />,
                        loading: false,
                    });
                    queryClient.invalidateQueries({ queryKey: [ "room/list" ] });
                    queryClient.invalidateQueries({ queryKey: [ `room/detail/${roomDetail.id}` ] });
                },
                onError: (error) => {
                    notifications.show({
                        id: 'notify-failed-update-group-avatar',
                        withCloseButton: true,
                        autoClose: 5000,
                        title: "Failed",
                        message: 'You updated your group name unsuccessfully!',
                        color: 'red',
                        icon: <IconX />,
                        loading: false,
                    });
                    console.log('ChangeChatRoomNameModal handleUpdateRoom onError', error);
                },
            },
        );
        onClose();
    };

    useEffect(() => {
        return () => {
            setUpdateRoomName(roomDetail.roomName);
        };
    }, [ ]);
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Change Room Name"
            overlayProps={{
                color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
            withCloseButton
            classNames={{
                title: 'ms-auto',
            }}
            centered
        >
            <Input.Wrapper
                description="Changing the name of a group chat changes it for everyone."
            >
                <Input value={updateRoomName} onChange={(e) => setUpdateRoomName(e.currentTarget.value)} placeholder="Chat name" />
            </Input.Wrapper>
            <Button.Group className='d-flex gap-2 pt-2'>
                <Button
                    fullWidth
                    color="gray"
                    onClick={onClose}
                >
                        Cancel
                </Button>
                <Button
                    fullWidth
                    color="blue" 
                    onClick={handleUpdateRoom}
                    disabled={updateRoomName===roomDetail.roomName}
                >
                    Save
                </Button>
            </Button.Group>
        </Modal>
    );
};

export default ChangeChatRoomNameModal;
