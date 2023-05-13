import api, { endPoints, publicApi } from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function usePostDetail(postId) {
    const queryClient = useQueryClient();
    const {
        data: PostDetail,
        isLoading: PostDetailLoading,
        error: PostDetailError,
    } = useQuery({
        queryKey: [ `post/detail/${postId}` ],
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
        queryKey: [ `post/${postId}/comments` ],
        queryFn: () => api(endPoints.comment.list, { pathParams: { postId: postId } }),
        enabled: !!postId,
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    return {
        PostDetail,
        PostDetailError,
        PostDetailLoading,

        CommentList,
        CommentListError,
        CommentListLoading,
    };
}

export default usePostDetail;
