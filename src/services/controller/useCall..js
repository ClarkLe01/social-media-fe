import { navigatePath } from '@app/routes/config';
import { getData, removeItem, setData } from '@common/utils/localStorage';
import { storageKeyAccessToken, storageKeyRefreshToken } from '@constants';
import api, { endPoints, publicApi } from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


function useCall() {
    const queryClient = useQueryClient();
    const {
        data: roomCallToken,
        isLoading: roomCallTokenLoading,
        error: roomCallTokenError,
    } = useQuery({
        queryKey: [ 'roomCallToken' ],
        queryFn: () => api(endPoints.calling.token),
        retryOnMount: false,
        staleTime: 1000*2,
    });

    const {
        isLoading: newRoomCallLoading,
        error: newRoomCallError,
        mutate: newRoomCall,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.calling.room.new, variables);
        },
    });

    const {
        isLoading: validateRoomCallLoading,
        error: validateRoomCallError,
        mutate: validateRoomCall,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.calling.room.validate, variables);
        },
    });


    return {
        roomCallToken,
        roomCallTokenLoading,
        roomCallTokenError,

        newRoomCallLoading,
        newRoomCallError,
        newRoomCall,

        validateRoomCallLoading,
        validateRoomCallError,
        validateRoomCall,
    };
}

export default useCall;
