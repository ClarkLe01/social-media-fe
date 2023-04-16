import React, { useCallback, useRef } from 'react';
import { Button, Group, Image } from '@mantine/core';
import Cropper from 'react-cropper'; //Import Cropper Component
import '@assets/scss/cropper.scss'; //Import Cropper CSS

function ImageCropper(props) {
    const { cropShape, aspect, imageSrc, setResult } = props;
    
    const cropperRef = useRef(null);

    const showCroppedImage = useCallback(async () => {
        try {
            const cropper = cropperRef.current?.cropper;
            console.log(cropper);
            setResult(cropper.getCroppedCanvas({
                imageSmoothingQuality: "high",
                fillColor: '#000',
            }).toDataURL());
        } catch (e) {
            console.error(e);
        }
    }, [ imageSrc ]);

    return (
        <div>
            <Group position="center" className="d-flex justify-content-center align-items-center">
                <div>
                    <Cropper
                        ref={cropperRef}
                        src={imageSrc}
                        style={{ height: 400, width: '100%' }}
                        aspectRatio={aspect}
                        guides={false}
                        cropBoxResizable={true}
                        minCropBoxHeight={225}
                        minCropBoxWidth={400}
                    />
                </div>
            </Group>
            <div className="mt-3 pt-3">
                <Button
                    onClick={showCroppedImage}
                >
                    Crop
                </Button>
            </div>
        </div>
    );
}

export default ImageCropper;
