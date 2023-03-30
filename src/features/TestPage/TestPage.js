import React, { useState, useRef } from 'react';
import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    Button,
    ActionIcon,
    Input,
    Container,
    ScrollArea,
    Checkbox,
    Badge,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { IconMoodSmileFilled } from '@tabler/icons-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const memberList = [
    {
        imageUrl: 'user.png',
        name: 'Victor Exrixon ',
        user: '@macale1',
    },
    {
        imageUrl: 'user.png',
        name: 'Surfiya Zakir ',
        user: '@macale2',
    },
    {
        imageUrl: 'user.png',
        name: 'Goria Coast ',
        user: '@macale3',
    },
    {
        imageUrl: 'user.png',
        name: 'Hurin Seary ',
        user: '@macale4',
    },
    {
        imageUrl: 'user.png',
        name: 'Aliqa Macale',
        user: '@macale12',
    },
];

function TestPage() {
    const [ isShow, setIsShow ] = useState(false);
    const [ selectedEmoji, setSelectedEmoji ] = useState('');
    const ref = useClickOutside(() => {
        setIsShow(false), console.log('Click out side');
    });
    function handleEmojiSelected(emojiData, event) {
        setSelectedEmoji(emojiData.unified);
    }
    return (
        <React.Fragment>
            <div>
                <ActionIcon onClick={() => setIsShow(!isShow)}>
                    <IconMoodSmileFilled className="m-0" />
                </ActionIcon>

                {/* <h2>Emoji Picker React 4 Demo</h2>
            <div className="show-emoji">
                Your selected Emoji is:
                {selectedEmoji && (
                    <Emoji unified={selectedEmoji} emojiStyle={EmojiStyle.APPLE} size={22} />
                )}
            </div> */}
            </div>
            {isShow && (
                <div className="d-inline-block" ref={ref}>
                    <Picker data={data} onEmojiSelect={console.log} />
                </div>
            )}
        </React.Fragment>
    );
}
export default TestPage;
