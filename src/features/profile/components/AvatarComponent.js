import React, { useState, useRef, useEffect } from 'react';
import { IconPhoto, IconCamera, IconUpload } from '@tabler/icons-react';
import {
    Button,
    Image,
    Text,
    Group,
    AspectRatio,
    Menu,
    Modal,
    Avatar,
    ActionIcon,
    Grid,
    Box,
    Container,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

import { useAuth, useProfile } from '@services/controller';
import ImageCropper from '../../../common/components/ImageCropper';
import { readFile, base64ToFile } from '@common/utils/canvasUtils';
import { API_URL } from '@constants';

function AvatarComponent(props) {
    const { user } = props;
    const { profile } = useAuth();
    const { updateProfile } = useProfile(user.id);

    const [ avatarSrc, setAvatarSrc ] = useState(null);
    const [ updatedAvatarSrc, setUpdatedAvatarSrc ] = useState(null);

    const [ openAvatarModal, setOpenAvatarModal ] = useState(false);

    const openAvatarRef = useRef(null);

    const onAvatarChange = async (files) => {
        if (files && files.length > 0) {
            const file = files[0];
            let imageDataUrl = await readFile(file);
            setAvatarSrc(imageDataUrl);
        }
    };
    const handleAvatarUpdate = () => {
        if(!updatedAvatarSrc) return;
        const file = base64ToFile(updatedAvatarSrc, 'avatar.jpg');
        const form = new FormData();
        form.append('avatar', file);
        updateProfile({
            data: form,
        });
        setUpdatedAvatarSrc(null);
        setAvatarSrc(null);
        setOpenAvatarModal(false);
    };
    useEffect(() => {
        return () => {
            setUpdatedAvatarSrc(null);
            setAvatarSrc(null);
            setOpenAvatarModal(false);
        };
    }, [ user ]);
    return (
        <>
            <figure
                className="avatar position-absolute w100 z-index-1"
                style={{ top: '-40px', left: '30px' }}
            >
                <Avatar
                    radius={100}
                    size={100}
                    variant="outline"
                    classNames={{
                        image: 'float-right p-1 bg-white rounded-circle w-100',
                    }}
                    src={API_URL+user.avatar.replace(API_URL,'')}
                    key={user.updated}
                />
                {user.id == profile.data.id && (
                    <>
                        <Group
                            style={{
                                position: 'relative',
                                bottom: '35px',
                                left: '70px',
                            }}
                        >
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <ActionIcon color="gray" radius="xl" variant="filled">
                                        <IconCamera size={18} />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item icon={<IconPhoto size={16} />}>
                                        <Text>Select photo</Text>
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconUpload size={16} />}
                                        onClick={() => {
                                            setOpenAvatarModal(true), openAvatarRef.current();
                                        }}
                                    >
                                        <Text>Upload photo</Text>
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </>
                )}
            </figure>

            {user.id == profile.data.id && (
                <>
                    <div hidden>
                        <Dropzone
                            openRef={openAvatarRef}
                            onDrop={(files) => {onAvatarChange(files), setUpdatedAvatarSrc(null);}}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={3 * 1024 ** 2}
                            accept={{
                                'image/*': [],
                            }}
                            maxFiles={1}
                        />
                    </div>
                    <Modal
                        opened={openAvatarModal && avatarSrc}
                        size={'xl'}
                        onClose={() => {
                            setUpdatedAvatarSrc(null),
                            setAvatarSrc(null),
                            setOpenAvatarModal(false);
                        }}
                        title="Update Avatar"
                        styles={{
                            inner: { backgroundColor: 'rgba(253,226,243,0.4)' },
                        }}
                    >
                        <div>
                            <ImageCropper
                                imageSrc={avatarSrc}
                                aspect={1 / 1}
                                maxZoom={3}
                                cropShape="round"
                                setResult={setUpdatedAvatarSrc}
                                value = {updatedAvatarSrc}
                                dropZoneOpen={() => openAvatarRef.current()}
                            />
                        </div>
                        <div className="d-grid gap-5 d-flex justify-content-evenly mt-3 pt-3">
                            <Button
                                fullWidth
                                variant="outline" color="red"
                                onClick={() => {
                                    setUpdatedAvatarSrc(null),
                                    setAvatarSrc(null),
                                    setOpenAvatarModal(false);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                fullWidth
                                variant="light" color="green"
                                onClick={() => {
                                    handleAvatarUpdate();
                                }}
                            >
                                Confirm
                            </Button>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
}
export default AvatarComponent;
export { readFile };
