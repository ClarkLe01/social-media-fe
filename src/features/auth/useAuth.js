import { removeItem, setData } from '@common/utils/localStorage';
import { storageKeyAccessToken, storageKeyRefreshToken } from '@constants';
import api, { endPoints, publicApi } from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function useAuth() {
    const queryClient = useQueryClient();

    const {
        data: profile,
        isLoading: profileLoading,
        error: profileError,
    } = useQuery({
        queryKey: [ 'profile/me' ],
        queryFn: () => api(endPoints.user.profile),
        retryOnMount: false,
    });

    const {
        isLoading: loginLoading,
        error: loginError,
        mutate: login,
    } = useMutation({
        mutationFn: (variables) => {
            return publicApi(endPoints.user.login, variables);
        },
        onSuccess: ({ data }) => {
            setData(storageKeyAccessToken, data.access);
            setData(storageKeyRefreshToken, data.refresh);

            queryClient.invalidateQueries({ queryKey: [ 'profile/me' ] });
        },
    });

    const logout = () => {
        removeItem(storageKeyAccessToken);
        removeItem(storageKeyRefreshToken);

        queryClient.setQueryData({ queryKey: [ 'profile/me' ], data: null });
    };

    return {
        profile,
        login,
        logout,
        profileLoading,
        loginLoading,
        loginError,
        profileError,
    };
}

export default useAuth;
