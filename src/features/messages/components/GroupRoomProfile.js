import React from 'react';
import { Accordion, ActionIcon, Avatar, Button, Group, Menu, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import {
    IconUserCircle,
    IconAlarmFilled,
    IconBrandYoutube,
    IconPhoto,
    IconSearch,
    IconBrush,
    IconPencil,
    IconMoodHappy,
    IconAbc,
    IconPalette,
    IconPhotoFilled,
    IconDots,
    IconPlus,
    IconSettings,
    IconMessageCircle,
    IconArrowsLeftRight,
    IconTrash,
    IconUser,
    IconLogout,
    IconMessageCircleMinus,
} from '@tabler/icons-react';
import AvatarDisplay from './AvatarDisplay';
import RoomNameDisplay from './RoomNameDisplay';
import { API_URL } from '@constants';

const GroupRoomProfile = (props) => {
    const { roomDetail, currentUser } = props;
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center pt-3 pb-2">
                <AvatarDisplay
                    size={81}
                    isGroup={roomDetail.isGroup}
                    members={roomDetail.members}
                    currentUser={currentUser}
                    avatar={roomDetail.roomAvatar}
                />
            </div>
            <div className="d-flex justify-content-center align-items-center pb-2">
                <RoomNameDisplay
                    isGroup={roomDetail.isGroup}
                    members={roomDetail.members}
                    currentUser={currentUser}
                    roomName={roomDetail.roomName}
                    size="md"
                    fw={600}
                    color="dark"
                />
            </div>
            <div className="d-flex justify-content-center align-items-center pb-2">
                <div className="justify-content-center px-3">
                    <ActionIcon radius={'100%'} variant="default" size={36} className="mx-auto">
                        <IconUserCircle />
                    </ActionIcon>
                    <Text size={13}>Profile</Text>
                </div>
                <div className="px-3">
                    <ActionIcon radius={'100%'} variant="default" size={36} className="mx-auto">
                        <IconAlarmFilled />
                    </ActionIcon>
                    <Text size={13}>Mute</Text>
                </div>
                <div className="px-3">
                    <ActionIcon radius={'100%'} variant="default" size={36} className="mx-auto">
                        <IconSearch size={20} />
                    </ActionIcon>
                    <Text size={13}>Search</Text>
                </div>
            </div>
            <div>
                <Accordion classNames={{ content: 'pt-0' }}>
                    <Accordion.Item value="customization">
                        <Accordion.Control>
                            <Text fw={500}>Customization</Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Group className="gap-0">
                                <Button
                                    color="dark"
                                    fullWidth
                                    variant="subtle"
                                    classNames={{
                                        inner: 'justify-content-start align-items-center',
                                    }}
                                    leftIcon={
                                        <ThemeIcon variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} radius={'100%'}>
                                            <IconAbc size={20} />
                                        </ThemeIcon>
                                    }
                                >
                                    Change chat name
                                </Button>
                                <Button
                                    color="dark"
                                    fullWidth
                                    variant="subtle"
                                    classNames={{
                                        inner: 'justify-content-start align-items-center',
                                    }}
                                    leftIcon={
                                        <ThemeIcon variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} radius={'100%'}>
                                            <IconPalette size={20} />
                                        </ThemeIcon>
                                    }
                                >
                                    Change theme
                                </Button>
                                <Button
                                    color="dark"
                                    fullWidth
                                    variant="subtle"
                                    classNames={{
                                        inner: 'justify-content-start align-items-center',
                                    }}
                                    leftIcon={
                                        <ThemeIcon variant="gradient" color='blue' radius={'100%'}>
                                            <IconPhotoFilled size={17} />
                                        </ThemeIcon>
                                    }
                                >
                                    Change image
                                </Button>
                            </Group>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="chatMembers">
                        <Accordion.Control>
                            <Text fw={500}>Chat Members</Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <div>
                                {roomDetail.members.map((member, index) => (
                                    <div key={index} className='d-flex align-items-center justify-content-between pb-2'>
                                        <UnstyledButton>
                                            <Group>
                                                <Avatar size={36} src={API_URL+member.user.avatar.replace(API_URL,'')} radius={"100%"} color="blue" />
                                                <div>
                                                    <Text>{member.user.first_name} {member.user.last_name}</Text>
                                                    <Text size="xs" color="dimmed">{member.user.email}</Text>
                                                </div>
                                            </Group>
                                        </UnstyledButton>
                                        <Menu position="right-start" withArrow arrowPosition="center" width={200}>
                                            <Menu.Target>
                                                <ActionIcon size={36} radius={"100%"}>
                                                    <IconDots />
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                {member.user.id !== currentUser.id && <Menu.Item icon={<IconMessageCircle size={14} />}>Message</Menu.Item>}
                                                <Menu.Item icon={<IconUser size={14} />}>View Profile</Menu.Item>
                                                <Menu.Divider />
                                                {member.user.id !== currentUser.id ? (
                                                    <Menu.Item color="red" icon={<IconMessageCircleMinus size={14} />}>Remove</Menu.Item>
                                                ): (
                                                    <Menu.Item color="red" icon={<IconLogout size={14} />}>Leave</Menu.Item>
                                                )}
                                            </Menu.Dropdown>
                                        </Menu>
                                    </div>
                                ))}
                                <Button
                                    fullWidth
                                    variant="subtle"
                                    leftIcon={
                                        <ThemeIcon color='gray' radius={"100%"}>
                                            <IconPlus />
                                        </ThemeIcon>
                                    }
                                    classNames={{
                                        inner: 'justify-content-start align-items-center',
                                        root: 'ps-1',
                                    }}
                                >
                                    <Text size={16} color='black'>
                                        Add people
                                    </Text>
                                </Button>
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="files">
                        <Accordion.Control>
                            <Text fw={500}>Videos and Images</Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Group className="gap-0">
                                <Button
                                    color="dark"
                                    fullWidth
                                    variant="subtle"
                                    classNames={{
                                        inner: 'justify-content-start align-items-center',
                                    }}
                                    leftIcon={
                                        <ThemeIcon variant="light" radius={'100%'} color="gray">
                                            <IconBrandYoutube size={20} />
                                        </ThemeIcon>
                                    }
                                >
                                    Videos
                                </Button>
                                <Button
                                    color="dark"
                                    fullWidth
                                    variant="subtle"
                                    classNames={{
                                        inner: 'justify-content-start align-items-center',
                                    }}
                                    leftIcon={
                                        <ThemeIcon variant="light" radius={'100%'} color="gray">
                                            <IconPhoto size={20} />
                                        </ThemeIcon>
                                    }
                                >
                                    Images
                                </Button>
                            </Group>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="privacySupport">
                        <Accordion.Control>
                            <Text fw={500}>Privacy and Support</Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                            With new :focus-visible pseudo-class focus ring appears only when user
                            navigates with keyboard
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};

export default GroupRoomProfile;
