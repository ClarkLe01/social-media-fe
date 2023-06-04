import { ActionIcon, Avatar, Group, Text, Tooltip } from '@mantine/core';
import { useAuth, useMessage } from '@services/controller';
import { 
    IconMicrophone, 
    IconMicrophoneOff, 
    IconPhoneIncoming, 
    IconPhoneOff, 
    IconSettings, 
    IconVideo, 
    IconVideoOff,
} from '@tabler/icons-react';
import { Constants } from '@videosdk.live/react-sdk';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import AvatarDisplay from '@features/messages/components/AvatarDisplay';
import RoomNameDisplay from '@features/messages/components/RoomNameDisplay';
import SettingModal from './SettingModal';

const WaitingScreen = ({
    participantName,
    setParticipantName,
    setMeetingId,
    setToken,
    setMicOn,
    micEnabled,
    webcamEnabled,
    setSelectedMic,
    setSelectedWebcam,
    setWebcamOn,
    onClickStartMeeting,
    startMeeting,
    setIsMeetingLeft,
    meetingMode,
    setMeetingMode,
    roomChatId,
    hasVideo,
}) => {
    const { RoomDetail, RoomDetailError, RoomDetailLoading } = useMessage(roomChatId);
    const { profile } = useAuth();
    const [ roomChatCall, setRoomChatCall ] = useState(null);
    const [ setting, setSetting ] = useState("video");
    const [ { webcams, mics }, setDevices ] = useState({
        devices: [],
        webcams: [],
        mics: [],
    });

    const [ videoTrack, setVideoTrack ] = useState(null);

    const [ dlgMuted, setDlgMuted ] = useState(false);
    const [ dlgDevices, setDlgDevices ] = useState(false);

    const videoPlayerRef = useRef();
    const popupVideoPlayerRef = useRef();
    const popupAudioPlayerRef = useRef();

    const videoTrackRef = useRef();
    const audioTrackRef = useRef();
    const audioAnalyserIntervalRef = useRef();

    const [ settingDialogueOpen, setSettingDialogueOpen ] = useState(false);

    const [ audioTrack, setAudioTrack ] = useState(null);

    

    const handleClickOpen = () => {
        setSettingDialogueOpen(true);
    };

    const handleClose = () => {
        setSettingDialogueOpen(false);
    };

    const webcamOn = useMemo(() => !!videoTrack, [ videoTrack ]);
    const micOn = useMemo(() => !!audioTrack, [ audioTrack ]);

    const _handleTurnOffWebcam = () => {
        const videoTrack = videoTrackRef.current;

        if (videoTrack) {
            videoTrack.stop();
            setVideoTrack(null);
            setWebcamOn(false);
        }
    };
    const _handleTurnOnWebcam = () => {
        const videoTrack = videoTrackRef.current;

        if (!videoTrack) {
            getDefaultMediaTracks({ mic: false, webcam: true });
            setWebcamOn(true);
        }
    };

    const _toggleWebcam = () => {
        const videoTrack = videoTrackRef.current;

        if (videoTrack) {
            _handleTurnOffWebcam();
        } else {
            _handleTurnOnWebcam();
        }
    };
    const _handleTurnOffMic = () => {
        const audioTrack = audioTrackRef.current;

        if (audioTrack) {
            audioTrack.stop();

            setAudioTrack(null);
            setMicOn(false);
        }
    };
    const _handleTurnOnMic = () => {
        const audioTrack = audioTrackRef.current;

        if (!audioTrack) {
            getDefaultMediaTracks({ mic: true, webcam: false });
            setMicOn(true);
        }
    };
    const _handleToggleMic = () => {
        const audioTrack = audioTrackRef.current;

        if (audioTrack) {
            _handleTurnOffMic();
        } else {
            _handleTurnOnMic();
        }
    };

    const changeWebcam = async (deviceId) => {
        const currentvideoTrack = videoTrackRef.current;

        if (currentvideoTrack) {
            currentvideoTrack.stop();
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId },
        });
        const videoTracks = stream.getVideoTracks();

        const videoTrack = videoTracks.length ? videoTracks[0] : null;

        setVideoTrack(videoTrack);
    };
    const changeMic = async (deviceId) => {
        const currentAudioTrack = audioTrackRef.current;
        currentAudioTrack && currentAudioTrack.stop();
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId },
        });
        const audioTracks = stream.getAudioTracks();

        const audioTrack = audioTracks.length ? audioTracks[0] : null;
        clearInterval(audioAnalyserIntervalRef.current);

        setAudioTrack(audioTrack);
    };

    const getDefaultMediaTracks = async ({ mic, webcam, firstTime }) => {
        if (mic) {
            const audioConstraints = {
                audio: true,
            };

            const stream = await navigator.mediaDevices.getUserMedia(
                audioConstraints,
            );
            const audioTracks = stream.getAudioTracks();

            const audioTrack = audioTracks.length ? audioTracks[0] : null;

            setAudioTrack(audioTrack);
            if (firstTime) {
                setSelectedMic({
                    id: audioTrack?.getSettings()?.deviceId,
                });
            }
        }

        if (webcam) {
            const videoConstraints = {
                video: {
                    width: 1280,
                    height: 720,
                },
            };

            const stream = await navigator.mediaDevices.getUserMedia(
                videoConstraints,
            );
            const videoTracks = stream.getVideoTracks();

            const videoTrack = videoTracks.length ? videoTracks[0] : null;
            setVideoTrack(videoTrack);
            if (firstTime) {
                setSelectedWebcam({
                    id: videoTrack?.getSettings()?.deviceId,
                });
            }
        }
    };

    async function startMuteListener() {
        const currentAudioTrack = audioTrackRef.current;

        if (currentAudioTrack) {
            if (currentAudioTrack.muted) {
                setDlgMuted(true);
            }

            currentAudioTrack.addEventListener("mute", (ev) => {
                setDlgMuted(true);
            });
        }
    }

    const getDevices = async ({ micEnabled, webcamEnabled }) => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();

            const webcams = devices.filter((d) => d.kind === "videoinput");
            const mics = devices.filter((d) => d.kind === "audioinput");

            const hasMic = mics.length > 0;
            const hasWebcam = webcams.length > 0;

            setDevices({ webcams, mics, devices });

            if (hasMic) {
                startMuteListener();
            }

            getDefaultMediaTracks({
                mic: hasMic && micEnabled,
                webcam: hasWebcam && webcamEnabled,
                firstTime: true,
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (RoomDetail && !RoomDetailLoading) {
            setRoomChatCall(RoomDetail?.data);
            console.log('RoomDetail', RoomDetail.data);
        }
    }, [ roomChatId, RoomDetailLoading, RoomDetail ]);

    useEffect(() => {
        audioTrackRef.current = audioTrack;

        startMuteListener();

        return () => {
            const currentAudioTrack = audioTrackRef.current;
            currentAudioTrack && currentAudioTrack.stop();
            audioTrackRef.current = null;
        };
    }, [ audioTrack ]);

    useEffect(() => {
        if (meetingMode === Constants.modes.VIEWER) {
            _handleTurnOffMic();
            _handleTurnOffWebcam();
        }
    }, [ meetingMode ]);

    useEffect(() => {
        videoTrackRef.current = videoTrack;

        if (videoTrack) {
            const videoSrcObject = new MediaStream([ videoTrack ]);

            if (videoPlayerRef.current) {
                videoPlayerRef.current.srcObject = videoSrcObject;
                videoPlayerRef.current.play();
                // if (playPromise !== undefined) {
                //     playPromise.then(_ => {
                //         // Automatic playback started!
                //         // Show playing UI.
                //         console.log(_);
                //     })
                //         .catch(error => {
                //         // Auto-play was prevented
                //         // Show paused UI.
                //             console.log(error);
                //         });
                // }
            }

            setTimeout(() => {
                if (popupVideoPlayerRef.current) {
                    popupVideoPlayerRef.current.srcObject = videoSrcObject;
                    popupVideoPlayerRef.current.play();
                }
            }, 1000);
        } else {
            if (videoPlayerRef.current) {
                videoPlayerRef.current.srcObject = null;
            }
            if (popupVideoPlayerRef.current) {
                popupVideoPlayerRef.current.srcObject = null;
            }
        }
    }, [ videoTrack, setting, settingDialogueOpen ]);

    useEffect(() => {
        getDevices({ micEnabled, webcamEnabled });
    }, []);

    

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
    return (
        <>
            <div style={{ 
                backgroundImage: 'linear-gradient(315deg, #000000 0%, #7f8c8d 74%)', 
                backgroundColor: "#000000", 
                height: "100vh",
            }}>
                <div
                    className='pt-3 pe-3 d-flex'
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                    }}
                >
                    {meetingMode === Constants.modes.CONFERENCE && (
                        <Tooltip label="Check your audio and video">
                            <ActionIcon
                                onClick={(e) => {
                                    handleClickOpen();
                                }}
                            >
                                <IconSettings />
                            </ActionIcon>
                        </Tooltip>
                    )}
                </div>
                <div
                    className='pt-3 px-2'
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                
                >
                    {webcamOn ? (
                        <video
                            autoPlay
                            playsInline
                            muted
                            ref={videoPlayerRef}
                            controls={false}
                            style={{
                                backgroundColor: "#1c1c1c",
                                width: "30vw",
                                borderRadius: "10px",
                                height: "34vh",
                            }}
                        />
                    ): (
                        <div
                            className='d-flex justify-content-center align-items-center'
                            style={{
                                backgroundColor: "#1c1c1c",
                                width: "30vw",
                                borderRadius: "10px",
                                height: "34vh",
                            }}
                        >
                            <Avatar
                                radius={"100%"}
                                size={"lg"}
                                src={profile ? profile.data.avatar : null}
                            >
                                <Text tt="uppercase">
                                    {profile ? profile.data.first_name[0]+profile.data.last_name[0] : null}
                                </Text>
                            </Avatar>
                        </div>
                    )}
                    <div
                        className='d-flex pb-3 pe-4'
                        style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                        }}
                    >
                        {micOn ? (
                            <IconMicrophone size={20} color='white'/>
                        ): (
                            <IconMicrophoneOff size={20} color='red'/>
                        )}
                        {webcamOn ? (
                            <IconVideo className='ms-2' size={20} color='white'/>
                        ): (
                            <IconVideoOff className='ms-2' size={20} color='red'/>
                        )}
                        
                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                    <div className='px-auto pt-5'>
                        <Group position="center">
                            {roomChatCall ? (
                                <AvatarDisplay
                                    size={"xl"}
                                    isGroup={roomChatCall.isGroup}
                                    members={roomChatCall.members}
                                    currentUser={profile.data}
                                    avatar={roomChatCall.roomAvatar}
                                />
                            ) : (
                                <Avatar
                                    size={"xl"}
                                    src="avatar.png"
                                    alt="it's me"
                                />
                            )}
                        </Group>
                        <Group position="center" className='mt-3'>
                                
                            {roomChatCall && (
                                <RoomNameDisplay
                                    members={RoomDetail.data.members}
                                    currentUser={profile.data}
                                    isGroup={RoomDetail.data.isGroup}
                                    roomName={RoomDetail.data.roomName}
                                    size={"xl"}
                                    fw={700} 
                                    color="white"
                                />
                            )}
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
                                    <ActionIcon 
                                        variant="filled" 
                                        size={45} 
                                        radius={"100%"} 
                                        color="red"
                                        onClick={() => setIsMeetingLeft(true)}
                                    >
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
            {settingDialogueOpen ? (
                <SettingModal
                    open={settingDialogueOpen}
                    onClose={handleClose}
                    changeWebcam={changeWebcam}
                    changeMic={changeMic}
                    webcams={webcams}
                    mics={mics}
                    setSelectedMic={setSelectedMic}
                    setSelectedWebcam={setSelectedWebcam}
                />
            ) : null}
        </>
    );
    
};

export default WaitingScreen;