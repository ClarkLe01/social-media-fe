import { Text } from '@mantine/core';
import React from 'react';

const RoomNameDisplay = (props) => {
    const { members, currentUser, isGroup, roomName, ...others } = props;
    const filteredMembers = members.filter((member) => member.id !== currentUser.id);
    if (!isGroup) return (
        <Text {...others}>
            {filteredMembers[0].first_name + ' ' + filteredMembers[0].last_name}
        </Text>
    );
    if (roomName) return <Text {...others}>{roomName}</Text>;
    return (
        <Text {...others}>
            {filteredMembers.map((member, index) => {
                if (index === filteredMembers.length - 1) return member.last_name;
                else return member.last_name + ', ';
            })}
        </Text>
    );
};

export default RoomNameDisplay;
