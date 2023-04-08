import React from 'react';
import {
    Grid,
    Text,
    Tooltip,
} from '@mantine/core';

function SentMessage(props) {
    const { time, content } = props;
    return (
        <div className="message-item outgoing-message py-2 mb-1">
            <Grid className="align-items-center justify-content-end">
                <Grid.Col
                    className="p-0"
                    span={12}
                    style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        maxWidth: '550px',
                    }}
                >
                    <Tooltip position="top" label={time}>
                        <div className="message-wrap mx-2">
                            <Text>{content}</Text>
                        </div>
                    </Tooltip>
                </Grid.Col>
            </Grid>
        </div>
    );
}
export default SentMessage;