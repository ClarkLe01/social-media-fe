import useWindowSize from '@common/hooks/useWindowSize';
import { Container, Modal, Select, Tabs } from '@mantine/core';
import { IconMicrophone, IconVideo } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
const SettingModal = ({
    open,
    onClose,
    webcams,
    mics,
    setSelectedMic,
    setSelectedWebcam,
    changeWebcam,
    changeMic,
}) => {
    const [ selectedMicLabel, setSelectedMicLabel ] = useState(null);
    const [ selectedWebcamLabel, setSelectedWebcamLabel ] = useState(null);

    const [ dlgDevices, setDlgDevices ] = useState(false);

    const [ boxHeight, setBoxHeight ] = useState(0);
    const boxRef = useRef();

    const { width: windowWidth } = useWindowSize();

    useEffect(() => {
        if (boxRef.current && boxRef.current.offsetHeight !== boxHeight) {
            setBoxHeight(boxRef.current.offsetHeight);
        }
    }, [ windowWidth ]);
    
    const handleClose = () => {
        onClose();
    };
    
    return (
        <Modal
            title="Settings"
            opened={open}
            onClose={() => handleClose()}
            centered
            size="lg"
        >
            <Container
                className='px-0'
                style={{
                    height: "50vh",
                }}
            >
                <Tabs defaultValue="audio" orientation="vertical" color="cyan" variant="pills">
                    <Tabs.List>
                        <Tabs.Tab value="audio" icon={<IconMicrophone size={20} />}>Audio</Tabs.Tab>
                        <Tabs.Tab value="video" icon={<IconVideo size={20} />}>Video</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="audio">
                        <div className='ps-3 pt-1'>
                            <Select
                                label="Microphone"
                                placeholder="Select microphone"
                                value={selectedMicLabel}
                                onChange={(value) => {
                                    setSelectedMicLabel(value);
                                    setSelectedMic(
                                        (s) => ({
                                            ...s,
                                            id: value,
                                        }),
                                    );
                                    changeMic(
                                        value,
                                    );
                                }}
                                data={
                                    mics.map(item => {
                                        console.log(item);
                                        if (item?.kind === "audioinput")
                                            return {
                                                value: item?.deviceId,
                                                label: item?.label,
                                            };
                                    })
                                }
                            />
                            
                        </div>                  
                    </Tabs.Panel>

                    <Tabs.Panel value="video">
                        <div className='ps-3 pt-1'>
                            <Select
                                label="Camera"
                                placeholder="Select camera"
                                value={selectedWebcamLabel}
                                onChange={(value) => {
                                    setSelectedWebcamLabel(value);
                                    setSelectedWebcam(
                                        (s) => ({
                                            ...s,
                                            id: value,
                                        }),
                                    );
                                    changeWebcam(
                                        value, 
                                    );
                                }}
                                data={
                                    webcams.map(item => {
                                        return {
                                            value: item?.deviceId,
                                            label: item?.label,
                                        };
                                    })
                                }
                            />
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </Container>
            
        </Modal>
    );
};

export default SettingModal;