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

    return {
        PostList,
        PostListLoading,
        PostListError,
    };
}

export default usePostGeneral;
