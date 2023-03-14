import React, { useState } from 'react';
import { Modal } from '@mantine/core';
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
} from '@tabler/icons-react';
import { Textarea } from '@mantine/core';
import { ScrollArea } from '@mantine/core';

const user = {
    imageUrl: 'user.png',
    name: 'Aliqa Macale ',
    user: '@macale343',
};

function CreatePost() {
    const [ createPostState, setCreatePostState ] = useState({
        isShowDropzone: false,
        isShowTagPeople: false,
        isShowAddFeeling: false,
        isCheckIn: false,
        // add more properties as needed
    });
    const [ showCreatePost, setShowCreatePost ] = useState(false);
    const [ showPostAudience, setShowPostAudienc ] = useState(false);
    // General Action
    const handleClose = () => setShowCreatePost(false);
    const handleShow = () => {
        setShowCreatePost(true);
    };
    const handleToggle = () => {
        setShowCreatePost(!showCreatePost);
        setShowPostAudienc(!showPostAudience);
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
    

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-2 pe-4 pb-3 mb-3">
            <Modal
                name="Create Post"
                size="lg"
                opened={showCreatePost}
                title={<h1 className="fw-bold">Create Post</h1>}
                classNames={{
                    header: 'd-flex justify-content-center',
                    title: 'mx-auto',
                }}
                onClose={handleClose}
                centered
            >
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
                                onClick={handleToggle}
                                compact
                            >
                                Public
                            </Button>
                        </span>
                    </h4>
                </div>
                <ScrollArea style={{ height: createPostState.isShowDropzone? 350 : 200 }}>
                    <div className="text-content">
                        <Textarea
                            variant="unstyled"
                            classNames={{
                                root: 'border-0',
                            }}
                            autosize
                            minRows={6}
                        />
                    </div>
                    {createPostState.isShowDropzone && (
                        <div className="image-video-content pb-3">
                            <MediaFileSection />
                        </div>
                    )}
                </ScrollArea>
                <div className="post-tool d-flex bd-highlight mb-3 border border-1">
                    <div className="me-auto p-2 bd-highlight">Add to your post</div>
                    <div className="p-2 bd-highlight">
                        <ActionIcon
                            variant={createPostState.isShowDropzone === true ? 'filled' : 'subtle'}
                            onClick={handleMediaTool}
                        >
                            <IconPhoto />
                        </ActionIcon>
                    </div>
                    <div className="p-2 bd-highlight" onClick={handleTagPeople}>
                        <ActionIcon
                            variant={createPostState.isShowTagPeople === true ? 'filled' : 'subtle'}
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
                    <button className="btn btn-primary" type="button">
                        Button
                    </button>
                </div>
            </Modal>
            <Modal
                name="Create Post"
                size="lg"
                opened={showPostAudience}
                title={<h1 className="fw-bold">Post Audience</h1>}
                classNames={{
                    header: 'd-flex justify-content-center',
                    title: 'mx-auto',
                }}
                onClose={handleToggle}
                centered
            >
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
                                onClick={handleToggle}
                                compact
                            >
                                Public
                            </Button>
                        </span>
                    </h4>
                </div>
                <ScrollArea style={{ height: createPostState.isShowDropzone? 350 : 200 }}>
                    <div className="text-content">
                        <Textarea
                            variant="unstyled"
                            classNames={{
                                root: 'border-0',
                            }}
                            autosize
                            minRows={6}
                        />
                    </div>
                    {createPostState.isShowDropzone && (
                        <div className="image-video-content pb-3">
                            <MediaFileSection />
                        </div>
                    )}
                </ScrollArea>
                <div className="post-tool d-flex bd-highlight mb-3 border border-1">
                    <div className="me-auto p-2 bd-highlight">Add to your post</div>
                    <div className="p-2 bd-highlight">
                        <ActionIcon
                            variant={createPostState.isShowDropzone === true ? 'filled' : 'subtle'}
                            onClick={handleMediaTool}
                        >
                            <IconPhoto />
                        </ActionIcon>
                    </div>
                    <div className="p-2 bd-highlight" onClick={handleTagPeople}>
                        <ActionIcon
                            variant={createPostState.isShowTagPeople === true ? 'filled' : 'subtle'}
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
                    <button className="btn btn-primary" type="button">
                        Button 2
                    </button>
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
