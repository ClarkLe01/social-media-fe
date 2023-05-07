import api, { endPoints, publicApi } from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function usePostDetail(postId) {
    const queryClient = useQueryClient();
    const {
        data: PostDetail,
        isLoading: PostDetailLoading,
        error: PostDetailError,
    } = useQuery({
        queryKey: [ 'post/detail', postId ],
        queryFn: () => api(endPoints.post.retrieve, { pathParams: { postId: postId } }),
        enabled: !!postId,
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    const {
        data: CommentList,
        isLoading: CommentListLoading,
        error: CommentListError,
    } = useQuery({
        queryKey: [ 'post/comments', postId ],
        queryFn: () => api(endPoints.comment.list, { pathParams: { postId: postId } }),
        enabled: !!postId,
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    const {
        isLoading: updateCommentLoading,
        error: updateCommentError,
        mutate: updateComment,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.post.update, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'post/comments', postId ] });
        },
        onError: (error) => {      
            queryClient.invalidateQueries({ queryKey: [ 'post/comments', postId ] });
        },
    });

    const {
        isLoading: deleteCommentLoading,
        error: deleteCommentError,
        mutate: deleteComment,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.post.delete, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'post/comments', postId ] });
        },
        onError: (error) => {      
            queryClient.invalidateQueries({ queryKey: [ 'post/comments', postId ] });
        },
    });

    

    return {
        PostDetail,
        PostDetailError,
        PostDetailLoading,

        CommentList,
        CommentListError,
        CommentListLoading,

        updateComment,
        updateCommentError,
        updateCommentLoading,

        deleteComment,
        deleteCommentError,
        deleteCommentLoading,
    };
}

export default usePostDetail;
