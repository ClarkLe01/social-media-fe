import { Text, Image, Grid, AspectRatio, Overlay, ActionIcon } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import React from 'react';

function ImageGridPreview(props) {
    const files = [ ...props.files ];

    const previewsBelowOneImage = files.map((obj, index) => {
        const file = obj.file;
        const fileType = file.type.split('/');
        const fileUrl = URL.createObjectURL(file);
        return (
            <React.Fragment key={index}>
                <Grid.Col span={12}>
                    {fileType[0] == 'image' && (
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src={fileUrl}
                                imageProps={{ onLoad: () => URL.revokeObjectURL(fileUrl) }}
                                fit="scale-down"
                            />
                        </AspectRatio>
                    )}
                    {fileType[0] == 'video' && (
                        <AspectRatio ratio={16 / 9}>
                            <video
                                src={fileUrl}
                                title={file.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            <Text
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                padding={20}
                                style={{
                                    zIndex: 1,
                                }}
                            >
                                <ActionIcon size={60} radius="xl" variant="outline">
                                    <IconPlayerPlay />
                                </ActionIcon>
                            </Text>
                        </AspectRatio>
                    )}
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsBelowTwoImage = files.map((obj, index) => {
        const file = obj.file;
        const fileType = file.type.split('/');
        const fileUrl = URL.createObjectURL(file);
        return (
            <React.Fragment key={index}>
                <Grid.Col span={12}>
                    {fileType[0] == 'image' && (
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src={fileUrl}
                                imageProps={{ onLoad: () => URL.revokeObjectURL(fileUrl) }}
                                fit="contain"
                            />
                        </AspectRatio>
                    )}
                    {fileType[0] == 'video' && (
                        <AspectRatio ratio={16 / 9}>
                            <video
                                src={fileUrl}
                                title={file.name}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            <Text
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                padding={20}
                                style={{
                                    zIndex: 1,
                                }}
                            >
                                <ActionIcon size={60} radius="xl" variant="outline">
                                    <IconPlayerPlay />
                                </ActionIcon>
                            </Text>
                        </AspectRatio>
                    )}
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsThreeImage = files.map((obj, index) => {
        const file = obj.file;
        const fileType = file.type.split('/');
        const fileUrl = URL.createObjectURL(file);
        return (
            <React.Fragment key={index}>
                <Grid.Col span={index > 0 ? 6 : 12}>
                    {fileType[0] == 'image' && (
                        <AspectRatio key={index} ratio={16 / 9}>
                            <Image
                                src={fileUrl}
                                imageProps={{ onLoad: () => URL.revokeObjectURL(fileUrl) }}
                                fit="contain"
                            />
                        </AspectRatio>
                    )}
                    {fileType[0] == 'video' && (
                        <AspectRatio ratio={16 / 9}>
                            <video
                                src={fileUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            <Text
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                padding={20}
                                style={{
                                    zIndex: 1,
                                }}
                            >
                                <ActionIcon size={60} radius="xl" variant="outline">
                                    <IconPlayerPlay />
                                </ActionIcon>
                            </Text>
                        </AspectRatio>
                    )}
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsFourImage = files.map((obj, index) => {
        const file = obj.file;
        const fileType = file.type.split('/');
        const fileUrl = URL.createObjectURL(file);
        return (
            <React.Fragment key={index}>
                <Grid.Col span={index > 0 ? 4 : 12}>
                    {fileType[0] == 'image' && (
                        <AspectRatio key={index} ratio={16 / 9}>
                            <Image
                                src={fileUrl}
                                imageProps={{ onLoad: () => URL.revokeObjectURL(fileUrl) }}
                            />
                        </AspectRatio>
                    )}
                    {fileType[0] == 'video' && (
                        <AspectRatio ratio={16 / 9}>
                            <video
                                src={fileUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            <Text
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                padding={20}
                                style={{
                                    zIndex: 1,
                                }}
                            >
                                <ActionIcon size={60} radius="xl" variant="outline">
                                    <IconPlayerPlay />
                                </ActionIcon>
                            </Text>
                        </AspectRatio>
                    )}
                </Grid.Col>
            </React.Fragment>
        );
    });

    const previewsMoreFourImage = files.map((obj, index) => {
        const file = obj.file;
        const fileType = file.type.split('/');
        const fileUrl = URL.createObjectURL(file);
        return (
            <React.Fragment key={index}>
                {index < 5 && (
                    <Grid.Col span={index > 1 ? 4 : 6} className="p-1">
                        <AspectRatio ratio={16 / 9}>
                            {fileType[0] == 'image' && (
                                <Image
                                    src={fileUrl}
                                    imageProps={{ onLoad: () => URL.revokeObjectURL(fileUrl) }}
                                    withPlaceholder
                                />
                            )}
                            {fileType[0] == 'video' && (
                                <AspectRatio ratio={16 / 9}>
                                    <video
                                        src={fileUrl}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                    <Text
                                        position="absolute"
                                        top={0}
                                        left={0}
                                        right={0}
                                        padding={20}
                                    >
                                        <ActionIcon size={60} radius="xl" variant="outline">
                                            <IconPlayerPlay />
                                        </ActionIcon>
                                    </Text>
                                </AspectRatio>
                            )}
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
            {files.length == 1 && previewsBelowOneImage}
            {files.length == 2 && previewsBelowTwoImage}
            {files.length == 3 && previewsThreeImage}
            {files.length == 4 && previewsFourImage}
            {files.length > 4 && previewsMoreFourImage}
        </Grid>
    );
}

export default ImageGridPreview;
