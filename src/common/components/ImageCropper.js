import React, { useState, useCallback } from 'react';
import { Button, Group, Image, AspectRatio } from '@mantine/core';
import Cropper from 'react-easy-crop';
import { Slider } from '@mantine/core';
import { getCroppedImg } from '../utils/canvasUtils';

function ImageCropper(props) {
    const { cropShape, aspect, maxZoom, imageSrc, setResult, height } = props;
    const [ crop, setCrop ] = useState({ x: 0, y: 0 });
    const [ zoom, setZoom ] = useState(1);
    const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(null);
    const [ croppedImage, setCroppedImage ] = useState(null);

    
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
        console.log(croppedArea, croppedAreaPixels);
    }, []);
    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
            console.log('done', { croppedImage });
            setCroppedImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [ imageSrc, croppedAreaPixels ]);

    return (
        <div>
            <Group position="center" className="d-flex justify-content-center align-items-center">
                <div
                    style={{
                        height: height ? height : '300px',
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
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        cropShape={cropShape}
                        minZoom={1}
                        maxZoom={maxZoom}
                    />
                </div>
            </Group>
            <div>
                <Slider
                    label={null}
                    value={zoom * 100}
                    onChange={(e) => setZoom(e / 100)}
                    min={100}
                    max={maxZoom * 100}
                />
            </div>

            <div className="mt-3 pt-3">
                <Button
                    onClick={showCroppedImage}
                >
                    Save
                </Button>
            </div>
            <div>
                {croppedImage && <Image src={croppedImage} />}
            </div>
        </div>
    );
}

export default ImageCropper;
