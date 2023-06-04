import { Avatar } from '@mantine/core';
import React, { useEffect } from 'react';
import { API_URL, MEDIA_URL } from '@constants';

const AvatarDisplay = (props) => {
    const { members, currentUser, isGroup, size, avatar } = props;
    const filteredMembers = members.filter((member) => member.user.id !== currentUser.id).sort((a, b) => a.id - b.id);

    if (!isGroup){
        return (
            <div>
                <Avatar size={size} radius={'100%'} src={MEDIA_URL+filteredMembers[0].user.avatar.replace(API_URL,'')} />
            </div>
        );
    }
    if(avatar){
        return (
            <div>
                <Avatar size={size} radius={'100%'} src={MEDIA_URL+avatar.replace(API_URL,'')} />
            </div>
        );
    }
    return (
        <div
            style={{
                width: size,
                height: size,
                position: 'relative',
            }}
        >
            {filteredMembers.length < 1 && (
                <Avatar
                    size={size}
                    radius={'100%'}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                    src={MEDIA_URL+currentUser.avatar.replace(API_URL,'')}
                />
            )}
            {filteredMembers.length > 1 && (
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
                        src={MEDIA_URL+filteredMembers[0].user.avatar.replace(API_URL,'')}
                    />
                    <Avatar
                        size={size*2/3}
                        radius={'100%'}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}
                        src={MEDIA_URL+filteredMembers[1].user.avatar.replace(API_URL,'')}
                    />
                </Avatar.Group>
            )}
            {filteredMembers.length == 1 && (
                <Avatar
                    size={size}
                    radius={'100%'}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                    src={MEDIA_URL+filteredMembers[0].user.avatar.replace(API_URL,'')}
                />
            )}
            
        </div>
    );
};

export default AvatarDisplay;
