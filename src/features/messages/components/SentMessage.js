import React from 'react';
import {
    Grid,
    Image,
    SimpleGrid,
    Text,
    Tooltip,
} from '@mantine/core';
import ReactPlayer from 'react-player';
import { API_URL, MEDIA_URL } from '@constants';


function ImageGridChat(props) {
    const { files } = props;
    if (files.length > 2){
        return (
            <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
                {files.map((file, index) => {
                    return <React.Fragment key={index}>
                        {file.type == 'image' && <Image src={MEDIA_URL+file.instance.replace(API_URL,'')} height={"170px"} width={"170px"} radius={"sm"} />}
                    </React.Fragment>;
                })}
            </SimpleGrid>
        );
    }
    else{
        return (
            <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
                {files.map((file, index) => {
                    return <React.Fragment key={index}>
                        {file.type == 'image' && <Image src={MEDIA_URL+file.instance.replace(API_URL,'')} height={"260px"} width={"260px"} radius={"sm"} />}
                    </React.Fragment>;
                })}
            </SimpleGrid>
        );
    }
    
}


function SentMessage(props) {
    const { time, content, files } = props;
    if (content.length > 0) {
        return (
            <div className="message-item outgoing-message py-2 mb-1">
                <Grid className="align-items-center justify-content-end pe-2">
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
        );
    }
    if (files.length == 1) {
        return (
            <div className="message-item outgoing-message py-2 mb-1">
                <Tooltip position="top" label={time}>
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
                                                src={MEDIA_URL+file.instance.replace(API_URL,'')}
                                                height={"250px"}
                                                width={"100%"}
                                                radius={"lg"}
                                            />
                                        </div>
                                    )}
                                    {file.type == 'video' && (
                                        <div className='pe-2'>
                                            <ReactPlayer
                                                url={MEDIA_URL+file.instance.replace(API_URL,'')}
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
        );
    }

    if (files.length > 1) {
        return (
            <div className="message-item outgoing-message py-2 mb-1">
                <Tooltip position="top" label={time}>
                    <div
                        className="align-items-center justify-content-start pe-2"
                        style={{
                            maxWidth: '540px',
                        }}
                    >
                        <ImageGridChat files={files} />
                    </div>
                </Tooltip>
            </div>
        );
    }
}
export default SentMessage;