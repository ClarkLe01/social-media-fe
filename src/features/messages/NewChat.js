import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
    Grid,
    Text,
    ScrollArea,
    ActionIcon,
    Input,
    Group,
    Popover,
    Textarea,
    MultiSelect,
    Avatar,
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

import { useRoom, useAuth, useFriend } from '@services/controller';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rooms } from './components';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { navigatePath } from '@app/routes/config';
import ThumbMedia from './components/ThumbMedia';
import { API_URL } from '@constants';

let SelectItem = ({ avatar, label, ...others }, ref) => (
    <div ref={ref} {...others}>
        <Group noWrap>
            <Avatar src={avatar} radius={'100%'} />
            <div>
                <Text>{label}</Text>
            </div>
        </Group>
    </div>
);

SelectItem = forwardRef(SelectItem);

function NewChat() {
    useScrollLock(true);
    const { profile } = useAuth();
    const { friendListDetail, friendListDetailLoading } = useFriend(profile.data.id);
    const location = useLocation();
    const navigate = useNavigate();
    const { RoomList, createRoom } = useRoom();
    const [ attachFiles, setAttachFiles ] = useState([]);
    const [ valueInput, setValueInput ] = useState('');
    const [ friendData, setFriendData ] = useState([]);
    const [ members, setMembers ] = useState([]);
    const [ showEmoji, setShowEmoji ] = useState(false);
    const dropzoneRef = useRef(null);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => attachFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    const handleSendingMessage = () => {
        if(members.length == 0) return;
        if (valueInput.trim().length == 0 && attachFiles.length == 0) return;
        const form = new FormData();
        attachFiles.map(file => form.append("chatFiles", file));
        form.append('members', [ members ]);
        form.append('content', valueInput);
        createRoom(
            {
                data: form,
            },
            {
                onSuccess: (data) => {
                    const from = location.state?.from || navigatePath.chat;
                    navigate(from.replace(':roomId', data.data.id), { state: { from: undefined } });
                },
                onError: (error) => {
                    console.log(error.response.data);
                },
            },
        );
    };

    const handleEnterPress = (e) => {
        if (e.code == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendingMessage();
        }
    };

    useEffect(() => {
        if(friendListDetail && !friendListDetailLoading){
            friendListDetail.data.map(item => {
                item.requestID.id === profile.data.id 
                    ? setFriendData(prev => [ ...prev, 
                        {
                            value: item.responseID.id,
                            email: item.responseID.email,
                            avatar: API_URL+item.responseID.avatar.replace(API_URL,''),
                            label: item.responseID.first_name + ' ' + item.responseID.last_name,
                        },
                    ]) 
                    : setFriendData(prev => [ ...prev, 
                        {
                            value: item.requestID.id,
                            email: item.requestID.email,
                            avatar: API_URL+item.requestID.avatar.replace(API_URL,''),
                            label: item.requestID.first_name + ' ' + item.requestID.last_name,
                        },
                    ]);
            });
        }
        return () => setFriendData([]);
    }, [ friendListDetail, friendListDetailLoading ]);

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
                            style={{ height: '80vh' }}
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
                                    <MultiSelect
                                        value={members}
                                        onChange={(e) => {setMembers(e), console.log('onChange', e);}}
                                        label="To :"
                                        itemComponent={SelectItem}
                                        data={friendData}
                                        searchable
                                        nothingFound="Nothing found"
                                        maxDropdownHeight={400}
                                        filter={(value, selected, item) =>
                                            !selected &&
                                            (item.label
                                                .toLowerCase()
                                                .includes(value.toLowerCase().trim()))
                                        }
                                        rightSection={<></>}
                                        classNames={{
                                            label: 'ps-3 pt-2 pb-1',
                                            input: 'border-0',
                                        }}
                                        styles={{
                                            input: {
                                                backgroundColor: '#fff0',
                                            },
                                            dropdown: {
                                                width: '500',
                                            },
                                        }}
                                    />
                                </div>
                                <div
                                    className="main-chat-content"
                                    style={{
                                        position: 'relative',
                                    }}
                                >
                                    <ScrollArea
                                        style={{ height: `calc(100vh - 3000rem)` }}
                                        type="auto"
                                        offsetScrollbars
                                        scrollbarSize={2}
                                        classNames={{
                                            scrollbar: 'me-0',
                                        }}
                                    />
                                    <div
                                        className="main-chat-tool algin-items-center justify-content-center"
                                        style={{
                                            position: 'absolute',
                                            bottom: '-84vh',
                                            display: 'block',
                                            width: '100%',
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        <div>
                                            {attachFiles.length > 0 && (
                                                <ThumbMedia files={attachFiles} setFiles={setAttachFiles} openDropZone={() => dropzoneRef.current()}/>
                                            )}
                                        </div>
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
                                            {/* <div className="p-2 bd-highlight align-self-end">
                                                <ActionIcon color="blue" variant="subtle">
                                                    <IconSticker />
                                                </ActionIcon>
                                            </div> */}
                                            <div className="p-2 bd-highlight align-self-end">
                                                <ActionIcon color="blue" variant="subtle">
                                                    <IconGif />
                                                </ActionIcon>
                                            </div>
                                            <div className="p-2 bd-highlight align-self-end ms-auto flex-fill">
                                                <Textarea
                                                    classNames={{
                                                        input: 'ps-3 pe-5 align-self-start',
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
                                                            <Popover.Dropdown className='me-4'>
                                                                <div>
                                                                    <Picker
                                                                        data={data}
                                                                        onEmojiSelect={(e) =>
                                                                            setValueInput(
                                                                                valueInput +
                                                                                    e.native,
                                                                            )
                                                                        }
                                                                        className="me-3"
                                                                        
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
                        <Dropzone
                            openRef={dropzoneRef}
                            onDrop={(files) => setAttachFiles(prev => [ ...prev, ...files ])}
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
