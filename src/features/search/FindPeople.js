import React, { useEffect, useState, useCallback, useRef } from 'react';
import Pagetitle from '@common/components/PageTitle';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as DataArrangingLogo } from '@assets/svgs/Data-Arranging-Outline.svg';
import { Grid, Group, Text, ScrollArea, em } from '@mantine/core';
import { useAuth, useSearch } from '@services/controller';
import CardItem from '@features/friend/components/CardItem';
import { useVirtualizer } from '@tanstack/react-virtual';
import lodash, { throttle } from 'lodash';

function FindPeople() {
    const { profile } = useAuth();
    const [ queryParameters ] = useSearchParams();
    const { 
        statusSearchPeople,
        dataSearchPeople,
        dataSearchPeopleLoading,
        errorSearchPeople,
        isFetchingSearchPeople,
        isFetchingNextPageSearchPeople,
        isFetchingPreviousPageSearchPeople,
        fetchNextPageSearchPeople,
        fetchPreviousPageSearchPeople,
        hasNextPageSearchPeople,
        hasPreviousPageSearchPeople, 
    } = useSearch(queryParameters.get('search') || '');


    const [ inputSearch, setInputSearch ] = useState('');

    const [ listUser , setListUser ] = useState([]);
    const viewport = useRef(null);

    const onScrollPositionChange = (data) => {
        if(viewport.current.scrollHeight - data.y < 850 && !isFetchingSearchPeople && hasNextPageSearchPeople){
            fetchNextPageSearchPeople();
        }
    };


    useEffect(() => {
        if (!dataSearchPeopleLoading && dataSearchPeople) {
            setListUser(
                dataSearchPeople.pages.reduce((acc, cur) => {
                    acc.push(...cur.data);
                    return acc;
                }, []),
            );
        }
    }, [ dataSearchPeopleLoading, dataSearchPeople ]);

    const getListUser = useCallback((listUser, inputSearch) => {
        if(inputSearch){
            return listUser.filter(user => (user.first_name + " " + user.last_name).trim().toLowerCase().includes(inputSearch.toLowerCase())||user.email.trim().toLowerCase().includes(inputSearch.toLowerCase()));
        }
        return listUser;
    }, [ dataSearchPeople ]);

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
                <ScrollArea h={em('80vh')} offsetScrollbars scrollbarSize={4} w={em('100%')} viewportRef={viewport} onScrollPositionChange={onScrollPositionChange}>
                    <Grid className="row">
                        {getListUser(listUser, inputSearch).map((value) => {
                            return (
                                <Grid.Col key={value.id} span={12} className='px-0'>
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
