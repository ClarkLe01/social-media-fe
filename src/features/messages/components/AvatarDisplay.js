import { Avatar } from '@mantine/core';
import React from 'react';

const AvatarDisplay = (props) => {
    const { members, currentUser, isGroup, size } = props;
    const filteredMembers = members.filter((member) => member.id !== currentUser.id);
    if (!isGroup)
        return (
            <div>
                <Avatar size={size} radius={'100%'} src={filteredMembers[0].avatar} />
            </div>
        );
    return (
        <div
            style={{
                width: size,
                height: size,
                position: 'relative',
            }}
        >
            <Avatar.Group spacing={0}>
                <Avatar
                    size={size*2/3}
                    radius={'100%'}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                    src={filteredMembers[0].avatar}
                />
                <Avatar
                    size={size*2/3}
                    radius={'100%'}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                    src={filteredMembers[1].avatar}
                />
            </Avatar.Group>
        </div>
    );
};

export default AvatarDisplay;
