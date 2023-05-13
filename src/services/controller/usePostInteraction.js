import api, { endPoints, publicApi } from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function usePostInteraction(postId) {
    const queryClient = useQueryClient();

    const {
        data: interactInstance,
        isLoading: interactInstanceLoading,
        error: interactInstanceError,
    } = useQuery({
        queryKey: [ `myInteraction/${postId}` ],
        queryFn: () => api(endPoints.interaction.retrieve, { pathParams: { postId: postId } }),
        enabled: !!postId,
        retryOnMount: false,
        staleTime: 1000,
    });

    const {
        isLoading: updateInteractionLoading,
        error: updateInteractionError,
        mutate: updateInteraction,
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.interaction.update, variables);
        },
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries([ `myInteraction/${postId}` ]);
        },
        onError: (error) => {
            console.log(error);
            queryClient.invalidateQueries([ `myInteraction/${postId}` ]);
        },
    });

    return {
        interactInstance,
        interactInstanceLoading,
        interactInstanceError,
        
        updateInteractionLoading,
        updateInteractionError,
        updateInteraction,
    };
}

export default usePostInteraction;
