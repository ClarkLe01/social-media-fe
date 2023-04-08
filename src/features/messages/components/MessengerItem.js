import React, { useState } from 'react';
import {
    Avatar,
    Group,
    Text,
    Indicator,
} from '@mantine/core';

function MessengerItem(props) {
    const [ isHovering, setIsHovering ] = useState(false);
    return (
        <div
            className="messenger d-flex mb-3 px-3"
            style={{ backgroundColor: isHovering ? '#dfe3ee' : '' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Group position="center" className="me-3">
                <Indicator dot inline offset={4} position="bottom-end" color="green" withBorder>
                    <Avatar size={45} radius="xl" src={props.messenger.avatar} />
                </Indicator>
            </Group>
            <div>
                <Text fw={500}>{props.messenger.name}</Text>
                <div className="d-flex">
                    <Text size="sm" lineClamp={1} c="dimmed">
                        {props.messenger.lastMessage}
                    </Text>
                    <Text className="d-inline ms-1" size="sm" c="dimmed">
                        {props.messenger.lastTime}
                    </Text>
                </div>
            </div>
        </div>
    );
}

export default MessengerItem;