import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Group, Button, useMantineTheme, Input, Text, ScrollArea } from '@mantine/core';
import { useAuth, useFriend } from '@services/controller';
import { IconSearch } from '@tabler/icons-react';


const AddPeopleModal = (props) => {
    const { opened, onClose, roomDetail } = props;

    const { profile, profileLoading, profileError } = useAuth();
    const { friendListDetail, friendListDetailLoading, friendListError } = useFriend(profile.data.id);

    const [ currentUser, setCurrentUser ] = useState(null);
    const [ addMembers, setAddMembers ] = useState([]);
    const [ friends, setFriends ] = useState([]);

    const theme = useMantineTheme();

    const initFriendsNotInMembers = useCallback((members, friends) => {
        const memberIds = members.map(member => member.user.id); // get array of member ids
        friends = friends.map(friend => friend.requestID.id == currentUser.id ? friend.responseID : friend.requestID); // get array of friend ids
        const updatedFriends = friends.filter(friend => !memberIds.includes(friend.id)); // filter out friends with ids that match member ids
        setFriends(updatedFriends); // update state for friends
    }, [ currentUser ]);

    useEffect(() => {
        if (profile && !profileLoading) {
            setCurrentUser(profile.data);
        }
    }, [ profileLoading ]);

    useEffect(() => {
        if (friendListDetail && !friendListDetailLoading && currentUser) {
            initFriendsNotInMembers(roomDetail.members, friendListDetail.data);
        }
    }, [ friendListDetailLoading, currentUser ]);

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
                <div className='search-region'>
                    <Input icon = {<IconSearch />} radius={"md"} />
                </div>
                <div className='friends-selected'>
                    {addMembers.length === 0 ? (
                        <Text
                            className='d-flex justify-content-center pt-5'
                        >
                            No users selected
                        </Text>
                    ): (
                        <div></div>
                    )}
                </div>
                <div className='friend-list pt-5'>
                    {friends.length > 0 && (
                        <ScrollArea
                            type="auto" h={250} offsetScrollbars scrollbarSize={8}
                        >
                            
                        </ScrollArea>
                    )}
                </div>
                <div>
                    <Button
                        fullWidth
                        disabled={addMembers.length === 0}
                    >
                        Add people
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default AddPeopleModal;
