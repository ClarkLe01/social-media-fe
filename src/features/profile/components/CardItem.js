import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card, Group, Image, Text } from '@mantine/core';
import { useFriend, useProfile, useAuth } from '@services/controller';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigatePath } from '@app/routes/config';
import { API_URL, MEDIA_URL } from '@constants';
import AvatarComponent from './AvatarComponent';

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
                <div className="bg-white position-relative d-sm-flex py-1 px-2 align-items-center " role="button" onClick={goToProfile}>
                    <Avatar
                        radius={22}
                        size='xl'
                        variant="outline"
                        classNames={{
                            image: 'float-right p-1 ',
                        }}
                        src={MEDIA_URL+user.avatar.replace(API_URL,'')}
                        key={user.updated}
                    />
                    <h4 className="d-inline fw-700 font-sm ps-3 ">
                        {user.first_name} {user.last_name}
                        { }{' '}
                    </h4>
                </div>
                //     {type == 'request' && (
                //         <div className="d-grid gap-2 mx-auto">
                //             <Button color="gray" onClick={handleCancel}>
                //                 Cancel Request
                //             </Button>
                //         </div>
                //     )}
                //     {type == 'response' && (
                //         <div className="d-grid gap-2 mx-auto">
                //             <Button onClick={handleAccept}>Confirm</Button>
                //             <Button color="gray" onClick={handleCancel}>Cancel</Button>
                //         </div>
                //     )}
                //     {type == 'friend' && (
                //         <div className="d-grid gap-2 mx-auto">
                //             <Button color="red" onClick={handleCancel}>Unfriend</Button>
                //         </div>
                //     )}
            )}
        </>
    );
}

export default CardItem;