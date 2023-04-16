import React, { useEffect, useState } from 'react';
import ProfileCard from '@features/profile/components/ProfileCard';
import ProfileDetail from '@common/components/ProfileDetail';
import ProfilePhoto from '@common/components/ProfilePhoto';
import CreatePost from '@common/components/CreatePost';
import PostCard from '@common/components/PostCard';
import Load from '@common/components/Load';
import { useParams } from 'react-router-dom';
import { useAuth, useProfile } from '@services/controller';

function Profile() {
    const { userId } = useParams();  // get param userId from url
    const { profileId } = useProfile(userId); // profile of user by params userId
    const { profile } = useAuth(); // current user
    const [ user, setUser ] = useState(null);
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
            <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12 py-3">
                <ProfileDetail />
                <ProfilePhoto />
            </div>
            <div className="col-xxl-8 col-xl-8 col-lg-12 py-3">
                {profile.data.id === profileId && (
                    <CreatePost user={profile.data} defaultAudience="public" />
                )}
                <PostCard
                    id="32"
                    postvideo=""
                    postimage="post.png"
                    avatar="user.png"
                    user="Surfiya Zakir"
                    time="22 min ago"
                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                />
                <PostCard
                    id="31"
                    postvideo=""
                    postimage="post.png"
                    avatar="user.png"
                    user="David Goria"
                    time="22 min ago"
                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                />
                <PostCard
                    id="33"
                    postvideo=""
                    postimage="post.png"
                    avatar="user.png"
                    user="Anthony Daugloi"
                    time="2 hour ago"
                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                />
                <Load />
            </div>
        </div>
    );
}

export default Profile;
