import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useFriendAction() {
    const queryClient = useQueryClient();

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
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
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
            queryClient.invalidateQueries({ queryKey: [ 'friend/list', data.responseID ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
        },
        onError: (error) => {    
            console.log(error);
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
        },
    });

    const {
        isLoading: rejectRequestLoading,
        error: rejectRequestError,
        mutate: rejectRequest,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.friend.rejectRequest, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
        },

    });

    const {
        isLoading: cancelRequestLoading,
        error: cancelRequestError,
        mutate: cancelRequest,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.friend.cancelRequest, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
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
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/list', data.id ] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: [ 'friend/requests' ] });
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
            queryClient.invalidateQueries({ queryKey: [ 'friend/responses' ] });
        },

    });

    return {

        addFriend,
        addFriendLoading,
        addFriendError,

        acceptRequest,
        acceptRequestLoading,
        acceptRequestError,

        rejectRequestLoading,
        rejectRequestError,
        rejectRequest,

        cancelRequestLoading,
        cancelRequestError,
        cancelRequest,

        deleteFriend,
        deleteFriendLoading,
        deleteFriendError,
    };
}

export default useFriendAction;
