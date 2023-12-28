import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Avatar, Button, Image } from '@mantine/core';
import Pagetitle from '@common/components/PageTitle';
import { Grid, Group, Text, ScrollArea } from '@mantine/core';
import { ReactComponent as DataArrangingLogo } from '@assets/svgs/Data-Arranging-Outline.svg';
import { useScrollLock } from '@mantine/hooks';
import { useFriend, useAuth, useMessage, useRoom, useProfile, useFriendAction } from '@services/controller';
import { API_URL, MEDIA_URL } from '@constants';
import RightChatItem from '@common/components/RightChatItem';
import { Rooms } from '@features/messages/components';
import { navigatePath } from '@app/routes/config';
import { IconFriendsOff } from '@tabler/icons-react';

function ShowFriendRequest(props){
    const { friendRequest } = props;
    const { profileId } = useProfile(friendRequest.requestID);
    const [ user, setUser ] = useState();
    const { acceptRequest, rejectRequest } = useFriendAction();

    const handleCancel = () => {
        rejectRequest({
            pathParams: { instanceId: friendRequest.id },
        });
    };

    const handleAccept= () => {
        acceptRequest({
            pathParams: { instanceId: friendRequest.id },
        });
    };

    const goToProfile = () => {
        window.location.href = navigatePath.profile.replace(':userId', friendRequest.requestID);
    };

    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
        }
    }, [ profileId ]);
    
    return (
        <div className="wrap mb-3">
            <div className="card-body d-flex pt-2 pb-0 px-0 bor-0">
                <div className="col col-md-2" onClick={goToProfile}>
                    {user && <Avatar src={MEDIA_URL+user.avatar.replace(API_URL,'')} radius={100} size='md' />}
                </div>
                <div className="col col-md-9 px-2">
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1 mb-1" onClick={goToProfile}>
                        {user && user.first_name + ' ' + user.last_name}
                    </h4>
                    <div className="card-body d-flex align-items-center justify-content-start p-0 flex-md-wrap">
                        <Button
                            classNames={{
                                root: 'lh-20 w75 bg-primary-gradiant me-2 p-0 text-white text-center font-xssss fw-600 ls-1 rounded-xxxxl',
                            }}
                            onClick={handleAccept}
                        >
                            Confirm
                        </Button>
                        <Button
                            classNames={{
                                root: 'lh-20 w75 bg-grey me-2 text-grey-800 p-0 text-center font-xssss fw-600 ls-1 rounded-xxxxl',
                            }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FriendRequest(props) {

    const { listRequest } = props;
    
    return (
        <div className="section full  pt-4 position-relative feed-body">
            <div className="card-body d-flex align-items-center p-1">
                <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
                    Friend Request
                </h4>
                <Link to="/friendrequest" className="fw-600 ms-auto font-xssss text-primary">
                    See all
                </Link>
            </div>
            {listRequest.length == 0 ? (
                <Group
                    className="d-grid justify-content-center align-items-center"
                    position="center"
                >
                    <Text className="d-flex justify-content-center align-items-center">
                        No Request
                    </Text>
                </Group>
            ) : (
                listRequest.map((request, index) => (<ShowFriendRequest friendRequest={request} key={index}/>))
            )}
        </div>
    );
}

const SideBar = () => {
    const { RoomList, RoomListLoading } = useRoom();
    
    const { profile } = useAuth();
    const { profileId } = useProfile(profile.data.id);
    const [ user, setUser ] = useState(null);

    const { friendList, responseList } = useFriend(profile.data.id);
    const [ memberList, setMemberList ] = useState([]);
    const [ friendRequest, setFriendRequest ] = useState([]);
    
    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
        }
    }, [ profileId ]);

    useEffect(() => {
        if (friendList) {
            setMemberList([ ...friendList.data ]);
        }
    }, [ friendList ]);

    useEffect(() => {
        if (responseList) {
            setFriendRequest([ ...responseList.data ]);
        }
    }, [ responseList ]);

    return (
        <>
            <FriendRequest listRequest={friendRequest} />
            <hr />
            {(memberList.length == 0 )?
                <Group
                    className="d-grid justify-content-center align-items-center"
                    position="center"
                >
                    <Text className="d-flex justify-content-center align-items-center">
                        
                        <IconFriendsOff /> 
                        You do not have friend.
                    </Text>
                </Group>:
                <div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
                    <div className="section full px-0 pt-4 position-relative feed-body">
                        <h4 className="font-xsss text-grey-900 fw-700 ls-3">Friends</h4>
                        <ul className="list-group list-group-flush" style={{ cursor: 'pointer' }}>
                            {memberList.map((value) => (
                                <RightChatItem 
                                    key={value.id}
                                    idProfile={value.id}
                                    type='friend'    
                                />
                            ))}
                        </ul>
                    </div>
                    <div className="section full px-0 pt-4 pb-4 position-relative feed-body">
                        <h4 className="font-xsss text-grey-900 fw-700 ls-3">Contact</h4>
                        <ul className="list-group list-group-flush" style={{ cursor: 'pointer' }}>
                            {RoomList && <Rooms rooms={RoomList.data} isRightChat={true}/>}  
                        </ul>
                    </div>
                </div>
            }
        </>
    );
};

export default SideBar;
