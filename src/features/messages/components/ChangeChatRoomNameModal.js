import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Text, Input, Button, useMantineTheme, Group } from '@mantine/core';

const ChangeChatRoomNameModal = (props) => {
    const { roomDetail, opened, onClose } = props;
    const [ updateRoomName, setUpdateRoomName ] = useState(roomDetail.roomName);
    const theme = useMantineTheme();

    useEffect(() => {
        return () => {
            setUpdateRoomName(roomDetail.roomName);
        };
    }, [ roomDetail ]);
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
                    color="blue" disabled={updateRoomName===roomDetail.roomName}
                >
                    Save
                </Button>
            </Button.Group>
        </Modal>
    );
};

export default ChangeChatRoomNameModal;
