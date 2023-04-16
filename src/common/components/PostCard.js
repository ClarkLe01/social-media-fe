import React, { useState, useEffect } from 'react';
import PostMenuTool from './PostMenuTool';
import FacebookEmoji from './react-facebook-emoji';
import { Button, Grid, Image, AspectRatio, Overlay, Text, Avatar, Tooltip, ActionIcon } from '@mantine/core';
import { ReactHaha, ReactLike, ReactLove } from '@assets/images/reaction';
import { IconShare3, IconMessage2 } from '@tabler/icons-react';

const MemorizedImage = React.memo(Image);

function ImageGridPreview(props) {
    const files = [ ...props.files ];
    const [ attrsImage, setAttrsImage ] = useState({ width: 0, height: 1 });
    useEffect(() => {
        const image = new window.Image();
        if (files.length == 1) {
            image.onload = () => {
                console.log(image.width / image.height);
                setAttrsImage({ width: image.width, height: image.height });
                console.log(attrsImage.width);
            };
            image.src = files[0].file;
        }
    }, [ files.length == 1 ]);

    const previewsOneImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={12}>
                    <MemorizedImage src={obj.file} fit="contain" />
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsTwoImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={6}>
                    <AspectRatio ratio={attrsImage.height > attrsImage.width ? 3 / 4 : 4 / 3}>
                        <MemorizedImage src={obj.file} fit="scale-down" />
                    </AspectRatio>
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsThreeImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={index > 0 ? 6 : 12}>
                    <AspectRatio key={index} ratio={16 / 9}>
                        <MemorizedImage src={obj.file} fit="contain" />
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
                        <MemorizedImage src={obj.file} />
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
                            <MemorizedImage src={obj.file} withPlaceholder />
                            {index > 3 && files.length - index - 1 > 0 && (
                                <Overlay opacity={0.7} color="#000" zIndex={1}>
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
        </Grid>
    );
}

function PostCard(props) {
    const [ isActive, setIsActive ] = useState(false);

    const { user, time, des, avatar, postMedia, id } = props;
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
                <figure className="avatar me-3">
                    <img
                        src={`assets/images/${avatar}`}
                        alt="avatar"
                        className="shadow-sm rounded-circle w45"
                    />
                </figure>
                <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    {' '}
                    {user}{' '}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        {' '}
                        {time}
                    </span>
                </h4>
                <PostMenuTool id={`dropdownToolMenu${id}`} />
            </div>
            <div className="card-body p-0 me-lg-5">
                <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                    {des}{' '}
                    <a href="/defaultvideo" className="fw-600 text-primary ms-2">
                        See more
                    </a>
                </p>
            </div>
            {postMedia && <ImageGridPreview files={postMedia} />}
            <div className="card-body d-flex p-0 pt-2">
                <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">

                    <Tooltip.Group openDelay={300} closeDelay={100}>
                        <Avatar.Group spacing={4}>
                            <Tooltip label="Like" withArrow>
                                <Avatar src={ReactLike} size={18} radius="xl"/>
                            </Tooltip>
                            <Tooltip label="Haha" withArrow>
                                <Avatar src={ReactHaha} size={18} radius="xl"/>
                            </Tooltip>
                            <Tooltip label="Love" withArrow>
                                <Avatar src={ReactLove} size={18} radius="xl" />
                            </Tooltip>
                        </Avatar.Group>
                    </Tooltip.Group>
                    <Text className='ps-1'>
                        2.8K
                    </Text>
                </div>
                <div
                    className="d-flex ms-auto fw-600 text-grey-900 text-dark lh-26 font-xssss"
                >
                    <div className='d-flex align-items-center'>
                        <Text className='me-1'>
                            22
                        </Text>
                        <IconMessage2 />
                    </div>
                    <div className='d-flex align-items-center ps-3'>
                        <Text className='me-1'>
                            22
                        </Text>
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
