import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { Button, Input, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from "@services/controller";
import { CALL_API_KEY } from "@constants";
import { IconAt } from "@tabler/icons-react";
import { endPoints } from "@services/api";
import { navigatePath } from "@app/routes/config";

const getToken = async () => {
    const response = await fetch(`http://localhost:8000/calling/token`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const { token } = await response.json();
    return token;
};

const createMeeting = async (token) => {
    try {
        //We will use VideoSDK rooms API endpoint to create a meetingId
        const VIDEOSDK_API_ENDPOINT = `http://localhost:8000/calling/room/new`;
        const options = {
            method: "POST",
            body: JSON.stringify({
                token: token,
            }),
            headers: {
                "Content-Type": "application/json",
                // Authorization: token,
            },
        };
        const meetingId = await fetch(VIDEOSDK_API_ENDPOINT, options)
            .then(async (result) => {
                const { roomId } = await result.json();
                return roomId;
            })
            .catch((error) => console.log("error", error));
        //we will return the meetingId which we got from the response of the api
        return meetingId;
    } catch (e) {
        console.log(e);
    }
};

const endMeetingId = async (token, roomId) => {
    try {
        //We will use VideoSDK rooms API endpoint to create a meetingId
        const VIDEOSDK_API_ENDPOINT = `http://localhost:8000/calling/room/end?roomId=${roomId}&token=${token}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: token,
            },
        };
        const meetingId = await fetch(VIDEOSDK_API_ENDPOINT, options)
            .then(async (result) => {
                const data = await result.json();
                return data;
            })
            .catch((error) => console.log("error", error));
        //we will return the meetingId which we got from the response of the api
        return meetingId;
    } catch (e) {
        console.log(e);
    }
};

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
            {displayName}
            <p>
                Webcam:{webcamOn ? "On" : "Off"} Mic: {micOn ? "On" : "Off"}
            </p>
            <audio ref={micRef} autoPlay muted={isLocal} />
            {webcamOn && (
                <ReactPlayer
                    playsinline // very very imp prop
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={videoStream}
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

const MeetingView = (props) => {
    const { token, roomId } = props;
    const [ joined, setJoined ] = useState(null);

    //Creating two react states to store list of available mics and selected microphone
    const [ mics, setMics ] = useState([]);
    const [ selectedMic, setSelectedMic ] = useState("");

    //Creating two react states to store list of available cameras and selected camera
    const [ cameras, setCameras ] = useState([]);
    const [ selectedCamera, setSelectedCamera ] = useState("");

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
    const { 
        join, leave, end, participants,
        unmuteMic, muteMic, toggleMic, getMics, changeMic,
        enableWebcam, disableWebcam, toggleWebcam, getWebcams, changeWebcam,
    } = useMeeting({
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
    //Method to get the cameras and load in our state
    const handleGetWebcams = async () => {
        const webcams = await getWebcams();
        console.log('webcams ', webcams);
        setCameras(webcams);
    };

    //Changing the camera with the selected deviceId
    const handleChangeCamera = (event) => {
        changeWebcam(event.target.value);
        setSelectedCamera(event.target.value);
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
        console.log('toggle mic');
        toggleMic();
    };
    //Method to get the mics and load in our state
    const handleGetMics = async () => {
        const mics = await getMics();
        console.log('mics ', mics);
        setMics(mics);
    };
    //Chanign the mic with the selected deviceId
    const handleChangeMic = (event) => {
        changeMic(event.target.value);
        setSelectedMic(event.target.value);
    };
  
    const handleJoinMeeting = () => {
        // Joining Meeting
        window.open(navigatePath.videoCall+"?hasVideo=True&isGroup=True", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=600");
        // setJoined("JOINING");
        // join();
    };
  
    const handleLeaveMeeting = () => {
        // Leaving Meeting
        setJoined(null);
        leave();
    };
  
    const handleEndMeeting = () => {
        // Ending Meeting
        setJoined(null);
        // endMeetingId(token, roomId);
        end();
    };

    useEffect(() => {
        handleGetMics();
        handleGetWebcams();
    }, []);
  
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

function TestPage() {
    const [ meetingId, setMeetingId ] = useState();
    const [ token, setToken ] = useState();
    const { profile } = useAuth();

    const fetchMeetingIdAndToken = async () => {
    //We will fetch token and meetingId and update it in the state
        const newToken = await getToken();
        const newMeetingId = await createMeeting(newToken);
        console.log('newToken: ', newToken);
        console.log('newMeetingId: ', newMeetingId);
        setToken(newToken);
        setMeetingId(newMeetingId);
    };

    useEffect(() => {
    //We will first load the token and generate a meeting id and pass it to the Meeting Provider
        fetchMeetingIdAndToken();
    }, []);

    return token && meetingId ? (
        <MeetingProvider
            config={{
            // Pass the generated meeting id
                meetingId: meetingId,
                name: profile.data.first_name+' '+profile.data.last_name,
                micEnabled: true,
                webcamEnabled: true,
                apiKey: CALL_API_KEY,
            }}
            // Pass the generated token
            token={token}
            joinWithoutInteraction={true}
        >
            <MeetingView token={token} roomId={meetingId} />
        </MeetingProvider>
    ) : (
        <>aaaa</>
    );
}
export default TestPage;
