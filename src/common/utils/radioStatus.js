import React from 'react';
import {
    IconLock,
    IconWorld,
    IconFriends,
    IconUsers,
    IconUser,
} from '@tabler/icons-react';

export const CreateRadioButtons = (size) => {
    return [
        {
            value: 'public',
            label: 'Public',
            description: 'Anyone can see',
            icon: <IconWorld size={size}/>,
        },
        {
            value: 'friends',
            label: 'Friends',
            description: 'All your friends can see',
            icon: <IconFriends size={size}/>,
        },
        {
            value: 'friendExcepts',
            label: 'Friend Excepts',
            description: "Don't show to some friends",
            icon: <IconUsers size={size}/>,
        },
        {
            value: 'specificFriends',
            label: 'Specific Friends',
            description: 'Only show to some friends',
            icon: <IconUser size={size}/>,
        },
        {
            value: 'private',
            label: 'Only Me',
            description: 'Only owner can see',
            icon: <IconLock size={size}/>,
        },
    ];
};

export function getIconStatus(status) {
    const radioButtons = CreateRadioButtons(16);
    return radioButtons.find((item) => item.value === status);
}