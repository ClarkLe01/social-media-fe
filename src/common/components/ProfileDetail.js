import { useAuth, useProfile } from '@services/controller';
import { IconCake, IconGenderTransgender } from '@tabler/icons-react';
import React from 'react';
import { useParams } from 'react-router-dom';

function ProfileDetail(props) {
    const { user } = props;  // get param userId from url
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            {/* <div className="card-body d-block p-4">
                <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
                <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">
                    Chào muồn bạn đến với trang cá nhân
                </p>
            </div> */}
            <div className="card-body d-flex pt-4">
                <i className="feather-eye text-grey-500 me-3 font-lg"></i>
                <h4 className="fw-700 text-grey-900 font-xssss mt-0">
                    Visble{' '}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        Anyone can find you
                    </span>
                </h4>
            </div>
            <div className="card-body d-flex pt-0">
                <IconGenderTransgender className=" text-grey-500 me-3 font-lg"/>
                <h4 className="fw-700 text-grey-900 font-xssss mt-0">
                    Gender{' '}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        {user.gender}
                    </span>
                </h4>
            </div>
            <div className="card-body d-flex pt-0">
                <IconCake className=" text-grey-500 me-3 font-lg"/>
                <h4 className="fw-700 text-grey-900 font-xssss mt-0">
                    Birthday{' '}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        {user.birthday}
                    </span>
                </h4>
            </div>
        </div>
    );
}

export default ProfileDetail;
