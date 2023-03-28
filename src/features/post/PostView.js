import React, { useState } from 'react';
import { Grid, AspectRatio, ActionIcon, Image } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';

const images = [
    'https://placekitten.com/1500/500',
    'https://placekitten.com/4000/3000',
    'https://placekitten.com/800/1200',
    'https://placekitten.com/1500/1500',
];

function PostView() {
    const navigate = useNavigate();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ photoIndex, setPhotoIndex ] = useState(0);
    return (
        <div>
            <Grid>
                <Grid.Col span={8}>
                    <div style={{ position: 'relative' }}>
                        <AspectRatio ratio={16/9}>
                            <div
                                className='align-items-stretch'
                                style={{
                                    backgroundColor: '#000',
                                    padding: 4,
                                }}
                            >
                                <Image
                                    src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/WOPA160517_D056-resized.jpg?crop=864%2C0%2C1728%2C2304&wid=600&hei=800&scl=2.88"
                                    alt="Panda"
                                    fit="contain"
                                    height={600}
                                />
                            </div>
                        </AspectRatio>
                        <div style={{ position: 'absolute', top: 0, left: 0 }}>
                            <ActionIcon variant="fill" radius="xl" onClick={() => navigate(-1)}>
                                <IconX />
                            </ActionIcon>
                        </div>
                    </div>
                </Grid.Col>
                <Grid.Col span={3}> Content </Grid.Col>
            </Grid>
        </div>
    );
}

export default PostView;
