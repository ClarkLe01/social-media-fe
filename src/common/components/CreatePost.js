import React, { useEffect, useState } from 'react';
import { Modal, Radio, Group } from '@mantine/core';
import MediaFileSection from './MediaFileSection';
import { ActionIcon } from '@mantine/core';
import { Button } from '@mantine/core';
import {
    IconLock,
    IconTriangleInvertedFilled,
    IconPhoto,
    IconTag,
    IconMapPinFilled,
    IconMoodHappy,
    IconArrowLeft,
} from '@tabler/icons-react';
import { Textarea } from '@mantine/core';
import { ScrollArea } from '@mantine/core';

const user = {
    imageUrl: 'user.png',
    name: 'Aliqa Macale ',
    user: '@macale343',
};

function CreatePost(props) {
    const [ content, setContent ] = useState('');
    const [ choosedValueRadio, setChoosedValueRadio ] = useState(props.defaultAudience);
    const [ lastChoosedValueRadio, setLastChoosedValueRadio ] = useState(props.defaultAudience);

    const radioButtons = [
        {
            value: 'public',
            label: 'Public',
            description: 'Anyone can see',
            icon: <IconLock />,
        },
        {
            value: 'friends',
            label: 'Friends',
            description: 'All your friends can see',
            icon: <IconLock />,
        },
        {
            value: 'friendsExcept',
            label: 'Friends Except',
            description: "Don't show to some friends",
            icon: <IconLock />,
        },
        {
            value: 'specificFriends',
            label: 'Specific Friends',
            description: 'Only show to some friends',
            icon: <IconLock />,
        },
        {
            value: 'private',
            label: 'Only Me',
            description: '',
            icon: <IconLock />,
        },
    ];

    const [ createPostState, setCreatePostState ] = useState({
        isShowDropzone: false,
        isShowTagPeople: false,
        isShowAddFeeling: false,
        isCheckIn: false,
        // add more properties as needed
    });
    const [ showModal, setShowModal ] = useState(false);
    const [ showCreatePost, setShowCreatePost ] = useState(false);
    const [ showPostAudience, setShowPostAudience ] = useState(false);
    const [ canPost, setcanPost ] = useState(false);
    // General Action
    const handleClose = () => {
        setShowModal(false);
        setShowCreatePost(false);
        setShowPostAudience(false);
    };
    const handleShow = () => {
        setShowModal(true);
        setShowCreatePost(true);
    };
    const handleToggle = () => {
        setShowCreatePost(!showCreatePost);
        setShowPostAudience(!showPostAudience);
    };
    // Modal 1 status
    function handleMediaTool() {
        setCreatePostState((prevState) => ({
            ...prevState,
            isShowDropzone: !createPostState.isShowDropzone,
        }));
    }
    function handleTagPeople() {
        setCreatePostState((prevState) => ({
            ...prevState,
            isShowTagPeople: !createPostState.isShowTagPeople,
        }));
    }
    function handleAddFeeling() {
        setCreatePostState((prevState) => ({
            ...prevState,
            isShowAddFeeling: !createPostState.isShowAddFeeling,
        }));
    }
    function handleCheckIn() {
        setCreatePostState((prevState) => ({
            ...prevState,
            isCheckIn: !createPostState.isCheckIn,
        }));
    }
    

    // Modal 2 status

    function handleRadioButtonClick(value) {
        // console.log(radioButtons[key]);
        setChoosedValueRadio(value);
    }

    useEffect(() => {
        content.length > 0 ? setcanPost(true) : setcanPost(false);
    }, [ content ]);

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-2 pe-4 pb-3 mb-3">
            <Modal
                name={showCreatePost ? 'Create post' : 'Post audience'}
                size={showCreatePost ? 'lg' : 'md'}
                opened={showModal}
                title={
                    <div className="d-flex justify-content-center">
                        {showPostAudience && (
                            <ActionIcon onClick={handleToggle}>
                                <IconArrowLeft />
                            </ActionIcon>
                        )}
                        <h1 className="fw-bold mx-auto">
                            {showCreatePost ? 'Create post' : 'Post audience'}
                        </h1>
                    </div>
                }
                classNames={{
                    header: 'd-flex justify-content-between',
                    title: 'flex-fill mx-auto',
                }}
                onClose={handleClose}
                withCloseButton={showCreatePost ? true : false}
                centered
            >
                <div className={`${!showCreatePost && 'd-none'}`} id="createPost">
                    <div className="card-body p-0 d-flex">
                        <figure className="avatar me-3">
                            <img
                                src={`assets/images/${user.imageUrl}`}
                                alt="avater"
                                className="shadow-sm rounded-circle w45"
                            />
                        </figure>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                            {' '}
                            {user.name}{' '}
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                {' '}
                                <Button
                                    variant="outline"
                                    leftIcon={<IconLock size={16} />}
                                    rightIcon={<IconTriangleInvertedFilled size={10} />}
                                    classNames={{
                                        leftSection: 'd-flex align-items-center',
                                        rightSection: 'd-flex align-items-center',
                                    }}
                                    size="xs"
                                    onClick={() => {setChoosedValueRadio(lastChoosedValueRadio),handleToggle(); }}
                                    compact
                                >
                                    {radioButtons.map(obj => (
                                        obj.value == lastChoosedValueRadio && obj.label
                                    ))}
                                </Button>
                            </span>
                        </h4>
                    </div>
                    <ScrollArea style={{ height: createPostState.isShowDropzone ? 350 : 200 }}>
                        <div className="text-content">
                            <Textarea
                                variant="unstyled"
                                classNames={{
                                    root: 'border-0',
                                }}
                                autosize
                                minRows={6}
                                value={content}
                                onChange={(event) => setContent(event.currentTarget.value)}
                            />
                        </div>
                        {createPostState.isShowDropzone && (
                            <div className="image-video-content pb-3">
                                <MediaFileSection />
                            </div>
                        )}
                    </ScrollArea>
                    <div className="post-tool d-flex bd-highlight mb-3 border border-1 mt-3">
                        <div className="me-auto p-2 bd-highlight">Add to your post</div>
                        <div className="p-2 bd-highlight">
                            <ActionIcon
                                variant={
                                    createPostState.isShowDropzone === true ? 'filled' : 'subtle'
                                }
                                onClick={handleMediaTool}
                            >
                                <IconPhoto />
                            </ActionIcon>
                        </div>
                        <div className="p-2 bd-highlight" onClick={handleTagPeople}>
                            <ActionIcon
                                variant={
                                    createPostState.isShowTagPeople === true ? 'filled' : 'subtle'
                                }
                            >
                                <IconTag />
                            </ActionIcon>
                        </div>
                        <div className="p-2 bd-highlight" onClick={handleAddFeeling}>
                            <ActionIcon
                                variant={
                                    createPostState.isShowAddFeeling === true ? 'filled' : 'subtle'
                                }
                            >
                                <IconMoodHappy />
                            </ActionIcon>
                        </div>
                        <div className="p-2 bd-highlight" onClick={handleCheckIn}>
                            <ActionIcon
                                variant={createPostState.isCheckIn === true ? 'filled' : 'subtle'}
                            >
                                <IconMapPinFilled />
                            </ActionIcon>
                        </div>
                    </div>
                    <div className="d-grid gap-2 mx-auto">
                        <Button fullWidth disabled={canPost ? false : true}>
                            Post
                        </Button>
                    </div>
                </div>
                <div className={`${!showPostAudience && 'd-none'}`} id="postAudience">
                    <ScrollArea style={{ height: 270 }}>
                        <p></p>
                        <Radio.Group
                            value={choosedValueRadio}
                            onChange={setChoosedValueRadio}
                            name="Post audience"
                            label="Who can see your post?"
                            description="This is anonymous"
                        >
                            <Group mt="xs" className="d-flex d-grid gap-2 flex-fill">
                                {radioButtons.map((radio, id) => (
                                    <Button
                                        key={id}
                                        size="xl"
                                        fullWidth
                                        variant="outline"
                                        leftIcon={radio.icon}
                                        classNames={{
                                            inner: 'justify-content-start',
                                            root: 'px-0 ps-1',
                                            label: 'flex-fill',
                                        }}
                                        onClick={() => handleRadioButtonClick(radio.value)}
                                    >
                                        <Radio
                                            labelPosition="left"
                                            value={radio.value}
                                            label={radio.label}
                                            description={radio.description}
                                            classNames={{
                                                inner: 'mt-2',
                                                root: 'flex-fill',
                                                body: 'flex-fill pe-3 align-items-center',
                                                labelWrapper: 'me-auto',
                                            }}
                                        />
                                    </Button>
                                ))}
                            </Group>
                        </Radio.Group>
                    </ScrollArea>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-1 pt-2">
                        <Button variant="outline" onClick={() => {setChoosedValueRadio(lastChoosedValueRadio),handleToggle(); }}>
                            Cancel
                        </Button>
                        <Button onClick={() => {setLastChoosedValueRadio(choosedValueRadio),handleToggle(); }}>
                            Done
                        </Button>
                    </div>
                </div>
            </Modal>
            <div className="card-body p-0 mt-3 position-relative" onClick={handleShow}>
                <figure className="avatar position-absolute ms-2 mt-1 top-5">
                    <img
                        src="assets/images/user.png"
                        alt="icon"
                        className="shadow-sm rounded-circle w30"
                    />
                </figure>
                <textarea
                    name="message"
                    className="create-post h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                    cols="30"
                    rows="10"
                    placeholder="What's on your mind?"
                    disabled
                ></textarea>
            </div>
            <div className="card-body d-flex p-0 mt-0">
                <a
                    href="#video"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                >
                    <i className="font-md text-danger feather-video me-2"></i>
                    <span className="d-none-xs">Live Video</span>
                </a>
                <a
                    href="#photo"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                >
                    <i className="font-md text-success feather-image me-2"></i>
                    <span className="d-none-xs">Photo/Video</span>
                </a>
                <a
                    href="#activity"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                >
                    <i className="font-md text-warning feather-camera me-2"></i>
                    <span className="d-none-xs">Feeling/Activity</span>
                </a>
            </div>
        </div>
    );
}

export default CreatePost;
