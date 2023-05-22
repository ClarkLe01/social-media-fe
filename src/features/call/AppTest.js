import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import MeetingView from "./components/MeetingView";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuth } from "@services/controller";


const AppTest = () => {
    const { roomCallId, roomCallToken } = useParams();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ token, setToken ] = useState(roomCallToken);
    const [ meetingId, setMeetingId ] = useState(roomCallId);
    const { profile, profileLoading } = useAuth();
    const [ participantName, setParticipantName ] = useState(profile.data.id);

    return token && meetingId ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: participantName,
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
        >
            <MeetingView token={token} roomId={meetingId} />
        </MeetingProvider>
        
    ) : (
        <>aaaa</>
    );

};


export default AppTest;