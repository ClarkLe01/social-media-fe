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

    const {
        isLoading: updateProfileLoadingTest,
        error: updateProfileErrorTest,
        mutate: checkValidatePassword,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.user.validatePassword, variables);
        },
    });

    const searchUser = (search) => {
        const response = api(endPoints.user.searchUser, {
            searchParams: {
                search: search,
            },
        }).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        });
        // const data = response.data;
        return response;
    };

    const {
        data: searchUserTest,
        isLoading: responseListLoading,
        error: searchUserTestee,
    } = useQuery({
        queryKey: [ 'user/list', userId ],
        queryFn: () => api(endPoints.user.searchUser, {
            searchParams: {
                search: userId,
            },
        }),
        retryOnMount: true,
        retry: 5,
        retryDelay: 1000,
        refetchOnMount: true,
        staleTime: 1000,
        // refetchInterval: 1000,
    });
    
    return {
        profileId,
        profileIdLoading,
        profileIdError,
        profileIdRefetch,

        updateProfile,
        updateProfileLoading,
        updateProfileError,

        checkValidatePassword,

        searchUser,
        searchUserTest,
    };
}

export default useProfile;
