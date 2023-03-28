import React from 'react';
import Storyslider from '@common/components/StorySlider';
import CreatePost from '@common/components/CreatePost';
import PostCard from '@common/components/PostCard';
import FriendSlider from '@common/components/FriendSlider';
import Load from '@common/components/Load';

const images = [
    { file: 'https://placekitten.com/4000/3000', caption: '' },
    { file: 'https://placekitten.com/1500/500', caption: '' },
    

];

function Home() {
    return (
        <>
            <Storyslider />
            <CreatePost defaultAudience='private' />
            <FriendSlider />
            <PostCard id="32" postvideo="" postimage={images} avater="user.png" user="Surfiya Zakir" time="22 min ago" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." />
            <Load />
        </>
    );
}

export default Home;
