import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Group, Image, Text, em } from '@mantine/core';
import { useProfile, useAuth, useFriendAction } from '@services/controller';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigatePath } from '@app/routes/config';
import { API_URL, MEDIA_URL } from '@constants';
import { ActionIcon, Avatar } from "@mantine/core";

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
                <div 
                    className='card shadow-xss w-100 d-block d-flex border-0 p-2 mb-1' key={idFriendInstance}
                >
                    <div className='d-flex align-items-center px-3 pt-2'>
                        <figure className="avatar float-left mb-0 me-2" onClick={goToProfile}>
                            <Avatar src={MEDIA_URL+user.avatar.replace(API_URL,'')} radius="xl" size={50}/>
                        </figure>
                        <div onClick={goToProfile} className='me-auto'>
                            <h3 className="fw-700 mb-0 mt-0">
                                <span
                                    className="font-xsss text-grey-600 d-block text-dark model-popup-chat pointer"
                                >
                                    {user.first_name + ' ' +user.last_name}
                                </span>
                            </h3>
                            <span
                                className="font-xsss text-grey-600 d-block text-dark model-popup-chat pointer"
                            >
                                {user.email}
                            </span>
                        </div>
                        <div>
                            {type == 'request' && (
                                <div>
                                    <Button color="gray" onClick={handleCancelRequest}>
                                        Cancel Request
                                    </Button>
                                </div>
                            )}
                            {type == 'response' && (
                                <div className="d-flex gap-2">
                                    <Button onClick={handleAccept}>Confirm</Button>
                                    <Button color="gray" onClick={handleRejectRequest}>Cancel</Button>
                                </div>
                            )}
                            {type == 'friend' && (
                                <div>
                                    <Button color="red" onClick={handleDeleteFriend}>Unfriend</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ):null}
        </>
    );
}

export default CardItem;