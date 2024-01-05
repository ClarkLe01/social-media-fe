import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Group, Image, Text, em } from '@mantine/core';
import { useProfile, useAuth, useFriendAction } from '@services/controller';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigatePath } from '@app/routes/config';
import { API_URL, MEDIA_URL } from '@constants';

function CardItem(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { idFriendInstance, idProfile, type } = props;
    const { profileId } = useProfile(idProfile);
    const { deleteFriend, acceptRequest, rejectRequest, cancelRequest } = useFriendAction();
    const [ user, setUser ] = useState(null);

    const handleCancelRequest = () => {
        cancelRequest({
            pathParams: { instanceId: idFriendInstance },
        });
    };

    const handleRejectRequest = () => {
        rejectRequest({
            pathParams: { instanceId: idFriendInstance },
        });
    };

    const handleDeleteFriend = () => {
        deleteFriend({
            pathParams: { instanceId: idFriendInstance },
        });
    };

    const handleAccept = () => {
        acceptRequest({
            pathParams: { instanceId: idFriendInstance },
        });
    };
    
    const goToProfile = () => {
        navigate(navigatePath.profile.replace(':userId', idProfile), { state: { from: location.pathname } });
    };
    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
        }
    }, [ profileId ]);

    return (
        <>
            {user ? (
                <Card shadow="sm" padding="lg" radius="md" withBorder >
                    <Card.Section onClick={goToProfile}>
                        <Image src={MEDIA_URL+user.avatar.replace(API_URL,'')} height={160} />
                    </Card.Section>
        
                    <Group position="apart" mt="xs" onClick={goToProfile}>
                        <Text weight={500}>
                            {user.first_name} {user.last_name}
                        </Text>
                    </Group>
                    <Box position="apart" mt={1} mb={6} onClick={goToProfile}>
                        <Text size="sm" color="dimmed" style={{
                            width: '12em',
                            overflowWrap: 'break-word',
                        }}>
                            {user.email}
                        </Text>
                    </Box>
                    {type == 'request' && (
                        <div className="d-grid gap-2 mx-auto">
                            <Button color="gray" onClick={handleCancelRequest}>
                                Cancel Request
                            </Button>
                        </div>
                    )}
                    {type == 'response' && (
                        <div className="d-grid gap-2 mx-auto">
                            <Button onClick={handleAccept}>Confirm</Button>
                            <Button color="gray" onClick={handleRejectRequest}>Cancel</Button>
                        </div>
                    )}
                    {type == 'friend' && (
                        <div className="d-grid gap-2 mx-auto">
                            <Button color="red" onClick={handleDeleteFriend}>Unfriend</Button>
                        </div>
                    )}
                </Card>
            ):null}
        </>
    );
}

export default CardItem;