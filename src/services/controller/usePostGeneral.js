import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function usePostGeneral() {
    const queryClient = useQueryClient();

    const {
        data: PostList,
        isLoading: PostListLoading,
        error: PostListError,
    } = useQuery({
        queryKey: [ 'post/list' ],
        queryFn: () => api(endPoints.post.list),
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    const {
        data: MyPostList,
        isLoading: MyPostListLoading,
        error: MyPostListError,
    } = useQuery({
        queryKey: [ 'posts/me' ],
        queryFn: () => api(endPoints.post.me),
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
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
            queryClient.invalidateQueries({ queryKey: [ 'posts/me' ] });
        },
        onError: (error) => {     
            queryClient.invalidateQueries({ queryKey: [ 'posts/me' ] });
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
            queryClient.invalidateQueries({ queryKey: [ 'posts/me' ] });
        },
        onError: (error) => {      
            queryClient.invalidateQueries({ queryKey: [ 'posts/me' ] });
        },
    });

    const {
        isLoading: deletePostLoading,
        error: deletePostError,
        mutate: deletePost,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.post.delete);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'posts/me' ] });
        },
        onError: (error) => {      
            queryClient.invalidateQueries({ queryKey: [ 'posts/me' ] });
        },
    });

    return {
        PostList,
        PostListLoading,
        PostListError,

        MyPostList,
        MyPostListLoading,
        MyPostListError,

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

export default usePostGeneral;
