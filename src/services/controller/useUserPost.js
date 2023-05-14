import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useUserPost(userId) {
    const queryClient = useQueryClient();

    const {
        data: UserPostList,
        isLoading: UserPostListLoading,
        error: UserPostListError,
    } = useQuery({
        queryKey: [ `posts/user` ],
        queryFn: () => api(endPoints.post.userPosts, { pathParams: { userId: userId } }),
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
        enabled: !!userId,
    });

    const {
        isLoading: createPostLoading,
        error: createPostError,
        mutate: createPost,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.post.new, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
            queryClient.invalidateQueries({ queryKey: [ `post/list` ] });
        },
        onError: (error) => {     
            queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
            queryClient.invalidateQueries({ queryKey: [ `post/list` ] });
        },
    });

    const {
        isLoading: updatePostLoading,
        error: updatePostError,
        mutate: updatePost,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.post.update, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
            queryClient.invalidateQueries({ queryKey: [ `post/list` ] });
        },
        onError: (error) => {      
            queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
            queryClient.invalidateQueries({ queryKey: [ `post/list` ] });
        },
    });

    const {
        isLoading: deletePostLoading,
        error: deletePostError,
        mutate: deletePost,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.post.delete, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
            queryClient.invalidateQueries({ queryKey: [ `post/list` ] });
        },
        onError: (error) => {      
            queryClient.invalidateQueries({ queryKey: [ `posts/user` ] });
            queryClient.invalidateQueries({ queryKey: [ `post/list` ] });
        },
    });

    return {
        UserPostList,
        UserPostListLoading,
        UserPostListError,

        createPostLoading,
        createPostError,
        createPost,

        updatePost,
        updatePostError,
        updatePostLoading,

        deletePost,
        deletePostError,
        deletePostLoading,
    };
}

export default useUserPost;
