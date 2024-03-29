import React, { useState, useRef, useEffect } from 'react';
import { IconPhoto, IconCamera, IconUpload, IconCheck, IconX } from '@tabler/icons-react';
import { Button, Image, Text, Group, AspectRatio, Menu, Modal } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

import { useAuth, useProfile } from '@services/controller';
import ImageCropper from '../../../common/components/ImageCropper';
import { readFile, base64ToFile } from '@common/utils/canvasUtils';
import { API_URL, MEDIA_URL } from '@constants';
import { notifications } from '@mantine/notifications';
function CoverComponent(props) {
    const { user } = props;
    const { profile } = useAuth();
    const { updateProfile } = useProfile(user.id);

    const [ coverSrc, setCoverSrc ] = useState(null);
    const [ updatedCoverSrc, setUpdatedCoverSrc ] = useState(null);

    const [ openCoverModal, setOpenCoverModal ] = useState(false);

    const openCoverRef = useRef(null);

    const onCoverChange = async (files) => {
        if (files && files.length > 0) {
            let imageDataUrl = await readFile(files[0]);

            const image = new window.Image();
            image.src = imageDataUrl;
            image.onload = () => {
                image.width < 600 || image.height < 400
                    ? setCoverSrc(null)
                    : setCoverSrc(imageDataUrl);
            };
        }
    };

    const handleCoverUpdate = () => {
        if (!updatedCoverSrc) return;
        const file = base64ToFile(updatedCoverSrc, 'cover.jpg');
        const form = new FormData();
        form.append('cover', file);
        updateProfile(
            {
                data: form,
            },
            {
                onSuccess: (data) => {
                    notifications.show({
                        id: 'notify-success-update-cover',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: 'Success ',
                        message: 'You updated your cover successfully!',
                        color: 'teal',
                        icon: <IconCheck />,
                        loading: false,
                    });
                },
                onError: (error) => {
                    notifications.show({
                        id: 'notify-failed-update-cover',
                        withCloseButton: true,
                        autoClose: 1000,
                        title: 'Failed',
                        message: 'You updated your cover unsuccessfully!',
                        color: 'red',
                        icon: <IconX />,
                        loading: false,
                    });
                },
            },
        );
        setUpdatedCoverSrc(null);
        setCoverSrc(null);
        setOpenCoverModal(false);
    };

    useEffect(() => {
        return () => {
            setUpdatedCoverSrc(null);
            setCoverSrc(null);
            setOpenCoverModal(false);
        };
    }, [ user ]);

    return (
        <div>
            <Image
                src={MEDIA_URL + user.cover.replace(API_URL, '')}
                key={user.updated}
                width={'100%'}
                height={320}
                fit="cover"
            />
            {user.id == profile.data.id && (
                <>
                    <Group style={{ position: 'relative' }}>
                        <Button
                            color="indigo"
                            variant="filled"
                            onClick={() => {
                                setOpenCoverModal(true), openCoverRef.current();
                            }}
                            leftIcon={<IconCamera size={18} />}
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                            }}
                        >
                            Edit Cover Photo
                        </Button>
                    </Group>
                </>
            )}
            {user.id == profile.data.id && (
                <>
                    <div hidden>
                        <Dropzone
                            openRef={openCoverRef}
                            onDrop={(files) => {
                                onCoverChange(files);
                            }}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={3 * 1024 ** 2}
                            accept={{
                                'image/*': [],
                            }}
                            maxFiles={1}
                        />
                    </div>
                    <Modal
                        opened={openCoverModal && coverSrc}
                        size={'80%'}
                        onClose={() => {
                            setUpdatedCoverSrc(null), setCoverSrc(null), setOpenCoverModal(false);
                        }}
                        title="Update Cover"
                    >
                        <div>
                            <ImageCropper
                                imageSrc={coverSrc}
                                aspect={16 / 9}
                                maxZoom={3}
                                min
                                cropShape="square"
                                setResult={setUpdatedCoverSrc}
                                value={updatedCoverSrc}
                                dropZoneOpen={() => openCoverRef.current()}
                            />
                            <div className="d-grid gap-5 d-flex justify-content-evenly mt-3 pt-3">
                                <Button
                                    fullWidth
                                    variant="outline"
                                    color="red"
                                    onClick={() => {
                                        setUpdatedCoverSrc(null),
                                        setCoverSrc(null),
                                        setOpenCoverModal(false);
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    fullWidth
                                    variant="light"
                                    color="green"
                                    onClick={() => {
                                        handleCoverUpdate();
                                    }}
                                    disabled={!updatedCoverSrc}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
}
export default CoverComponent;
