import React, { useState, useEffect } from 'react';
import Pagetitle from '@common/components/PageTitle';
import { Grid, Group, ScrollArea, Text, em } from '@mantine/core';
import { ReactComponent as DataArrangingLogo } from '@assets/svgs/Data-Arranging-Outline.svg';
import { useScrollLock } from '@mantine/hooks';
import { useFriend } from '@services/controller';
import CardItem from './components/CardItem';

function YourRequest() {
    useScrollLock(true);
    const { requestList } = useFriend();
    const [ memberList, setMemberList ] = useState([]);
    const [ inputSearch, setInputSearch ] = useState('');

    useEffect(() => {
        if (requestList) {
            setMemberList([ ...requestList.data ]);
        }
    }, [ requestList ]);

    return (
        <div>
            <Pagetitle title="Your Request" inputSearch={inputSearch} setInputSearch={setInputSearch}/>
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
                <ScrollArea h={em('80vh')} offsetScrollbars scrollbarSize={4} w={em('100%')}>
                    <Grid className="row ps-2 pe-2">
                        {memberList.map((value) => {
                            return (
                                <Grid.Col key={value.id} xs={6} sm={6} md={4} xl={3}>
                                    <CardItem
                                        idFriendInstance={value.id}
                                        idProfile={value.responseID}
                                        type='request'
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

export default YourRequest;
