import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Grid,
    Group,
    Text,
    ScrollArea,
    ActionIcon,
    Indicator,
    Button,
    Popover,
    Textarea,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import {
    IconMicrophone,
    IconPhoto,
    IconMoodSmileFilled,
    IconPhone,
    IconVideo,
    IconInfoCircle,
    IconGif,
    IconSticker,
    IconSend,
} from '@tabler/icons-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useAuth, useMessage } from '@services/controller';
import { useLocation, useNavigate } from 'react-router-dom';
import Messages from './Messages';
import Socket, { connections } from '@services/socket';
import { useQueryClient } from '@tanstack/react-query';
import { API_URL } from '@constants';
import NotFound404 from '@features/errorsPage/NotFound404';
import GroupRoomProfile from './GroupRoomProfile';
import PrivateRoomProfile from './PrivateRoomProfile';
import AvatarDisplay from './AvatarDisplay';
import RoomNameDisplay from './RoomNameDisplay';
import ThumbMedia from './ThumbMedia';

function MainChat(props) {
    const queryClient = useQueryClient();
    const { roomId } = props;
    const [ showRoomDetail, setShowRoomDetail ] = useState(false);
    const [ attachFiles, setAttachFiles ] = useState([]);
    const [ valueInput, setValueInput ] = useState('');
    const { messageList, messageListLoading, messageListError, RoomDetail, RoomDetailError, sendMessage } = useMessage(roomId);
    const { profile } = useAuth();
    const currentUser = useMemo(() => profile.data, [ profile.data ]);
    const [ messages, setMessages ] = useState([]);
    const scrollChatingRef = useRef(null);
    const dropzoneRef = useRef(null);
    const [ clientSocket, setClientSocket ] = useState(null);
    const [ connected, setConnected ] = useState(false);
    const [ showEmoji, setShowEmoji ] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    

    const scrollToBottom = () =>
        scrollChatingRef.current.scrollTo({
            top: scrollChatingRef.current.scrollHeight,
            behavior: 'smooth',
        });

    useEffect(() => {
        if (!messageListLoading && messageList) {
            setMessages(messageList.data);
        }
    }, [ messageListLoading, roomId ]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => attachFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [ roomId ]);

    useEffect(() => {
        const initChat = async () => {
            const socket = new Socket(connections.chat, { pathParams: { roomId } }).private();
            setClientSocket(socket);
            setConnected(true);
        };
        initChat();
    }, [ roomId ]);

    useEffect(() => {
        if (!clientSocket) return;
        let timeoutId;
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                console.log('left tab');
                timeoutId = setTimeout(() => {
                    clientSocket.close();
                    setConnected(false);
                }, 5000);
            } else {
                console.log('returned to tab');
                console.log(connected);
                clearTimeout(timeoutId);
                if (!connected) {
                    setClientSocket(
                        new Socket(connections.chat, { pathParams: { roomId } }).private(),
                    );
                    setConnected(true);
                    console.log('reconnected');
                    queryClient.invalidateQueries({ queryKey: [ 'message/list', `room:${roomId}` ] });
                    queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
                }
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clientSocket.close();
        };
    }, [ clientSocket, connected, roomId ]);

    useEffect(() => {
        if (connected) {
            clientSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                if (data.type == 'message') {
                    const message = data.data;
                    console.log('abc', message);
                    message.senderID.avatar = API_URL + message.senderID.avatar.replace(API_URL,'');
                    setMessages((messages) => [ ...messages, data.data ]);
                    scrollToBottom();
                    queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
                }
            };
        }
    }, [ clientSocket, connected, roomId ]);


    useEffect(() => { console.log(attachFiles); }, [ attachFiles ]);

    if (!clientSocket || !connected) return null;

    const handleSendingMessage = () => {
        if (valueInput.trim().length == 0 && attachFiles.length == 0) return;
        const form = new FormData();
        attachFiles.map(file => form.append("chatFiles", file));
        form.append('content', valueInput);
        form.append('receiverID', roomId);
        sendMessage(
            {
                data: form,
            },
            {
                // onSuccess: (data) => {
                //     console.log(data);
                // },
                // onError: (error) => {
                //     console.log(error.response.data);
                // },
            },
        );
        setAttachFiles([]);
        setValueInput('');
        scrollToBottom();
    };

    const handleEnterPress = (e) => {
        if (e.code == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendingMessage();
        }
    };

    if(messageListError) {
        console.log('messageListError', messageListError);
        return <NotFound404 />;
    }

    if(RoomDetailError) {
        console.log('RoomDetailError', RoomDetailError);
        return <NotFound404 />;
    }

    return (
        <Grid columns={24} className="px-0">
            <Grid.Col span={'auto'} className="pe-0">
                <div>
                    <div className="main-chat-header border border-1 px-0 py-1 mx-0">
                        <div className="d-flex align-items-center px-0">
                            {RoomDetail && (
                                <Button
                                    variant="subtle"
                                    size="lg"
                                    leftIcon={
                                        <Group position="center" className="me-3">
                                            <Indicator
                                                inline
                                                offset={4}
                                                position="bottom-end"
                                                color="green"
                                                withBorder
                                            >
                                                <AvatarDisplay 
                                                    size={36}
                                                    members={RoomDetail.data.members.filter((member) => member.id !== currentUser.id)}
                                                    currentUser={currentUser}
                                                    isGroup={RoomDetail.data.isGroup}
                                                    avatar={RoomDetail.data.roomAvatar}
                                                />
                                            </Indicator>
                                        </Group>
                                    }
                                    classNames={{
                                        label: 'd-block',
                                        root: 'me-auto',
                                    }}
                                >
                                    <RoomNameDisplay
                                        members={RoomDetail.data.members}
                                        currentUser={currentUser}
                                        isGroup={RoomDetail.data.isGroup}
                                        roomName={RoomDetail.data.roomName}
                                        size="lg" 
                                        fw={700} 
                                        color="dark"
                                    />
                                    <Text size="xs" c="dimmed">
                                        Active Now
                                    </Text>
                                </Button>
                            )}
                            <div className="pe-3">
                                <ActionIcon size="lg">
                                    <IconPhone />
                                </ActionIcon>
                            </div>
                            <div className="pe-3">
                                <ActionIcon size="lg">
                                    <IconVideo />
                                </ActionIcon>
                            </div>
                            <div className="pe-3">
                                <ActionIcon
                                    size="lg"
                                    onClick={() => setShowRoomDetail(!showRoomDetail)}
                                >
                                    <IconInfoCircle />
                                </ActionIcon>
                            </div>
                        </div>
                    </div>
                    <div
                        className="main-chat-content"
                        style={{
                            position: 'relative',
                        }}
                    >
                        <ScrollArea
                            style={{ height: `80vh` }}
                            type="auto"
                            offsetScrollbars
                            scrollbarSize={2}
                            viewportRef={scrollChatingRef}
                            classNames={{
                                scrollbar: 'me-0',
                            }}
                        >
                            {messages.length > 0 && <Messages messages={messages} />}
                            {scrollChatingRef.current && scrollToBottom()}
                        </ScrollArea>
                        <div
                            className="main-chat-tool algin-items-center justify-content-center"
                            style={{
                                position: 'absolute',
                                bottom: '-6vh',
                                display: 'block',
                                width: '100%',
                                zIndex: 2,
                                backgroundColor: '#fff',
                            }}
                        >
                            <div>
                                {attachFiles.length > 0 && (
                                    <div className='ms-3'>
                                        <ThumbMedia files={attachFiles} setFiles={setAttachFiles} openDropZone={() => dropzoneRef.current()}/>
                                    </div>
                                )}
                            </div>
                            <div className="d-flex bd-highlight mb-3">
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
                                <div className="p-2 bd-highlight align-self-end ms-auto flex-fill">
                                    
                                    <Textarea
                                        classNames={{
                                            input: 'ps-3 pe-5 align-self-start ',
                                        }}
                                        autosize
                                        minRows={1}
                                        maxRows={3}
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
                                                opened={showEmoji} onChange={setShowEmoji}
                                            >
                                                <Popover.Target>
                                                    <ActionIcon 
                                                        className="me-5" 
                                                        radius="xl" 
                                                        onClick={() => setShowEmoji((o) => !o)}
                                                    >
                                                        <IconMoodSmileFilled />
                                                    </ActionIcon>
                                                </Popover.Target>
                                                <Popover.Dropdown className="me-4">
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
                                        onKeyDown={handleEnterPress}
                                    />
                                </div>
                                <div className="p-2 pb-3 bd-highlight align-self-end">
                                    <ActionIcon
                                        color="blue"
                                        variant="subtle"
                                        onClick={handleSendingMessage}
                                    >
                                        <IconSend />
                                    </ActionIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid.Col>
            {showRoomDetail && RoomDetail && (
                <Grid.Col span={7} className="border border-1 border-bottom-0 p-0 py-0 pt-2">
                    {RoomDetail.data.isGroup ? (
                        <GroupRoomProfile roomDetail={RoomDetail.data} currentUser={currentUser}/>
                    ) : (
                        <PrivateRoomProfile roomDetail={RoomDetail.data} currentUser={currentUser}/>
                    )}
                </Grid.Col>
            )}
            <Dropzone
                openRef={dropzoneRef}
                onDrop={(files) => setAttachFiles(prev => [ ...prev, ...files ])}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={{
                    'image/*': [], // All images
                    'video/*': [],
                }}
                hidden={true}
            />
        </Grid>
    );
}

export default MainChat;
