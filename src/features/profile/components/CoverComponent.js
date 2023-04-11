import React, { useState, useRef } from 'react';
import { IconPhoto, IconCamera, IconUpload } from '@tabler/icons-react';
import { Button, Image, Text, Group, AspectRatio, Menu, Modal } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';

import { useAuth, useProfile } from '@services/controller';
import ImageCropper from '../../../common/components/ImageCropper';
import { readFile, base64ToFile } from '@common/utils/canvasUtils';

function CoverComponent(props) {
    const { user } = props;
    const { profile } = useAuth();
    const [ currentUser, setCurrentUser ] = useState(profile.data);
    const { updateProfile } = useProfile(user.id);

    const [ coverSrc, setCoverSrc ] = useState(null);
    const [ updatedCoverSrc, setUpdatedCoverSrc ] = useState(null);

    const [ openCoverModal, setOpenCoverModal ] = useState(false);

    const openCoverRef = useRef(null);

    const onCoverChange = async (files) => {
        if (files && files.length > 0) {
            let imageDataUrl = await readFile(files[0]);
            setCoverSrc(imageDataUrl); // data image base64 string
        }
    };

    const handleCoverUpdate = async () => {
        const file = base64ToFile(updatedCoverSrc, 'cover.jpg');
        const form = new FormData();
        form.append('cover', file);
        updateProfile(
            {
                data: form,
            },
        );
        setUpdatedCoverSrc(null); 
        setCoverSrc(null); 
        setOpenCoverModal(false);
    };

    return (
        <div>
            <AspectRatio ratio={16 / 9} mah={300}>
                <Image src={user.cover} alt="cover" fit="cover"/>
            </AspectRatio>
            {user.id == currentUser.id && (
                <>
                    <Group style={{ position: 'relative' }}>
                        <Menu shadow="md" width={200}>
                            <Menu.Target>
                                <Button
                                    color="indigo"
                                    variant="filled"
                                    leftIcon={<IconCamera size={18} />}
                                    style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        right: '10px',
                                    }}
                                >
                                    Edit Cover Photo
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item icon={<IconPhoto size={16} />}>
                                    <Text>Select photo</Text>
                                </Menu.Item>
                                <Menu.Item
                                    icon={<IconUpload size={16} />}
                                    onClick={() => {
                                        setOpenCoverModal(true), openCoverRef.current();
                                    }}
                                >
                                    <Text>Upload photo</Text>
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </>
            )}
            {user.id == currentUser.id && (
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
                        size={'xl'}
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
                            />
                            <div className="mt-3 pt-3">
                                <Button
                                    onClick={() => {handleCoverUpdate();}}
                                >
                                    Confirm
                                </Button>
                            </div>
                            <div>
                                {updatedCoverSrc && (
                                    <AspectRatio ratio={16 / 9}>
                                        <Image src={updatedCoverSrc} />
                                    </AspectRatio>
                                )}
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
}
export default CoverComponent;
