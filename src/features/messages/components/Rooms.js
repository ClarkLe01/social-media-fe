import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Avatar, Group, Text, Indicator, Grid } from '@mantine/core';
import { useAuth } from '@services/controller';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

function Room(props) {
    const { id, roomName, members, isGroup, latest_message } = props.room;
    const [ isHovering, setIsHovering ] = useState(false);
    const { profile, profileLoading } = useAuth();
    const { roomId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

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
            return `${diffSec} s`;
        } else if (diffMin === 1) {
            return '1 minute ago';
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

    const getOtherUsers = useCallback(
        (members, currentUser, isGroup) => {
            const filteredMembers = members.filter((member) => member.id !== currentUser.id);
            if (!isGroup) return filteredMembers[0].first_name + ' ' + filteredMembers[0].last_name;
            return filteredMembers.map((member, index) => {
                if (index === filteredMembers.length - 1) return member.last_name;
                else return member.last_name + ', ';
            });
        },
        [ members, currentUser ],
    );

    const getAvatarRoom = useCallback(
        (members, currentUser, isGroup) => {
            const filteredMembers = members.filter((member) => member.id !== currentUser.id);
            if (!isGroup) return filteredMembers[0].avatar;
            // return filteredMembers.map((member, index) => {
            //     if(index === filteredMembers.length - 1) return member.last_name;
            //     else return member.last_name+', ';
            // });
        },
        [ members, currentUser ],
    );

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
                <Indicator inline offset={4} position="bottom-end" color="green" withBorder>
                    <Avatar
                        size={45}
                        radius="xl"
                        src={getAvatarRoom(members, currentUser, isGroup)}
                    />
                </Indicator>
            </Group>
            <div>
                <Text fw={500} lineClamp={1}>
                    {getOtherUsers(members, currentUser, isGroup)}
                </Text>
                <Grid className="d-flex">
                    <Grid.Col span={'auto'}>
                        <Text size="sm" lineClamp={1} c="dimmed">
                            {latest_message.senderID.id == currentUser.id
                                ? 'You'
                                : latest_message.senderID.last_name}
                            :&nbsp;{latest_message.content}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={'content'}>
                        <Text className="d-inline" size="sm" c="dimmed">
                            {timeDiffToString(latest_message.created)}
                        </Text>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
}

function Rooms(props) {
    return (
        <>
            {props.rooms.length > 0 &&
                props.rooms.map((room, index) => <Room key={index} room={room} />)}
        </>
    );
}

export default Rooms;
