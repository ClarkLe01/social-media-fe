import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useProfile(userId) {
    const queryClient = useQueryClient();
    const {
        data: profileId,
        isLoading: profileIdLoading,
        error: profileIdError,
    } = useQuery({
        queryKey: [ `profile/${userId}` ],
        queryFn: () => publicApi(endPoints.user.getProfileById, { pathParams: { userId: userId } }),
        enabled: !!userId,
        retryOnMount: false,
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
            // ReValidate();
            console.log(data);
            queryClient.invalidateQueries({ queryKey: [ `profile/${userId}` ] });
            queryClient.invalidateQueries({ queryKey: [ 'profile/me' ] });

        },
        onError: (error) => {
            console.log('add error', error);
            queryClient.invalidateQueries({ queryKey: [ `profile/${userId}` ] });
        },

    });
    
    return {
        profileId,
        profileIdLoading,
        profileIdError,

        updateProfile,
        updateProfileLoading,
        updateProfileError,
    };
}

export default useProfile;
