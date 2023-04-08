import React from 'react';
import Pagetitle from '@common/components/PageTitle';
import { Button, Card, Grid, Group, Image, Text, ScrollArea } from '@mantine/core';
import { ReactComponent as DataArrangingLogo } from '@assets/svgs/Data-Arranging-Outline.svg';
import { useScrollLock } from '@mantine/hooks';
const memberList = [];

function FriendRequest() {
    useScrollLock(true);
    return (
        <div>
            <Pagetitle title="Friend Request" />
            {memberList.length === 0 ? (
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
                        {memberList.map((value, index) => (
                            <Grid.Col key={index} xs={6} sm={6} md={4} xl={3}>
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Card.Section>
                                        <Image
                                            src={`assets/images/${value.imageUrl}`}
                                            height={160}
                                            alt="Norway"
                                        />
                                    </Card.Section>

                                    <Group position="apart" mt="xs">
                                        <Text weight={500}>{value.name}</Text>
                                    </Group>
                                    <Group position="apart" mt={1} mb={6}>
                                        <Text size="sm" color="dimmed">
                                            18 mutual friends
                                        </Text>
                                    </Group>
                                    <div className="d-grid gap-2 mx-auto">
                                        <Button>Confirm</Button>
                                        <Button color="gray">Cancel</Button>
                                    </div>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                </ScrollArea>
            )}
        </div>
    );
}

export default FriendRequest;
