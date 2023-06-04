import { useAuth, useProfile, useUserPost } from "@services/controller";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileDetail from '@common/components/ProfileDetail';
import CreatePost from '@common/components/CreatePost';
import PostCard from '@common/components/PostCard';
import Load from '@common/components/Load';
import { Avatar, Text, Tooltip } from '@mantine/core';
import { getTimeString } from '@common/utils/converString';
import { getIconStatus } from '@common/utils/radioStatus';
import Photos from "./Photos";
import { API_URL, MEDIA_URL } from "@constants";

function Post () {
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

    useEffect(() => {
        if(!UserPostListLoading && UserPostList){
            setUserPosts(UserPostList.data);
        }
    }, [ UserPostListLoading, UserPostList ]);
    return <>
        <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12 py-3">
            {user && <ProfileDetail user={user} />}
        </div>
        <div className="col-xxl-8 col-xl-8 col-lg-12 py-3">
            {profile.data.id == userId && (
                <CreatePost user={profile.data} defaultAudience="public" />
            )}
            {userPosts.map((post, index) => (
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
                    isDetail={false}
                />
            ))}
            {userPosts.length > 0 && (
                <Load />
            )}
            {user && (
                <div className="card w-100 shadow-xss rounded-xxl border-0 px-4 pt-4 pb-2 mb-3">
                    <div className="card-body p-0 d-flex">
                        <Avatar className="avatar me-3" radius={'100%'} src={MEDIA_URL+user.avatar.replace(API_URL,'')} size={'md'} />
                        <Text fw={700} size={16}>
                            {' '}
                            {user.first_name} {user.last_name}
                            <Text className="d-flex" c="dimmed" size={13} fw={500}>
                                {getTimeString(profile.data.created)}
                                <div className="d-flex align-items-center ps-2">
                                    <Tooltip label={getIconStatus("public").label}>
                                        {getIconStatus("public").icon}
                                    </Tooltip>
                                </div>
                            </Text>
                        </Text>
                    </div>
                    <div className="card-body p-0 py-3 d-flex justify-content-center">
                        <iframe src="https://embed.lottiefiles.com/animation/114386"  width={"100%"}/>
                    </div>
                </div>
            )}
        </div>
    </>;
}

export default Post;