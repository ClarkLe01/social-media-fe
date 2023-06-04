import React, { useState, useEffect, useRef } from 'react';
import PostMenuTool from './PostMenuTool';
import FacebookEmoji from './react-facebook-emoji';
import {
    Button,
    Grid,
    Image,
    AspectRatio,
    Overlay,
    Text,
    Avatar,
    Tooltip,
    Spoiler,
    Divider,
    Textarea,
    ActionIcon,
    Popover,
    Menu,
    Modal,
} from '@mantine/core';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { ReactAngry, ReactHaha, ReactLike, ReactLove, ReactWow, ReactSad } from '@assets/images/reaction';
import {
    IconMessage2,
    IconMoodEmpty,
    IconCamera,
    IconSend,
    IconDots,
    IconTrash,
    IconPencil,
} from '@tabler/icons-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { API_URL, MEDIA_URL } from '@constants';
import { getIconStatus } from '@common/utils/radioStatus';
import { useAuth, usePostDetail } from '@services/controller';
import { Dropzone } from '@mantine/dropzone';
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import ThumbMedia from '@features/messages/components/ThumbMedia';
import usePostComment from '@services/controller/usePostComment';
import { useQueryClient } from '@tanstack/react-query';
import usePostInteraction from '@services/controller/usePostInteraction';
import { IconThumbUp } from '@tabler/icons-react';
import { getTimeString } from '@common/utils/converString';
import { navigatePath } from '@app/routes/config';
import AddComment from './AddComment';

const MemorizedImage = React.memo(Image);

function ImageGridPreview(props) {
    const files = [ ...props.files ];
    const [ photoIndex, setPhotoIndex ] = useState(0);
    const [ isOpen, setIsOpen ] = useState(false);
    const previewsOneImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={12}>
                    <MemorizedImage
                        src={MEDIA_URL + obj.file.replace(API_URL, '')}
                        fit="cover"
                        onClick={() => {
                            setIsOpen(true), setPhotoIndex(index);
                        }}
                    />
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsTwoImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={6}>
                    <AspectRatio ratio={4 / 3}>
                        <MemorizedImage
                            src={MEDIA_URL + obj.file.replace(API_URL, '')}
                            fit="cover"
                            onClick={() => {
                                setIsOpen(true), setPhotoIndex(index);
                            }}
                        />
                    </AspectRatio>
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsThreeImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={index > 0 ? 6 : 12}>
                    <AspectRatio key={index} ratio={4 / 3}>
                        <MemorizedImage
                            src={MEDIA_URL + obj.file.replace(API_URL, '')}
                            fit="cover"
                            onClick={() => {
                                setIsOpen(true), setPhotoIndex(index);
                            }}
                        />
                    </AspectRatio>
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsFourImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={index > 0 ? 4 : 12}>
                    <AspectRatio key={index} ratio={16 / 9}>
                        <MemorizedImage
                            src={MEDIA_URL + obj.file.replace(API_URL, '')}
                            onClick={() => {
                                setIsOpen(true), setPhotoIndex(index);
                            }}
                        />
                    </AspectRatio>
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsMoreFourImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                {index < 5 && (
                    <Grid.Col span={index > 1 ? 4 : 6} className="p-1">
                        <AspectRatio ratio={16 / 9}>
                            <MemorizedImage
                                src={MEDIA_URL + obj.file.replace(API_URL, '')}
                                withPlaceholder
                                onClick={() => {
                                    setIsOpen(true), setPhotoIndex(index);
                                }}
                            />
                            {index > 3 && files.length - index - 1 > 0 && (
                                <Overlay
                                    opacity={0.7}
                                    color="#000"
                                    zIndex={1}
                                    onClick={() => {
                                        setIsOpen(true), setPhotoIndex(index);
                                    }}
                                >
                                    <Text
                                        position="absolute"
                                        top={0}
                                        left={0}
                                        right={0}
                                        padding={20}
                                        color="white"
                                        size="xl"
                                        weight={700}
                                        style={{
                                            zIndex: 2,
                                        }}
                                    >
                                        + {files.length - index - 1}
                                    </Text>
                                </Overlay>
                            )}
                        </AspectRatio>
                    </Grid.Col>
                )}
            </React.Fragment>
        );
    });

    return (
        <Grid>
            {files.length == 1 && previewsOneImage}
            {files.length == 2 && previewsTwoImage}
            {files.length == 3 && previewsThreeImage}
            {files.length == 4 && previewsFourImage}
            {files.length > 4 && previewsMoreFourImage}
            {isOpen && (
                <Lightbox
                    mainSrc={MEDIA_URL + files[photoIndex].file.replace(API_URL, '')}
                    nextSrc={files[(photoIndex + 1) % files.length]}
                    prevSrc={files[(photoIndex + files.length - 1) % files.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + files.length - 1) % files.length)
                    }
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % files.length)}
                />
            )}
        </Grid>
    );
}

