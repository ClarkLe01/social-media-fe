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

    const {
        data: followingUserIds,
        isLoading: followingUserIdsLoading,
        error: followingUserIdsError,
    } = useQuery({
        queryKey: [ `follows/${userId}` ],
        queryFn: () => api(endPoints.user.userFollows, { pathParams: { userId: userId } }),
        enabled: !!userId,
        retryOnMount: false,
        staleTime: 1000,
    });

    const {
        isLoading: followUserLoading,
        error: followUserError,
        mutate: followUser,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.user.follow, variables);
        },
    });

    const {
        isLoading: unFollowUserLoading,
        error: unFollowUserError,
        mutate: unFollowUser,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.user.unfollow, variables);
        },
    });

    const {
        data: muteUserIds,
        isLoading: muteUserIdsLoading,
        error: muteUserIdsError,
    } = useQuery({
        queryKey: [ `mutes/${userId}` ],
        queryFn: () => api(endPoints.user.userMutes, { pathParams: { userId: userId } }),
        enabled: !!userId,
        retryOnMount: false,
        staleTime: 1000,
    });

    const {
        isLoading: muteUserLoading,
        error: muteUserError,
        mutate: muteUser,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.user.mute, variables);
        },
    });

    const {
        isLoading: unMuteUserLoading,
        error: unMuteUserError,
        mutate: unMuteUser,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.user.unmute, variables);
        },
    });
    
    return {
        profileId,
        profileIdLoading,
        profileIdError,

        updateProfile,
        updateProfileLoading,
        updateProfileError,

        checkValidatePassword,

        searchUser,
        searchUserTest,

        followingUserIds,
        followingUserIdsLoading,
        followingUserIdsError,

        followUser,
        followUserLoading,
        followUserError,

        unFollowUser,
        unFollowUserLoading,
        unFollowUserError,

        muteUserIds,
        muteUserIdsLoading,
        muteUserIdsError,

        muteUser,
        muteUserLoading,
        muteUserError,

        unMuteUser,
        unMuteUserLoading,
        unMuteUserError,
    };
}

export default useProfile;
