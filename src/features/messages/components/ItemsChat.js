import { MEDIA_URL } from '@constants';
import { ActionIcon, SimpleGrid, Text, Image } from '@mantine/core';
import { useMessage } from '@services/controller';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const ItemsChat = (props) => {
    const { stage, roomId, setStage } = props;
    const { ImagesChat, ImagesChatLoading, VideosChat, VideosChatLoading } = useMessage(roomId);
    const [ images, setImages ] = useState([]);
    const [ videos, setVideos ] = useState([]);

    useEffect(() => {
        if (ImagesChat && !ImagesChatLoading) {
            setImages(ImagesChat?.data);
        }
    }, [ ImagesChatLoading, ImagesChat ]);

    useEffect(() => {
        if (VideosChat && !VideosChatLoading) {
            setVideos(VideosChat?.data);
        }
    }, [ VideosChatLoading, VideosChat ]);

    return (
        <div>
            {stage === 'video' && (
                <div className='pt-1'>
                    <div className='d-flex'>
                        <ActionIcon
                            onClick={() => {
                                setStage(null);
                            }}
                        >
                            <IconArrowNarrowLeft />
                        </ActionIcon>
                        <Text size={20} fw={700} className='mx-auto'>
                            Video
                        </Text>
                    </div>
                    <div className='files-chat pt-2 px-3'>
                        <SimpleGrid cols={3} spacing="sm">
                            {videos.map((video, index) => (
                                <div 
                                    key={index}
                                    style={{
                                        width: 90,
                                        height: 90,
                                    }}
                                >
                                    <ReactPlayer
                                        url={MEDIA_URL + video.instance}
                                        width={90}
                                        height={90}
                                    />
                                </div>
                            ))}
                        </SimpleGrid>
                    </div>
                </div>
            )}
            {stage === 'image' && (
                <div className='pt-1'>
                    <div className='d-flex'>
                        <ActionIcon
                            onClick={() => {
                                setStage(null);
                            }}
                        >
                            <IconArrowNarrowLeft />
                        </ActionIcon>
                        <Text size={20} fw={700} className='mx-auto'>
                            Image
                        </Text>
                    </div>
                    <div className='files-chat pt-2 px-3'>
                        <SimpleGrid cols={3} spacing="sm">
                            {images.map((image, index) => (
                                <div key={index}>
                                    <Image 
                                        src={MEDIA_URL + image.instance}
                                        width={90}
                                        height={90}
                                    />
                                </div>
                            ))}
                        </SimpleGrid>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemsChat;