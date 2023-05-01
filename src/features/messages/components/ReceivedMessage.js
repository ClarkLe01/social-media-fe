import React from 'react';
import {
    Grid,
    Avatar,
    Text,
    Tooltip,
    Image,
    SimpleGrid,
} from '@mantine/core';
import ReactPlayer from 'react-player';
import { API_URL } from '@constants';

function ImageGridChat(props) {
    const { files } = props;
    if (files.length > 2) {
        return (
            <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
                {files.map((file, index) => {
                    return <React.Fragment key={index}>
                        {file.type == 'image' && <Image src={API_URL+file.instance.replace(API_URL,'')} height={"170px"} width={"170px"} radius={"sm"} />}
                    </React.Fragment>;
                })}
            </SimpleGrid>
        );
    }
    else {
        return (
            <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
                {files.map((file, index) => {
                    return <React.Fragment key={index}>
                        {file.type == 'image' && <Image src={API_URL+file.instance.replace(API_URL,'')} height={"260px"} width={"260px"} radius={"sm"} />}
                    </React.Fragment>;
                })}
            </SimpleGrid>
        );
    }

}

function ReceivedMessage(props) {
    const { time, content, files, receiver, isShowAvatar } = props;
    if (content.length > 0) {
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
                                <Avatar size="md" radius="xl" src={API_URL+receiver.avatar.replace(API_URL,'')} />
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
    if (files.length == 1) {
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
                                <Avatar size="md" radius="xl" src={API_URL+receiver.avatar.replace(API_URL,'')} />
                            </div>
                        </Tooltip>
                    )}
                </div>

                <div className="message-item mb-1 ps-1 ms-1">
                    <Tooltip
                        position="top"
                        label={time}
                    >
                        <div
                            className="align-items-center justify-content-start"
                            style={{
                                maxWidth: '540px',
                            }}
                        >
                            {files.map((file, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {file.type == 'image' && (
                                            <div
                                                className='pe-2'
                                                style={{
                                                    maxHeight: '400px',
                                                    maxWidth: "100%",

                                                }}
                                            >
                                                <Image
                                                    src={API_URL+file.instance.replace(API_URL,'')}
                                                    height={"250px"}
                                                    width={"100%"}
                                                    radius={"lg"}
                                                />
                                            </div>
                                        )}
                                        {file.type == 'video' && (
                                            <div className='pe-2'>
                                                <ReactPlayer
                                                    url={API_URL+file.instance.replace(API_URL,'')}
                                                    width={"100%"}
                                                    playing={false}
                                                    controls={true}
                                                />
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </Tooltip>
                </div>
            </div>
        );
    }
    if (files.length > 1) {
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
                                <Avatar size="md" radius="xl" src={API_URL+receiver.avatar.replace(API_URL,'')} />
                            </div>
                        </Tooltip>
                    )}
                </div>

                <div className="message-item mb-1 ps-1 ms-1">
                    <Tooltip
                        position="top"
                        label={time}
                        style={{
                            maxWidth: '550px',
                        }}
                    >
                        <div 
                            className="align-items-center justify-content-start"
                            style={{
                                maxWidth: '540px',
                            }}
                        >
                            <ImageGridChat files={files} />
                        </div>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

export default ReceivedMessage;