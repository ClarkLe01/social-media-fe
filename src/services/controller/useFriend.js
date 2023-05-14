import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useFriend(userId) {
    const queryClient = useQueryClient();

    const {
        data: friendList,
        isLoading: friendListLoading,
        error: friendListError,
    } = useQuery({
        queryKey: [ 'friend/list', userId ],
        queryFn: () => publicApi(endPoints.friend.list, { pathParams: { userId: userId } }),
        enabled: !!userId,
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    const {
        data: friendListDetail,
        isLoading: friendListDetailLoading,
        error: friendListDetailError,
    } = useQuery({
        queryKey: [ 'friend/listDetail', userId ],
        queryFn: () => publicApi(endPoints.friend.detail, { pathParams: { userId: userId } }),
        enabled: !!userId,
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    const {
        data: requestList,
        isLoading: requestListLoading,
        error: requestListError,
    } = useQuery({
        queryKey: [ 'friend/requests' ],
        queryFn: () => api(endPoints.friend.requests),
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        refetchOnMount: true,
        staleTime: 1000,
        // refetchInterval: 1000,
    });

    const {
        data: responseList,
        isLoading: responseListLoading,
        error: responseListError,
    } = useQuery({
        queryKey: [ 'friend/responses' ],
        queryFn: () => api(endPoints.friend.responses),
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        refetchOnMount: true,
        staleTime: 1000,
        // refetchInterval: 1000,
    });

    const {
        isLoading: addFriendLoading,
        error: addFriendError,
        mutate: addFriend,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.friend.add, variables);
        },
        onSuccess: ({ data }) => {
            // ReValidate();
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
        },
        onError: (error) => {
            console.log('add error', error);       
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
        },
    });

    const {
        isLoading: acceptRequestLoading,
        error: acceptRequestError,
        mutate: acceptRequest,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.friend.acceptRequest, variables);
        },
        onSuccess: ({ data }) => {
            // ReValidate();
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/list', userId ] });
        },
        onError: (error) => {    
            console.log(error);
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/list', userId ] });
        },
    });

    const {
        isLoading: deleteFriendLoading,
        error: deleteFriendError,
        mutate: deleteFriend,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.friend.delete, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/list', userId ] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/list', userId ] });
        },

    });

    return {
        friendList,
        friendListLoading,
        friendListError,

        friendListDetail,
        friendListDetailLoading,
        friendListDetailError,

        requestList,
        requestListLoading,
        requestListError,

        responseList,
        responseListLoading,
        responseListError,

        addFriend,
        addFriendLoading,
        addFriendError,

        acceptRequest,
        acceptRequestLoading,
        acceptRequestError,

        deleteFriend,
        deleteFriendLoading,
        deleteFriendError,
    };
}

export default useFriend;
