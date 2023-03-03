import { Menu } from '@mantine/core';
import React from 'react';
import {
    IconPin,
    IconEdit,
    IconBookmark,
    IconTrash,
    IconLock,
} from '@tabler/icons-react';

function PostMenuTool(props) {
    const { id } = props;
    return (
        <Menu position="left-start" withArrow arrowPosition="center" key={id}>
            <Menu.Target>
                <div className='ms-auto pointer'>
                    <i className="ti-more-alt text-grey-900 font-xss btn-round-md bg-greylight" />
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item icon={<IconPin size={24} />}>Pin post</Menu.Item>
                <Menu.Item icon={<IconBookmark size={24} />}>Save link</Menu.Item>
                <Menu.Item icon={<IconEdit size={24} />}>Edit post</Menu.Item>
                <Menu.Item icon={<IconLock size={24} />}>Edit audience</Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item color="red" icon={<IconTrash size={24} />}>
                    Delete post
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default PostMenuTool;
