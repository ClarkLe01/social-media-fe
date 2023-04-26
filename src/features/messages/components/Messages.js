import React, { useState } from 'react';
import { Text } from '@mantine/core';
import { useAuth } from '@services/controller';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';

function Messages(props) {
    const { messages } = props;
    const { profile } = useAuth();

    return (
        <div className="chat-wrapper pt-0 w-100 position-relative">
            <div className="chat-body p-3 px-1">
                <div className="messages-content pb-0">
                    {messages.map((message, index) => {
                        const timeMessage = new Date(message.created);
                        let prevTimeMessage =
                            index == 0 ? timeMessage : new Date(messages[index - 1].time);
                        const now = new Date();
                        let timeRangewithPrev = (timeMessage - prevTimeMessage) / (1000 * 60);
                        let isShowAvatar =
                            index == messages.length - 1 || timeRangewithPrev <= 30
                                ? true
                                : message.senderID.id != messages[index + 1].senderID.id;
                        let compareTimeNow = (now - timeMessage) / (1000 * 60);
                        let timeString = timeMessage.toLocaleString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        });
                        if (compareTimeNow < 1440 * 7 && compareTimeNow >= 1440) {
                            timeString = timeMessage.toLocaleString('en-US', {
                                weekday: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            });
                        }
                        if (compareTimeNow < 1440) {
                            timeString = timeMessage.toLocaleString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            });
                        }
                        return (
                            <React.Fragment key={index}>
                                {(timeRangewithPrev >= 30 || index == 0) && (
                                    <div className="message-item grouping-message mx-auto mb-1 py-1">
                                        <Text size="sm" c="dimmed">
                                            {timeString}
                                        </Text>
                                    </div>
                                )}
                                {profile.data.id == message.senderID.id ? (
                                    <SentMessage content={message.content} files={message.files} time={timeString} />
                                ) : (
                                    <ReceivedMessage
                                        content={message.content}
                                        files={message.files}
                                        time={timeString}
                                        receiver={message.senderID}
                                        isShowAvatar={isShowAvatar}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}

                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
