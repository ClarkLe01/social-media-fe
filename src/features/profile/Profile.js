import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useProfile } from '@services/controller';
import ProfileCard from '@features/profile/components/ProfileCard';

function Profile() {
    const { userId } = useParams();  // get param userId from url
    const { profileId } = useProfile(userId); // profile of user by params userId
    const [ user, setUser ] = useState();

    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
        }
    }, [ profileId ]);

    return (
        <div className="row">
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                {user && ( <ProfileCard user={user} /> )}
            </div>
            <Outlet/>
        </div>
    );
}

export default Profile;
