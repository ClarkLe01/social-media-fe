import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Group, Button, useMantineTheme, Input, Text, ScrollArea, LoadingOverlay } from '@mantine/core';
import { useAuth, useFriend, useRoom } from '@services/controller';
import { IconSearch, IconX } from '@tabler/icons-react';
import MultiMemberSelector from '@common/components/MultiMemberSelector';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';


const AddPeopleModal = (props) => {
    const { opened, onClose, roomDetail } = props;

    const { profile, profileLoading, profileError } = useAuth();
    const { friendListDetail, friendListDetailLoading, friendListError } = useFriend(profile.data.id);

    const [ currentUser, setCurrentUser ] = useState(null);
    const [ addMembers, setAddMembers ] = useState([]);
    const [ friends, setFriends ] = useState([]);
    const [ visible, setVisible ] = useState(false);

    const { addMember } = useRoom();

    const queryClient = useQueryClient();

    const theme = useMantineTheme();

    const initFriendsNotInMembers = useCallback((members, friends) => {
        const memberIds = members.map(member => member.user.id); // get array of member ids
        friends = friends.map(friend => friend.requestID.id == currentUser.id ? friend.responseID : friend.requestID); // get array of friend ids
        const updatedFriends = friends.filter(friend => !memberIds.includes(friend.id)); // filter out friends with ids that match member ids
        setFriends(updatedFriends); // update state for friends
    }, [ currentUser ]);

    const handleAddMembers = () => {
        setVisible(true);
        addMember(
            {
                data: {
                    members: addMembers,
                    roomId: roomDetail.id,
                },
            },
            {
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: [ "room/list" ] });
                    queryClient.invalidateQueries({ queryKey: [ `room/detail/${roomDetail.id}` ] });
                    notifications.show({
                        id: 'notify-success-add-members-group',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: "Success",
                        message: 'You added members successfully!',
                        color: 'teal',
                        icon: <IconCheck />,
                        loading: false,
                    });
                },
                onError: (error) => {
                    queryClient.invalidateQueries({ queryKey: [ "room/list" ] });
                    queryClient.invalidateQueries({ queryKey: [ `room/detail/${roomDetail.id}` ] });
                    notifications.show({
                        id: 'notify-failed-add-members-group',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: "Failed",
                        message: 'You added members unsuccessfully!',
                        color: 'red',
                        icon: <IconX />,
                        loading: false,
                    });
                },
            },
        );
        setAddMembers([]);
        setVisible(false);
        onClose();
    };

    useEffect(() => {
        if (profile && !profileLoading) {
            setCurrentUser(profile.data);
        }
    }, [ profileLoading ]);

    useEffect(() => {
        if (friendListDetail && !friendListDetailLoading && currentUser) {
            initFriendsNotInMembers(roomDetail.members, friendListDetail.data);
        }
    }, [ friendListDetailLoading, currentUser, roomDetail ]);

    useEffect(() => {
        if(!friendListDetailLoading){
            console.log('AddPeopleModal friends', friends);
        }
    }, [ friends, friendListDetailLoading ]);

    useEffect(() => {
        return () => {
            setFriends([]);
            setCurrentUser(null);
            setAddMembers([]);
        };
    }, []);

    return (
        <>
            <LoadingOverlay visible={visible} overlayBlur={2} />
            <Modal
                opened={opened}
                onClose={onClose}
                title="Add People"
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}
                withCloseButton
                classNames={{
                    title: 'ms-auto',
                }}
            >
                <MultiMemberSelector
                    isIndeterminate={true}
                    radius="xl"
                    color="red"
                    data={friends}
                    onDataSelect={setAddMembers}
                    selectedFriend={addMembers}
                />
                <div className='pt-3'>
                    <Button
                        fullWidth
                        disabled={addMembers.length === 0}
                        onClick={handleAddMembers}
                    >
                        Add people
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default AddPeopleModal;
