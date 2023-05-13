import api, { endPoints, publicApi } from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function usePostComment(commentId) {
    const queryClient = useQueryClient();

    const {
        data: commentInstance,
        isLoading: commentInstanceLoading,
        error: commentInstanceError,
    } = useQuery({
        queryKey: [ `comment/${commentId}` ],
        queryFn: () => api(endPoints.comment.retrieve, { pathParams: { commentId: commentId } }),
        enabled: !!commentId,
        retryOnMount: false,
        staleTime: 1000,
    });

    const {
        isLoading: createCommentLoading,
        error: createCommentError,
        mutate: createComment,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.comment.new, variables);
        },
    });

    const {
        isLoading: updateCommentLoading,
        error: updateCommentError,
        mutate: updateComment,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.comment.update, variables);
        },
    });

    const {
        isLoading: deleteCommentLoading,
        error: deleteCommentError,
        mutate: deleteComment,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.comment.delete, variables);
        },
    });

    

    return {
        commentInstance,
        commentInstanceError,
        commentInstanceLoading,
        
        createComment,
        createCommentError,
        createCommentLoading,

        updateComment,
        updateCommentError,
        updateCommentLoading,

        deleteComment,
        deleteCommentError,
        deleteCommentLoading,
    };
}

export default usePostComment;
