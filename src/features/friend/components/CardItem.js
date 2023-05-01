import React, { useState, useEffect } from 'react';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import { useFriend, useProfile, useAuth } from '@services/controller';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigatePath } from '@app/routes/config';
import { API_URL } from '@constants';

function CardItem(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { idFriendInstance, idProfile, type } = props;
    const { profile } = useAuth(); // current user
    const { profileId } = useProfile(idProfile);
    const { deleteFriend, acceptRequest } = useFriend(profile.data.id);
    const [ user, setUser ] = useState(null);
    const handleCancel = () => {
        deleteFriend({
            pathParams: { instanceId: idFriendInstance },
        });
    };
    const handleAccept= () => {
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
            {user && (
                <Card shadow="sm" padding="lg" radius="md" withBorder >
                    <Card.Section onClick={goToProfile}>
                        <Image src={API_URL+user.avatar.replace(API_URL,'')} height={160} />
                    </Card.Section>
        
                    <Group position="apart" mt="xs" onClick={goToProfile}>
                        <Text weight={500}>
                            {user.first_name} {user.last_name}
                        </Text>
                    </Group>
                    <Group position="apart" mt={1} mb={6} onClick={goToProfile}>
                        <Text size="sm" color="dimmed">
                            18 mutual friends
                        </Text>
                    </Group>
                    {type == 'request' && (
                        <div className="d-grid gap-2 mx-auto">
                            <Button color="gray" onClick={handleCancel}>
                                Cancel Request
                            </Button>
                        </div>
                    )}
                    {type == 'response' && (
                        <div className="d-grid gap-2 mx-auto">
                            <Button onClick={handleAccept}>Confirm</Button>
                            <Button color="gray" onClick={handleCancel}>Cancel</Button>
                        </div>
                    )}
                    {type == 'friend' && (
                        <div className="d-grid gap-2 mx-auto">
                            <Button color="red" onClick={handleCancel}>Unfriend</Button>
                        </div>
                    )}
                </Card>
            )}
        </>
    );
}

export default CardItem;