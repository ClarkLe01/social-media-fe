
import React, { useState } from 'react';
import {
    Navbar,
    NavLink,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {
    IconMoon,
    IconSettings,
    IconUser,
    IconHome,
    IconFriends,
    IconLogout,
} from '@tabler/icons-react';
import { useAuth } from '@services/controller';

function NavBar(props) {
    const { logout, profile } = useAuth();
    const [ currentUser, setCurrentUser ] = useState(profile.data);
    return (
        <Navbar
            p={props.p}
            hiddenBreakpoint={props.hiddenBreakpoint}
            hidden={!props.opened}
            width={props.width}
            height={props.height}
            zIndex={props.zIndex}
            className='align-items-center'
        >
            <NavLink
                component={Link}
                to={`/profile/${currentUser.id}`}
                label="Profile"
                icon={<IconUser size={16} stroke={1.5} />}
                classNames={{
                    root: 'nav-content-bttn open-font fw-600 px-0',
                    icon: 'me-3',
                }}
            />
            <NavLink
                component={Link}
                to="/"
                label="Home"
                icon={<IconHome size={16} stroke={1.5} />}
                classNames={{
                    root: 'nav-content-bttn open-font fw-600 px-0',
                    icon: 'me-3',
                }}
            />
            <NavLink
                component={Link}
                to="/friendlist"
                label="Friend"
                icon={<IconFriends size={16} stroke={1.5} />}
                classNames={{
                    root: 'nav-content-bttn open-font fw-600 px-0',
                    icon: 'me-3',
                }}
            />
            <NavLink
                label="Light/Dark"
                icon={<IconMoon size={16} stroke={1.5} />}
                classNames={{
                    root: 'nav-content-bttn open-font fw-600 px-0',
                    icon: 'me-3',
                }}
            />
            <NavLink
                component={Link}
                to="/settings"
                label="Settings"
                icon={<IconSettings size={16} stroke={1.5} />}
                classNames={{
                    root: 'nav-content-bttn open-font fw-600 px-0',
                    icon: 'me-3',
                }}
            />
            <NavLink
                component={Link}
                label="Logout"
                icon={<IconLogout size={16} stroke={1.5} />}
                classNames={{
                    root: 'nav-content-bttn open-font fw-600 px-0',
                    icon: 'me-3',
                }}
                onClick={logout}
            />
        </Navbar>
    );
}

export default NavBar;