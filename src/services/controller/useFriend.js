import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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

    

    return {
        friendList,
        friendListLoading,
        friendListError,

        requestList,
        requestListLoading,
        requestListError,

        responseList,
        responseListLoading,
        responseListError,
    };
}

export default useFriend;
