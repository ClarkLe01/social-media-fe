import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useMessage(roomId) {
    const queryClient = useQueryClient();

    const {
        data: messageList,
        isLoading: messageListLoading,
        error: messageListError,
    } = useQuery({
        queryKey: [ 'message/list', `room:${roomId}` ],
        queryFn: () => api(endPoints.chat.message.list, { pathParams: { roomId } }),
        enabled: !!roomId,
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: Infinity,
    });

    const {
        data: RoomDetail,
        isLoading: RoomDetailLoading,
        error: RoomDetailError,
    } = useQuery({
        queryKey: [ `room/detail/${roomId}` ],
        queryFn: () => api(endPoints.chat.room.detail, { pathParams: { roomId } }),
        enabled: !!roomId,
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    const {
        isLoading: sendMessageLoading,
        error: sendMessageError,
        mutate: sendMessage,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.chat.message.send, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'message/list', `room/${roomId}` ] });
        },
        onError: (error) => {
            console.log('add error', error);       
            queryClient.invalidateQueries({ queryKey: [ 'message/list', `room/${roomId}` ] });
        },
    });

    return {
        messageList,
        messageListLoading,
        messageListError,

        RoomDetail,
        RoomDetailLoading,
        RoomDetailError,

        sendMessageLoading,
        sendMessageError,
        sendMessage,
    };
}

export default useMessage;
