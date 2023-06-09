import React, { useState } from 'react';
import {
    IconEdit,
    IconTrash,
    IconLock,
} from '@tabler/icons-react';
import { Modal, Button, Group, Menu, Text } from '@mantine/core';
import { usePostGeneral, useUserPost } from '@services/controller';
import { useQueryClient } from '@tanstack/react-query';
import UpdatePost from './UpdatePost';
function PostMenuTool(props) {
    const { id, user, status, images, content } = props;
    const queryClient = useQueryClient();
    const { deletePost, deletePostError, deletePostLoading  } = useUserPost();
    const [ openedDeleteModal, setOpenedDeleteModal ] = useState(false);
    const [ openedEditPost, setOpenedEditPost ] = useState(false);
    const handleDeletePost = () => {
        deletePost(
            {
                pathParams: { postId: id },
            },
            {
                onSuccess: (data) => {
                    queryClient.invalidateQueries({ queryKey: [ 'posts/user' ] });
                    queryClient.invalidateQueries({ queryKey: [ 'post/list' ] });
                    setOpenedDeleteModal(false);
                },
                onError: (error) => {
                    queryClient.invalidateQueries({ queryKey: [ 'posts/user' ] });
                    queryClient.invalidateQueries({ queryKey: [ 'post/list' ] });
                    setOpenedDeleteModal(false);
                },
            },
        );
    };



    return (
        <>
            <Menu position="left-start" withArrow arrowPosition="center" key={id}>
                <Menu.Target>
                    <div className='ms-auto pointer'>
                        <i className="ti-more-alt text-grey-900 font-xss btn-round-md bg-greylight" />
                    </div>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item 
                        icon={<IconEdit size={24} />}
                        onClick={() => setOpenedEditPost(!openedEditPost)}
                    >
                        Edit post
                    </Menu.Item>
                    <Menu.Item 
                        icon={<IconLock size={24} />}
                        // onClick={() => console.log(`edit post ${id}`)}
                    >
                        Edit audience
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item 
                        color="red" 
                        icon={<IconTrash size={24} />}
                        onClick={() => setOpenedDeleteModal(true)}
                    >
                        Delete post
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Modal
                opened={openedDeleteModal}
                onClose={() => setOpenedDeleteModal(false)}
                title="Delete Post"
                centered
            >
                <Text size="sm">
                    Are you sure you want to delete this post? 
                    This action is destructive and you will have to contact support to restore your data.
                </Text>
                <div className='d-flex justify-content-end pe-2'>
                    <Button
                        variant="outline" color="dark"
                        classNames={{
                            root: 'me-2',
                        }}
                        onClick={() => setOpenedDeleteModal(false)}
                    >
                        <Text>
                            No dont delete it
                        </Text>
                    </Button>
                    <Button 
                        color="red"
                        onClick={handleDeletePost}
                    >
                        <Text>
                            Delete post
                        </Text>
                    </Button>
                </div>
            </Modal>
            {openedEditPost && 
            <UpdatePost 
                user={user} 
                defaultAudience={status} 
                id={id} 
                setOpenedEditPost={setOpenedEditPost}
                contentPost={content}
                images={images}
            />}
        </>
    );
}

export default PostMenuTool;
