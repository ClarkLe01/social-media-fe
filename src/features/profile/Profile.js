import React, { useEffect, useState } from 'react';
import ProfileCard from '@features/profile/components/ProfileCard';
import ProfileDetail from '@common/components/ProfileDetail';
import ProfilePhoto from '@common/components/ProfilePhoto';
import CreatePost from '@common/components/CreatePost';
import PostCard from '@common/components/PostCard';
import Load from '@common/components/Load';
import { useParams } from 'react-router-dom';
import { useAuth, useProfile } from '@services/controller';
import { usePostGeneral } from '@services/controller';

function Profile() {
    const { userId } = useParams();  // get param userId from url
    const { profileId } = useProfile(userId); // profile of user by params userId
    const { profile } = useAuth(); // current user
    const { MyPostList, MyPostListError, MyPostListLoading } = usePostGeneral(); // posts of current user
    const [ user, setUser ] = useState(null);
    const [ myPosts, setMyPosts ] = useState([]);
    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
            console.log(profileId.data);
        }
    }, [ profileId ]);

    useEffect(() => {
        if(!MyPostListLoading && MyPostList){
            setMyPosts(MyPostList.data);
        }
    }, [ MyPostListLoading, MyPostList ]);

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
                {profile.data.id == userId && (
                    <CreatePost user={profile.data} defaultAudience="public" />
                )}
                {myPosts.map((post, index) => (
                    <PostCard
                        key={index}
                        id={post.id}
                        images={post.images}
                        avatar={post.owner.avatar}
                        owner={post.owner}
                        created={post.created}
                        content={post.content}
                        status={post.status}
                        interactions={post.interactions}
                    />
                ))}
                <Load />
            </div>
        </div>
    );
}

export default Profile;
