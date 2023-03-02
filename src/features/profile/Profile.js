import React from 'react';
import Storyslider from '@common/components/StorySlider';

function Profile() {
    return (
        <div className="d-flex align-items-center justify-content-start">
            <div className="col-12 col-xl-10 col-lg-9 col-md-12 px-3">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <Storyslider />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
