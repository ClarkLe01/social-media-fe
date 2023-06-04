import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconMessageCircle, IconLogout, IconAddressBook, IconLock, IconUser, IconCheck, IconX } from '@tabler/icons-react';

import { useAuth, useProfile } from '@services/controller';
import Notification from '@common/components/Notification';
import { Avatar, ActionIcon, Menu, Divider, Button, Modal } from '@mantine/core';

import { navigatePath } from '@app/routes/config';
import { API_URL, MEDIA_URL } from '@constants';
import DarkLightTheme from '@common/components/DarkLightTheme';
import Input from '@common/components/Input';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
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
                        //console.log(data.data.status);
        
                        updateProfile(
                            {
                                data: form1,
                            },
                            {
                                onSuccess: (data) => {
                                    console.log(data);
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
                                    console.log(error.response.data);
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
                    console.log(error.response.data);
                },
            });
    };
    
    return (
        <>
            <Notification />
            {/* <div className="p-2 text-center ms-3 menu-icon chat-active-btn">
                <DarkLightTheme/>
            </div> */}
            <Link
                to="/message"
                className="p-2 text-center ms-3 menu-icon chat-active-btn"
            >
                <IconMessageCircle />
            </Link>
            <Menu position="bottom-end" width={150} withArrow>
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
