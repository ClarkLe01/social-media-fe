import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useFriend(userId) {
    const queryClient = useQueryClient();

    function ReValidate() {
        queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
        queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
        queryClient.invalidateQueries({ queryKey: [ 'friend/list', userId ] });
    }

    const {
        data: friendList,
        isLoading: friendListLoading,
        error: friendListError,
    } = useQuery({
        queryKey: [ 'friend/list', userId ],
        queryFn: () => publicApi(endPoints.friend.list, { pathParams: { userId: userId } }),
        enabled: !!userId,
        retryOnMount: false,
        staleTime: Infinity,
    });

    const {
        data: requestList,
        isLoading: requestListLoading,
        error: requestListError,
    } = useQuery({
        queryKey: [ 'friend/requests' ],
        queryFn: () => api(endPoints.friend.requests),
        retryOnMount: false,
        staleTime: Infinity,
    });

    const {
        data: responseList,
        isLoading: responseListLoading,
        error: responseListError,
    } = useQuery({
        queryKey: [ 'friend/responses' ],
        queryFn: () => api(endPoints.friend.responses),
        retryOnMount: false,
        staleTime: Infinity,
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
            ReValidate();
        },
    });

    const {
        isLoading: acceptRequestLoading,
        error: acceptRequestError,
        mutate: acceptRequest,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.friend.acceptRequest, { pathParams: variables });
        },
        onSuccess: ({ data }) => {
            ReValidate();
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
            ReValidate();
        },
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
