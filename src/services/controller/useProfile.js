import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useProfile(userId) {
    const queryClient = useQueryClient();
    const {
        data: profileId,
        isLoading: profileIdLoading,
        error: profileIdError,
        refetch: profileIdRefetch,
    } = useQuery({
        queryKey: [ `profile/${userId}` ],
        queryFn: () => api(endPoints.user.getProfileById, { pathParams: { userId: userId } }),
        enabled: !!userId,
        retryOnMount: false,
        staleTime: 1000,
    });

    const {
        isLoading: updateProfileLoading,
        error: updateProfileError,
        mutate: updateProfile,
        
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.user.updateProfile, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ `profile/${userId}` ] });
            queryClient.invalidateQueries({ queryKey: [ 'profile/me' ] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: [ `profile/${userId}` ] });
            queryClient.invalidateQueries({ queryKey: [ 'profile/me' ] });
        },

    });
    
    return {
        profileId,
        profileIdLoading,
        profileIdError,
        profileIdRefetch,

        updateProfile,
        updateProfileLoading,
        updateProfileError,
    };
}

export default useProfile;
