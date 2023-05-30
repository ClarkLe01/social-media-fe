import React, { useEffect, useState } from 'react';
import Storyslider from '@common/components/StorySlider';
import CreatePost from '@common/components/CreatePost';
import PostCard from '@common/components/PostCard';
import FriendSlider from '@common/components/FriendSlider';
import Load from '@common/components/Load';
import { useAuth, usePostGeneral } from '@services/controller';

function Home() {
    const { profile } = useAuth();
    const { PostList, PostListLoading, PostListError } = usePostGeneral();
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        if(!PostListLoading && PostList){
            setPosts(PostList.data);
        }
    }, [ PostListLoading, PostList ]);

    return (
        <div className='mx-5'>
            {/* <Storyslider /> */}
            <CreatePost user={profile.data} defaultAudience="public" />
            {/* <FriendSlider /> */}
            {posts.map((post, index) => (
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
            <Load />
        </div>
    );
}

export default Home;
