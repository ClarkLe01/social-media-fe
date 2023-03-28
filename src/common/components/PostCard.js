import React, { useState } from 'react';
import PostMenuTool from './PostMenuTool';
import FacebookEmoji from './react-facebook-emoji';
import { Button, Grid, Image, AspectRatio, Overlay, Text } from '@mantine/core';

function ImageGridPreview(props) {
    const files = [ ...props.files ];

    const previewsOneImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={12}>
                    <AspectRatio ratio={16 / 9}>
                        <Image src={obj.file} fit="scale-down" />
                    </AspectRatio>
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsTwoImage = files.map((obj, index) => {
        return (
            <React.Fragment key={index}>
                <Grid.Col span={6}>
                    <AspectRatio ratio={16 / 9}>
                        <Image src={obj.file} fit="scale-down" />
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
                        <Image
                            src={obj.file}
                            fit="contain"
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
                        <Image
                            src={obj.file}
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
                            <Image
                                src={obj.file}
                                withPlaceholder
                            />
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

    const { user, time, des, avater, postimage, postvideo, id } = props;
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
                        src={`assets/images/${avater}`}
                        alt="avater"
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
                <PostMenuTool key={`dropdownToolMenu${id}`} />
            </div>
            {postvideo ? (
                <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">
                    <a href="/defaultvideo" className="video-btn">
                        <video autoPlay loop className="float-right w-100">
                            <source src={`assets/images/${postvideo}`} type="video/mp4" />
                        </video>
                    </a>
                </div>
            ) : (
                ''
            )}
            <div className="card-body p-0 me-lg-5">
                <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                    {des}{' '}
                    <a href="/defaultvideo" className="fw-600 text-primary ms-2">
                        See more
                    </a>
                </p>
            </div>
            {/* {postimage ? (
                <div className="card-body d-block p-0 mb-3">
                    <div className="row ps-2 pe-2">
                        <div className="col-sm-12 p-1">
                            <img
                                src={`assets/images/${postimage}`}
                                className="rounded-3 w-100"
                                alt="post"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )} */}
            {postimage && <ImageGridPreview files={postimage} />}
            <div className="card-body d-flex p-0">
                <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2">
                    <i className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i>{' '}
                    <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>
                    2.8K Like
                </div>
                <a
                    href="/defaultvideo"
                    className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                >
                    <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
                    <span className="d-none-xss">22 Comment</span>
                </a>
                <div className="d-flex align-items-center ms-auto fw-600 text-grey-900 text-dark lh-26 font-xssss">
                    <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i>
                    <span className="d-none-xss">22 Shares</span>
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
                    classNames={{
                        root: 'flex-fill border-0',
                    }}
                >
                    Comment
                </Button>
                <Button
                    fullWidth
                    variant="outline"
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
