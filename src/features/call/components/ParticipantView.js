import { Avatar, Text } from "@mantine/core";
import { useAuth, useProfile } from "@services/controller";
import { IconMicrophone, IconMicrophoneOff, IconVideo, IconVideoOff } from "@tabler/icons-react";
import { useParticipant } from "@videosdk.live/react-sdk";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

const LocalVideoComponent = ({ webcamMediaStream, ...other }) => {
    const videoRef = useRef(null);
  
    useEffect(() => {
        if (webcamMediaStream && videoRef.current) {
            videoRef.current.srcObject = webcamMediaStream;
        }
    }, [ webcamMediaStream ]);
  
    return (
        <video
            autoPlay
            playsInline
            muted
            ref={videoRef}
            controls={false}
            {...other}
        />
    );
};

function ParticipantView({ participantId, ...other }) {
    const {
        displayName,
        webcamStream,
        micStream,
        webcamOn,
        micOn,
        isLocal,
    } = useParticipant(participantId);

    const { profile } = useAuth();
    const { profileId, profileIdLoading, profileIdError } = useProfile(displayName);
    const [ participantProfile, setParticipantProfile ] = useState(null);
  
    const micRef = useRef(null);

    useEffect(() => {
        if (!profileIdLoading && profileId) {
            setParticipantProfile(profileId.data);
        }
    }, [ profileIdLoading ]);
  
    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);
                micRef.current.srcObject = mediaStream;
                micRef.current
                    .play()
                    .catch((error) =>
                        console.error("videoElem.current.play() failed", error),
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [ micStream, micOn ]);
    const webcamMediaStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [ webcamStream, webcamOn ]);
    

    return profile.data.id == displayName ? (
        <div
            className='px-2'
            style={{
                position: "absolute",
                top: 0,
                left: 0,
            }}
        
        >
            {webcamOn ? (
                <LocalVideoComponent 
                    webcamMediaStream={webcamMediaStream}
                    {...other}
                />
            ): (
                <div
                    className='d-flex justify-content-center align-items-center'
                    {...other}
                >
                    <Avatar
                        radius={"100%"}
                        size={"lg"}
                        src={participantProfile ? participantProfile.avatar : null}
                    >
                        <Text tt="uppercase">
                            {participantProfile ? participantProfile.first_name[0]+participantProfile.last_name[0] : null}
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
    ) : (
        <div>
            {webcamOn ? (
                <LocalVideoComponent 
                    webcamMediaStream={webcamMediaStream}
                    {...other}
                />
            ): (
                <div
                    className='d-flex justify-content-center align-items-center'
                    {...other}
                >
                    <Avatar
                        radius={"100%"}
                        size={"lg"}
                        src={participantProfile ? participantProfile.avatar : null}
                    >
                        <Text tt="uppercase">
                            {participantProfile ? participantProfile.first_name[0]+participantProfile.last_name[0] : null}
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
    );

    // return (
    //     <div>
    //         <audio ref={micRef} autoPlay muted={isLocal} />
    //         {webcamOn && (
    //             <ReactPlayer
    //                 playsinline // very very imp prop
    //                 pip={false}
    //                 light={false}
    //                 controls={false}
    //                 muted={true}
    //                 playing={true}
    //                 url={webcamMediaStream}
    //                 height={"300px"}
    //                 width={"300px"}
    //                 onError={(err) => {
    //                     console.log(err, "participant video error");
    //                 }}
    //             />
    //         )}
    //     </div>
    // );
}

export default ParticipantView;