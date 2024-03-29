import React, { useState } from 'react';
import {
    AppShell,
    Navbar,
    Header,
    Aside,
    MediaQuery,
    Burger,
    useMantineTheme,
    NavLink,
    ScrollArea,
    Transition,
    TextInput,
    ActionIcon,
} from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';
import {
    IconSearch,
    IconMoon,
    IconMessageCircle,
    IconSettings,
    IconUser,
    IconHome,
    IconFriends,
    IconArrowLeft,
} from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';

import Input from '@common/components/Input';
import MainLogo from '@common/components/MainLogo';
import Notification from '@common/components/Notification';
import NavBar from './common/NavBar';
import MainHeader from './common/MainHeader';

export default function NoSideBarLayout() {
    const scaleY = {
        in: { opacity: 1, transform: 'scaleY(1)' },
        out: { opacity: 0, transform: 'scaleY(0)' },
        common: { transformOrigin: 'top' },
        transitionProperty: 'transform, opacity',
    };

    const [ openSearch, setOpenSearch ] = useState(false);
    const clickOutsideRef = useClickOutside(() => setOpenSearch(false));

    const theme = useMantineTheme();
    const [ opened, setOpened ] = useState(false);

    return (
        <AppShell
            classNames={{
                main: 'w-100',
            }}
            styles={{
                main: {
                    background:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbar={
                <NavBar 
                    p="sm"
                    hiddenBreakpoint="md"
                    hidden={!opened}
                    width={{ sm: 65, xl: 240 }}
                    height={{ sm: 500 }}
                />
            }
            // aside={
            //     <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            //         <Aside
            //             className="me-0 position-fixed"
            //             grow="true"
            //             component={ScrollArea}
            //             mx="-xs"
            //             px="xs"
            //             p="md"
            //             hiddenBreakpoint="sm"
            //             width={{ sm: 50, md: 270, lg: 310 }}
            //         >
            //         </Aside>
            //     </MediaQuery>
            // }
            header={
                <Header height={{ base: 60, md: 80 }} p="md" style={{ zIndex: 101 }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MainLogo />
                        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                            <form action="#" className="float-left header-search ms-3 mt-3">
                                <Input
                                    icon={<IconSearch />}
                                    type="text"
                                    name="search"
                                    placeHolder="Search in Sociala"
                                    className="bg-grey border-0 lh-32 pt-1 pb-1 ps-5 pe-3 font-xsss fw-500 rounded-xl w350 theme-dark-bg h-auto"
                                />
                            </form>
                        </MediaQuery>

                        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                            <div>
                                <ActionIcon
                                    className="pointer text-center ms-3 menu-icon chat-active-btn"
                                    variant="transparent"
                                    onClick={() => setOpenSearch(true)}
                                >
                                    <IconSearch size={50} />
                                </ActionIcon>
                                <Transition
                                    mounted={openSearch}
                                    transition={scaleY}
                                    duration={200}
                                    timingFunction="ease-in-out"
                                >
                                    {() => (
                                        <form
                                            action="#"
                                            className="bg-white float-left h-100 z-3 position-absolute top-0 start-0 w-100  "
                                            style={{ zIndex: 101 }}
                                        >
                                            <ActionIcon
                                                className="d-inline-block ms-3"
                                                variant="transparent"
                                            >
                                                <IconArrowLeft size={42} />
                                            </ActionIcon>

                                            <TextInput
                                                type="text"
                                                name="search"
                                                ref={clickOutsideRef}
                                                placeholder="Search in Sociala"
                                                classNames={{
                                                    root: 'd-inline-block border-0 ms-4 lh-32 pt-1 pb-1 ps-3 pe-3 font-xsss fw-500 w-75 theme-dark-bg h-100 me-0',
                                                    wrapper: 'h-100 w-100',
                                                    input: 'bg-grey border-0 lh-32 pt-1 pb-1 ps-4 pe-1 font-xsss fw-500 rounded-xl w-100 theme-dark-bg h-100',
                                                }}
                                            />
                                        </form>
                                    )}
                                </Transition>
                            </div>
                        </MediaQuery>
                        
                        <MainHeader />

                        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                                className="p-2 ms-3"
                            />
                        </MediaQuery>
                    </div>
                </Header>
            }
        >
            <Outlet />
        </AppShell>
    );
}
