import React, { useState } from 'react';
import AvatarDisplay from './AvatarDisplay';
import RoomNameDisplay from './RoomNameDisplay';
import {
    IconAlarmFilled,
    IconBrandYoutube,
    IconBrush,
    IconPhoto,
    IconSearch,
    IconUserCircle,
    IconAbc,
} from '@tabler/icons-react';
import { Accordion, ActionIcon, Button, Group, Text, ThemeIcon } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigatePath } from '@app/routes/config';
import ItemsChat from './ItemsChat';

const PrivateRoomProfile = (props) => {
    const { roomDetail, currentUser } = props;
    const { isGroup, members, roomName } = roomDetail;
    const [ stage, setStage ] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const goToProfile = () => {
        navigate(navigatePath.profile.replace(':userId', members.filter((member) => member.user.id !== currentUser.id).sort((a, b) => a.id - b.id)[0].user.id), { state: { from: location.pathname } });
    };
    return (
        <>
            {stage == null ? (
                <div>
                    <div className="d-flex justify-content-center align-items-center pt-3 pb-2">
                        <AvatarDisplay
                            size={81}
                            isGroup={isGroup}
                            members={members}
                            currentUser={currentUser}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center pb-2">
                        <RoomNameDisplay
                            isGroup={isGroup}
                            members={members}
                            currentUser={currentUser}
                            roomName={roomName}
                            size="md"
                            fw={600}
                            color="dark"
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center pb-2">
                        <div className="justify-content-center px-3">
                            <ActionIcon radius={'100%'} variant="default" size={36} className="mx-auto" onClick={goToProfile}>
                                <IconUserCircle />
                            </ActionIcon>
                            <Text size={13}>Profile</Text>
                        </div>
                    </div>
                    <div>
                        <Accordion>
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
                                            onClick={() => setStage('video')}
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
                                            onClick={() => setStage('image')}
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
            ): <ItemsChat stage={stage} roomId={roomDetail.id} setStage={setStage} /> }
        </>
    );
};

export default PrivateRoomProfile;
