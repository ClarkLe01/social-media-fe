import React, { useEffect, useRef, useState } from 'react';
import {
    Grid,
    Avatar,
    Group,
    Text,
    ScrollArea,
    ActionIcon,
    Input,
    Indicator,
    Button,
    Popover,
    Textarea,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import {
    IconEdit,
    IconSearch,
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
import { useScrollLock } from '@mantine/hooks';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import SentMessage from './components/SentMessage';
import ReceivedMessage from './components/ReceivedMessage';
import MessengerItem from './components/MessengerItem';

const messengers = [
    {
        avatar: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/240602368_2949784998683767_8908021084589871971_n.jpg?stp=c0.0.320.320a_dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=bVoi3TeGpbQAX9yJOPs&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfC6_pi39tc6e6v56kHBKj2ak9uzfQRB7xlzNOyr44h_0Q&oe=6428725B',
        name: 'Vo Van Duc',
        lastMessage: 'hôm trước em làm xog r màaaaaaaaa chưa tô màu á thầy nên e chưa nộp',
        lastTime: '19m',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        name: 'Clark Le',
        lastMessage: 'hôm trước em làm xog r màaaaaaaa chưa tô màu á thầy nên e chưa nộp',
        lastTime: '19m',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        name: 'Clark Le',
        lastMessage: 'hôm trước em làm xog r màaaaaa chưa tô màu á thầy nên e chưa nộp',
        lastTime: '19m',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        name: 'Clark Le',
        lastMessage:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae perspiciatis.',
        lastTime: '19m',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        name: 'Clark Le',
        lastMessage:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae perspiciatis.',
        lastTime: '19m',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        name: 'Clark Le',
        lastMessage:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae perspiciatis.',
        lastTime: '19m',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        name: 'Clark Le',
        lastMessage:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae perspiciatis.',
        lastTime: '19m',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        name: 'Clark Le',
        lastMessage:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae perspiciatis.',
        lastTime: '19m',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        name: 'Clark Le',
        lastMessage:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae perspiciatis.',
        lastTime: '19m',
    },
    {
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        name: 'Clark Le',
        lastMessage:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt nulla quam aut sed corporis voluptates praesentium inventore, sapiente ex tempore sit consequatur debitis non! Illo cum ipsa reiciendis quidem facere, deserunt eos totam impedit. Vel ab, ipsum veniam aperiam odit molestiae incidunt minus, sint eos iusto earum quaerat vitae perspiciatis.',
        lastTime: '19m',
    },
];

const messagesContent = [
    {
        id: 1,
        sender: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-12T07:50:21.817Z',
        content: 'Hi! How are you!',
    },
    {
        id: 2,
        sender: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-12T07:50:22.817Z',
        content: "Hi! How are you! I'm fine thank you and you?",
    },
    {
        id: 3,
        sender: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-12T07:51:21.817Z',
        content:
            "Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you?",
    },
    {
        id: 4,
        sender: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-12T07:56:21.817Z',
        content: 'Hi! How are you!',
    },
    {
        id: 5,
        sender: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-12T09:58:21.817Z',
        content: "Hi! How are you! I'm fine thank you and you?",
    },
    {
        id: 6,
        sender: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-12T10:01:21.817Z',
        content:
            "Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi!",
    },
    {
        id: 7,
        sender: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-27T15:01:21.817Z',
        content:
            "Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you?",
    },
    {
        id: 8,
        sender: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-27T15:03:21.817Z',
        content:
            "Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you?",
    },
    {
        id: 9,
        sender: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-28T15:01:21.817Z',
        content:
            "Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you?  I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you?  I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? Hi! How are you! I'm fine thank you and you? ",
    },
    {
        id: 10,
        sender: {
            id: 2,
            name: 'Clark Le',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        receiver: {
            id: 1,
            name: 'Vo Van Duc',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
        },
        roomID: 12,
        time: '2023-03-28T15:01:21.817Z',
        content: '123123 😊😄😆😅',
    },
];

const currentUser = {
    id: 1,
    name: 'Vo Van Duc',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
};
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
const MemorizedMessengerItem = React.memo(MessengerItem);

function Messages() {
    useScrollLock(true);
    const dropzoneRef = useRef(null);
    const [ valueInput, setValueInput ] = useState('');
    const [ attachFiles, setAttachFiles ] = useState([]);
    const scrollChatingRef = useRef(null);
    const chatInputRef = useRef(null);

    const scrollToBottom = () =>
        scrollChatingRef.current.scrollTo({
            top: scrollChatingRef.current.scrollHeight,
            behavior: 'smooth',
        });
    const handleSendingMessage = () => {
        if (valueInput.length == 0) return;
        const date = new Date();
        const message = {
            id: messagesContent.length + 1,
            sender: {
                id: 1,
                name: 'Vo Van Duc',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
            },
            receiver: {
                id: 2,
                name: 'Clark Le',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
            },
            roomID: 12,
            time: date.toISOString(),
            content: valueInput,
        };
        messagesContent.push(message);
        setValueInput('');
        scrollToBottom();
    };
    const handleEnterPress = (e) => {
        if (e.code == 'Enter') {
            handleSendingMessage();
        }
    };
    useEffect(() => {
        if (scrollChatingRef.current) {
            scrollChatingRef.current.scrollTop = scrollChatingRef.current.scrollHeight;
        }
    }, []);

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

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => attachFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);
    return (
        <div className="col-12">
            <div className="row">
                <Grid grow gutter="sm" className="p-0">
                    <Grid.Col span={2} className="border border-1 p-0 py-1">
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
                                style={{ height: 'calc(100vh - 160px)' }}
                                type="scroll"
                                offsetScrollbars
                                scrollbarSize={4}
                            >
                                {messengers.map((messenger, index) => (
                                    <MemorizedMessengerItem key={index} messenger={messenger} />
                                ))}
                            </ScrollArea>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={8} className="border border-1 p-0 py-0">
                        <div>
                            <div className="main-chat-header border border-1 p-0 py-1 mx-0 row">
                                <div className="d-flex align-items-center px-0">
                                    <Button
                                        variant="subtle"
                                        size="lg"
                                        leftIcon={
                                            <Group position="center" className="me-3">
                                                <Indicator
                                                    dot
                                                    inline
                                                    offset={4}
                                                    position="bottom-end"
                                                    color="green"
                                                    withBorder
                                                >
                                                    <Avatar
                                                        size={45}
                                                        radius="xl"
                                                        src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-1/240602368_2949784998683767_8908021084589871971_n.jpg?stp=c0.0.320.320a_dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_ohc=bVoi3TeGpbQAX9yJOPs&_nc_ht=scontent.fsgn5-6.fna&oh=00_AfC6_pi39tc6e6v56kHBKj2ak9uzfQRB7xlzNOyr44h_0Q&oe=6428725B"
                                                    />
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
                                        <ActionIcon size="lg">
                                            <IconInfoCircle />
                                        </ActionIcon>
                                    </div>
                                </div>
                            </div>
                            <div className="main-chat-content row">
                                <ScrollArea
                                    style={{ height: '450px' }}
                                    type="auto"
                                    offsetScrollbars
                                    scrollbarSize={2}
                                    viewportRef={scrollChatingRef}
                                >
                                    <div className="chat-wrapper pt-0 w-100 position-relative bg-white theme-dark-bg">
                                        <div className="chat-body p-3 ">
                                            <div className="messages-content pb-5">
                                                {messagesContent.map((message, index) => {
                                                    const timeMessage = new Date(message.time);
                                                    let prevTimeMessage =
                                                        index == 0
                                                            ? timeMessage
                                                            : new Date(
                                                                messagesContent[index - 1].time,
                                                            );
                                                    const now = new Date();
                                                    let timeRangewithPrev =
                                                        (timeMessage - prevTimeMessage) /
                                                        (1000 * 60);
                                                    let isShowAvatar =
                                                        index == messagesContent.length - 1 ||
                                                        timeRangewithPrev <= 30
                                                            ? true
                                                            : message.sender.id != messagesContent[index + 1].sender.id;
                                                    let compareTimeNow =
                                                        (now - timeMessage) / (1000 * 60);
                                                    let timeString = timeMessage.toLocaleString(
                                                        'en-US',
                                                        {
                                                            weekday: 'short',
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            hour12: false,
                                                        },
                                                    );
                                                    if (
                                                        compareTimeNow < 1440 * 7 &&
                                                        compareTimeNow >= 1440
                                                    ) {
                                                        timeString = timeMessage.toLocaleString(
                                                            'en-US',
                                                            {
                                                                weekday: 'short',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: false,
                                                            },
                                                        );
                                                    }
                                                    if (compareTimeNow < 1440) {
                                                        timeString = timeMessage.toLocaleString(
                                                            'en-US',
                                                            {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: false,
                                                            },
                                                        );
                                                    }
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {(timeRangewithPrev >= 30 ||
                                                                index == 0) && (
                                                                <div className="message-item grouping-message mx-auto mb-1 py-1">
                                                                    <Text size="sm" c="dimmed">
                                                                        {timeString}
                                                                    </Text>
                                                                </div>
                                                            )}
                                                            {currentUser.id == message.sender.id ? (
                                                                <SentMessage
                                                                    content={message.content}
                                                                    time={timeString}
                                                                />
                                                            ) : (
                                                                <ReceivedMessage
                                                                    content={message.content}
                                                                    time={timeString}
                                                                    receiver={message.receiver}
                                                                    isShowAvatar={isShowAvatar}
                                                                />
                                                            )}
                                                        </React.Fragment>
                                                    );
                                                })}

                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                            </div>

                            <div className="main-chat-tool row" ref={chatInputRef}>
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
                                            <aside
                                                className="preview-attach-files"
                                                style={thumbsContainer}
                                            >
                                                {thumbs}
                                            </aside>
                                        )}
                                        <Textarea
                                            classNames={{
                                                input: 'py-1 ps-3 pe-5 align-self-start',
                                            }}
                                            autosize
                                            minRows={1}
                                            maxRows={4}
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
                                                        <ActionIcon radius="xl">
                                                            <IconMoodSmileFilled />
                                                        </ActionIcon>
                                                    </Popover.Target>
                                                    <Popover.Dropdown>
                                                        <div>
                                                            <Picker
                                                                data={data}
                                                                onEmojiSelect={(e) =>
                                                                    setValueInput(
                                                                        valueInput + e.native,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </Popover.Dropdown>
                                                </Popover>
                                            }
                                            value={valueInput}
                                            onChange={(e) => setValueInput(e.currentTarget.value)}
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
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
}

export default Messages;
