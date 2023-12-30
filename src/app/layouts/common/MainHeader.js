import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconMessageCircle, IconLogout, IconAddressBook, IconLock, IconUser, IconCheck, IconX } from '@tabler/icons-react';

import { useAuth, useProfile } from '@services/controller';
import Notification from '@common/components/Notification';
import { Avatar, ActionIcon, Menu, Divider, Button, Modal, Indicator } from '@mantine/core';

import { navigatePath } from '@app/routes/config';
import { API_URL, MEDIA_URL } from '@constants';
import DarkLightTheme from '@common/components/DarkLightTheme';
import Input from '@common/components/Input';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import useCall from '@services/controller/useCall';
import Socket, { connections } from '@services/socket';

function MainHeader() {
    const { logout, profile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const goToProfile = () => {
        navigate(navigatePath.profile.replace(':userId', profile.data.id), { state: { from: location.pathname } });
    };

    const { saveLoading } = useAuth();

    const [ openedChangePassword, setOpenedChangePassword ] = useState(false);
    const { updateProfile, checkValidatePassword } = useProfile(profile.data.id);
    const [ currentPassword, setCurrentPassword ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmNewPassword, setConfirmNewPassword ] = useState("");

    const [ differentNewPassword, setDifferentNewPassword ] = useState(false);

    const queryClient = useQueryClient();
    const [ waitingToReconnect, setWaitingToReconnect ] = useState(null);
    const [ callData, setCallData ] = useState(null);
    const [ incomingCallModal, setIncomingCallModal ] = useState(false);
    const [ isNewNotification, setIsNewNotification ] = useState(false);
    const [ isNewMessage, setIsNewMessage ] = useState(false);
    const socketClientRef = useRef(null);
    
    const form = useForm({
        initialValues: { 
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },

        // functions will be used to validate values at corresponding key
        validate: {
            currentPassword: (value) => (value === '' ? 'This field is required' : null),
            newPassword: (value) =>
                value.length < 6 ? 'Password must have at least 6 letters' : null,
            confirmPassword: (value, values) =>
                value !== values.newPassword ? 'Confirm Password did not match' : null,
        },
    });

    const handleChangePassword = (values) => {
        const form1 = new FormData();
        
        form1.append('password', values.newPassword);
        checkValidatePassword(
            { data:{
                password: values.currentPassword,
            } },
            {
                onSuccess: (data) => {
                    if(data.data.status){
        
                        updateProfile(
                            {
                                data: form1,
                            },
                            {
                                onSuccess: (data) => {
                                    // console.log(data);
                                    notifications.show({
                                        id: 'notify-success-update-password',
                                        withCloseButton: true,
                                        autoClose: 1000,
                                        title: "Success",
                                        message: 'You updated your password successfully!',
                                        color: 'teal',
                                        icon: <IconCheck />,
                                        loading: false,
                                    });
                                    
                                },
                                onError: (error) => {
                                    // console.log(error.response.data);
                                    notifications.show({
                                        id: 'notify-failed-update-password',
                                        withCloseButton: true,
                                        autoClose: 1000,
                                        title: "Failed",
                                        message: 'You updated your password unsuccessfully!',
                                        color: 'red',
                                        icon: <IconX />,
                                        loading: false,
                                    });
                                },
                            },
                        );
                        setOpenedChangePassword(false);
                    }
                    else{
                        form.setErrors({ currentPassword: "Wrong current password" });
                    }
                },
                onError: (error) => {
                    // console.log(error.response.data);
                },
            });
    };

    useEffect(() => {
        if (waitingToReconnect) {
            return;
        }
        
        if (!socketClientRef.current) {
            const socket = new Socket(connections.notification).private();
            socketClientRef.current = socket;

            socket.onerror = (e) => console.error(e);
            socket.onopen = () => {
                console.log('open connection');
            };
            
            socket.close = () => {
                if (socketClientRef.current) {
                    // Connection failed
                    console.log('ws closed by server');
                } else {
                    // Cleanup initiated from app side, can return here, to not attempt a reconnect
                    console.log('ws closed by app component unmount');
                    return;
                }
                if (waitingToReconnect) {
                    return;
                }
                console.log('ws closed');
                setWaitingToReconnect(true);
            };
            socket.onmessage = (data) => {
                if(data){
                    data = JSON.parse(data.data);
                    if(data.value && data.type == 'notify'){
                        queryClient.invalidateQueries({ queryKey: [ "notifications" ] });
                        setIsNewNotification(true);
                    }
                    if(data.value && data.type == 'calling'){
                        if(callData == null){
                            setCallData(data.value);
                            setIncomingCallModal(true);
                        } 
                    }
                    if(data.value && data.type == 'endCall' && callData.roomId == data.value.roomId){
                        setCallData(null);
                        setIncomingCallModal(false);
                    }
                    if(data.type == 'message'){
                        queryClient.invalidateQueries({ queryKey: [ "room/list" ] });
                        setIsNewMessage(true);
                    }
                }
                
            };
            
            return () => {
                console.log('Cleanup');
                socketClientRef.current = null;
                socket.close();
            };
        }
    
    }, [ waitingToReconnect, notifications ]);
    
    return (
        <>
            <Notification
                callData = {callData}
                socketClientRef = {socketClientRef}
                incomingCallModal = {incomingCallModal}
                setIncomingCallModal = {setIncomingCallModal}
                isNewNotification={!isNewNotification}
            />
            <Link
                to="/message"
                className="p-2 text-center ms-3 menu-icon chat-active-btn"
            >
                <Indicator
                    inline
                    offset={4}
                    position="bottom-start"
                    color="red"
                    withBorder
                    disabled={!isNewMessage}
                >
                    <IconMessageCircle />
                </Indicator>
            </Link>
            <Menu position="bottom-end" width={200} withArrow>
                <Menu.Target>
                    <ActionIcon className='ms-3 me-3'>
                        <Avatar src={MEDIA_URL+profile.data.avatar.replace(API_URL, '')} radius="xl" size={35}/>
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        icon={<IconAddressBook size={16} />}
                        onClick={goToProfile}
                    >
                        Profile
                    </Menu.Item>
                    <Menu.Item
                        icon={<IconLock size={16} />}
                        onClick={() => setOpenedChangePassword(true)}
                    >
                        Change Password
                    </Menu.Item>
                    <Menu.Item
                        icon={<IconLogout size={16} />}
                        onClick={logout}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Modal
                opened={openedChangePassword}
                onClose={() => setOpenedChangePassword(false)}
                title={<div
                    className="d-flex justify-content-center">
                    <h1 className="fw-bold mx-auto">
                        Edit Password
                    </h1>
                </div>
                }
                classNames={{
                    header: 'd-flex justify-content-between',
                    title: 'flex-fill mx-auto pe-3 my-1',
                }}
            >

                <form onSubmit={form.onSubmit(handleChangePassword)}>
                    <div>
                        <Divider my="xs" label="Current password" />
                        <Input
                            name="currentPassword"
                            icon={<IconUser />}
                            type="password"
                            placeHolder="Current Password"
                            onChange={e => setCurrentPassword(e.target.value)}
                            {...form.getInputProps('currentPassword')}

                        />
                    </div>
                    <div>
                        <Divider my="xs" label="New password" />
                        <Input
                            name="newPassword"
                            icon={<IconUser />}
                            type="password"
                            placeHolder="New Password"
                            onChange={e => setNewPassword(e.target.value)}
                            {...form.getInputProps('newPassword')}
                        />
                    </div>
                    <div>
                        <Divider my="xs" label="Confirm new password" />
                        <Input
                            name="confirmPassword"
                            icon={<IconUser />}
                            type="password"
                            placeHolder="Confirm new password"
                            onChange={e => setConfirmNewPassword(e.target.value)}
                            {...form.getInputProps('confirmPassword')}
                        />
                    </div>


                    <div className="col-sm-12 p-0 text-left">
                        <Button
                            // type="submit"
                            className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0"
                            loading={saveLoading}
                            type="submit"
                        >
                            {saveLoading ? 'Save...' : 'Save'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default MainHeader;
