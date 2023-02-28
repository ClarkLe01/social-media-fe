import React, { useState } from 'react';
import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger, useMantineTheme, NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconSearch, IconBellFilled, IconMoon, IconMessageCircle, IconSettings, IconUser, IconHome } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';

import Input from '@common/components/Input';
import MainLogo from '@common/components/MainLogo';

export default function MainLayout() {
    const theme = useMantineTheme();
    const [ opened, setOpened ] = useState(false);
    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <NavLink component={Link} to="/" label="Newfeed" icon={<IconHome size={16} stroke={1.5} />} />
                    <NavLink component={Link} to="/" label="With icon" icon={<IconSearch size={16} stroke={1.5} />} />
                    <NavLink component={Link} to="/profile" label="Profile" icon={<IconUser size={16} stroke={1.5} />} />
                    <NavLink label="Light/Dark" icon={<IconMoon size={16} stroke={1.5} />} />
                    <NavLink component={Link} to="/setting" label="Setting" icon={<IconSettings size={16} stroke={1.5} />} />
                </Navbar>
            }
            aside={
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                        <Text>Application sidebar</Text>
                    </Aside>
                </MediaQuery>
            }
            footer={
                <Footer height={60} p="md">
                    This footer may not use (remove if not).
                </Footer>
            }
            header={
                <>
                    <Header height={{ base: 60, md: 80 }} p="md">
                        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <MainLogo />
                            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                                <form action="#" className="float-left header-search ms-3 mt-3" >
                                    <Input
                                        icon={<IconSearch />}
                                        type="text"
                                        name="search"
                                        placeHolder="Search in Sociala"
                                        className="bg-grey border-0 lh-32 pt-1 pb-1 ps-5 pe-3 font-xsss fw-500 rounded-xl w350 theme-dark-bg h-auto"
                                    />
                                </form>
                            </MediaQuery>
                            <span className="p-2 pointer text-center ms-auto menu-icon">
                                <IconBellFilled />
                            </span>
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <span className="p-2 pointer text-center ms-3 menu-icon chat-active-btn">
                                    <IconSearch />
                                </span>
                            </MediaQuery>
                            <Link to="/register" className="p-2 text-center ms-3 menu-icon chat-active-btn">
                                <IconMessageCircle />
                            </Link>
                            
                            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                                <Burger
                                    opened={opened}
                                    onClick={() => setOpened((o) => !o)}
                                    size="sm"
                                    color={theme.colors.gray[6]}
                                    mr="xl"
                                    className='p-2 ms-3'
                                />
                            </MediaQuery>
                        </div>
                    </Header>
                </>
            }
        >
            <div className='middle-sidebar-left'>
                {/* <Text>Application sidebar</Text> */}
                <Outlet />
            </div>
        </AppShell>
    );
}