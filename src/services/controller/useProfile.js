import { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueries } from '@tanstack/react-query';

function useProfile(userId) {
    const {
        data: profileId,
        isLoading: profileIdLoading,
        error: profileIdError,
    } = useQuery({
        queryKey: [ 'profile', userId ],
        queryFn: () => publicApi(endPoints.user.getProfileById, { pathParams: { userId: userId } }),
        enabled: !!userId,
        retryOnMount: false,
    });
    
    return {
        profileId,
        profileIdLoading,
        profileIdError,
    };
}

export default useProfile;
