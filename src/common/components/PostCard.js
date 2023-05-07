import React, { useState, useEffect } from 'react';
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
    ActionIcon,
    Spoiler,
} from '@mantine/core';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { ReactHaha, ReactLike, ReactLove } from '@assets/images/reaction';
import { IconShare3, IconMessage2 } from '@tabler/icons-react';
import { API_URL } from '@constants';

const MemorizedImage = React.memo(Image);
const getTimeString = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 1000 / 60 / 60);
    const diffDays = Math.floor(diffMs / 1000 / 60 / 60 / 24);
    if (diffMs < 60 * 60 * 1000) {
        // Less than 1 hour ago
        const diffMinutes = Math.floor(diffMs / 1000 / 60);
        return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
        // Less than 1 day ago
        return `${diffHours} hours ago`;
    } else if (diffDays < 7) {
        // Less than 1 week ago
        return `${diffDays} days ago`;
    } else if (date.getFullYear() === now.getFullYear()) {
        // Same year
        const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } else {
        // Different year
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
};
function ImageGridPreview(props) {
    const files = [ ...props.files ];
    const [ photoIndex, setPhotoIndex ] = useState(0);
    const [ isOpen, setIsOpen ] = useState(false);
    const previewsOneImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={12}>
                    <MemorizedImage
                        src={API_URL + obj.file.replace(API_URL, '')}
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
                            src={API_URL + obj.file.replace(API_URL, '')}
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
                            src={API_URL + obj.file.replace(API_URL, '')}
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
                            src={API_URL + obj.file.replace(API_URL, '')}
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
                                src={API_URL + obj.file.replace(API_URL, '')}
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
    console.log(files[photoIndex]);
    return (
        <Grid>
            {files.length == 1 && previewsOneImage}
            {files.length == 2 && previewsTwoImage}
            {files.length == 3 && previewsThreeImage}
            {files.length == 4 && previewsFourImage}
            {files.length > 4 && previewsMoreFourImage}
            {isOpen && (
                <Lightbox
                    mainSrc={API_URL + files[photoIndex].file.replace(API_URL, '')}
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

function PostCard(props) {
    const [ isActive, setIsActive ] = useState(false);

    const { owner, created, content, images, status, id, interactions } = props;
    let timeout;
    const [ reactType, setReactType ] = useState('Unlike');

    const handleReactClick = (data) => {
        setReactType(data);
    };

    const handleLikeButtonClick = () => {
        clearTimeout(timeout);
        setIsActive(false);
        reactType == 'Unlike' ? setReactType('Like') : setReactType('Unlike');
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

    const emojiClass = `${isActive ? ' active' : ''}`;

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
            <div className="card-body p-0 d-flex">
                <Avatar className="avatar me-3" radius={'100%'} src={owner.avatar} size={'md'} />
                <Text fw={700} size={16}>
                    {' '}
                    {owner.first_name} {owner.last_name}
                    <Text className="d-block" c="dimmed" size={13} fw={500}>
                        {' '}
                        {getTimeString(created)}
                    </Text>
                </Text>
                <PostMenuTool id={`dropdownToolMenu${id}`} />
            </div>
            <div className="card-body p-0 py-3">
                <Spoiler maxHeight={200} showLabel="Show more" hideLabel="Hide">
                    <Text size={14}>{content}</Text>
                </Spoiler>
            </div>
            {images && <ImageGridPreview files={images} />}
            <div className="card-body d-flex p-0 pt-2">
                <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">
                    <Tooltip.Group openDelay={300} closeDelay={100}>
                        <Avatar.Group spacing={4}>
                            <Tooltip label="Like" withArrow>
                                <Avatar src={ReactLike} size={18} radius="xl" />
                            </Tooltip>
                            <Tooltip label="Haha" withArrow>
                                <Avatar src={ReactHaha} size={18} radius="xl" />
                            </Tooltip>
                            <Tooltip label="Love" withArrow>
                                <Avatar src={ReactLove} size={18} radius="xl" />
                            </Tooltip>
                        </Avatar.Group>
                    </Tooltip.Group>
                    <Text className="ps-1">2.8K</Text>
                </div>
                <div className="d-flex ms-auto fw-600 text-grey-900 text-dark lh-26 font-xssss">
                    <div className="d-flex align-items-center">
                        <Text className="me-1">22</Text>
                        <IconMessage2 />
                    </div>
                    <div className="d-flex align-items-center ps-3">
                        <Text className="me-1">22</Text>
                        <IconShare3 />
                    </div>
                </div>
            </div>
            <div className="card-body d-grid gap-2 d-flex justify-content-between px-0 py-0">
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
                <Button
                    fullWidth
                    variant="outline"
                    leftIcon
                    classNames={{
                        root: 'flex-fill border-0',
                    }}
                    onClick={handleLikeButtonClick}
                    onMouseEnter={handleMoveEnter}
                    onMouseLeave={handleMoveOut}
                >
                    {reactType}
                </Button>
                <Button
                    fullWidth
                    variant="outline"
                    leftIcon={<IconMessage2 />}
                    classNames={{
                        root: 'flex-fill border-0',
                    }}
                >
                    Comment
                </Button>
                <Button
                    fullWidth
                    variant="outline"
                    leftIcon={<IconShare3 />}
                    classNames={{
                        root: 'flex-fill border-0',
                    }}
                >
                    Share
                </Button>
            </div>
        </div>
    );
}

export default PostCard;
