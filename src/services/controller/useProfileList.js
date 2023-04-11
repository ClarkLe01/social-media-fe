import { endPoints, publicApi } from '@services/api';
import { useQueries } from '@tanstack/react-query';
import { useProfile } from '@services/controller';

function useProfileList(userIdList) {
    const queries = userIdList.map((userId) => {
        return { queryKey: [ 'profile', userId ], queryFn: () => publicApi(endPoints.user.getProfileById, { pathParams: { userId: userId } }) };
    });

    const results = useQueries({
        queries: queries,
    });
    
    return {
        results,
    };
}

export default useProfileList;
