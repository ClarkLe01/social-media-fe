import React, { useEffect, useState } from 'react';
import { IconX, IconSearch } from '@tabler/icons-react';
import {
    Group,
    Avatar,
    Text,
    Button,
    ActionIcon,
    Input,
    Container,
    ScrollArea,
    Checkbox,
    Badge,
} from '@mantine/core';

function MemberBadge(props) {
    const checkedMember = props.data.find((o) => o.user === props.value);
    const handleClick = () => {
        props.onClick(props.index);
    };
    return (
        <Badge
            variant="outline"
            color="cyan"
            radius="sm"
            size="xl"
            classNames={{
                root: 'mx-1 mb-1 p-0 px-2',
            }}
            leftSection={
                <Avatar src={`assets/images/${checkedMember.imageUrl}`} size={22} radius="xl">
                    BH
                </Avatar>
            }
            rightSection={
                <ActionIcon
                    variant="transparent"
                    radius="xl"
                    size="xs"
                    color="cyan"
                    onClick={handleClick}
                >
                    <IconX size={12} />
                </ActionIcon>
            }
        >
            <Text size={10} color="dark">
                {checkedMember.name}
            </Text>
        </Badge>
    );
}

function MultiMemberSelector(props) {

    const valueChecked = props.selectedFriend;
    const setValueChecked = props.onDataSelect;

    function handleCheckBox(value) {
        setValueChecked(value);
    }
    function handleMemberBadgeClick(index) {
        const updatedItems = [ ...valueChecked ];
        updatedItems.splice(index, 1);
        setValueChecked(updatedItems);
    }

    return (
        <Container size="xs" px="xs">
            <div className="input-search">
                <Input
                    icon={<IconSearch size={13} />}
                    placehodler="Search for a friend or list…"
                    size="xs"
                    radius="xl"
                    className="mb-3 mt-0 py-0"
                />
            </div>
            <ScrollArea style={{ height: 270 }}>
                <Checkbox.Group
                    label="Friends"
                    value={valueChecked}
                    onChange={handleCheckBox}
                    orientation="vertical"
                >
                    <Group className="">
                        {props.data.map((member, id) => (
                            <Button
                                key={id}
                                fullWidth
                                size="xl"
                                leftIcon={
                                    <Avatar
                                        src={`assets/images/${member.imageUrl}`}
                                        alt="it's me"
                                        radius="xl"
                                    />
                                }
                                variant="outline"
                                classNames={{
                                    inner: 'justify-content-start',
                                    root: 'px-0 ps-1',
                                    label: 'flex-fill',
                                }}
                            >
                                <Checkbox
                                    value={member.user}
                                    label={member.name}
                                    labelPosition="left"
                                    color={props.color}
                                    radius={props.radius}
                                    indeterminate={props.isIndeterminate}
                                    classNames={{
                                        inner: 'mt-2',
                                        root: 'flex-fill',
                                        body: 'flex-fill pe-3 align-items-center',
                                        labelWrapper: 'me-auto',
                                    }}
                                />
                            </Button>
                        ))}
                    </Group>
                </Checkbox.Group>
            </ScrollArea>
            {valueChecked.length > 0 && (
                <div className="pt-2 mt-4 border border-2">
                    {valueChecked.map((value, id) => (
                        <MemberBadge
                            value={value}
                            key={id}
                            onClick={handleMemberBadgeClick}
                            data={props.data}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
}

export default MultiMemberSelector;
