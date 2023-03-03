import React from 'react';
import ProfileCard from '@common/components/ProfileCard';
import ProfileDetail from '@common/components/ProfileDetail';
import ProfilePhoto from '@common/components/ProfilePhoto';
import CreatePost from '@common/components/CreatePost';
import PostView from '@common/components/Postview';
import Load from '@common/components/Load';

function Profile() {
    return (
        <div className="main-content p-0">
            <div className="middle-sidebar-bottom mx-2">
                <div className="middle-sidebar-left pe-0">
                    <div className="row">
                        <div className="col-xxl-12 col-xl-12 col-lg-9 col-md-12">
                            <ProfileCard />
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-9 col-md-12 py-3">
                            <ProfileDetail />
                            <ProfilePhoto />
                        </div>
                        <div className="col-xxl-8 col-xl-8 col-lg-9 py-3">
                            <CreatePost />
                            <PostView
                                id="32"
                                postvideo=""
                                postimage="post.png"
                                avater="user.png"
                                user="Surfiya Zakir"
                                time="22 min ago"
                                des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                            />
                            <PostView
                                id="31"
                                postvideo=""
                                postimage="post.png"
                                avater="user.png"
                                user="David Goria"
                                time="22 min ago"
                                des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                            />
                            <PostView
                                id="33"
                                postvideo=""
                                postimage="post.png"
                                avater="user.png"
                                user="Anthony Daugloi"
                                time="2 hour ago"
                                des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus."
                            />
                            <Load />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
