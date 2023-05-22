import { useAuth, useMessage, useProfile } from "@services/controller";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { API_URL } from '@constants';
import { ActionIcon, Avatar } from "@mantine/core";

function RightChatItem(props) {
    const location = useLocation();
    const { idFriendInstance, idProfile, type } = props;
    const { profile } = useAuth(); // current user


    const { profileId } = useProfile(idProfile);
    const [ user, setUser ] = useState(null);
    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
        }
    }, [ profileId ]);

    return (
        user && (
            <NavLink to="/message">
                <li
                    key={idFriendInstance}
                    className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center"
                >
                    <figure className="avatar float-left mb-0 me-2">
                        <Avatar src={API_URL+user.avatar.replace(API_URL, '')} radius="xl" size={35}/>
                    </figure>
                    <h3 className="fw-700 mb-0 mt-0">
                        <span
                            className="font-xssss text-grey-600 d-block text-dark model-popup-chat pointer"
                            // onClick={toggleOpen}
                        >
                            {user.first_name + ' ' +user.last_name}
                        </span>
                    </h3>
                    <span
                        className={(user.online?'bg-success ms-auto btn-round-xss':'bg-dark ms-auto btn-round-xss')}
                    ></span>
                </li>
            </NavLink>
        )
    );
}
export default RightChatItem;