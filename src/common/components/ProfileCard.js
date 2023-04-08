import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    IconUserPlus,
    IconUserX,
    IconUserCheck,
    IconBrandMessenger,
    IconPlus,
    IconPencil,
    IconFriends,
    IconBookmark,
    IconBrandYoutube,
    IconPhoto,
    IconId,
    IconCamera,
    IconUpload,
} from '@tabler/icons-react';
import {
    Button,
    Avatar,
    Image,
    Text,
    Group,
    ActionIcon,
    AspectRatio,
    Menu,
    Modal,
    Slider,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

import { useAuth, useFriend } from '@features/auth';
import { useParams } from 'react-router-dom';
import ImageCropper from './ImageCropper';
import { useQueryClient } from '@tanstack/react-query';

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}
function ProfileCard(props) {
    const queryClient = useQueryClient();

    const { user } = props;
    const { profile } = useAuth();
    const { friendList, requestList, responseList, addFriend, acceptRequest, deleteFriend } = useFriend(user.id);

    const [ currentUser, setCurrentUser ] = useState(profile.data);
    const [ dimensions, setDimensions ] = useState({ width: 400, height: 182 });
    const isHide = dimensions.width < 405 ? true : false;

    const [ groupButtonType, setGroupButtonType ] = useState(null);

    const [ avatarSrc, setAvatarSrc ] = useState(null);
    const openAvatarRef = useRef(null);
    const [ imageCoverSrc, setImageCoverSrc ] = useState(null);
    const openCoverRef = useRef(null);

    const [ openAvatarModal, setOpenAvatarModal ] = useState(false);

    const updateDimensions = () => {
        let update_width = window.innerWidth - 100;
        let update_height = Math.round(update_width / 4.4);
        setDimensions({ width: update_width, height: update_height });
    };
    const onAvatarChange = async (files) => {
        if (files && files.length > 0) {
            const file = files[0];
            let imageDataUrl = await readFile(file);
            setAvatarSrc(imageDataUrl);
        }
    };

    const handleAcceptRequest = useCallback(() => {
        const instances = [ ...friendList.data, ...requestList.data, ...responseList.data ];
        console.log('handleAcceptRequest', instances);
        const target = instances.find((instance) => (instance.requestID === user.id && instance.responseID === currentUser.id) || (instance.requestID === currentUser.id && instance.responseID === user.id));
        console.log('target_handleAcceptRequest', target);
        acceptRequest(
            {
                instanceId: target.id,
            }, 
            {
                onError: (error) => {
                    console.log(error.response.data);
                },
            },
        );

    }, [ user, friendList, responseList, requestList ]);
    const handleDeleteFriend = useCallback(() => {
        const instances = [ ...friendList.data, ...requestList.data, ...responseList.data ];
        console.log('handleDeleteFriend', instances);
        const target = instances.find((instance) => (instance.requestID === user.id && instance.responseID === currentUser.id) || (instance.requestID === currentUser.id && instance.responseID === user.id));
        console.log('target_handleDeleteFriend', target);
        
        deleteFriend(
            {
                pathParams: { instanceId: target.id },
            }, 
            {
                onError: (error) => {
                    console.log(error.response.data);
                },
            },
        );
    }, [ user, friendList, responseList, requestList ]);
    const handleAddFriend = useCallback(() => {
        addFriend(
            {
                data: { responseID: user.id },
            }, 
            {
                onError: (error) => {
                    console.log(error.response.data);
                },
            },
        );
    }, [ user ]);

    const getGroupButtonNum = useCallback(
        () => {
            switch (groupButtonType) {
                            case 'friend':
                                return (
                                    <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                        <Button color="green" leftIcon={<IconUserCheck size={23} />}>Friend</Button>
                                        <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button>
                                    </Group>
                                );
                            case 'request':
                                return (
                                    <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                        <Button onClick={handleDeleteFriend} color="red" leftIcon={<IconUserCheck size={23} />}>Cancel Request</Button>
                                        <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button>
                                    </Group>
                                );
                            case 'response':
                                return (
                                    <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                        <Menu>
                                            <Menu.Target>
                                                <Button color="violet" leftIcon={<IconUserCheck size={23} />}>Respond</Button>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item onClick={handleAcceptRequest}>Confirm</Menu.Item>
                                                <Menu.Item onClick={handleDeleteFriend}>Delete Request</Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                        <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button>
                                    </Group>
                                );
                            case 'me':
                                return (
                                    <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                        <Button leftIcon={<IconPlus size={23} />}>Add your story</Button>
                                        <Button color="pink" leftIcon={<IconPencil size={23} />}>
                                            Edit profile
                                        </Button>
                                    </Group>
                                );
                            case 'no':
                                return (
                                    <Group className="d-inline-block d-flex align-items-center justify-content-center me-sm-3 mb-1 ms-auto">
                                        <Button onClick={handleAddFriend} color="gray" leftIcon={<IconUserPlus size={23} />}>Add Friend</Button>
                                        <Button leftIcon={<IconBrandMessenger size={23} />}>Message</Button>
                                    </Group>
                                );
                            default:
                                return (
                                    <></>
                                );
            }
        },
        [ groupButtonType ],
    );

    useEffect(() => {
        if (friendList && requestList && responseList ) {
            if(user.id != currentUser.id) {
                let isFriend = friendList.data.find(
                    (friend) =>
                        (friend.responseID == user.id && friend.requestID == currentUser.id) ||
                        (friend.responseID == currentUser.id && friend.requestID == user.id),
                );
                let isRequest = requestList.data.find((request) => request.responseID == user.id);
                let isResponse = responseList.data.find((response) => response.requestID == user.id);
                
                isFriend && setGroupButtonType('friend');
                isRequest && setGroupButtonType('request');
                isResponse && setGroupButtonType('response');
                !isFriend && !isRequest && !isResponse && setGroupButtonType('no');
            } else {
                setGroupButtonType('me');
            }
            
        }

    }, [ friendList, requestList, responseList, user ]);

    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);
    return (
        <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl m-3">
                <div>
                    <AspectRatio ratio={4 / 1} mah={300}>
                        {/* <Image
                            src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/333286360_719427689884255_5322141626167512166_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=AwOe1mb6wEUAX8N8ZPj&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfBxUtbWG0hS5WBuVcmVYw6qDR0uo5oBFYfub5tChYA32g&oe=64343B50"
                            alt="avatar"
                            fit="cover"
                        /> */}
                        <Image src={user.cover} alt="cover" fit="cover" />
                    </AspectRatio>
                </div>
                {user.id == currentUser.id && (
                    <>
                        <Group style={{ position: 'relative' }}>
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Button
                                        color="indigo"
                                        variant="filled"
                                        leftIcon={<IconCamera size={18} />}
                                        style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            right: '10px',
                                        }}
                                    >
                                        Edit Cover Photo
                                    </Button>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item icon={<IconPhoto size={16} />}>
                                        <Text>Select photo</Text>
                                    </Menu.Item>
                                    <Menu.Item icon={<IconUpload size={16} />}>
                                        <Text>Upload photo</Text>
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </>
                )}
            </div>
            <div className="card-body p-0 position-relative d-sm-flex">
                <figure
                    className="avatar position-absolute w100 z-index-1"
                    style={{ top: '-40px', left: '30px' }}
                >
                    <Avatar
                        radius={100}
                        size={100}
                        variant="outline"
                        classNames={{
                            image: 'float-right p-1 bg-white rounded-circle w-100',
                        }}
                        src={user.avatar}
                    />
                    {user.id == currentUser.id && (
                        <>
                            <Group
                                style={{
                                    position: 'relative',
                                    bottom: '35px',
                                    left: '70px',
                                }}
                            >
                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <ActionIcon color="gray" radius="xl" variant="filled">
                                            <IconCamera size={18} />
                                        </ActionIcon>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Item icon={<IconPhoto size={16} />}>
                                            <Text>Select photo</Text>
                                        </Menu.Item>
                                        <Menu.Item
                                            icon={<IconUpload size={16} />}
                                            onClick={() => {
                                                setOpenAvatarModal(true), openAvatarRef.current();
                                            }}
                                        >
                                            <Text>Upload photo</Text>
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </>
                    )}
                </figure>

                {user.id == currentUser.id && (
                    <>
                        <div hidden>
                            <Dropzone
                                openRef={openAvatarRef}
                                onDrop={(files) => onAvatarChange(files)}
                                onReject={(files) => console.log('rejected files', files)}
                                maxSize={3 * 1024 ** 2}
                                accept={{
                                    'image/*': [],
                                }}
                                maxFiles={1}
                            />
                        </div>
                        <Modal
                            opened={openAvatarModal && avatarSrc}
                            onClose={() => {
                                setAvatarSrc(null), setOpenAvatarModal(false);
                            }}
                            title="Update Avatar"
                        >
                            <div>
                                <ImageCropper
                                    imageSrc={avatarSrc}
                                    aspect={1 / 1}
                                    maxZoom={3}
                                    cropShape="round"
                                    setResult={setAvatarSrc}
                                />
                            </div>
                        </Modal>
                    </>
                )}

                <h4 className="d-inline-block fw-700 font-sm mt-2 mb-lg-2 mb-0 pl-15 me-2">
                    {user.first_name} {user.last_name}
                    {}{' '}
                    <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
                        {user.email}
                    </span>
                </h4>
                {groupButtonType && getGroupButtonNum(groupButtonType)}
            </div>

            <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                <ul
                    className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
                    id="pills-tab"
                    role="tablist"
                >
                    <li className="active list-inline-item me-5">
                        <a
                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                            href="#navtabs1"
                            data-toggle="tab"
                        >
                            Posts
                        </a>
                    </li>
                    <li className="list-inline-item me-5">
                        <a
                            className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                            href="#navtabs2"
                            data-toggle="tab"
                        >
                            About
                        </a>
                    </li>
                    {isHide ? (
                        <li className="list-inline-item me-5">
                            <Menu withArrow>
                                <Menu.Target>
                                    <div className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block">
                                        More
                                    </div>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item icon={<IconBookmark />}>Posts</Menu.Item>
                                    <Menu.Item icon={<IconId />}>About</Menu.Item>
                                    <Menu.Item icon={<IconFriends />}>Friends</Menu.Item>
                                    <Menu.Item icon={<IconPhoto />}>Photos</Menu.Item>
                                    <Menu.Item icon={<IconBrandYoutube />}>Videos</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </li>
                    ) : (
                        <>
                            <li className="list-inline-item me-5">
                                <a
                                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                    href="#navtabs3"
                                    data-toggle="tab"
                                >
                                    Friends
                                </a>
                            </li>
                            <li className="list-inline-item me-5">
                                <a
                                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                    href="#navtabs4"
                                    data-toggle="tab"
                                >
                                    Photos
                                </a>
                            </li>
                            <li className="list-inline-item me-5">
                                <a
                                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                                    href="#navtabs3"
                                    data-toggle="tab"
                                >
                                    Videos
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}
export default ProfileCard;
