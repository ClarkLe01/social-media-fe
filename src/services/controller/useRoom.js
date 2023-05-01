import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useMessage() {
    const queryClient = useQueryClient();

    const {
        data: RoomList,
        isLoading: RoomListLoading,
        error: RoomListError,
    } = useQuery({
        queryKey: [ 'room/list' ],
        queryFn: () => api(endPoints.chat.room.list),
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        staleTime: 1000,
    });

    const {
        isLoading: createRoomLoading,
        error: createRoomError,
        mutate: createRoom,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.chat.room.create, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
        onError: (error) => {
            console.log('add error', error);       
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
    });

    return {
        RoomList,
        RoomListLoading,
        RoomListError,

        createRoomLoading,
        createRoomError,
        createRoom,
    };
}

export default useMessage;
