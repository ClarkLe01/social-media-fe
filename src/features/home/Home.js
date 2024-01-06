import React, { useEffect, useRef, useState } from 'react';
import CreatePost from '@common/components/CreatePost';
import PostCard from '@common/components/PostCard';
import Load from '@common/components/Load';
import { useAuth, usePostGeneral } from '@services/controller';
import lodash, { throttle } from 'lodash';

const handleScroll = lodash.throttle(
    ({ fetchNextPostList, isFetchingPostList, hasNextPostList }) => {
        console.log({ hasNextPostList });
        const bottomSpacing =
            document.documentElement.scrollHeight - window.scrollY - window.innerHeight;

        if (bottomSpacing < 200 && !isFetchingPostList && hasNextPostList) {
            fetchNextPostList();
        }
    },
    300,
);

function Home() {
    const { profile } = useAuth();
    const {
        PostList,
        PostListLoading,
        fetchNextPostList,
        hasNextPostList,
        isFetchingPostList,
        PostListError,
    } = usePostGeneral();
    const [ posts, setPosts ] = useState([]);
    const scrollParentRef = useRef();

    useEffect(() => {
        if (!PostListLoading && PostList) {
            setPosts(
                PostList.pages.reduce((acc, cur) => {
                    acc.push(...cur.results);
                    return acc;
                }, []),
            );
        }
    }, [ PostListLoading, PostList ]);

    useEffect(() => {
        const onScroll = () => {
            handleScroll({ fetchNextPostList, hasNextPostList, isFetchingPostList });
        };

        document.addEventListener('scroll', onScroll);

        return () => removeEventListener('scroll', onScroll);
    }, [ hasNextPostList, fetchNextPostList, isFetchingPostList ]);

    return (
        <div className="mx-5" onScroll={() => {}}>
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
