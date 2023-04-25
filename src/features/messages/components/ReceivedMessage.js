import React from 'react';
import {
    Grid,
    Avatar,
    Text,
    Tooltip,
} from '@mantine/core';

function ReceivedMessage(props) {
    const { time, content, receiver, isShowAvatar } = props;
    return (
        <div className="d-flex pe-2 align-items-center">
            <div
                style={{
                    width: 40,
                }}
            >
                {isShowAvatar && (
                    <Tooltip position="top" label={receiver.last_name}>
                        <div className="message-user">
                            <Avatar size="md" radius="xl" src={receiver.avatar} />
                        </div>
                    </Tooltip>
                )}
            </div>

            <div className="message-item mb-1 ps-1 ms-1">
                <Grid className="align-items-center">
                    <Grid.Col
                        className="px-0"
                        span={12}
                        style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            maxWidth: '550px',
                        }}
                    >
                        <Tooltip position="top" label={time}>
                            <div className="message-wrap mx-2">
                                <Text
                                    style={{
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {content}
                                </Text>
                            </div>
                        </Tooltip>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
}

export default ReceivedMessage;