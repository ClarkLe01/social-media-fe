import api, { endPoints } from '@services/api';
import { useInfiniteQuery } from '@tanstack/react-query';

async function solvingPagination(page, search, url) {
    const response = await api(url, {
        searchParams: {
            search: search,
            page: page,
        },
    });
    return {
        data: response.data.results,
        nextPage: response.data.next?page + 1:undefined,
        previousPage: response.data.previous?page - 1:undefined,
        count: response.data.count,
    };
}

function useSearch(search) {
    const {
        status: statusSearchPeople,
        data: dataSearchPeople,
        isLoading: dataSearchPeopleLoading,
        error: errorSearchPeople,
        isFetching: isFetchingSearchPeople,
        isFetchingNextPage: isFetchingNextPageSearchPeople,
        isFetchingPreviousPage: isFetchingPreviousPageSearchPeople,
        fetchNextPage: fetchNextPageSearchPeople,
        fetchPreviousPage: fetchPreviousPageSearchPeople,
        hasNextPage: hasNextPageSearchPeople,
        hasPreviousPage: hasPreviousPageSearchPeople,
    } = useInfiniteQuery({
        queryKey: [ 'user/list' ],
        queryFn: ({ pageParam = 1 }) => solvingPagination(pageParam, search, endPoints.user.searchUser),
        getNextPageParam: (lastPage, pages) => lastPage.nextPage,
        getPreviousPageParam: (firstPage, pages) => firstPage.previousPage,
    });
    
    return {
        statusSearchPeople,
        dataSearchPeople,
        dataSearchPeopleLoading,
        errorSearchPeople,
        isFetchingSearchPeople,
        isFetchingNextPageSearchPeople,
        isFetchingPreviousPageSearchPeople,
        fetchNextPageSearchPeople,
        fetchPreviousPageSearchPeople,
        hasNextPageSearchPeople,
        hasPreviousPageSearchPeople,
    };
}

export default useSearch;