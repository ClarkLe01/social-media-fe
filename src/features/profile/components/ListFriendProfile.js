import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { useParams } from "react-router-dom";
import { useAuth, useFriend, useProfile } from "@services/controller";
import { Grid, Group, ScrollArea, Text } from "@mantine/core";
import CardItem from "./CardItem";
function ListFriendProfile () {
    const { userId } = useParams();  // get param userId from url

    const { friendList } = useFriend(userId);
    const [ userMemberList, setUserMemberList ] = useState([]);

    useEffect(() => {
        if (friendList) {
            setUserMemberList([ ...friendList.data ]);
        }
    }, [ friendList ]);
    
    return <>
        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
            {userMemberList.length == 0 ? (
                <Group
                    className="d-grid justify-content-center align-items-center"
                    position="center"
                >
                    {/* <DataArrangingLogo /> */}
                    <Text className="d-flex justify-content-center align-items-center">
                        No Results
                    </Text>
                </Group>
            ) : (
                <ScrollArea h={550} offsetScrollbars scrollbarSize={4}>
                    <Grid className="row ps-2 pe-2">
                        {userMemberList.map((value) => {
                            
                            return (
                                <Grid.Col key={value.id} xs={12} sm={12} md={6} xl={6}>
                                    <CardItem
                                        idProfile={value.id}
                                    />
                                </Grid.Col> 
                            );
                        })}
                    </Grid>
                </ScrollArea>
            )}
        </div>
    </>;
}

export default ListFriendProfile;