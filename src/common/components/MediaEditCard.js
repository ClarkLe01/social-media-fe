
import React, { useEffect, useState, useRef } from 'react';
import {
    Textarea,
    ActionIcon,
    Card,
    Text,
    Image,
    Box,

} from '@mantine/core';

import {
    IconX,
} from '@tabler/icons-react';
import ReactPlayer from 'react-player';

const MemoizedVideoComponent = React.memo(ReactPlayer);
const MemoizedImageComponent = React.memo(Image);

function MediaEditCard(props) {
    const file = props.objFile.file;
    const fileType = file.type.split('/');
    const fileUrl = URL.createObjectURL(file);
    const componentWidthImage = useRef(null);
    const [ isHoveringMediaCard, setIsHoveringMediaCard ] = useState(null);
    const [ basedImageGridWidth, setBasedImageGridWidth ] = useState(340);

    useEffect(() => {
        const handleResize = () => {
            setBasedImageGridWidth(componentWidthImage.current.offsetWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Card
            shadow="sm"
            p="xl"
            onMouseEnter={() => setIsHoveringMediaCard(true)}
            onMouseLeave={() => setIsHoveringMediaCard(false)}
        >
            <Card.Section>
                <Box
                    style={{
                        position: 'relative',
                    }}
                >
                    <div className="px-3">
                        {fileType[0] == 'image' && <MemoizedImageComponent height={200} src={fileUrl} fit="contain" />}
                        {fileType[0] == 'video' && (
                            <MemoizedVideoComponent
                                url={fileUrl}
                                height={200}
                                width={basedImageGridWidth}
                            />
                        )}
                    </div>
                    {isHoveringMediaCard && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            }}
                        >
                            <ActionIcon
                                variant="filled"
                                className="me-2 mt-2"
                                radius="xl"
                                size="sm"
                                onClick={props.onRemove}
                            >
                                <IconX />
                            </ActionIcon>
                        </div>
                    )}
                </Box>
            </Card.Section>
            <Card.Section>
                <div className="px-3">
                    <Text weight={500} size="md" mt="md">
                        Caption
                    </Text>
                    <Textarea
                        value={props.objFile.caption}
                        className="pb-3"
                        ref={componentWidthImage}
                        onChange={(e) => props.onChange(e.target.value)}
                    />
                </div>
            </Card.Section>
        </Card>
    );
}
export default MediaEditCard;