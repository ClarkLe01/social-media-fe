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

const dataTest = [
    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
        label: 'Bender Bending Rodríguez',
        value: 'Bender Bending Rodríguez',
        description: 'Fascinated with cooking',
    },

    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
        label: 'Carol Miller',
        value: 'Carol Miller',
        description: 'One of the richest people on Earth',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
        label: 'Homer Simpson',
        value: 'Homer Simpson',
        description: 'Overweight, lazy, and often ignorant',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        label: 'Spongebob Squarepants',
        value: 'Spongebob Squarepants',
        description: 'Not just a sponge',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        label: 'Spongebob Squarepants 2',
        value: 'Spongebob Squarepants 2',
        description: 'Not just a sponge',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        label: 'Spongebob Squarepants 3',
        value: 'Spongebob Squarepants 3',
        description: 'Not just a sponge',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        label: 'Spongebob Squarepants 4',
        value: 'Spongebob Squarepants  4',
        description: 'Not just a sponge',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        label: 'Spongebob Squarepants 5',
        value: 'Spongebob Squarepants 5',
        description: 'Not just a sponge',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        label: 'Spongebob Squarepants 6',
        value: 'Spongebob Squarepants 6',
        description: 'Not just a sponge',
    },
];

let SelectItem = ({ image, label, description, ...others }, ref) => (
    <div ref={ref} {...others}>
        <Group noWrap>
            <Avatar src={image} />
            <div>
                <Text>{label}</Text>
                <Text size="xs" color="dimmed">
                    {description}
                </Text>
            </div>
        </Group>
    </div>
);

SelectItem = forwardRef(SelectItem);

function NewChat() {
    useScrollLock(true);
    const { profile } = useAuth();
    const { friendList, friendListLoading } = useFriend(profile.data.id);
    const location = useLocation();
    const navigate = useNavigate();
    const { RoomList } = useRoom();
    const [ attachFiles, setAttachFiles ] = useState([]);
    const [ valueInput, setValueInput ] = useState('');
    const [ friendData, setFriendData ] = useState([]);
    const [ members, setMembers ] = useState([]);
    const dropzoneRef = useRef(null);

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => attachFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    useEffect(() => {
        console.log('members', members);
    }, [ members ]);

    useEffect(() => {
        if(friendList && !friendListLoading){
            console.log(friendList.data);
        }
    }, [ friendListLoading, friendList ]);

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
                                        onChange={setMembers}
                                        label="To :"
                                        itemComponent={SelectItem}
                                        data={dataTest}
                                        searchable
                                        nothingFound="Nothing found"
                                        maxDropdownHeight={400}
                                        filter={(value, selected, item) =>
                                            !selected &&
                                            (item.label
                                                .toLowerCase()
                                                .includes(value.toLowerCase().trim()) ||
                                                item.description
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
                                                        >
                                                            <Popover.Target>
                                                                <ActionIcon
                                                                    className="me-5"
                                                                    radius="xl"
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
                                                />
                                            </div>
                                            <div className="p-2 pb-3 bd-highlight align-self-end">
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
