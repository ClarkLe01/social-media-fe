import React, { useEffect, useState, useRef } from 'react';
import {
    Modal,
    Radio,
    Group,
    SimpleGrid,
    Textarea,
    ScrollArea,
    Button,
    ActionIcon,
    Avatar,
} from '@mantine/core';

import {
    IconTriangleInvertedFilled,
    IconPhoto,
    IconTag,
    IconMapPinFilled,
    IconMoodHappy,
    IconPhotoAi,
    IconArrowLeft,
} from '@tabler/icons-react';
import MediaFileSection from './MediaFileSection';
import MultiMemberSelector from './MultiMemberSelector';
import MediaEditCard from './MediaEditCard';
import { useAuth, useFriend, usePostGeneral, useUserPost } from '@services/controller';
import { CreateRadioButtons, getIconStatus } from '@common/utils/radioStatus';
import { useQueryClient } from '@tanstack/react-query';
import { API_URL, MEDIA_URL } from '@constants';

function CreatePost(props) {
    const { id, setOpenedEditPost, images, contentPost } = props;

    const openMediaFileRef = useRef(null);
    const queryClient = useQueryClient();

    // Variable for submiting modal
    const [ content, setContent ] = useState(contentPost ? contentPost : '');
    const [ files, setFiles ] = useState([]);
    const [ selectedFriend, setSelectedFriend ] = useState([]);
    const [ lastChoosedValueRadio, setLastChoosedValueRadio ] = useState(props.defaultAudience);

    // Variable for managing modal create post tool
    const [ choosedValueRadio, setChoosedValueRadio ] = useState(props.defaultAudience);
    const [ createPostState, setCreatePostState ] = useState({
        isShowDropzone: false,
        isShowTagPeople: false,
        isShowAddFeeling: false,
        isCheckIn: false,
        // add more properties as needed
    });

    const [ editPostState, setEditPostState ] = useState({
        isShowDropzone: true,
        isShowTagPeople: false,
        isShowAddFeeling: false,
        isCheckIn: false,
        // add more properties as needed
    });

    const radioButtons = CreateRadioButtons();

    // Variables for managing modal type
    const createPostModalType = {
        default: {
            type: '',
            name: '',
            withCloseButton: false,
            size: 'md',
        },
        createPost: {
            type: 'createPost',
            name: 'Create post',
            withCloseButton: true,
            size: 'lg',
        },
        postAudience: {
            type: 'postAudience',
            name: 'Post audience',
            withCloseButton: false,
            size: 'md',
        },
        friendExcepts: {
            type: 'friendExcepts',
            name: 'Friend excepts',
            withCloseButton: false,
            size: 'md',
        },
        specificFriends: {
            type: 'specificFriends',
            name: 'Specific friends',
            withCloseButton: false,
            size: 'md',
        },
        editMedia: {
            type: 'editMedia',
            name: 'Photos/Videos',
            withCloseButton: false,
            size: '80%',
        },
        tagPeople: {
            type: 'tagPeople',
            name: 'Tag people',
            withCloseButton: false,
            size: 'lg',
        },
        updatePost: {
            type: 'updatePost',
            name: 'Edit post',
            withCloseButton: true,
            size: 'lg',
        },
    };

    const [ showModalType, setShowModalType ] = useState(
        id ? createPostModalType.updatePost : createPostModalType.default,
    );
    const [ canPost, setcanPost ] = useState(false);
    const [ memberList, setMemberList ] = useState([]);
    const [ temp, setTemp ] = useState(openMediaFileRef);

    const { createPost, createPostError, createPostLoading, updatePost } = useUserPost();
    const { profile } = useAuth();
    const { friendListDetail, friendListDetailLoading, friendListDetailError } = useFriend(
        profile.data.id,
    );

    // Close modal
    const handleClose = () => {
        setShowModalType(createPostModalType.default);
        setSelectedFriend([]);
        setFiles([]);
        setContent('');
        if (id) setOpenedEditPost(false);
    };

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([ u8arr ], filename, { type: mime });
    }

    // Modal 1 status create post
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
        setShowModalType(createPostModalType.tagPeople);
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

    // button click handled Modal for choosing friendExcepts and specificFriends modal
    function handleRadioButtonClick(value) {
        setChoosedValueRadio(value);
        if (value == 'friendExcepts') {
            setShowModalType(createPostModalType.friendExcepts);
        } else if (value == 'specificFriends') {
            setShowModalType(createPostModalType.specificFriends);
        }
    }

    // Submit New Post
    function handleSubmitNewPost() {
        const form = new FormData();
        form.append('content', content);
        form.append('status', lastChoosedValueRadio);
        form.append('canSee', selectedFriend);
        form.append('notSee', selectedFriend);
        files.map((file) => form.append('files', file));
        createPost({
            data: form,
        });
        handleClose();
    }

    function handleEditPost() {
        const form = new FormData();
        form.append('content', content);
        form.append('status', lastChoosedValueRadio);
        form.append('canSee', selectedFriend);
        form.append('notSee', selectedFriend);
        if (files.length > 0) {
            files.map((file) => form.append('files', file));
        } else {
            form.append('files', '');
        }
        updatePost(
            {
                data: form,
                pathParams: { postId: id },
            },
            {
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: [ 'posts/user' ] });
                    queryClient.invalidateQueries({ queryKey: [ 'post/list' ] });
                },
                onError: (error) => {
                    queryClient.invalidateQueries({ queryKey: [ 'posts/user' ] });
                    queryClient.invalidateQueries({ queryKey: [ 'post/list' ] });
                },
            },
        );
        handleClose();
    }

    useEffect(() => {
        if (!friendListDetailLoading && friendListDetail) {
            friendListDetail.data.map((item) => {
                item.requestID.id === profile.data.id
                    ? setMemberList((prev) => [ ...prev, item.responseID ])
                    : setMemberList((prev) => [ ...prev, item.requestID ]);
            });
        }
    }, [ friendListDetailLoading ]);

    useEffect(() => {
        content.length > 0 || files.length > 0 ? setcanPost(true) : setcanPost(false);
    }, [ content, files ]);

    // Variable on Photos/Videos modal
    const [ widthGrid, setWidthGrid ] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWidthGrid(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ window.innerWidth ]);

    function removeFile(index) {
        setFiles((files) => {
            const newFiles = [ ...files ];
            newFiles.splice(index, 1);
            return newFiles;
        });
    }

    return (
        <>
            {id
                ? false
                : true && (
                    <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-2 pe-4 pb-3 mb-3">
                        <div
                            className="card-body p-0 mt-3 position-relative"
                            onClick={() => {
                                setShowModalType(createPostModalType.createPost);
                                setCreatePostState({
                                    isShowDropzone: false,
                                    isShowTagPeople: false,
                                    isShowAddFeeling: false,
                                    isCheckIn: false,
                                });
                            }}
                        >
                            <div className="avatar position-absolute ms-2 mt-1 top-5">
                                <Avatar
                                    src={MEDIA_URL + props.user.avatar.replace(API_URL, '')}
                                    size={30}
                                    alt="icon"
                                    radius={'100%'}
                                />
                            </div>
                            <textarea
                                name="message"
                                className="create-post h100 bor-0 w-100 rounded-xxl ps-5 text-grey-500 fw-500 border-light-md theme-dark-bg"
                                cols="30"
                                rows="10"
                                placeholder="What's on your mind?"
                                style={{
                                    resize: 'none',
                                    padding: '14px 8px 8px 8px',
                                    fontSize: 14,
                                }}
                            ></textarea>
                        </div>
                        <div className="card-body d-flex p-0 mt-0 ps-2">
                            <div
                                href="#photo"
                                onClick={() => {
                                    setShowModalType(createPostModalType.createPost);
                                    setCreatePostState((prevState) => ({
                                        ...prevState,
                                        isShowDropzone: true,
                                    }));
                                }}
                                style={{ cursor: 'pointer' }}
                                className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                            >
                                <i className="font-md text-success feather-image me-2"></i>
                                <span className="d-none-xs">Photo/Video</span>
                            </div>
                        </div>
                    </div>
                )}
            <Modal
                name={showModalType.name}
                size={showModalType.size}
                opened={showModalType.type != ''}
                title={
                    <div className="d-flex justify-content-center">
                        {(showModalType.type == 'postAudience' ||
                            showModalType.type == 'editMedia' ||
                            showModalType.type == 'tagPeople') && (
                            <ActionIcon
                                onClick={() =>
                                    id
                                        ? setShowModalType(createPostModalType.updatePost)
                                        : setShowModalType(createPostModalType.createPost)
                                }
                            >
                                <IconArrowLeft />
                            </ActionIcon>
                        )}
                        {showModalType.type == 'friendExcepts' && (
                            <ActionIcon
                                onClick={() => {
                                    setShowModalType(createPostModalType.postAudience),
                                    setSelectedFriend([]);
                                }}
                            >
                                <IconArrowLeft />
                            </ActionIcon>
                        )}
                        {showModalType.type == 'specificFriends' && (
                            <ActionIcon
                                onClick={() => {
                                    setShowModalType(createPostModalType.postAudience),
                                    setSelectedFriend([]);
                                }}
                            >
                                <IconArrowLeft />
                            </ActionIcon>
                        )}
                        <h1 className="fw-bold mx-auto">{showModalType.name}</h1>
                    </div>
                }
                classNames={{
                    header: 'd-flex justify-content-between',
                    title: 'flex-fill mx-auto pe-3',
                }}
                onClose={handleClose}
                withCloseButton={showModalType.withCloseButton}
                centered
            >
                {/* createPost Modal */}
                <div
                    className={`${showModalType.type != 'createPost' && 'd-none'}`}
                    id="createPost"
                >
                    <div className="card-body p-0 d-flex">
                        <div className="avatar me-3">
                            <Avatar
                                src={MEDIA_URL + profile.data.avatar.replace(API_URL, '')}
                                size={45}
                                alt="icon"
                                radius={'100%'}
                            />
                        </div>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                            {' '}
                            {profile.data.first_name} {profile.data.last_name}
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                {' '}
                                <Button
                                    variant="outline"
                                    leftIcon={getIconStatus(lastChoosedValueRadio).icon}
                                    rightIcon={<IconTriangleInvertedFilled size={10} />}
                                    classNames={{
                                        leftSection: 'd-flex align-items-center',
                                        rightSection: 'd-flex align-items-center',
                                    }}
                                    size="xs"
                                    onClick={() => {
                                        setChoosedValueRadio(lastChoosedValueRadio),
                                        setShowModalType(createPostModalType.postAudience);
                                    }}
                                    compact
                                >
                                    {radioButtons.map(
                                        (obj) => obj.value == lastChoosedValueRadio && obj.label,
                                    )}
                                </Button>
                            </span>
                        </h4>
                    </div>
                    <ScrollArea
                        style={{ height: createPostState.isShowDropzone ? 350 : 200 }}
                        offsetScrollbars
                        scrollbarSize={6}
                    >
                        <div className="text-content px-1">
                            <Textarea
                                variant="unstyled"
                                classNames={{
                                    root: 'border-0',
                                }}
                                autosize
                                minRows={3}
                                value={content}
                                onChange={(event) => setContent(event.currentTarget.value)}
                                onResize={(event) => console.log(event.currentTarget)}
                            />
                        </div>
                        {createPostState.isShowDropzone && (
                            <div className="image-video-content pb-3 px-1">
                                <MediaFileSection
                                    files={files}
                                    setFiles={setFiles}
                                    onEdit={() => setShowModalType(createPostModalType.editMedia)}
                                    openMediaFileRef={openMediaFileRef}
                                />
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
                        {/* <div className="p-2 bd-highlight">
                            <ActionIcon
                                variant={
                                    createPostState.isShowTagPeople === true ? 'filled' : 'subtle'
                                }
                            >
                                <IconPhotoAi />
                            </ActionIcon>
                        </div> */}
                        
                        {/* <div className="p-2 bd-highlight" onClick={handleTagPeople}>
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
                        </div> */}
                    </div>
                    <div className="d-grid gap-2 mx-auto">
                        <Button
                            fullWidth
                            disabled={canPost ? false : true}
                            onClick={handleSubmitNewPost}
                        >
                            Post
                        </Button>
                    </div>
                </div>
                {/* postAudience Modal */}
                <div
                    className={`${showModalType.type != 'postAudience' && 'd-none'}`}
                    id="postAudience"
                >
                    <ScrollArea style={{ height: 270 }}>
                        <Radio.Group
                            value={choosedValueRadio}
                            name="Post audience"
                            label="Who can see your post?"
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
                                        onClick={() => {
                                            handleRadioButtonClick(radio.value);
                                            setSelectedFriend([]);
                                        }}
                                    >
                                        <Radio
                                            labelPosition="left"
                                            value={radio.value}
                                            label={radio.label}
                                            description={
                                                choosedValueRadio == radio.value &&
                                                selectedFriend.length > 0
                                                    ? selectedFriend.length
                                                    : radio.description
                                            }
                                            classNames={{
                                                inner: 'mt-2',
                                                root: 'flex-fill',
                                                body: 'flex-fill pe-3 align-items-center',
                                                labelWrapper: 'me-auto',
                                            }}
                                            setShowModalType
                                        />
                                    </Button>
                                ))}
                            </Group>
                        </Radio.Group>
                    </ScrollArea>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-1 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setChoosedValueRadio(lastChoosedValueRadio),
                                id
                                    ? setShowModalType(createPostModalType.updatePost)
                                    : setShowModalType(createPostModalType.createPost);
                            }}
                        >
                            Cancel
                        </Button>
                        {(choosedValueRadio == 'friendExcepts' ||
                            choosedValueRadio == 'specificFriends') &&
                        selectedFriend.length == 0 ? (
                                <Button
                                    onClick={() => {
                                        setShowModalType(createPostModalType[choosedValueRadio]);
                                    }}
                                >
                                Next
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setLastChoosedValueRadio(choosedValueRadio),
                                        id
                                            ? setShowModalType(createPostModalType.updatePost)
                                            : setShowModalType(createPostModalType.createPost);
                                    }}
                                >
                                Done
                                </Button>
                            )}
                    </div>
                </div>
                {/* friendExcepts Modal */}
                <div
                    className={`${showModalType.type != 'friendExcepts' && 'd-none'}`}
                    id="friendExcepts"
                >
                    <MultiMemberSelector
                        isIndeterminate={true}
                        radius="xl"
                        color="red"
                        data={memberList}
                        onDataSelect={setSelectedFriend}
                        selectedFriend={selectedFriend}
                    />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-1 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowModalType(createPostModalType.postAudience);
                                setSelectedFriend([]);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => setShowModalType(createPostModalType.postAudience)}
                            disabled={selectedFriend.length < 1}
                        >
                            Save changes
                        </Button>
                    </div>
                </div>
                {/* specificFriends Modal */}
                <div
                    className={`${showModalType.type != 'specificFriends' && 'd-none'}`}
                    id="specificFriends"
                >
                    <MultiMemberSelector
                        isIndeterminate={false}
                        radius="xl"
                        data={memberList}
                        selectedFriend={selectedFriend}
                        onDataSelect={setSelectedFriend}
                    />
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-1 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowModalType(createPostModalType.postAudience),
                                setSelectedFriend([]);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => setShowModalType(createPostModalType.postAudience)}
                            disabled={selectedFriend.length < 1}
                        >
                            Save changes
                        </Button>
                    </div>
                </div>
                {/* editMedia Modal */}
                <div className={`${showModalType.type != 'editMedia' && 'd-none'}`} id="editMedia">
                    <SimpleGrid cols={widthGrid > 1100 ? 3 : widthGrid > 700 ? 2 : 1}>
                        {files.map((file, index) => {
                            return (
                                <MediaEditCard
                                    key={index}
                                    file={file}
                                    onRemove={() => removeFile(index)}
                                    // onChange={(value) => updateCaption(index, value)}
                                />
                            );
                        })}
                    </SimpleGrid>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-1 pt-2">
                        <Button
                            variant="outline"
                            onClick={() => (id ? openMediaFileRef : openMediaFileRef.current())}
                        >
                            Add Photos/Videos
                        </Button>
                        <Button
                            onClick={() =>
                                id
                                    ? setShowModalType(createPostModalType.updatePost)
                                    : setShowModalType(createPostModalType.createPost)
                            }
                        >
                            Done
                        </Button>
                    </div>
                </div>
                {/* editPost Modal */}
                <div
                    className={`${showModalType.type != 'updatePost' && 'd-none'}`}
                    id="createPost"
                >
                    <div className="card-body p-0 d-flex">
                        <div className="avatar me-3">
                            <Avatar
                                src={MEDIA_URL + profile.data.avatar.replace(API_URL, '')}
                                size={45}
                                alt="icon"
                                radius={'100%'}
                            />
                        </div>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                            {' '}
                            {profile.data.first_name} {profile.data.last_name}
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                {' '}
                                <Button
                                    variant="outline"
                                    leftIcon={getIconStatus(lastChoosedValueRadio).icon}
                                    rightIcon={<IconTriangleInvertedFilled size={10} />}
                                    classNames={{
                                        leftSection: 'd-flex align-items-center',
                                        rightSection: 'd-flex align-items-center',
                                    }}
                                    size="xs"
                                    onClick={() => {
                                        setChoosedValueRadio(lastChoosedValueRadio),
                                        setShowModalType(createPostModalType.postAudience);
                                    }}
                                    compact
                                >
                                    {radioButtons.map(
                                        (obj) => obj.value == lastChoosedValueRadio && obj.label,
                                    )}
                                </Button>
                            </span>
                        </h4>
                    </div>
                    <ScrollArea
                        style={{ height: createPostState.isShowDropzone ? 350 : 200 }}
                        offsetScrollbars
                        scrollbarSize={6}
                    >
                        <div className="text-content px-1">
                            <Textarea
                                variant="unstyled"
                                classNames={{
                                    root: 'border-0',
                                }}
                                autosize
                                minRows={3}
                                value={content}
                                onChange={(event) => setContent(event.currentTarget.value)}
                                onResize={(event) => console.log(event.currentTarget)}
                            />
                        </div>
                        {createPostState.isShowDropzone && (
                            <div className="image-video-content pb-3 px-1">
                                <MediaFileSection
                                    files={files}
                                    setFiles={setFiles}
                                    onEdit={() => setShowModalType(createPostModalType.editMedia)}
                                    openMediaFileRef={openMediaFileRef}
                                    id={id}
                                />
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
                    </div>
                    <div className="d-grid gap-2 mx-auto">
                        <Button
                            fullWidth
                            disabled={canPost ? false : true}
                            onClick={handleEditPost}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default CreatePost;
