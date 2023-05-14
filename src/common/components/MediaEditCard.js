
import React, { useEffect } from 'react';
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

const MemoizedImageComponent = React.memo(Image);

function MediaEditCard(props) {
    const file = props.file;
    const fileType = file.type.split('/');
    const fileUrl = URL.createObjectURL(file);
    
    return (
        <Card
            shadow="sm"
            p="xl"
        >
            <Card.Section>
                <Box
                    style={{
                        position: 'relative',
                    }}
                >
                    <div className="px-3">
                        {fileType[0] == 'image' && (
                            <MemoizedImageComponent 
                                height={200} 
                                width={'100%'} 
                                src={fileUrl} 
                                fit="contain"
                                imageProps={{ onLoad: () => URL.revokeObjectURL(fileUrl) }}
                            />
                        )}
                        {fileType[0] == 'video' && (
                            <video 
                                src={fileUrl}
                                height={200}
                                width={'100%'}
                            />
                        )}
                    </div>
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
                            onClick={() => {props.onRemove(), URL.revokeObjectURL(fileUrl);}}
                        >
                            <IconX />
                        </ActionIcon>
                    </div>
                </Box>
            </Card.Section>
        </Card>
    );
}
export default MediaEditCard;