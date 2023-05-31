import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { useParams } from "react-router-dom";
import { useAuth, useFriend, useProfile } from "@services/controller";
import { Grid, Group, ScrollArea, Text } from "@mantine/core";
import CardItem from "./CardItem";
function ListFriendProfile () {
    const { userId } = useParams();  // get param userId from url
    const { profileId } = useProfile(userId); // profile of user by params userId
    const { profile } = useAuth(); // current user
    const [ user, setUser ] = useState(null);

    // const { friendList } = useFriend(profile.data.id);
    // const [ memberList, setMemberList ] = useState([]);

    const { userFriendList } = useFriend(userId);
    const [ userMemberList, setUserMemberList ] = useState([]);

    // useEffect(() => {
    //     if (friendList) {
    //         setMemberList([ ...friendList.data ]);
    //     }
        
    // }, [ friendList ]);

    useEffect(() => {
        if (userFriendList) {
            setUserMemberList([ ...userFriendList.data ]);
        }
    }, [ userFriendList ]);
    
    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
        }
    }, [ profileId ]);
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
                                        idFriendInstance={value.id}
                                        idProfile={value.requestID == userId ? value.responseID : value.requestID}
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