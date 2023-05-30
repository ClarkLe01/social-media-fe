import {
    Group,
    Text,
    useMantineTheme,
    Button,
    Container,
    ActionIcon,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX, IconPencil  } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';
import ImageGridPreview from './ImageGridPreview';
import React, { useState, useEffect } from 'react';

const MemoizedImageGridPreview = React.memo(ImageGridPreview);

function MediaFileSection(props) {
    const openMediaFileRef = props.openMediaFileRef;
    const id = props.id;
    const theme = useMantineTheme();
    const [ files, setFiles ] = [ props.files, props.setFiles ];
    const [ showEditImageGrid, setShowEditImageGrid ] = useState(false);
    const [ basedImageGridWidth, setBasedImageGridWidth ] = useState(window.innerWidth - 86 );

    useEffect(() => {
        const handleResize = () => {
            setBasedImageGridWidth(window.innerWidth - 86);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleOnDrop = (newFiles) => {
        setFiles(oldfiles => [ ...oldfiles, ...newFiles ]);
    };

    return (
        <>
            {files.length == 0 && (
                <Dropzone
                    openRef={openMediaFileRef}
                    onDrop={handleOnDrop}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={3 * 1024 ** 2}
                    // accept={[ ...IMAGE_MIME_TYPE, MIME_TYPES.mp4 ]}
                    accept={{
                        'image/*': [], // All images
                        'video/*': [],
                    }}
                >
                    <Group
                        position="center"
                        spacing="xl"
                        style={{ minHeight: 220, pointerEvents: 'none' }}
                    >
                        <Dropzone.Accept>
                            <IconUpload
                                size="3.2rem"
                                stroke={1.5}
                                color={
                                    theme.colors[theme.primaryColor][
                                        theme.colorScheme === 'dark' ? 4 : 6
                                    ]
                                }
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                size="3.2rem"
                                stroke={1.5}
                                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                            />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconPhoto size="3.2rem" stroke={1.5} />
                        </Dropzone.Idle>

                        <div>
                            <Text size="xl" inline>
                                Drag images here or click to select files
                            </Text>
                            <Text size="sm" color="dimmed" inline mt={7}>
                                Attach as many files as you like, each file should not exceed 5mb
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
            )}
            <Container className="mx-0 px-0 mt-2" style={{ position: 'relative' }}>
                {files.length > 0 && (
                    <div
                        className="d-flex w-100 mt-3 ms-auto px-2"
                        style={{ position: 'absolute', top: 0, left: 0, zIndex: 6 }}
                        onMouseMove={() => setShowEditImageGrid(true)}
                    >
                        {showEditImageGrid && (
                            <>
                                <Button 
                                    className="me-3"
                                    leftIcon={<IconPencil />}
                                    onClick={props.onEdit}
                                    classNames={{
                                        root: basedImageGridWidth < 530 &&'px-1',
                                        leftIcon: basedImageGridWidth > 530 ?'':'me-0',
                                    }}
                                >
                                    {basedImageGridWidth > 530 && 'Edit All'} 
                                </Button>
                                <Button
                                    onClick={() => id?openMediaFileRef:openMediaFileRef.current()}
                                    leftIcon={<IconUpload/>}
                                    classNames={{
                                        root: basedImageGridWidth < 530 &&'px-1',
                                        leftIcon: basedImageGridWidth > 530 ?'':'me-0',
                                    }}
                                >
                                    {basedImageGridWidth > 530 && 'Add Images / Videos'} 
                                </Button>
                            </>
                        )}
                        <ActionIcon variant="filled" className="ms-auto" radius="xl" onClick={() => setFiles([])}>
                            <IconX />
                        </ActionIcon>
                    </div>
                )}
                <div
                    onMouseMove={() => setShowEditImageGrid(true)}
                    onMouseLeave={() => setShowEditImageGrid(false)}
                >
                    <MemoizedImageGridPreview files={files} />
                </div>
            </Container>
        </>
    );
}

export default MediaFileSection;
