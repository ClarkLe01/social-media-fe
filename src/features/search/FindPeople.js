import React, { useEffect, useState, useCallback } from 'react';
import Pagetitle from '@common/components/PageTitle';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as DataArrangingLogo } from '@assets/svgs/Data-Arranging-Outline.svg';
import { Grid, Group, Text, ScrollArea } from '@mantine/core';
import { useAuth, useSearch } from '@services/controller';
import CardItem from '@features/friend/components/CardItem';

function FindPeople() {
    const { profile } = useAuth();
    const [ queryParameters ] = useSearchParams();
    const { searchUserTest } = useSearch(queryParameters.get('search') || '');
    const [ inputSearch, setInputSearch ] = useState('');

    const [ listUser , setListUser ] = useState([]);

    useEffect(() => {
        if (searchUserTest) {
            setListUser( searchUserTest.data );
        }
    }, [ searchUserTest ]);

    const getListUser = useCallback((listUser, inputSearch) => {
        if(inputSearch){
            return listUser.filter(user => (user.first_name + " " + user.last_name).trim().toLowerCase().includes(inputSearch.toLowerCase())||user.email.trim().toLowerCase().includes(inputSearch.toLowerCase()));
        }
        return listUser;
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
                        {getListUser(listUser, inputSearch).map((value) => {
                            return (
                                <Grid.Col key={value.id} xs={6} sm={6} md={4} xl={3}>
                                    <CardItem
                                        idProfile={value.id}
                                        type='no'
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
