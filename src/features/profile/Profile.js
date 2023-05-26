import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAuth, useProfile, useUserPost } from '@services/controller';


import ProfileCard from '@features/profile/components/ProfileCard';
import ProfileDetail from '@common/components/ProfileDetail';
import ProfilePhoto from '@common/components/ProfilePhoto';
import CreatePost from '@common/components/CreatePost';
import PostCard from '@common/components/PostCard';
import Load from '@common/components/Load';
import { Avatar, Text, Tooltip } from '@mantine/core';
import { getTimeString } from '@common/utils/converString';
import { getIconStatus } from '@common/utils/radioStatus';

function Profile() {
    const { userId } = useParams();  // get param userId from url
    const { profileId } = useProfile(userId); // profile of user by params userId
    const { profile } = useAuth(); // current user
    const { UserPostList, UserPostListError, UserPostListLoading } = useUserPost(userId); // posts of current user
    const [ user, setUser ] = useState();
    const [ userPosts, setUserPosts ] = useState([]);

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
