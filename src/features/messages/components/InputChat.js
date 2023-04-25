import React from 'react';
import { ActionIcon, Input, Popover, Textarea } from '@mantine/core';
import { IconGif, IconMicrophone, IconMoodSmileFilled, IconPhoto, IconSend, IconSticker } from '@tabler/icons-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function InputChat(props) {
    return (
        <div
            className="main-chat-tool algin-items-center justify-content-center"
            style={{
                position: 'absolute',
                top: 'calc(100vh - 11vh)',
                display: 'block',
                width: '70vw',
            }}
        >
            <div className="d-flex bd-highlight mb-3 mt-3">
                <div className="p-2 bd-highlight align-self-end">
                    <ActionIcon color="blue" variant="subtle">
                        <IconMicrophone />
                    </ActionIcon>
                </div>
                <div className="p-2 bd-highlight align-self-end">
                    <ActionIcon color="blue" variant="subtle" onClick={() => props.current()}>
                        <IconPhoto />
                    </ActionIcon>
                </div>
                <div className="p-2 bd-highlight align-self-end">
                    <ActionIcon color="blue" variant="subtle">
                        <IconSticker />
                    </ActionIcon>
                </div>
                <div className="p-2 bd-highlight align-self-end">
                    <ActionIcon color="blue" variant="subtle">
                        <IconGif />
                    </ActionIcon>
                </div>
                <div className="p-2 bd-highlight align-self-end ms-auto flex-fill">
                    <Textarea
                        classNames={{
                            input: 'ps-3 pe-5 align-self-start',
                        }}
                        autosize
                        minRows={1}
                        maxRows={3}
                        rows={1}
                        variant="filled"
                        radius="xl"
                        size={14}
                        rightSection={
                            <Popover
                                position="top-start"
                                shadow="md"
                                classNames={{
                                    dropdown: 'p-0',
                                }}
                            >
                                <Popover.Target>
                                    <ActionIcon className="me-5" radius="xl">
                                        <IconMoodSmileFilled />
                                    </ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown className="me-4">
                                    <div>
                                        <Picker
                                            data={data}
                                            onEmojiSelect={(e) =>
                                                props.setValueInput(props.valueInput + e.native)
                                            }
                                        />
                                    </div>
                                </Popover.Dropdown>
                            </Popover>
                        }
                        value={props.valueInput}
                        onChange={(e) => {
                            props.setValueInput(e.currentTarget.value);
                        }}
                    />
                </div>
                <div className="p-2 bd-highlight align-self-end">
                    <ActionIcon
                        color="blue"
                        variant="subtle" // onClick={handleSendingMessage}
                    >
                        <IconSend />
                    </ActionIcon>
                </div>
            </div>
        </div>
    );
}

export default InputChat;
