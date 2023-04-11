import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconMessageCircle, IconLogout, IconAddressBook } from '@tabler/icons-react';

import { useAuth } from '@services/controller';
import Notification from '@common/components/Notification';
import { Avatar, ActionIcon, Menu } from '@mantine/core';

import { navigatePath } from '@app/routes/config';
function MainHeader() {
    const { logout, profile } = useAuth();
    const [ currentUser, setCurrentUser ] = useState(profile.data);
    const navigate = useNavigate();
    const location = useLocation();
    const goToProfile = () => {
        navigate(navigatePath.profile.replace(':userId', currentUser.id), { state: { from: location.pathname } });
    };
    return (
        <>
            <Notification />
            <Link
                to="/messages"
                className="p-2 text-center ms-3 menu-icon chat-active-btn"
            >
                <IconMessageCircle />
            </Link>
            <Menu position="bottom-end" withArrow>
                <Menu.Target>
                    <ActionIcon className='ms-3 me-3'>
                        <Avatar src={currentUser.avatar} radius="xl"  size={35}/>
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
