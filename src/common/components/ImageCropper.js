import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Avatar, Button, Container, Grid, Group, Slider, ActionIcon, Text, AspectRatio, Image } from '@mantine/core';
import { IconRotateClockwise, IconRotate, IconFlipHorizontal, IconFlipVertical, IconArrowsDownUp, IconRefresh } from '@tabler/icons-react';
import Cropper from 'react-cropper'; //Import Cropper Component
import '@assets/scss/cropper.scss'; //Import Cropper CSS

function ImageCropper(props) {
    const { cropShape, aspect, imageSrc, setResult, value, dropZoneOpen } = props;
    const cropperRef = useRef(null);
    const [ valueSlider, setValueSlider ] = useState(0.5);

    const showCroppedImage = useCallback(async () => {
        try {
            const cropper = cropperRef.current?.cropper;
            console.log(cropper.getCroppedCanvas({
                imageSmoothingQuality: "high",
                fillColor: '#000',
            }).toDataURL());
            setResult(cropper.getCroppedCanvas({
                imageSmoothingQuality: "high",
                fillColor: '#000',
            }).toDataURL());
        } catch (e) {
            console.error(e);
        }
    }, [ imageSrc ]);

    const zoomHandling = useCallback((e) => {
        if(e.detail.ratio >= 0.1 && e.detail.ratio <= 5) {
            setValueSlider(e.detail.ratio);
        }
        else{
            if(e.detail.ratio < 0.1){
                e.currentTarget?.cropper.zoomTo(0.1);
            }
            else{
                e.currentTarget?.cropper.zoomTo(5);
            }
        }
    }, [ imageSrc ]);

    useEffect(() => {
        console.log('valueSlider', valueSlider.toFixed(1));
    }, [ valueSlider ]);

    return (
        <Grid gutter="xl"
            style={{
                borderBottom: '3px solid #e3e3e3',
            }}
        >
            <Grid.Col span={8}>
                <Group position="center">
                    <div className={cropShape=='round'&&'circle-cropper'}>
                        <Cropper
                            viewMode={1}
                            ref={cropperRef}
                            src={imageSrc}
                            style={{ height: 400, width: '100%' }}
                            aspectRatio={aspect}
                            guides={false}
                            cropBoxResizable={true}
                            minCropBoxHeight={225}
                            minCropBoxWidth={400}
                            rotatable={true}
                            responsive={true}
                            zoom={(e) => zoomHandling(e)}
                            ready={(e) => console.log(e.currentTarget?.cropper.zoomTo(valueSlider))}
                        />
                    </div>
                </Group>
            </Grid.Col>
            <Grid.Col span={4} className='justify-content-center'>
                <div className='pb-3'>
                    {value ? (
                        <>
                            {cropShape=='round'?(
                                <AspectRatio w={"15vw"} h={'15vw'} className='d-flex justify-content-center border p-0 m-0'>
                                    <Avatar
                                        radius={"100%"}
                                        w={"100%"}
                                        h={"100%"}
                                        src={value}
                                        imageProps={{ onLoad: () => URL.revokeObjectURL(value) }}
                                    />
                                </AspectRatio>
                            ):(
                                <AspectRatio ratio={aspect} h={"100%"} w={"100%"} className='border p-0 m-0'>
                                    <Image width={"100%"} height={"100%"} src={value} alt="With default placeholder" withPlaceholder />
                                </AspectRatio>
                            )}
                        </>
                    ): (
                        <AspectRatio ratio={aspect} h={200} w={"100%"} className='border p-0 m-0'>
                            <Image width={"100%"} height={"100%"} src={null} alt="With default placeholder" withPlaceholder />
                        </AspectRatio>
                    )}
                </div>
                <div className='pb-2'>
                    <Slider 
                        min={0.1} 
                        max={5} 
                        step={0.1} 
                        label={(value) => value.toFixed(1)} 
                        value={valueSlider} 
                        onChange={e => {
                            cropperRef.current?.cropper.zoomTo(e);
                            setValueSlider(e);
                        }}
                    />
                </div>
                <div className='d-flex mx-auto justify-content-between pb-2'>
                    <ActionIcon
                        onClick={() => cropperRef.current?.cropper.rotate(-45)}
                        color="blue" variant="filled"
                    >
                        <IconRotateClockwise size={24} />
                    </ActionIcon>
                    <ActionIcon
                        onClick={() => cropperRef.current?.cropper.rotate(45)}
                        color="blue" variant="filled"
                    >
                        <IconRotate size={24} />
                    </ActionIcon>
                    <ActionIcon
                        onClick={() => cropperRef.current?.cropper.scale(-1, 1)}
                        color="blue" variant="filled"
                    >
                        <IconFlipHorizontal size={24} />
                    </ActionIcon>
                    <ActionIcon
                        onClick={() => cropperRef.current?.cropper.scale(1, -1)}
                        color="blue" variant="filled"
                    >
                        <IconFlipVertical size={24} />
                    </ActionIcon>
                    <ActionIcon
                        onClick={() => cropperRef.current?.cropper.scale(-1)}
                        color="blue" variant="filled"
                    >
                        <IconArrowsDownUp size={24} />
                    </ActionIcon>
                    <ActionIcon
                        onClick={() => {cropperRef.current?.cropper.reset(), setValueSlider(0.5);}}
                        color="blue" variant="filled"
                    >
                        <IconRefresh size={24} />
                    </ActionIcon>
                </div>
                <div className='pb-2'>
                    <Button
                        fullWidth
                        onClick={showCroppedImage}
                    >
                        Crop
                    </Button>
                </div>
                <div className='pb-2'>
                    <Button
                        fullWidth 
                        onClick={dropZoneOpen}
                    >
                        Change
                    </Button>
                </div>
            </Grid.Col>
        </Grid>
    );
}

export default ImageCropper;
