import React, { useState, useCallback } from 'react';
import { Button, Modal, Group, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUser, IconArrowNarrowRight } from '@tabler/icons-react';
import Cropper from 'react-easy-crop';
import { Slider, RangeSlider } from '@mantine/core';

function ImageCropper(props) {
    return (
        <div>
            <Group position="center" className="d-flex justify-content-center align-items-center">
                <div
                    style={{
                        height: '320px',
                    }}
                >
                    <Cropper
                        style={{
                            containerStyle: {
                                height: '50vh',
                                width: ' 100%',
                                display: 'block',
                                marginTop: 0,
                            },
                        }}
                        classes={{
                            containerStyle: 'mx-auto',
                        }}
                        image="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/333286360_719427689884255_5322141626167512166_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=AwOe1mb6wEUAX8N8ZPj&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfBxUtbWG0hS5WBuVcmVYw6qDR0uo5oBFYfub5tChYA32g&oe=64343B50"
                        crop={props.crop}
                        zoom={props.zoom}
                        aspect={1 / 1}
                        onCropChange={props.setCrop}
                        onCropComplete={props.onCropComplete}
                        onZoomChange={props.setZoom}
                        cropShape="round"
                        minZoom={1}
                        maxZoom={3}
                    />
                </div>
            </Group>
            <div>
                <Slider
                    label={null}
                    value={props.zoom * 100}
                    onChange={(e) => props.setZoom(e / 100)}
                    min={100}
                    max={300}
                />
            </div>

            <div className="mt-3 pt-3">
                <Button>Save</Button>
            </div>
        </div>
    );
}

function TestPage() {
    const [ opened, { open, close } ] = useDisclosure(false);
    const [ crop, setCrop ] = useState({ x: 0, y: 0 });
    const [ zoom, setZoom ] = useState(1);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels);
    }, []);
    return (
        <React.Fragment>
            <Modal opened={opened} onClose={close} title="Authentication">
                <ImageCropper
                    crop={crop}
                    setCrop={setCrop}
                    zoom={zoom}
                    setZoom={setZoom}
                    onCropComplete={onCropComplete}
                ></ImageCropper>
            </Modal>
            <Button
                leftIcon={
                    <>
                        <div style={{ position: 'absolute' }}>
                            <IconUser />
                        </div>
                        <div style={{ position: 'relative', top: -5, right: -18 }}>
                            <IconArrowNarrowRight size={13} />
                        </div>
                    </>
                }
                onClick={open}
            >
                Open modal
            </Button>
        </React.Fragment>
    );
}
export default TestPage;
