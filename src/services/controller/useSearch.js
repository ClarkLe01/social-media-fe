import api, { endPoints, publicApi } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useSearch(search) {
    const queryClient = useQueryClient();
    const {
        data: searchUserTest,
        isLoading: responseListLoading,
        error: searchUserTestee,
    } = useQuery({
        queryKey: [ 'user/list', search ],
        queryFn: () => api(endPoints.user.searchUser, {
            searchParams: {
                search: search,
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
        searchUserTest,
    };
}

export default useSearch;