function CommentItem(props) {
    const { comment, currentUser, postId } = props;
    const files = [ comment ];
    const [ photoIndex, setPhotoIndex ] = useState(0);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ openedDeleteModal, setOpenedDeleteModal ] = useState(false);
    const [ showEditComment, setShowEditComment ] = useState(false);
    const {
        updateComment,
        updateCommentError,
        updateCommentLoading,
        deleteComment,
        deleteCommentError,
        deleteCommentLoading,
        commentInstance,
        commentInstanceError,
        commentInstanceLoading,
    } = usePostComment(comment.id);

    const queryClient = useQueryClient();

    const handleUpdateComment = () => {
        setShowEditComment(!showEditComment);
    };

    const handleDeleteComment = () => {
        deleteComment(
            {
                pathParams: { commentId: comment.id },
            },
            {
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: [ `post/${postId}/comments` ] });
                },
                onError: (error) => {
                    queryClient.invalidateQueries({ queryKey: [ `post/${postId}/comments` ] });
                },
            },
        );
        setOpenedDeleteModal(false);
    };

    return (
        <div className="mt-3 mb-2">
            {!showEditComment && <div
                className="comment d-flex align-items-start justify-content-start"
                style={{
                    zIndex: 0,
                }}
            >
                <Avatar src={MEDIA_URL+comment.user.avatar.replace(API_URL, '')} radius={'100%'} size={32} />
                <div className="ms-3 d-block">
                    <div className="comment-content align-items-center d-flex">
                        <div
                            className="py-2 ps-3 pe-4"
                            style={{
                                backgroundColor: '#f1f3f5',
                                borderRadius: '10px',
                                display: 'inline-block',
                            }}
                        >
                            <Text size={13} fw={700}>
                                <Link
                                    to={`/profile/${comment.user.id}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#000',
                                    }}
                                >
                                    {comment.user.first_name} {comment.user.last_name}
                                </Link>
                            </Text>
                            <Text size={13} fw={500}>
                                {comment.content}
                            </Text>
                        </div>
                        <div
                            className="ms-2"
                            style={{
                                display: 'inline-block',
                            }}
                        >
                            <div
                                style={{
                                    width: '25px',
                                    height: '25px',
                                }}
                            >
                                {comment.user.id == currentUser.id && (
                                    <Menu>
                                        <Menu.Target>
                                            <ActionIcon size={20}>
                                                <IconDots />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item icon={<IconPencil size={14} />}
                                                onClick={ () => handleUpdateComment()}
                                            >
                                                Update
                                            </Menu.Item>
                                            <Menu.Item
                                                color="red"
                                                icon={<IconTrash size={14} />}
                                                onClick={() => setOpenedDeleteModal(true)}
                                            >
                                                Delete
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                )}
                            </div>
                            <Text size={13} c="dimmed">
                                {getTimeString(comment.created)}
                            </Text>
                        </div>
                    </div>

                    <div className="file-comment ps-1 pt-1 d-flex" onClick={() => setIsOpen(true)}>
                        <Image src={MEDIA_URL+comment.file.replace(API_URL+'')} maw={'15rem'} />
                    </div>
                </div>
            </div>}
            {showEditComment && <AddComment currentUser={currentUser} postId={postId} commentFile={comment.file} valueComment={comment.content} commentId={comment.id} setShowEditComment={setShowEditComment} />}
            <Modal
                opened={openedDeleteModal}
                onClose={() => setOpenedDeleteModal(false)}
                title="Delete Comment"
                centered
            >
                <Text size="sm">
                    Are you sure you want to delete this comment? This action is destructive and you
                    will have to contact support to restore your data.
                </Text>
                <div className="d-flex justify-content-end pe-2">
                    <Button
                        variant="outline"
                        color="dark"
                        classNames={{
                            root: 'me-2',
                        }}
                        onClick={() => setOpenedDeleteModal(false)}
                    >
                        <Text>No don`&apos;`t delete it</Text>
                    </Button>
                    <Button color="red" onClick={handleDeleteComment}>
                        <Text>Delete comment</Text>
                    </Button>
                </div>
            </Modal>
            {isOpen && (
                <Lightbox
                    mainSrc={MEDIA_URL + files[photoIndex].file.replace(API_URL, '')}
                    nextSrc={files[(photoIndex + 1) % files.length]}
                    prevSrc={files[(photoIndex + files.length - 1) % files.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + files.length - 1) % files.length)
                    }
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % files.length)}
                />
            )}
            
        </div>
    );
}

const getIconInteraction = (type) => {
    switch (type) {
                    case 'like':
                        return ReactLike;

                    case 'haha':
                        return ReactHaha;

                    case 'love':
                        return ReactLove;
                    
                    case 'angry':
                        return ReactAngry;
                    
                    case 'sad':
                        return ReactSad;

                    case 'wow':
                        return ReactWow;

                    default:
                        return; 
    }
};

function InteractionSection(props) {
    const { interactions } = props;
    const [ showInteractionModal, setShowInteractionModal ] = useState(false);
    const counts = interactions.reduce((acc, curr) => {
        const type = curr.type;
        if (type in acc) {
            acc[type] += 1;
        } else {
            acc[type] = 1;
        }
        return acc;
    }, {});
    const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([ type, count ]) => ({ type, count }));
    const totalInteraction = sortedCounts.reduce((acc, curr) => acc + curr.count, 0);
    const showTotalInteraction = (totalInteraction) => {
        if (totalInteraction >= 1000000) {
            let strShow = (totalInteraction / 1000000).toFixed(1).toString()+'M';
            return strShow;
        }
        else if (totalInteraction < 1000000 && totalInteraction >= 1000) {
            let strShow = (totalInteraction / 1000).toFixed(1).toString()+'K';
            return strShow;
        }
        else{
            return totalInteraction;
        }
    };
    return (
        <>
            <div className='d-flex' onClick={() => setShowInteractionModal(true)}>
                <Tooltip.Group openDelay={300} closeDelay={100}>
                    <Avatar.Group spacing={6}>
                        {sortedCounts.map((item, index) => index<3&&(
                            <Tooltip key={index} label={item.type.charAt(0).toUpperCase()+item.type.slice(1)} withArrow>
                                <Avatar src={getIconInteraction(item.type)} size={20} radius="xl" />
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </Tooltip.Group>
                <Text className="ps-1">{showTotalInteraction(totalInteraction)}</Text>
            </div>
            <Modal
                opened={showInteractionModal}
                onClose={() => setShowInteractionModal(false)}
                title="Interaction Detail"
                centered
            >
                <Text size="sm">
                    Are you sure you want to delete this comment? This action is destructive and you
                    will have to contact support to restore your data.
                </Text>
            </Modal>
        </>
    );
}

function PostCard(props) {
    let timeout;
    const queryClient = useQueryClient();
    const { profile } = useAuth();
    const [ isActive, setIsActive ] = useState(false);
    const { owner, created, content, images, status, id, interactions, isDetail } = props;
    const { CommentList, CommentListLoading } = usePostDetail(id);
    const {
        interactInstance,
        interactInstanceLoading,
        updateInteraction,
    } = usePostInteraction(id);
    const [ comments, setComments ] = useState([]);
    const [ reactType, setReactType ] = useState('unlike');

    const navigate = useNavigate();

    const handleReactClick = (data) => {
        updateInteraction(
            {
                data: {
                    type: data,
                },
                pathParams: { postId: id },
            },
            {
                onSuccess: (data) => {
                    console.log(data);
                    queryClient.invalidateQueries([ `post/detail/${id}` ]);
                    queryClient.invalidateQueries([ 'post/list' ]);
                    queryClient.invalidateQueries([ `myInteraction/${id}` ]);
                    queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
                },
                onError: (error) => {
                    console.log(error.response.data);
                    queryClient.invalidateQueries([ `post/detail/${id}` ]);
                    queryClient.invalidateQueries([ 'post/list' ]);
                    queryClient.invalidateQueries([ `myInteraction/${id}` ]);
                    queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
                },
            },
        );
    };

    const handleLikeButtonClick = () => {
        clearTimeout(timeout);
        setIsActive(false);
        reactType == 'unlike' 
            ? updateInteraction(
                {
                    data: {
                        type: 'like',
                    },
                    pathParams: { postId: id },
                },
                {
                    onSuccess: (data) => {
                        console.log(data);
                        queryClient.invalidateQueries([ `post/detail/${id}` ]);
                        queryClient.invalidateQueries([ 'post/list' ]);
                        queryClient.invalidateQueries([ `myInteraction/${id}` ]);
                        queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
                    },
                    onError: (error) => {
                        console.log(error.response.data);
                        queryClient.invalidateQueries([ `post/detail/${id}` ]);
                        queryClient.invalidateQueries([ 'post/list' ]);
                        queryClient.invalidateQueries([ `myInteraction/${id}` ]);
                        queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
                    },
                },
            )
            : updateInteraction(
                {
                    data: {
                        type: 'unlike',
                    },
                    pathParams: { postId: id },
                },
                {
                    onSuccess: (data) => {
                        console.log(data);
                        queryClient.invalidateQueries([ `post/detail/${id}` ]);
                        queryClient.invalidateQueries([ 'post/list' ]);
                        queryClient.invalidateQueries([ `myInteraction/${id}` ]);
                        queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
                    },
                    onError: (error) => {
                        console.log(error.response.data);
                        queryClient.invalidateQueries([ `post/detail/${id}` ]);
                        queryClient.invalidateQueries([ 'post/list' ]);
                        queryClient.invalidateQueries([ `myInteraction/${id}` ]);
                        queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
                    },
                },
            );
    };

    const handleMoveEnter = () => {
        timeout = setTimeout(() => {
            setIsActive(true);
        }, 500);
    };

    const handleMoveOut = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setIsActive(false);
        }, 500);
    };
    const handleMouseMove = () => {
        clearTimeout(timeout);
        setIsActive(true);
    };

    const GoToPostDetail = () => {
        navigate(navigatePath.post.replace(':postId', id));
    };

    const emojiClass = `${isActive ? ' active' : ''}`;

    useEffect(() => {
        if (!CommentListLoading && CommentList) {
            setComments(CommentList.data);
        }
    }, [ CommentList, CommentListLoading ]);

    useEffect(() => {
        if(!interactInstanceLoading && interactInstance){
            setReactType(interactInstance.data.type);
        }
    }, [ interactInstance, interactInstanceLoading ]);

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 px-4 pt-4 pb-2 mb-3">
            <div className="card-body p-0 d-flex">
                <Avatar className="avatar me-3" radius={'100%'} src={MEDIA_URL+owner.avatar.replace(API_URL, '')} size={'md'} />
                <Text fw={700} size={16}>
                    {' '}
                    <Link
                        to={`/profile/${owner.id}`}
                        style={{
                            textDecoration: 'none',
                            color: '#000',
                        }}
                    >
                        {owner.first_name} {owner.last_name}
                    </Link>
                    
                    <Text className="d-flex" c="dimmed" size={13} fw={500}>
                        {getTimeString(created)}
                        <div className="d-flex align-items-center ps-2">
                            <Tooltip label={getIconStatus(status).label}>
                                {getIconStatus(status).icon}
                            </Tooltip>
                        </div>
                    </Text>
                </Text>
                {profile.data.id == owner.id && 
                <PostMenuTool  
                    user={profile.data} 
                    defaultAudience="public" 
                    id={id} 
                    status={status}
                    // owner={owner} 
                    content={content}
                    images={images}
                />}
            </div>
            <div className="card-body p-0 py-3">
                <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
                    <Text size={14}>{content}</Text>
                </Spoiler>
            </div>
            {images && <ImageGridPreview files={images} />}
            <div className="card-body d-flex p-0 pb-2 pt-3">
                <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">
                    {interactions.length > 0 && <InteractionSection interactions={interactions} />}
                </div>
                <div className="d-flex ms-auto fw-600 text-grey-900 text-dark lh-26 font-xssss">
                    <div className="d-flex align-items-center">
                        {comments.length > 0 && (
                            <div
                                className="pe-1"
                                onClick={GoToPostDetail}
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <Text className="me-1">{comments.length}</Text>
                                <IconMessage2 />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Divider my="xs" className="my-0" />
            <div
                className="card-body px-0 py-0 pt-1"
                style={{
                    zIndex: 1,
                    position: 'relative',
                }}
            >
                <div
                    className={`emoji-wrap pointer ${emojiClass}`}
                    style={{ backgroundColor: 'transparent', padding: '3px' }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMoveOut}
                >
                    <div className="d-flex">
                        <FacebookEmoji type="like" size="sm" onChildData={handleReactClick} />
                        <FacebookEmoji type="love" size="sm" onChildData={handleReactClick} />
                        <FacebookEmoji type="haha" size="sm" onChildData={handleReactClick} />
                        <FacebookEmoji type="wow" size="sm" onChildData={handleReactClick} />
                        <FacebookEmoji type="sad" size="sm" onChildData={handleReactClick} />
                        <FacebookEmoji type="angry" size="sm" onChildData={handleReactClick} />
                    </div>
                </div>
                <div
                    className='d-grid gap-2 d-flex justify-content-between'
                >
                    <Button
                        fullWidth
                        variant="subtle"
                        color="gray"
                        leftIcon={
                            reactType!='unlike'
                                ?<Avatar src={getIconInteraction(reactType)} size={20} radius="xl" />
                                :<IconThumbUp size={20} radius="xl"/>
                        }
                        classNames={{
                            root: 'flex-fill',
                        }}
                        onClick={handleLikeButtonClick}
                        onMouseEnter={handleMoveEnter}
                        onMouseLeave={handleMoveOut}
                    >
                        {reactType!='unlike'
                            ?(
                                <Text color='blue'>
                                    {reactType.charAt(0).toUpperCase()+reactType.slice(1)}
                                </Text>
                            )
                            :(
                                <Text>
                                    Like
                                </Text>
                            )
                        }
                        
                    </Button>
                    <Button
                        fullWidth
                        variant="subtle"
                        color="gray"
                        leftIcon={<IconMessage2/>}
                        classNames={{
                            root: 'flex-fill',
                        }}
                        onClick={GoToPostDetail}
                    >
                        <Text>
                            Comment
                        </Text>
                    </Button>
                </div>
            </div>
            <div>
                {isDetail && <AddComment currentUser={profile.data} postId={id} />}
                {isDetail &&
                    comments.length > 0 &&
                    comments.map((comment, index) => {
                        return (
                            <CommentItem
                                key={index}
                                comment={comment}
                                currentUser={profile.data}
                                postId={id}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default PostCard;
