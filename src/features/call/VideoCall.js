import { ActionIcon, Avatar, BackgroundImage, Box, Center, Group, Text, Tooltip } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { useAuth } from '@services/controller';
import { IconMicrophone, IconMicrophoneOff, IconPhoneCall, IconPhoneFilled, IconPhoneIncoming, IconPhoneOff, IconSettings, IconVideo, IconVideoOff } from '@tabler/icons-react';
import React, { useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const ButtonWithTooltip = ({ onClick, onState, OnIcon, OffIcon, mic }) => {
    const btnRef = useRef();

    return (
        <>
            {onState ? (
                <Tooltip label={mic?"Turn off mic": "Turn off webcam"}>
                    <ActionIcon ref={btnRef} onClick={onClick} variant="filled" size={45} radius={"100%"}>
                        {OnIcon}
                    </ActionIcon>
                </Tooltip>
            ): (
                <Tooltip label={mic?"Turn on mic": "Turn on webcam"}>
                    <ActionIcon ref={btnRef} onClick={onClick} variant="filled" color='red' size={45} radius={"100%"}>
                        {OffIcon}
                    </ActionIcon>
                </Tooltip>
            )}
            
        </>
    );

};

const VideoCall = (props) => {
    useScrollLock(true);
    const { profile } = useAuth();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { roomCallId, roomCallToken } = useParams();
    console.log(searchParams.get('hasVideo'));
    console.log(searchParams.get('isGroup'));

    const videoTrackRef = useRef();
    const audioTrackRef = useRef();
    const audioAnalyserIntervalRef = useRef();

    const [ audioTrack, setAudioTrack ] = useState(null);
    const [ micOn, setMicOn ] = useState(false);
    const [ webcamOn, setWebcamOn  ] = useState(false);

    const _handleTurnOffMic = () => {
        // const audioTrack = audioTrackRef.current;
    
        // if (audioTrack) {
        //     audioTrack.stop();

        //     setAudioTrack(null);
        //     setMicOn(false);
        // }
        setMicOn(false);
    };

    const _handleTurnOnMic = () => {
        // const audioTrack = audioTrackRef.current;
    
        // if (!audioTrack) {
        //     getDefaultMediaTracks({ mic: true, webcam: false });
        //     setMicOn(true);
        // }
        setMicOn(true);
    };

    const _handleToggleMic = () => {
        // const audioTrack = audioTrackRef.current;
    
        // if (audioTrack) {
        //     _handleTurnOffMic();
        // } else {
        //     _handleTurnOnMic();
        // }

        if (micOn) {
            _handleTurnOffMic();
        } else {
            _handleTurnOnMic();
        }
    };


    const _handleTurnOffWebcam = () => {
        // const videoTrack = videoTrackRef.current;
    
        // if (videoTrack) {
        //     videoTrack.stop();
        //     setVideoTrack(null);
        //     setWebcamOn(false);
        // }
        setWebcamOn(false);
    };

    const _handleTurnOnWebcam = () => {
        // const videoTrack = videoTrackRef.current;
    
        // if (!videoTrack) {
        //     getDefaultMediaTracks({ mic: false, webcam: true });
        //     setWebcamOn(true);
        // }
        setWebcamOn(true);
    };

    const _toggleWebcam = () => {
        // const videoTrack = videoTrackRef.current;
    
        // if (videoTrack) {
        //     _handleTurnOffWebcam();
        // } else {
        //     _handleTurnOnWebcam();
        // }

        if (webcamOn) {
            _handleTurnOffWebcam();
        } else {
            _handleTurnOnWebcam();
        }
    };

    // const changeMic = async (deviceId) => {
    //     const currentAudioTrack = audioTrackRef.current;
    //     currentAudioTrack && currentAudioTrack.stop();
    //     const stream = await navigator.mediaDevices.getUserMedia({
    //         audio: { deviceId },
    //     });
    //     const audioTracks = stream.getAudioTracks();
    
    //     const audioTrack = audioTracks.length ? audioTracks[0] : null;
    //     clearInterval(audioAnalyserIntervalRef.current);
    
    //     setAudioTrack(audioTrack);
    // };
    // const getDefaultMediaTracks = async ({ mic, webcam, firstTime }) => {
    //     if (mic) {
    //         const audioConstraints = {
    //             audio: true,
    //         };

    //         const stream = await navigator.mediaDevices.getUserMedia(
    //             audioConstraints,
    //         );
    //         const audioTracks = stream.getAudioTracks();

    //         const audioTrack = audioTracks.length ? audioTracks[0] : null;

    //         setAudioTrack(audioTrack);
    //         if (firstTime) {
    //             setSelectedMic({
    //                 id: audioTrack?.getSettings()?.deviceId,
    //             });
    //         }
    //     }
    
    //     if (webcam) {
    //         const videoConstraints = {
    //             video: {
    //                 width: 1280,
    //                 height: 720,
    //             },
    //         };
    
    //         const stream = await navigator.mediaDevices.getUserMedia(
    //             videoConstraints,
    //         );
    //         const videoTracks = stream.getVideoTracks();
    
    //         const videoTrack = videoTracks.length ? videoTracks[0] : null;
    //         setVideoTrack(videoTrack);
    //         if (firstTime) {
    //             setSelectedWebcam({
    //                 id: videoTrack?.getSettings()?.deviceId,
    //             });
    //         }
    //     }
    // };

    return (
        <div style={{ 
            backgroundImage: 'linear-gradient(315deg, #000000 0%, #7f8c8d 74%)', 
            backgroundColor: "#000000", 
            height: "100vh",
        }}>
            <div
                className='pt-3 pe-3'
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}
            >
                <ActionIcon>
                    <IconSettings />
                </ActionIcon>
            </div>
            <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                <div className='px-auto pt-5'>
                    <Group position="center">
                        <Avatar
                            className='blob white'
                            radius={"100%"} 
                            src="avatar.png" 
                            alt="it's me"
                            size={"xl"}
                        />
                    </Group>
                    <Group position="center" className='mt-3'>
                        <Text fw={700} color='white'>Bold</Text>
                    </Group>
                    <Group position="center" className='pt-3'>
                        <Text c="dimmed" size={"xs"} color='white'>Calling...</Text>
                    </Group>
                    
                    <div className='d-flex justify-content-center pt-5'>
                        <Group position="center">
                            <ButtonWithTooltip
                                onClick={_handleToggleMic}
                                onState={micOn}
                                mic={true}
                                OnIcon={<IconMicrophone size={24} />}
                                OffIcon={<IconMicrophoneOff size={24} />}
                            />
                            <Tooltip label="Accept Call">
                                <ActionIcon variant="filled" size={45} radius={"100%"} color="teal">
                                    <IconPhoneIncoming size={24} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="End Call">
                                <ActionIcon variant="filled" size={45} radius={"100%"} color="red">
                                    <IconPhoneOff size={24} />
                                </ActionIcon>
                            </Tooltip>
                            <ButtonWithTooltip
                                onClick={_toggleWebcam}
                                onState={webcamOn}
                                mic={false}
                                OnIcon={<IconVideo size={24} />}
                                OffIcon={<IconVideoOff size={24} />}
                            />
                        </Group>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default VideoCall;
