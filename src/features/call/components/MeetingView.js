import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import useCall from "@services/controller/useCall";
function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(props.participantId);
    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [ webcamStream, webcamOn ]);
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
  
    return (
        <div>
            <p>
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay muted={isLocal} />
            {webcamOn && (
                <ReactPlayer
                    //
                    playsinline // very very imp prop
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    //
                    url={videoStream}
                    //
                    height={"300px"}
                    width={"300px"}
                    onError={(err) => {
                        console.log(err, "participant video error");
                    }}
                />
            )}
        </div>
    );
}

// function ParticipantView(props) {
//     const webcamRef = useRef(null);
//     const micRef = useRef(null);
//     const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(props.participantId);
  
//     const mediaStream = new MediaStream();
//     mediaStream.addTrack(webcamStream.track);

//     webcamRef.current.srcObject = mediaStream;
//     webcamRef.current
//         .play()
//         .catch((error) => console.error("videoElem.current.play() failed", error));

    
//     useEffect(() => {
//         if (micRef.current) {
//             if (micOn && micStream) {
//                 const mediaStream = new MediaStream();
//                 mediaStream.addTrack(micStream.track);
  
//                 micRef.current.srcObject = mediaStream;
//                 micRef.current
//                     .play()
//                     .catch((error) =>
//                         console.error("videoElem.current.play() failed", error),
//                     );
//             } else {
//                 micRef.current.srcObject = null;
//             }
//         }
//     }, [ micStream, micOn ]);
  
//     return (
//         <div>
//             <p>
//                 Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
//                 {micOn ? "ON" : "OFF"}
//             </p>
//             <audio ref={micRef} autoPlay muted={isLocal} />
//             {webcamOn && (
//                 <ReactPlayer
//                     playsinline // very very imp prop
//                     pip={false}
//                     light={false}
//                     controls={false}
//                     muted={true}
//                     playing={true}
//                     url={videoStream}
//                     height={"300px"}
//                     width={"300px"}
//                     onError={(err) => {
//                         console.log(err, "participant video error");
//                     }}
//                 />
//             )}
//         </div>
//     );
// }


const MeetingView = (props) => {
    const { token, roomId, onMeetingLeave } = props;
    const [ joined, setJoined ] = useState("JOINED");

    const { endMeeting } = useCall();

    function onMeetingJoined() {
        setJoined("JOINED");
        console.log("onMeetingJoined");
    }

    //Event to know some other participant joined
    function onParticipantJoined(participant) {
        console.log(" onParticipantJoined", participant);
    }

    //Event to know meeting is left
    function onMeetingLeft() {
        console.log("onMeetingLeft");
    }

    //Event to know some other participant left
    function onParticipantLeft(participant) {
        console.log(" onParticipantLeft", participant);
    }


    // Get Meeting object using useMeeting hook
    // Getting the leave and end method from hook and assigning event callbacks
    const { join, leave, end, unmuteMic, muteMic, toggleMic,enableWebcam, disableWebcam, toggleWebcam, participants, localParticipant } = useMeeting({
        onMeetingJoined,
        onParticipantJoined,
        onMeetingLeft,
        onParticipantLeft,
    });

    const handleEnableWebcam = () => {
    // Enabling camera
        enableWebcam();
    };

    const handleDisableWebcam = () => {
    // Disabling camera
        disableWebcam();
    };

    const handleToggleWebcam = () => {
    // Toggling webcam
        toggleWebcam();
    };

    const handleUnmuteMic = () => {
    // Unmuting Mic
        unmuteMic();
    };

    const handleMuteMic = () => {
    // Muting Mic
        muteMic();
    };

    const handleToggleMic = () => {
    // Toggling Mic
        toggleMic();
    };

    const handleJoinMeeting = () => {
    // Joining Meeting
        setJoined("JOINING");
        join();
    };

    const handleLeaveMeeting = () => {
    // Leaving Meeting
        setJoined(null);
        leave();
    };

    const handleEndMeeting = async () => {
    // Ending Meeting
        setJoined(null);
        await endMeeting(token, roomId);
        // onMeetingLeave();
    // end();
    };


    return (
        <>
            <button onClick={handleLeaveMeeting}>Leave Meeting</button>
            <button onClick={handleEndMeeting}>End Meeting</button>
            <button onClick={handleMuteMic}>Mute Mic</button>
            <button onClick={handleUnmuteMic}>Unmute Mic</button>
            <button onClick={handleToggleMic}>Toggle Mic</button>
            <button onClick={handleEnableWebcam}>Enable Webcam</button>
            <button onClick={handleDisableWebcam}>Disable Webcam</button>
            <button onClick={handleToggleWebcam}>Toggle Webcam</button>

            <div className="container">
                {joined && joined === "JOINED" 
                    ? (
                        <div>
                            {[ ...participants.keys() ].map((participantId) => (
                                <ParticipantView
                                    participantId={participantId}
                                    key={participantId}
                                />
                            ))}
                        </div>
                    ) 
                    : joined && joined === "JOINING" 
                        ? (
                            <p>Joining the meeting...</p>
                        ) 
                        : (
                            <button onClick={handleJoinMeeting}>Join the meeting</button>
                        )
                }
            </div>
        </>
    );
};

export default MeetingView;
