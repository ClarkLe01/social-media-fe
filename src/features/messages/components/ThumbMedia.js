import React, { useEffect, useState } from 'react';
import { Image, ActionIcon, ThemeIcon, ScrollArea, Box } from '@mantine/core';
import { IconX, IconFilePlus, IconPlayerPlay } from '@tabler/icons-react';
function VideoProcessing(props) {
    const fileUrl = props.fileUrl;
    const [ thumbnailUrl, setThumbnailUrl ] = useState(null);

    useEffect(() => {
        const video = document.createElement("video");
        video.src = fileUrl;
        const onLoad = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.currentTime = 1;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailUrl = canvas.toDataURL();
            setThumbnailUrl(thumbnailUrl);
        };
        video.addEventListener("canplay", onLoad);
        return () => {
            video.removeEventListener("load", onLoad);
            setThumbnailUrl(null);
        };
    }, [ fileUrl ]);

    return (
        <>
            {thumbnailUrl && (
                <div 
                    className='px-2'
                    style={{
                        position: 'relative',
                    }}
                >
                    <Image
                        src={thumbnailUrl}
                        width={52}
                        height={52}
                        radius={'md'}
                        onLoad={() => {
                            URL.revokeObjectURL(thumbnailUrl);
                        }}
                    />
                    <ActionIcon
                        radius={'100%'} variant="filled"
                        size={22}
                        style={{
                            position: 'absolute',
                            top: -6,
                            right: 2,
                        }}
                        onClick={() => {props.onRemove(), setThumbnailUrl(null);}}
                    >
                        <IconX  />
                    </ActionIcon>
                    <ThemeIcon 
                        variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                        radius={'100%'}
                        size={22}
                        style={{
                            position: 'absolute',
                            top: 15,
                            right: 22,
                        }}
                    >
                        <IconPlayerPlay />
                    </ThemeIcon>
                </div>
            )}
        </>
    );
}

function ThumbMedia(props) {
    const files = [ ...props.files ];

    function removeFile(index) {
        props.setFiles((files) => {
            const newFiles = [ ...files ];
            newFiles.splice(index, 1);
            return newFiles;
        });
    }

    const thumbs = files.map((file, index) => {
        const fileType = file.type.split('/');
        const fileUrl = URL.createObjectURL(file);
        return (
            <React.Fragment key={index}>
                {fileType[0] == 'image' && (
                    <div 
                        className='px-2'
                        style={{
                            position: 'relative',
                        }}
                    >
                        <Image
                            src={fileUrl}
                            width={52}
                            height={52}
                            radius={'md'}
                            onLoad={() => {
                                URL.revokeObjectURL(fileUrl);
                            }}
                        />
                        <ActionIcon
                            radius={'100%'} variant="filled"
                            size={22}
                            style={{
                                position: 'absolute',
                                top: -6,
                                right: 2,
                            }}
                            onClick={() => {
                                removeFile(index);
                                URL.revokeObjectURL(fileUrl);
                            }}
                        >
                            <IconX />
                        </ActionIcon>
                    </div>
                )}
                {fileType[0] == 'video' && (
                    <VideoProcessing 
                        fileUrl={fileUrl}
                        onRemove={() => {
                            removeFile(index);
                            URL.revokeObjectURL(fileUrl);
                        }} 
                    />
                )}
                
            </React.Fragment>
        );
    });

    return (
        <div className='d-flex'>
            <ScrollArea w={'100%'}>
                <Box w={"100%"} className='d-flex pt-2'>
                    <div className='me-2'>
                        <ActionIcon
                            variant="light"
                            color="blue"
                            radius={"md"}
                            style={{
                                width: 45,
                                height: 52,
                            }}
                            onClick={props.openDropZone}
                        >
                            <IconFilePlus/>
                        </ActionIcon>
                    </div>
                    {thumbs}
                </Box>
            </ScrollArea>
        </div>
    );
}

export default ThumbMedia;

