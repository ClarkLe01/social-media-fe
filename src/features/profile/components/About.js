import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { useParams } from "react-router-dom";
import { useAuth, useProfile } from "@services/controller";
import ProfileDetail from "@common/components/ProfileDetail";
function About (props) {
    const { userId } = useParams();  // get param userId from url
    const { profileId } = useProfile(userId); // profile of user by params userId
    const [ user, setUser ] = useState(null);

    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
        }
    }, [ profileId ]);

    return (
        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 py-3">
            {user &&<ProfileDetail user={user}/>}
        </div>
    );
}

export default About;