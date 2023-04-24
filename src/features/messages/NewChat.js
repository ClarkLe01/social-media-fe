import React, { useEffect, useRef, useState } from 'react';
import {
    Grid,
    Text,
    ScrollArea,
    ActionIcon,
    Input,
    Group,
    Popover,
    Textarea,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import {
    IconEdit,
    IconGif,
    IconMicrophone,
    IconMoodSmileFilled,
    IconPhoto,
    IconSearch,
    IconSend,
    IconSticker,
} from '@tabler/icons-react';
import { useScrollLock } from '@mantine/hooks';

import { useRoom, useAuth, useMessage } from '@services/controller';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MainChat, Rooms } from './components';
import { useQueryClient } from '@tanstack/react-query';
import Socket, { connections } from '@services/socket';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Messages from './Messages';
import { API_URL } from '@constants';

function NewChat() {
    useScrollLock(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { RoomList, RoomListLoading } = useRoom();
    const queryClient = useQueryClient();
    const [ textAreaHeight, setTextAreaHeight ] = useState(0);
    const [ attachFiles, setAttachFiles ] = useState([]);
    const [ valueInput, setValueInput ] = useState('');
    const scrollChatingRef = useRef(null);
    const dropzoneRef = useRef(null);
    const chatInputRef = useRef(null);

    const scrollToBottom = () =>
        scrollChatingRef.current.scrollTo({
            top: scrollChatingRef.current.scrollHeight,
            behavior: 'smooth',
        });


    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount

        return () => attachFiles.forEach((file) => URL.revokeObjectURL(file.preview));

    }, []);

    useEffect(() => {
        setTextAreaHeight(`calc(100vh - 160px - ${chatInputRef.current?.clientHeight}px)`);

    }, [ chatInputRef.current?.clientHeight ]);

    return (
        <div className="row">
            <Grid grow gutter="sm" className="p-0" columns={24}>
                <Grid.Col span={'content'} className="border border-1 border-bottom-0 p-0 py-1">
                    <div className="aside-chat-heading mb-2">
                        <div className="d-flex mx-3">
                            <Text fw={700} fz="xl" className="me-auto">
                                Chats
                            </Text>
                            <div>
                                <ActionIcon>
                                    <IconEdit />
                                </ActionIcon>
                            </div>
                        </div>
                        <div className="mx-3">
                            <Input
                                icon={<IconSearch size={12} />}
                                placeholder="Search Messenger"
                                radius="xl"
                                size="xs"
                            />
                        </div>
                    </div>
                    <div className="list-messengers">
                        <ScrollArea
                            style={{ height: 'calc(100vh - 140px)' }}
                            type="scroll"
                            offsetScrollbars
                            scrollbarSize={4}
                        >
                            {RoomList && <Rooms rooms={RoomList.data} />}
                        </ScrollArea>
                    </div>
                </Grid.Col>
                <Grid.Col span={16} className="border-bottom-0 p-0 py-0">
                    <Grid columns={24} className="px-0">
                        <Grid.Col span={'auto'} className="pe-0">
                            <div>
                                <div className="main-chat-header border border-1 px-0 py-1 mx-0">
                                    <div className="d-flex align-items-center px-0">
                                    </div>
                                </div>
                                <div className="main-chat-content">
                                    <ScrollArea
                                        style={{ height: `${textAreaHeight}` }}
                                        type="auto"
                                        offsetScrollbars
                                        scrollbarSize={2}
                                        viewportRef={scrollChatingRef}
                                        classNames={{
                                            scrollbar: 'me-0',
                                        }}
                                    >
                                    </ScrollArea>
                                </div>

                                <div className="main-chat-tool">
                                    <div className="d-flex bd-highlight mb-3 mt-3">
                                        <div className="p-2 bd-highlight align-self-end">
                                            <ActionIcon color="blue" variant="subtle">
                                                <IconMicrophone />
                                            </ActionIcon>
                                        </div>
                                        <div className="p-2 bd-highlight align-self-end">
                                            <ActionIcon
                                                color="blue"
                                                variant="subtle"
                                                onClick={() => dropzoneRef.current()}
                                            >
                                                <IconPhoto />
                                            </ActionIcon>
                                        </div>
                                        <div className="p-2 bd-highlight align-self-end">
                                            <ActionIcon color="blue" variant="subtle">
                                                <IconSticker />
                                            </ActionIcon>
                                        </div>
                                        <div className="p-2 bd-highlight align-self-end">
                                            <ActionIcon color="blue" variant="subtle">
                                                <IconGif />
                                            </ActionIcon>
                                        </div>
                                        <div className="p-2 bd-highlight align-self-end flex-fill ms-auto">
                                            {/* {attachFiles.length > 0 && (
                                                <aside className="preview-attach-files" style={thumbsContainer}>
                                                    {thumbs}
                                                </aside>
                                            )} */}

                                            <Textarea
                                                classNames={{
                                                    input: 'py-1 ps-3 pe-5 align-self-start',
                                                }}
                                                ref={chatInputRef}
                                                // autosize
                                                // minRows={1}
                                                // maxRows={4}
                                                rows={1}
                                                variant="filled"
                                                radius="xl"
                                                size={14}
                                                rightSection={
                                                    <Popover
                                                        position="top-start"
                                                        shadow="md"
                                                        classNames={{
                                                            dropdown: 'p-0',
                                                        }}
                                                    >
                                                        <Popover.Target>
                                                            <ActionIcon className="me-5" radius="xl">
                                                                <IconMoodSmileFilled />
                                                            </ActionIcon>
                                                        </Popover.Target>
                                                        <Popover.Dropdown>
                                                            <div>
                                                                <Picker
                                                                    data={data}
                                                                    onEmojiSelect={(e) =>
                                                                        setValueInput(valueInput + e.native)
                                                                    }
                                                                />
                                                            </div>
                                                        </Popover.Dropdown>
                                                    </Popover>
                                                }
                                                value={valueInput}
                                                onChange={(e) => {
                                                    setValueInput(e.currentTarget.value);
                                                }}
                                                // onKeyDown={handleEnterPress}
                                            />
                                        </div>
                                        <div className="p-2 bd-highlight align-self-end">
                                            <ActionIcon
                                                color="blue"
                                                variant="subtle"
                                                // onClick={handleSendingMessage}
                                            >
                                                <IconSend />
                                            </ActionIcon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid.Col>
                        <Dropzone
                            openRef={dropzoneRef}
                            onDrop={(files) => {
                                setAttachFiles(
                                    files.map((file) =>
                                        Object.assign(file, {
                                            preview: URL.createObjectURL(file),
                                        }),
                                    ),
                                );
                            }}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={3 * 1024 ** 2}
                            // accept={[ ...IMAGE_MIME_TYPE, MIME_TYPES.mp4 ]}
                            accept={{
                                'image/*': [], // All images
                                'video/*': [],
                            }}
                            hidden={true}
                        />
                    </Grid>
                </Grid.Col>
            </Grid>
        </div>
    );
}

export default NewChat;
