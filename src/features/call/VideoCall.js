import { BackgroundImage, Box, Center, Text } from '@mantine/core';
import { useAuth } from '@services/controller';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const VideoCall = (props) => {
    const { profile } = useAuth();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const { roomCallId } = useParams();

    return (
        <div>
            {/* {profile.data.first_name} {profile.data.last_name}
            {searchParams}
            {roomCallId} */}
            <Box sx={{ maxWidth: 300 }} mx="auto">
                <BackgroundImage
                    src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                    radius="sm"
                >
                    <Center p="md">
                        <Text color="#fff">
                            BackgroundImage component can be used to add any content on image. It is
                            useful for hero headers and other similar sections
                        </Text>
                    </Center>
                </BackgroundImage>
            </Box>
        </div>
    );
};

export default VideoCall;
