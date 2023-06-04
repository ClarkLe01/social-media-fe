import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Avatar, Button, Image } from '@mantine/core';
import Pagetitle from '@common/components/PageTitle';
import { Grid, Group, Text, ScrollArea } from '@mantine/core';
import { ReactComponent as DataArrangingLogo } from '@assets/svgs/Data-Arranging-Outline.svg';
import { useScrollLock } from '@mantine/hooks';
import { useFriend, useAuth, useMessage, useRoom, useProfile } from '@services/controller';
import { API_URL } from '@constants';
import RightChatItem from '@common/components/RightChatItem';
import { Rooms } from '@features/messages/components';
import { navigatePath } from '@app/routes/config';

function ShowFriendRequest(props){
    const { friendRequest, profile } = props;
    const { profileId } = useProfile(friendRequest.requestID);
    const [ user, setUser ] = useState();

    const { deleteFriend, acceptRequest } = useFriend(profile.id);


    const handleCancel = () => {
        deleteFriend({
            pathParams: { instanceId: friendRequest.id },
        });
    };

    const handleAccept= () => {
        acceptRequest({
            pathParams: { instanceId: friendRequest.id },
        });
    };

    const goToProfile = () => {
        Navigate(navigatePath.profile.replace(':userId', friendRequest.requestID), { state: { from: location.pathname } });
    };

    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
        }
    }, [ profileId ]);
    
    return (
        <div className="wrap mb-3">
            <div className="card-body d-flex pt-2 pb-0 px-0 bor-0">
                <div className="col col-md-2">
                    {user && <Avatar src={API_URL+user.avatar.replace(API_URL,'')} radius={100} size='md' />}
                </div>
                <div className="col col-md-9 px-2">
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1 mb-1">
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

    const { user } = props;

    const [ friendRequest, setFriendRequest ] = useState();
    const { responseList } = useFriend();
    const [ memberList, setMemberList ] = useState([]);

    useEffect(() => {
        if (responseList) {
            setMemberList([ ...responseList.data ]);
        }

        if (memberList.length > 0) {
            setFriendRequest(memberList[0]);
        }
    }, [ responseList ]);

    
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
            {memberList.length == 0 ? (
                <Group
                    className="d-grid justify-content-center align-items-center"
                    position="center"
                >
                    <Text className="d-flex justify-content-center align-items-center">
                        No Request
                    </Text>
                </Group>
            ) : (
                friendRequest && <ShowFriendRequest friendRequest={friendRequest} profile={user}/>
            )}
        </div>
    );
}

const SideBar = () => {
    const { RoomList, RoomListLoading } = useRoom();
    
    const { profile } = useAuth();
    const { profileId } = useProfile(profile.data.id);
    const [ user, setUser ] = useState(null);

    const { friendList } = useFriend(profile.data.id);
    const [ memberList, setMemberList ] = useState([]);
    
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


    const [ isOpen, setIsOpen ] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const menuClass = `${isOpen ? ' d-block' : ''}`;

    return (
        <>
            {user && <FriendRequest user={user}/>}
            <hr />
            <div className="middle-sidebar-right-content bg-white shadow-xss rounded-xxl">
                <div className="section full px-0 pt-4 position-relative feed-body">
                    <h4 className="font-xsss text-grey-900 fw-700 ls-3">Friends</h4>
                    <ul className="list-group list-group-flush">
                        {memberList.map((value) => (
                            <RightChatItem 
                                key={value.id}
                                idFriendInstance={value.id}
                                idProfile={value.requestID === profile.data.id ? value.responseID : value.requestID}
                                type='friend'    
                            />
                        ))}
                    </ul>
                </div>
                <div className="section full px-0 pt-4 pb-4 position-relative feed-body">
                    <h4 className="font-xsss text-grey-900 fw-700 ls-3">Contact</h4>
                    <ul className="list-group list-group-flush">
                        {RoomList && <Rooms rooms={RoomList.data} isRightChat={true}/>}  
                    </ul>
                </div>
            </div>

            <div className={`modal-popup-chat ${menuClass}`} style = {{ right: `calc(var(--mantine-aside-width, 0px) + 0px)` }}>
                <div className="modal-popup-wrap bg-white p-0 shadow-lg rounded-3">
                    <div className="modal-popup-header w-100 border-bottom">
                        <div className="card p-3 d-block border-0 d-block">
                            <figure className="avatar mb-0 float-left me-2">
                                <img
                                    src="assets/images/user-12.png"
                                    alt="avater"
                                    className="w35 me-1"
                                />
                            </figure>
                            <h5 className="fw-700 text-primary font-xssss mt-1 mb-1">
                                Hendrix Stamp
                            </h5>
                            <h4 className="text-grey-500 font-xsssss mt-0 mb-0">
                                <span className="d-inline-block bg-success btn-round-xss m-0"></span>{' '}
                                Available
                            </h4>
                            <div
                                className="font-xssss position-absolute right-0 top-0 mt-3 me-4 pointer"
                                onClick={toggleOpen}
                            >
                                <i className="ti-close text-grey-900 mt-2 d-inline-block"></i>
                            </div>
                        </div>
                    </div>
                    <div className="modal-popup-body w-100 p-3 h-auto">
                        <div className="message">
                            <div className="message-content font-xssss lh-24 fw-500">
                                Hi, how can I help you?
                            </div>
                        </div>
                        <div className="date-break font-xsssss lh-24 fw-500 text-grey-500 mt-2 mb-2">
                            Mon 10:20am
                        </div>
                        <div className="message self text-right mt-2">
                            <div className="message-content font-xssss lh-24 fw-500">
                                I want those files for you. I want you to send 1 PDF and 1 image
                                file.
                            </div>
                        </div>
                        <div
                            className="snippet pt-3 ps-4 pb-2 pe-3 mt-2 bg-grey rounded-xl float-right"
                            data-title=".dot-typing"
                        >
                            <div className="stage">
                                <div className="dot-typing"></div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="modal-popup-footer w-100 border-top">
                        <div className="card p-3 d-block border-0 d-block">
                            <div className="form-group icon-right-input style1-input mb-0">
                                <input
                                    type="text"
                                    placeholder="Start typing.."
                                    className="form-control rounded-xl bg-greylight border-0 font-xssss fw-500 ps-3"
                                />
                                <i className="feather-send text-grey-500 font-md"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
