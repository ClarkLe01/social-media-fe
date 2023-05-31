import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useRoom() {
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
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
    });

    const {
        isLoading: updateRoomLoading,
        error: updateRoomError,
        mutate: updateRoom,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.chat.room.update, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
        onError: (error) => {      
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
    });

    const {
        isLoading: deleteRoomLoading,
        error: deleteRoomError,
        mutate: deleteRoom,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.chat.room.delete, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
        onError: (error) => {      
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
    });


    const {
        isLoading: addMemberLoading,
        error: addMemberError,
        mutate: addMember,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.chat.room.addMember, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
        onError: (error) => {      
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
    });

    const {
        isLoading: removeMemberLoading,
        error: removeMemberError,
        mutate: removeMember,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.chat.room.removeMember, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ 'room/list' ] });
        },
        onError: (error) => {      
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

        updateRoomLoading,
        updateRoomError,
        updateRoom,

        addMemberLoading,
        addMemberError,
        addMember,

        removeMemberLoading,
        removeMemberError,
        removeMember,

        deleteRoomLoading,
        deleteRoomError,
        deleteRoom,
    };
}

export default useRoom;
