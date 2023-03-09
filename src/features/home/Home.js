import React from 'react';
import Storyslider from '@common/components/StorySlider';
import CreatePost from '@common/components/CreatePost';
import PostView from '@common/components/Postview';
import FriendSlider from '@common/components/FriendSlider';
import Load from '@common/components/Load';

function Home() {
    return (
        <div className="main-content p-0">
            <div className="middle-sidebar-bottom mx-2">
                <div className="middle-sidebar-left pe-0">
                    <div className="row">
                        <div className="col-xl-11 col-xxl-11 col-lg-8">
                            <Storyslider />
                            <CreatePost />
                            <FriendSlider />
                            <PostView id="32" postvideo="" postimage="post.png" avater="user.png" user="Surfiya Zakir" time="22 min ago" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." />
                            <PostView id="31" postvideo="" postimage="post.png" avater="user.png" user="David Goria" time="22 min ago" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." />
                            <PostView id="33" postvideo="" postimage="post.png" avater="user.png" user="Anthony Daugloi" time="2 hour ago" des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus." />
                            <Load />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
