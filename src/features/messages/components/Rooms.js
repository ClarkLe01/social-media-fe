import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Avatar, Group, Text, Indicator, Grid } from '@mantine/core';
import { useAuth } from '@services/controller';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AvatarDisplay from './AvatarDisplay';
import RoomNameDisplay from './RoomNameDisplay';
import { API_URL } from '@constants';
import { useQueryClient } from '@tanstack/react-query';

function Room(props) {
    const { id, roomName, members, isGroup, latest_message, updated, roomAvatar } = props.room;
    const [ isHovering, setIsHovering ] = useState(false);
    const { profile, profileLoading } = useAuth();
    const { roomId } = useParams();
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    function timeDiffToString(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHr / 24);
        const diffWeek = Math.floor(diffDay / 7);
        const diffYear = now.getUTCFullYear() - date.getUTCFullYear();

        if (diffSec < 60) {
            return `1 m`;
        } else if (diffMin < 60) {
            return `${diffMin} m`;
        } else if (diffHr < 24) {
            return `${diffHr} h`;
        } else if (diffDay < 7) {
            return `${diffDay} d`;
        } else if (diffWeek < 52) {
            return `${diffWeek} w`;
        } else {
            return `${diffYear} y`;
        }
    }

    

    const currentUser = useMemo(() => profile.data, [ profile.data ]);

    const handleClickRoom = useCallback(() => {
        navigate(`/message/${id}`, { state: { from: undefined } });
    }, [ id, currentUser ]);

    return (
        <div
            className="messenger d-flex py-2 px-3"
            style={{
                backgroundColor: isHovering ? '#dfe3ee' : roomId == id && '#F8EDE3',
                textDecoration: 'none',
            }}
            to={`../${id}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleClickRoom}
        >
            <Group position="center" className="me-3">
                <AvatarDisplay 
                    size={48}
                    members={members}
                    currentUser={currentUser}
                    isGroup={isGroup}
                    avatar={roomAvatar}
                />
            </Group>
            <div>
                <RoomNameDisplay 
                    members={members}
                    currentUser={currentUser}
                    isGroup={isGroup}
                    roomName={roomName}
                    fw={500} 
                    lineClamp={1}
                />
                <Grid className="d-flex">
                    <Grid.Col span={'auto'}>
                        {latest_message ? (
                            <Text size="sm" lineClamp={1} c="dimmed">
                                {latest_message.senderID.id == currentUser.id
                                    ? 'You'
                                    : latest_message.senderID.last_name}
                                :&nbsp;{latest_message.content}
                            </Text>
                        ) : (
                            <Text size="sm" lineClamp={1} c="dimmed">
                                You are friend now
                            </Text>
                        )}
                    </Grid.Col>
                    <Grid.Col span={'content'}>
                        {latest_message ? (
                            <Text className="d-inline" size="sm" c="dimmed">
                                {timeDiffToString(latest_message.created)}
                            </Text>
                        ): (
                            <Text className="d-inline" size="sm" c="dimmed">
                                {timeDiffToString(updated)}
                            </Text>
                        )}
                        
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
}

function Rooms(props) {
    const inputSearch = props.inputSearch?props.inputSearch.trim().toLowerCase():'';
    return (
        <>
            {props.rooms.length > 0 &&
                props.rooms
                    .filter(room => room.members.some(member => (member.user.first_name.toLowerCase() + " " + member.user.last_name.toLowerCase()).includes(inputSearch)) || 
                                    (room.roomName && room.roomName.includes(inputSearch)))
                    .map((room, index) => <Room key={index} room={room}/>)}
        </>
    );
}

export default Rooms;
