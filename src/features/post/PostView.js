import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Grid, AspectRatio, ActionIcon, Image, Text, Button, Modal } from '@mantine/core';
import { usePostDetail, useUserPost } from '@services/controller';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { useQueryClient } from '@tanstack/react-query';
import PostCard from '@common/components/PostCard';


function PostView() {
    let { postId } = useParams();
    const queryClient = useQueryClient();
    const { PostDetail, PostDetailError, PostDetailLoading } = usePostDetail(postId);
    const { deletePost, deletePostError, deletePostLoading  } = useUserPost();
    const [ post, setPost ] = useState(null);
    const [ openedDeleteModal, setOpenedDeleteModal ] = useState(false);

    const handleDeletePost = () => {
        deletePost(
            {
                pathParams: { postId: postId },
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

    useEffect(() => {
        if (PostDetail && !PostDetailLoading) {
            setPost(PostDetail.data);
        }
    }, [ PostDetail, PostDetailLoading ]);

    return (
        <div
            className='mx-5'
        >
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
            {post && (
                <PostCard
                    id={post.id}
                    images={post.images}
                    avatar={post.owner.avatar}
                    owner={post.owner}
                    created={post.created}
                    content={post.content}
                    status={post.status}
                    interactions={post.interactions}
                    isDetail={true}
                />
            )}
        </div>
    );
}

export default PostView;
