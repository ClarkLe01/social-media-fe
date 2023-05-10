import React, { useEffect, useState } from 'react';
import Storyslider from '@common/components/StorySlider';
import CreatePost from '@common/components/CreatePost';
import PostCard from '@common/components/PostCard';
import FriendSlider from '@common/components/FriendSlider';
import Load from '@common/components/Load';
import { useAuth, usePostGeneral } from '@services/controller';

const images = [
    { file: 'https://i.pinimg.com/564x/7a/f6/c5/7af6c52b76210f6a09209c78e51940d5.jpg', caption: '' },
];

const images2 = [
    { file: 'https://i.pinimg.com/564x/7a/f6/c5/7af6c52b76210f6a09209c78e51940d5.jpg', caption: '' },
    { file: 'https://i.pinimg.com/564x/e5/43/84/e54384d523c6022762d1fbf73fe9eca5.jpg', caption: '' },
];

const images3 = [
    { file: 'https://placekitten.com/4000/3000', caption: '' },
    { file: 'https://placekitten.com/1500/500', caption: '' },
    { file: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80', caption: '' },
];

const images4 = [
    { file: 'https://placekitten.com/4000/3000', caption: '' },
    { file: 'https://placekitten.com/1500/500', caption: '' },
    { file: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80', caption: '' },
    { file: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg', caption: '' },
];

const images5 = [
    { file: 'https://placekitten.com/4000/3000', caption: '' },
    { file: 'https://i.pinimg.com/564x/e5/43/84/e54384d523c6022762d1fbf73fe9eca5.jpg', caption: '' },
    { file: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80', caption: '' },
    { file: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg', caption: '' },
    { file: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg', caption: '' },
];

const images6 = [
    { file: 'https://images.unsplash.com/photo-1527118732049-c88155f2107c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80', caption: '' },
    { file: 'https://placekitten.com/4000/3000', caption: '' },
    { file: 'https://i.guim.co.uk/img/media/946fa4614b2f58c4f298d461e14c56b20072b4ee/0_853_6000_3598/master/6000.jpg?width=1200&quality=85&auto=format&fit=max&s=c63bb7f7622a67ecc47697e17753f11d', caption: '' },
    { file: 'https://placekitten.com/1500/500', caption: '' },
    { file: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014__340.jpg', caption: '' },
    { file: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg', caption: '' },
];


const posts = [
    {
        id: 1,
        postMedia: images,
        avatar: 'user.png',
        user: "Surfiya Zakir",
        time: "22 min ago",
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus.",
    },
    {
        id: 2,
        postMedia: images2,
        avatar: 'user.png',
        user: "Surfiya Zakir",
        time: "22 min ago",
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus.",
    },
    {
        id: 3,
        postMedia: images3,
        avatar: 'user.png',
        user: "Surfiya Zakir",
        time: "22 min ago",
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus.",
    },
    {
        id: 4,
        postMedia: images4,
        avatar: 'user.png',
        user: "Surfiya Zakir",
        time: "22 min ago",
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus.",
    },
    {
        id: 5,
        postMedia: images5,
        avatar: 'user.png',
        user: "Surfiya Zakir",
        time: "22 min ago",
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus.",
    },
    {
        id: 6,
        postMedia: images6,
        avatar: 'user.png',
        user: "Surfiya Zakir",
        time: "22 min ago",
        des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus.",
    },
];

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
            <Storyslider />
            <CreatePost user={profile.data} defaultAudience="public" />
            <FriendSlider />
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
