import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

function usePostGeneral() {
    const queryClient = useQueryClient();

    const {
        data: PostList,
        isLoading: PostListLoading,
        error: PostListError,
        fetchNextPage: fetchNextPostList,
        hasNextPage: hasNextPostList,
        isFetching: isFetchingPostList,
    } = useInfiniteQuery({
        queryKey: [ 'post/list' ],
        queryFn: async (ctx) => {
            const { data } = await api(endPoints.post.list, {
                searchParams: { page: ctx.pageParam },
            });
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            // console.log({ allPages });
            const allRows = allPages.flatMap((d) => d.results);
            // console.log(allRows.length);

            if (lastPage.count <= allRows.length) return undefined;
            return allPages.length + 1;
        },
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    const {
        data: PhotoList,
        isLoading: PhotoListLoading,
        error: PhotoListError,
    } = useQuery({
        queryKey: [ 'photo/list' ],
        queryFn: () => api(endPoints.post.photos),
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    return {
        PostList,
        PostListLoading,
        PostListError,
        fetchNextPostList,
        isFetchingPostList,
        hasNextPostList,
        PhotoList,
        PhotoListLoading,
        PhotoListError,
    };
}

export default usePostGeneral;
