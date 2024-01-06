import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';

function useUserPost(userId) {
    const queryClient = useQueryClient();

    const {
        data: UserPostList,
        isLoading: UserPostListLoading,
        error: UserPostListError,
        isFetching: UserPostListFetching,
        hasNextPage: UserPostListHasNextPage,
        fetchNextPage: UserPostListFetchNextPage,
    } = useInfiniteQuery({
        queryKey: [ `posts/user` ],
        queryFn: async (ctx) => {
            const { data } = await api(endPoints.post.userPosts, {
                searchParams: { page: ctx.pageParam },
                pathParams: { userId: userId },
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
            window.location.reload();
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
        UserPostListFetching,
        UserPostListHasNextPage,
        UserPostListFetchNextPage,

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
