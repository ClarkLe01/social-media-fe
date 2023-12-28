import React, { useState, useEffect } from 'react';
import Pagetitle from '@common/components/PageTitle';
import { Grid, Group, Text, ScrollArea } from '@mantine/core';
import { ReactComponent as DataArrangingLogo } from '@assets/svgs/Data-Arranging-Outline.svg';
import { useScrollLock } from '@mantine/hooks';
import { useFriend, useAuth } from '@services/controller';
import CardItem from './components/CardItem';

function FriendList() {
    useScrollLock(true);
    const { profile } = useAuth();
    const { friendList } = useFriend(profile.data.id);
    const [ memberList, setMemberList ] = useState([]);
    const [ inputSearch, setInputSearch ] = useState('');
    useEffect(() => {
        if (friendList) {
            setMemberList([ ...friendList.data ]);
        }
    }, [ friendList ]);

    return (
        <div>
            <Pagetitle title="Your Friends" inputSearch={inputSearch} setInputSearch={setInputSearch}/>
            {memberList.length == 0 ? (
                <Group
                    className="d-grid justify-content-center align-items-center"
                    position="center"
                >
                    <DataArrangingLogo />
                    <Text className="d-flex justify-content-center align-items-center">
                        No Results
                    </Text>
                </Group>
            ) : (
                <ScrollArea h={550} offsetScrollbars scrollbarSize={4}>
                    <Grid className="row ps-2 pe-2">
                        {memberList
                            .map((value) => { 
                                return (
                                    <Grid.Col key={value.id} xs={6} sm={6} md={4} xl={3}>
                                        <CardItem
                                            idFriendInstance={value.id}
                                            idProfile={value.id}
                                            type='friend'
                                            inputSearch={inputSearch}
                                        />
                                    </Grid.Col>
                                );
                            })}
                    </Grid>
                </ScrollArea>
            )}
        </div>
    );
}

export default FriendList;
