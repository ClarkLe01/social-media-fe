import { useAuth, useProfile } from '@services/controller';
import { IconCake, IconGenderTransgender } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ProfileDetail(props) {
    const { user } = props;  // get param userId from url
    const birthday = new Date(user.birthday);

    const dateString = birthday.getFullYear() + "-" +
        ("0" + (birthday.getMonth() + 1)).slice(-2) + "-" +
        ("0" + birthday.getDate()).slice(-2);
    console.log(dateString);
    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
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
                        {dateString}
                    </span>
                </h4>
            </div>
        </div>
    );
}

export default ProfileDetail;
