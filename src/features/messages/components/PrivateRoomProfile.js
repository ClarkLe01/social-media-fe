import React from 'react';
import AvatarDisplay from './AvatarDisplay';
import RoomNameDisplay from './RoomNameDisplay';
import {
    IconAlarmFilled,
    IconBrandYoutube,
    IconBrush,
    IconMoodHappy,
    IconPhoto,
    IconSearch,
    IconUserCircle,
    IconAbc,
} from '@tabler/icons-react';
import { Accordion, ActionIcon, Button, Group, Text, ThemeIcon } from '@mantine/core';

const PrivateRoomProfile = (props) => {
    const { roomDetail, currentUser } = props;
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center pt-3 pb-2">
                <AvatarDisplay
                    size={81}
                    isGroup={roomDetail.isGroup}
                    members={roomDetail.members}
                    currentUser={currentUser}
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
                <Accordion>
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
                                        <ThemeIcon variant="light" radius={'100%'}>
                                            <IconBrush size={20} />
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
                                        <ThemeIcon
                                            variant="gradient"
                                            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                                            radius={'100%'}
                                        >
                                            <IconAbc size={20} />
                                        </ThemeIcon>
                                    }
                                >
                                    Change NickName
                                </Button>
                            </Group>
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

export default PrivateRoomProfile;
