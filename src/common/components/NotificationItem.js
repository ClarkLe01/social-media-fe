import { 
    IconBellRinging, 
    IconBellCheck, 
    IconBellFilled, 
    IconUserPlus, 
    IconFriends, 
    IconBook, 
    IconMessageCircle, 
    IconArticle,
} from '@tabler/icons-react';
import { 
    ReactHaha, 
    ReactLike, 
    ReactLove,
    ReactSad,
    ReactWow,
    ReactAngry,
} from '@assets/images/reaction';
import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Text, Badge, Grid } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useProfile } from '@services/controller';
import { API_URL, MEDIA_URL } from '@constants';

function NotificationItem(props) {
    const { item } = props;
    const { profileId } = useProfile(item.senderID);
    const [ sender, setSender ] = useState(null);
    const [ timeDifference, setTimeDifference ] = useState(Math.floor((new Date() - new Date(item.created)) / 1000));
    const [ isHover, setIsHover ] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const givenDate = new Date(item.created);
            const currentDate = new Date();
            const difference = Math.floor((givenDate - currentDate) / 1000);
            setTimeDifference(Math.abs(difference));
        }, 1000);
        return () => clearInterval(intervalId);
    }, [ item ]);
    
    useEffect(() => {}, [ timeDifference ]);

    function formatDuration(durationInSeconds) {
        if (durationInSeconds < 60) return `a seccond ago`;
        else if (durationInSeconds < 60 * 60) {
            const minutes = Math.floor(durationInSeconds / 60);
            return `${minutes} min ago`;
        } else if (durationInSeconds < 60 * 60 * 24) {
            const hours = Math.floor(durationInSeconds / (60 * 60));
            return `${hours} hr ago`;
        } else if (durationInSeconds < 60 * 60 * 24 * 7) {
            const days = Math.floor(durationInSeconds / (60 * 60 * 24));
            return `${days} day ago`;
        } else if (durationInSeconds < 60 * 60 * 24 * 14) {
            const weeks = Math.floor(durationInSeconds / (60 * 60 * 24 * 7));
            return `${weeks} week ago`;
        } else {
            return 'More than 2 weeks ago';
        }
    }

    function getIconCorrespondingToType(type) {
        let value = type.split('-')[1];
        switch (value) {
                        case 'add':
                            return (
                                <div 
                                    className='justify-content-center align-items-center d-flex'
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        right: -4,
                                        borderRadius: '100%',
                                        width: 18,
                                        height: 18,
                                        background: '#12B886',
                                    }}
                                >
                                    <IconUserPlus color='white' size={14} />
                                </div>
                            );
                        case 'accept':
                            return (
                                <div 
                                    className='justify-content-center align-items-center d-flex'
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        right: -4,
                                        borderRadius: '100%',
                                        width: 18,
                                        height: 18,
                                        background: '#15AABF',
                                    }}
                                >
                                    <IconFriends color='white' size={14} />
                                </div>
                            );
                        case 'comment':
                            return (
                                <div 
                                    className='justify-content-center align-items-center d-flex'
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        right: -4,
                                        borderRadius: '100%',
                                        width: 18,
                                        height: 18,
                                        background: '#40C057',
                                    }}
                                >
                                    <IconMessageCircle color='white' size={14} />
                                </div>
                            );
                        case 'story':
                            return (
                                <div 
                                    className='justify-content-center align-items-center d-flex'
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        right: -4,
                                        borderRadius: '100%',
                                        width: 18,
                                        height: 18,
                                        background: '#BE4BDB',
                                    }}
                                >
                                    <IconBook color='white' size={14} />
                                </div>
                            );
                        case 'post':
                            return (
                                <div 
                                    className='justify-content-center align-items-center d-flex'
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        right: -4,
                                        borderRadius: '100%',
                                        width: 18,
                                        height: 18,
                                        background: '#3B5BDB',
                                    }}
                                >
                                    <IconArticle color='white' size={14} />
                                </div>
                            );
                        case 'like':
                            return (
                                <div 
                                    size="sm" 
                                    radius="xl" 
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: 0, 
                                        right: -4,
                                        width: 18,
                                        height: 18,
                                    }}
                                >
                                    <Avatar src={ReactLike} size={18}/>
                                </div>
                            );
                        case 'love':
                            return (
                                <div 
                                    size="sm" 
                                    radius="xl" 
                                    style={{ position: 'absolute', bottom: 0, right: -4 }}
                                >
                                    <Avatar src={ReactLove} size={18}/>
                                </div>
                            );
                        case 'haha':
                            return (
                                <div 
                                    size="sm" 
                                    radius="xl" 
                                    style={{ position: 'absolute', bottom: 0, right: -4 }}
                                >
                                    <Avatar src={ReactHaha} size={18}/>
                                </div>
                            );
                        case 'sad':
                            return (
                                <div 
                                    size="sm" 
                                    radius="xl" 
                                    style={{ position: 'absolute', bottom: 0, right: -4 }}
                                >
                                    <Avatar src={ReactSad} size={18}/>
                                </div>
                            );
                        case 'wow':
                            return (
                                <div 
                                    size="sm" 
                                    radius="xl" 
                                    style={{ position: 'absolute', bottom: 0, right: -4 }}
                                >
                                    <Avatar src={ReactWow} size={18}/>
                                </div>
                            );
                        case 'angry':
                            return (
                                <div 
                                    size="sm" 
                                    radius="xl" 
                                    style={{ position: 'absolute', bottom: 0, right: -4 }}
                                >
                                    <Avatar src={ReactAngry} size={18}/>
                                </div>
                            );
                        default:
                            return;
        }
    }

    useEffect(() => {
        if (profileId) {
            setSender(profileId.data);
        }
    }, [ profileId ]);
    return (

        <>
            {sender && (
                <Grid
                    gutter="xs" 
                    className='ps-3 py-2 border-bottom'
                    onClick={() => console.log(item)}
                    style={{
                        background: isHover && '#F5F5F5',
                    }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {/* <div 
                        className='d-flex align-items-center justify-content-center py-2'
                        onClick={() => console.log(item)}
                        style={{
                            background: isHover && '#F5F5F5',
                        }}
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                    >
                        
                        
                    </div> */}
                    <Grid.Col span={2}>
                        <div style={{ position: 'relative' }}>
                            <Avatar
                                src={MEDIA_URL+sender.avatar.replace(API_URL,'')}
                                radius={'100%'}
                                size={55}
                            />
                            {getIconCorrespondingToType(item.type)}
                        </div>
                    </Grid.Col>
                    <Grid.Col span={8} className='ps-3'>
                        <Text fz={12} c={item.read&&"dimmed"} fw={!item.read&&600} lineClamp={3}>
                            <Text fw={700} fz={13} className="d-inline">
                                {sender.first_name} {sender.last_name}
                            </Text>
                            {' '}
                            {item.content}
                        </Text>
                        <Text c={item.read?"dimmed":"blue"} size={11} className='d-block pt-1' fw={700}>
                            {timeDifference !== null && formatDuration(timeDifference)}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={1} className='ps-3'>
                        <Badge size={5}>
                            {item.read?(<IconBellCheck color='green' size={13}/>):(<IconBellRinging size={13}/>)}
                        </Badge>
                    </Grid.Col>
                </Grid>
            )}
        </>
    );
}

export default NotificationItem;