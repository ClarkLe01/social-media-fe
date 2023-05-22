import React, { useState, useEffect, useRef, createRef } from "react";
import {
    Constants,
    createCameraVideoTrack,
    useMeeting,
    usePubSub,
} from "@videosdk.live/react-sdk";
import SettingModal from "./SettingModal";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconMicrophone, IconMicrophoneOff, IconPhoneIncoming, IconPhoneOff, IconSettings, IconVideo, IconVideoOff } from "@tabler/icons-react";
import ParticipantView from "./ParticipantView";

const MemoizedParticipant = React.memo(
    ParticipantView,
    (prevProps, nextProps) => {
        return prevProps.participantId === nextProps.participantId;
    },
);

export default function MeetingPeer2PeerScreen({
    onMeetingLeave,
    setIsMeetingLeft,
    selectedMic,
    selectedWebcam,
    selectWebcamDeviceId,
    setSelectWebcamDeviceId,
    selectMicDeviceId,
    setSelectMicDeviceId,
    micEnabled,
    setMicOn,
    webcamEnabled,
    setWebcamOn,
    roomChatId,
    meetingMode,
    setSelectedMic,
    setSelectedWebcam,
}) {
    const [ localParticipantAllowedJoin, setLocalParticipantAllowedJoin ] =useState(null);
    const [ meetingErrorVisible, setMeetingErrorVisible ] = useState(false);
    const [ meetingError, setMeetingError ] = useState(false);
    const [ settingDialogueOpen, setSettingDialogueOpen ] = useState(false);
    const [ exactParticipants, setExactParticipants ] = useState([]);

    const handleClickOpen = () => {
        setSettingDialogueOpen(true);
    };

    const handleClose = () => {
        setSettingDialogueOpen(false);
    };

    const mMeetingRef = useRef();

    const _handleMeetingLeft = () => {
        setIsMeetingLeft(true);
    };

    function onParticipantJoined(participant) {
    // Change quality to low, med or high based on resolution
        participant && participant.setQuality("high");
    }

    function onEntryResponded(participantId, name) {
    // console.log(" onEntryResponded", participantId, name);
        if (mMeetingRef.current?.localParticipant?.id === participantId) {
            if (name === "allowed") {
                setLocalParticipantAllowedJoin(true);
            } else {
                setLocalParticipantAllowedJoin(false);
                setTimeout(() => {
                    _handleMeetingLeft();
                }, 3000);
            }
        }
    }

    async function onMeetingJoined() {
        const { changeWebcam, changeMic, muteMic, disableWebcam } = mMeetingRef.current;

        if (webcamEnabled && selectedWebcam.id) {
            await new Promise((resolve) => {
                disableWebcam();
                setTimeout(async () => {
                    const track = await createCameraVideoTrack({
                        cameraId: selectedWebcam.id,
                        optimizationMode: "motion",
                        encoderConfig: "h540p_w960p",
                        facingMode: "environment",
                        multiStream: false,
                    });
                    changeWebcam(track);
                    resolve();
                }, 500);
            });
        }

        if (micEnabled && selectedMic.id) {
            await new Promise((resolve) => {
                muteMic();
                setTimeout(() => {
                    changeMic(selectedMic.id);
                    resolve();
                }, 500);
            });
        }
    }
    function onMeetingLeft() {
    // console.log("onMeetingLeft");
        onMeetingLeave();
    }

    const _handleOnError = (data) => {
        const { code, message } = data;

        const joiningErrCodes = [
            4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4010,
        ];

        const isJoiningError = joiningErrCodes.findIndex((c) => c === code) !== -1;
        const isCriticalError = `${code}`.startsWith("500");

        new Audio(
            isCriticalError
                ? `https://static.videosdk.live/prebuilt/notification_critical_err.mp3`
                : `https://static.videosdk.live/prebuilt/notification_err.mp3`,
        ).play();

        setMeetingErrorVisible(true);
        setMeetingError({
            code,
            message: isJoiningError ? "Unable to join meeting!" : message,
        });
    };

    const mMeeting = useMeeting({
        onParticipantJoined,
        onEntryResponded,
        onMeetingJoined,
        onMeetingLeft,
        onError: _handleOnError,
    });


    useEffect(() => {
        mMeetingRef.current = mMeeting;
    }, [ mMeeting ]);

    console.log("mMeeting participants", mMeeting.participants);
    console.log("mMeeting local", mMeeting.localParticipant);
    console.log("mMeeting other", [ ...mMeeting.participants.keys() ].length);
    const [ otherParticipant, setOtherParticipant ] = useState(null);
    useEffect(() => {
        if([ ...mMeeting.participants.keys() ].length > 2){
            setOtherParticipant([ ...mMeeting.participants.keys() ][1]);
        }
    }, [ mMeetingRef.current, otherParticipant ]);
    const [ webcams, setWebcams ] = useState([]);
    const changeWebcam = mMeeting?.changeWebcam;
    const [ mics, setMics ] = useState([]);
    const changeMic = mMeeting?.changeMic;

    const _toggleWebcam = () => {
        if(mMeetingRef.current){
            mMeetingRef.current?.toggleWebcam();
            setWebcamOn(!webcamEnabled);
        }
    };

    const _handleToggleMic = () => {
        if(mMeetingRef.current){
            mMeetingRef.current?.toggleMic();
            setMicOn(!micEnabled);
        }
    };

    const getDevices = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();

            const webcams = devices.filter((d) => d.kind === "videoinput");
            const mics = devices.filter((d) => d.kind === "audioinput");
            mics && mics?.length && setMics(mics);
            webcams && webcams?.length && setWebcams(webcams);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getDevices();
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
                    <MemoizedParticipant
                        participantId={mMeetingRef.current?.localParticipant?.id}
                        style={{
                            backgroundColor: "#1c1c1c",
                            width: "30vw",
                            borderRadius: "10px",
                            height: "34vh",
                        }}
                    />
                </div>
                <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                    <div className='px-auto pt-5'>
                        {otherParticipant && (
                            <MemoizedParticipant
                                participantId={otherParticipant.id}
                                style={{
                                    backgroundColor: "#1c1c1c",
                                    width: "30vw",
                                    borderRadius: "10px",
                                    height: "34vh",
                                }}
                            />
                        )}
                        
                        <div className='d-flex justify-content-center pt-5'>
                            <Group position="center">
                                <ButtonWithTooltip
                                    onClick={_handleToggleMic}
                                    onState={micEnabled}
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
                                    onState={webcamEnabled}
                                    mic={false}
                                    OnIcon={<IconVideo size={24} />}
                                    OffIcon={<IconVideoOff size={24} />}
                                />
                                
                            </Group>
                        </div>
                    </div>
                </div>
            </div>
            {settingDialogueOpen && mics.length > 0 && webcams.length > 0 ? (
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
}
