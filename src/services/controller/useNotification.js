import api, { endPoints } from '@services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useNotification() {
    const queryClient = useQueryClient();
    const {
        data: notificationList,
        isLoading: notificationListLoading,
        error: notificationListError,
    } = useQuery({
        queryKey: [ `notifications` ],
        queryFn: () => api(endPoints.notification.list),
        retryOnMount: false,
    });

    const {
        isLoading: updateNotificationItemLoading,
        error: updateNotificationItemError,
        mutate: updateNotificationItem,
        
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.notification.update, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ `notifications` ] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: [ `notifications` ] });
        },

    });

    const {
        isLoading: deleteNotificationItemLoading,
        error: deleteNotificationItemError,
        mutate: deleteNotificationItem,
        
    } = useMutation({
        mutationFn: (variables) => {
            return api(endPoints.notification.delete, variables);
        },
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: [ `notifications` ] });
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: [ `notifications` ] });
        },

    });
    
    return {
        notificationList,
        notificationListLoading,
        notificationListError,

        updateNotificationItem,
        updateNotificationItemLoading,
        updateNotificationItemError,

        deleteNotificationItem,
        deleteNotificationItemLoading,
        deleteNotificationItemError,
    };
}

export default useNotification;
