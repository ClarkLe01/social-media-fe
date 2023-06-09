import React, { useCallback, useEffect, useState } from 'react';
import Pagetitle from '@common/components/PageTitle';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ReactComponent as DataArrangingLogo } from '@assets/svgs/Data-Arranging-Outline.svg';
import { Grid, Group, Text, ScrollArea, Button, Menu } from '@mantine/core';
import { useAuth, useFriend, useProfile, useSearch } from '@services/controller';
import CardItem from '@features/friend/components/CardItem';
import { IconBrandMessenger, IconUserCheck, IconUserPlus } from '@tabler/icons-react';

function FindPeople() {
    const { profile } = useAuth();
    const { friendList, requestList, responseList, addFriend, acceptRequest, deleteFriend } = useFriend(profile.data.id);

    const [ groupButtonType, setGroupButtonType ] = useState(null);

    const [ queryParameters ] = useSearchParams();
    const { searchUserTest } = useSearch(queryParameters.get('search') || '');
    const [ inputSearch, setInputSearch ] = useState('');

    const [ listUser , setListUser ] = useState([]);

    useEffect(() => {
        if (searchUserTest) {
            setListUser( searchUserTest.data );
        }
    }, [ searchUserTest ]);



    return (
        <div>
            <Pagetitle title="People" inputSearch={inputSearch} setInputSearch={setInputSearch}/>
            {listUser.length == 0 ? (
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
                        {listUser.map((value) => {
                            return (
                                <Grid.Col key={value.id} xs={6} sm={6} md={4} xl={3}>
                                    <CardItem
                                        idProfile={value.id}
                                        type='no'
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

export default FindPeople;
