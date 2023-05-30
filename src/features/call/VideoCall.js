import useWindowSize from '@common/hooks/useWindowSize';
import { ActionIcon, Avatar, BackgroundImage, Box, Center, Container, Group, Modal, Select, Tabs, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { useAuth, useMessage } from '@services/controller';
import { IconMessageCircle } from '@tabler/icons-react';
import { IconCheck, IconCircleCheck, IconMicrophone, IconMicrophoneOff, IconPhoneCall, IconPhoneFilled, IconPhoneIncoming, IconPhoneOff, IconPhoto, IconSettings, IconVideo, IconVideoOff } from '@tabler/icons-react';
import { Constants, MeetingProvider } from '@videosdk.live/react-sdk';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SettingModal from './components/SettingModal';
import { EndCallScreen } from './components/EndCallScreen';
import AvatarDisplay from '@features/messages/components/AvatarDisplay';
import RoomNameDisplay from '@features/messages/components/RoomNameDisplay';
import Socket, { connections } from '@services/socket';
import useCall from '@services/controller/useCall.';
import WaitingScreen from './components/WaitingScreen';
import MeetingPeer2PeerScreen from './components/MeetingPeer2PeerScreen';
import MeetingView from './components/MeetingView';


const VideoCall = () => {
    const { roomCallId, roomCallToken } = useParams();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ token, setToken ] = useState(roomCallToken);
    const [ meetingId, setMeetingId ] = useState(roomCallId);
    const { profile, profileLoading } = useAuth();
    const [ participantName, setParticipantName ] = useState(null);
    const [ micOn, setMicOn ] = useState(true);
    const [ webcamOn, setWebcamOn ] = useState(true);
    const [ selectedMic, setSelectedMic ] = useState({ id: null });
    const [ selectedWebcam, setSelectedWebcam ] = useState({ id: null });
    const [ selectWebcamDeviceId, setSelectWebcamDeviceId ] = useState(
        selectedWebcam.id,
    );
    const [ meetingMode, setMeetingMode ] = useState(Constants.modes.CONFERENCE);
    const [ selectMicDeviceId, setSelectMicDeviceId ] = useState(selectedMic.id);
    const [ isMeetingStarted, setMeetingStarted ] = useState(false);
    const [ isMeetingLeft, setIsMeetingLeft ] = useState(false);
    
    const socketClientRef = useRef(null);
    const [ waitingToReconnect, setWaitingToReconnect ] = useState(null);
    const { endMeeting } = useCall();

    useEffect(() => {
        if(!profileLoading && profile.data) {
            setParticipantName(profile.data.id);
        }
    }, [ profileLoading, profile ]);
        
    useEffect(() => {
        if (waitingToReconnect) {
            return;
        }
        
        if (!socketClientRef.current) {
            const socket = new Socket(connections.call, {
                pathParams: {
                    roomId: roomCallId,
                    token: roomCallToken,
                },
            } ).private();
            socketClientRef.current = socket;

            socket.onerror = (e) => console.error(e);
            socket.onopen = () => {
                console.log('open connection');
            };
            
            socket.close = () => {
                if (socketClientRef.current) {
                    // Connection failed
                    console.log('ws closed by server');
                } else {
                    // Cleanup initiated from app side, can return here, to not attempt a reconnect
                    console.log('ws closed by app component unmount');
                    return;
                }
                if (waitingToReconnect) {
                    return;
                }
                console.log('ws closed');
                setWaitingToReconnect(true);
            };
            socket.onmessage = (data) => {
                if(data){
                    data = JSON.parse(data.data);
                    if(data.value && data.type == 'rejectCall'){
                        setIsMeetingLeft(true);
                        setMeetingStarted(false);
                        endMeeting(roomCallToken, roomCallId);
                    }
                    if(data.value && data.type == 'acceptCall'){
                        if(data.value.fromUser == profile.data.id){
                            setIsMeetingLeft(false);
                            setMeetingStarted(true);
                            setParticipantName(profile.data.id);
                        }
                    }
                    if(data.value && data.type == 'joinCall'){
                        if(data.value.fromUser != profile.data.id){
                            setIsMeetingLeft(false);
                            setMeetingStarted(true);
                            setParticipantName(profile.data.id);
                        }
                    }
                    if(data.type == 'endCall'){
                        setToken("");
                        setMeetingId("");
                        setParticipantName("");
                        setWebcamOn(false);
                        setMicOn(false);
                        setMeetingStarted(false);
                        setIsMeetingLeft(true);
                    }
                }
                
            };
            
            return () => {
                console.log('Cleanup');
                socketClientRef.current = null;
                socket.close();
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
            };
        }
    
    }, [ waitingToReconnect ]);
    return (
        <>
            {isMeetingStarted && token && meetingId ? (
                <MeetingProvider
                    config={{
                        meetingId,
                        micEnabled: micOn,
                        webcamEnabled: webcamOn,
                        name: participantName,
                        apiKey: "cced7187-ed8c-497d-a2ed-1128ad907b5b",
                        mode: meetingMode,
                        multiStream: true,
                    }}
                    
                    token={token}
                    reinitialiseMeetingOnConfigChange={true}
                    joinWithoutUserInteraction={false}
                >
                    <MeetingPeer2PeerScreen
                        onMeetingLeave={() => {
                            setToken("");
                            setMeetingId("");
                            setParticipantName("");
                            setWebcamOn(false);
                            setMicOn(false);
                            setMeetingStarted(false);
                            setIsMeetingLeft(true);
                        }}
                        setIsMeetingLeft={setIsMeetingLeft}
                        selectedMic={selectedMic}
                        selectedWebcam={selectedWebcam}
                        selectWebcamDeviceId={selectWebcamDeviceId}
                        setSelectWebcamDeviceId={setSelectWebcamDeviceId}
                        selectMicDeviceId={selectMicDeviceId}
                        setSelectMicDeviceId={setSelectMicDeviceId}
                        micEnabled={micOn}
                        setMicOn={setMicOn}
                        webcamEnabled={webcamOn}
                        setWebcamOn={setWebcamOn}
                        roomChatId={searchParams.get("roomChatId")}
                        meetingMode={meetingMode}
                        setSelectedMic={setSelectedMic}
                        setSelectedWebcam={setSelectedWebcam}
                        socket={socketClientRef.current}
                    />
                </MeetingProvider>
            ) : isMeetingLeft ? (
                <EndCallScreen />
            ) : (
                <WaitingScreen
                    // participantName={participantName}
                    // setParticipantName={setParticipantName}
                    setMeetingId={setMeetingId}
                    setToken={setToken}
                    setMicOn={setMicOn}
                    micEnabled={micOn}
                    webcamEnabled={webcamOn}
                    setSelectedMic={setSelectedMic}
                    setSelectedWebcam={setSelectedWebcam}
                    setWebcamOn={setWebcamOn}
                    onClickStartMeeting={() => {
                        setMeetingStarted(true);
                    }}
                    startMeeting={isMeetingStarted}
                    setIsMeetingLeft={setIsMeetingLeft}
                    meetingMode={meetingMode}
                    setMeetingMode={setMeetingMode}
                    roomChatId={searchParams.get("roomChatId")}
                    hasVideo={searchParams.get("hasVideo")}
                />
            )}
        </>
    );
};


export default VideoCall;
