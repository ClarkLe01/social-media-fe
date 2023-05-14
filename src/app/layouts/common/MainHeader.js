import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconMessageCircle, IconLogout, IconAddressBook, IconMessageCircle2 } from '@tabler/icons-react';

import { useAuth } from '@services/controller';
import Notification from '@common/components/Notification';
import { Avatar, ActionIcon, Menu } from '@mantine/core';

import { navigatePath } from '@app/routes/config';
import DarkLightTheme from '@common/components/DarkLightTheme';
import { API_URL } from '@constants';
function MainHeader() {
    const { logout, profile } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const goToProfile = () => {
        navigate(navigatePath.profile.replace(':userId', profile.data.id), { state: { from: location.pathname } });
    };
    
    return (
        <>
            <Notification />
            <div className="p-2 text-center ms-3 menu-icon chat-active-btn">

                <DarkLightTheme/>
            </div>
            <Link
                to="/messages"
                className="p-2 text-center ms-3 menu-icon chat-active-btn"
            >
                <IconMessageCircle/>
            </Link>
            <Menu position="bottom-end" width={150} withArrow>
                <Menu.Target>
                    <ActionIcon className='ms-3 me-3'>
                        <Avatar src={API_URL+profile.data.avatar.replace(API_URL, '')} radius="xl" size={35}/>
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
                        icon={<IconLogout size={16} />}
                        onClick={logout}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}

export default MainHeader;
