import React from 'react';

import Contacts from './components/Contacts';
import Createpost from './components/Createpost';
import Friends from './components/Friends';
import Friendsilder from './components/Friendsilder';
import Header from './components/Header';
import Leftnav from './components/Leftnav';
import Load from './components/Load';
import Memberslider from './components/Memberslider';
import Postview from './components/Postview';
import Rightchat from './components/Rightchat';
import Storyslider from './components/Storyslider';
import Group from './components/Group';
import Events from './components/Events';
import Profilephoto from './components/Profilephoto';
import Popupchat from './components/Popupchat';
import Appfooter from './components/Appfooter';

function NewsFeed() {
    return (
        <>
            <Header />
            <Leftnav />
            <Rightchat />

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                <Storyslider />
                                <Createpost />
                                <Postview
                                    id="32"
                                    postvideo=""
                                    postimage="post.png"
                                    avater="user.png"
                                    user="Surfiya Zakir"
                                    time="22 min ago"
                                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                                />
                                <Postview
                                    id="31"
                                    postvideo=""
                                    postimage="post.png"
                                    avater="user.png"
                                    user="David Goria"
                                    time="22 min ago"
                                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                                />
                                <Postview
                                    id="33"
                                    postvideo=""
                                    postimage="post.png"
                                    avater="user.png"
                                    user="Anthony Daugloi"
                                    time="2 hour ago"
                                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                                />
                                <Memberslider />
                                <Postview
                                    id="35"
                                    postvideo=""
                                    postimage="post.png"
                                    avater="user.png"
                                    user="Victor Exrixon"
                                    time="3 hour ago"
                                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                                />
                                <Friendsilder />
                                <Postview
                                    id="36"
                                    postvideo=""
                                    postimage="post.png"
                                    avater="user.png"
                                    user="Victor Exrixon"
                                    time="12 hour ago"
                                    des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                                />
                                <Load />
                            </div>
                            <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
                                <Friends />
                                <Contacts />
                                <Group />
                                <Events />
                                <Profilephoto />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Popupchat />
            <Appfooter />
        </>
    );
}

export default NewsFeed;