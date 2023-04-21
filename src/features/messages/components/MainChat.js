import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Grid,
    Avatar,
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
import { useAuth, useMessage, useRoom } from '@services/controller';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Messages from './Messages';
import Socket, { connections } from '@services/socket';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '@constants';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
};

const MemorizedMessages = React.memo(Messages);
function MainChat(props) {
    const queryClient = useQueryClient();
    const { roomId } = props;
    const [ showRoomDetail, setShowRoomDetail ] = useState(false);
    const [ textAreaHeight, setTextAreaHeight ] = useState(0);
    const [ attachFiles, setAttachFiles ] = useState([]);
    const [ valueInput, setValueInput ] = useState('');
    const { messageList, messageListLoading, RoomDetail, RoomDetailLoading, sendMessage } = useMessage(roomId);
    const { profile } = useAuth();
    const [ roomDetail, setRoomDetail ] = useState(null);
    const [ messages, setMessages ] = useState([]);
    const scrollChatingRef = useRef(null);
    const dropzoneRef = useRef(null);
    const chatInputRef = useRef(null);
    const [ clientSocket, setClientSocket ] = useState(null);
    const [ connected, setConnected ] = useState(false);

    const thumbs = attachFiles.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));
    const scrollToBottom = () =>
        scrollChatingRef.current.scrollTo({
            top: scrollChatingRef.current.scrollHeight,
            behavior: 'smooth',
        });
    useEffect(() => {
        if (!RoomDetailLoading) {
            setRoomDetail(RoomDetail.data);
        }
    }, [ RoomDetail ]);

    useEffect(() => {
        if (!messageListLoading) {
            setMessages(messageList.data);
        }
    }, [ messageList ]);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        
        return () => attachFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        
    }, []);

    useEffect(() => {
        setTextAreaHeight(`calc(100vh - 160px - ${chatInputRef.current?.clientHeight}px)`);
        
    }, [ chatInputRef.current?.clientHeight ]);

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
                    setClientSocket(new Socket(connections.chat, { pathParams: { roomId } }).private());
                    setConnected(true);
                    console.log('reconnected');
                    queryClient.invalidateQueries({ queryKey: [ "message/list", `room:${roomId}` ] });
                    queryClient.invalidateQueries({ queryKey: [ "room/list" ] });
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clientSocket.close();
        };

    }, [ clientSocket, connected ]);

    useEffect(() => {
        if(connected){
            clientSocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                if(data.type == 'message'){
                    const message = data.data;
                    message.senderID.avatar = API_URL  + message.senderID.avatar;
                    setMessages((messages) => [ ...messages, data.data ]);
                    scrollToBottom();
                    queryClient.invalidateQueries({ queryKey: [ "room/list" ] });
                }
            };
        }
    }, [ clientSocket, connected ]);

    if (!clientSocket || !connected) return null;

    

    const handleSendingMessage = () => {
        if (valueInput.length == 0) return;
        clientSocket &&
            clientSocket.send(
                JSON.stringify({
                    content: valueInput,
                }),
            );
        // sendMessage({
        //     data: {
        //         content: valueInput,
        //         receiverID: roomDetail.id,
        //     },
        // });
        setValueInput('');
        scrollToBottom();
    };

    const handleEnterPress = (e) => {
        if (e.code == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendingMessage();
        }
    };


    return (
        <Grid columns={24} className="px-0">
            <Grid.Col span={'auto'} className="pe-0">
                <div>
                    <div className="main-chat-header border border-1 px-0 py-1 mx-0">
                        <div className="d-flex align-items-center px-0">
                            {roomDetail && (
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
                                                {roomDetail.isGroup ? (
                                                    <div>
                                                        <Avatar size={45} radius="xl" />
                                                    </div>
                                                ) : (
                                                    <Avatar
                                                        size={45}
                                                        radius="xl"
                                                        src={
                                                            roomDetail.members.filter(
                                                                (member) =>
                                                                    member.id !== profile.data.id,
                                                            )[0].avatar
                                                        }
                                                    />
                                                )}
                                            </Indicator>
                                        </Group>
                                    }
                                    classNames={{
                                        label: 'd-block',
                                        root: 'me-auto',
                                    }}
                                >
                                    <Text size="lg" fw={700} color="dark">
                                        Vo Van Duc
                                    </Text>
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
                            {messages.length > 0 && <MemorizedMessages messages={messages} />}
                            {scrollChatingRef.current && scrollToBottom()}
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
                                {attachFiles.length > 0 && (
                                    <aside className="preview-attach-files" style={thumbsContainer}>
                                        {thumbs}
                                    </aside>
                                )}

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
                                    onKeyDown={handleEnterPress}
                                />
                            </div>
                            <div className="p-2 bd-highlight align-self-end">
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
            </Grid.Col>
            {showRoomDetail && (
                <Grid.Col span={7} className="border border-1 border-bottom-0 p-0 py-0 pt-2">
                    <div>Test</div>
                </Grid.Col>
            )}
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
    );
}

export default MainChat;
