import { navigatePath } from '@app/routes/config';
import { getData, removeItem, setData } from '@common/utils/localStorage';
import { storageKeyAccessToken, storageKeyRefreshToken } from '@constants';
import api, { endPoints, publicApi } from '@services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


function useCall() {
    const getToken = async () => {
        const response = await api(endPoints.calling.token);
        const { token } = await response.data;
        return token;
    };
    
    const createMeeting = async (token, roomChatId) => {
        try {
            //We will use VideoSDK rooms API endpoint to create a meetingId
            const response = await api(endPoints.calling.room.new, {
                data: {
                    token: token,
                    roomChatId: roomChatId,
                },
            });
            //we will return the meetingId which we got from the response of the api
            const data = await response.data;
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    const removeParticipants = async (token, roomId, sessionId, participantId) => {
        try {
            //We will use VideoSDK rooms API endpoint to create a meetingId
            const response = await api(endPoints.calling.participants.remove, {
                data: {
                    token,
                    roomId,
                    sessionId,
                    participantId,
                },
            });
            //we will return the meetingId which we got from the response of the api
            const data = await response.data;
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    const validateMeeting = async (token, roomId) => {
        try {
            //We will use VideoSDK rooms API endpoint to create a meetingId
            const response = await api(endPoints.calling.room.validate, {
                searchParams: {
                    token: token,
                    roomId: roomId,
                },
            });
            //we will return the meetingId which we got from the response of the api
            const data = await response.data;
            return data;
        } catch (e) {
            console.log(e);
        }
    };
    
    const endMeeting = async (token, roomId) => {
        try {
            //We will use VideoSDK rooms API endpoint to create a meetingId
            const response = await api(endPoints.calling.room.deactivate, {
                pathParams: {
                    token: token,
                    roomId: roomId,
                },
            });
            //we will return the meetingId which we got from the response of the api
            const data = await response.data;
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    const acceptCall = async (token, roomId) => {
        try {
            //We will use VideoSDK rooms API endpoint to create a meetingId
            const response = await api(endPoints.calling.room.accept, {
                searchParams: {
                    token: token,
                    roomId: roomId,
                },
            });
            //we will return the meetingId which we got from the response of the api
            const data = await response.data;
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    const rejectCall = async (token, roomId) => {
        try {
            //We will use VideoSDK rooms API endpoint to create a meetingId
            const response = await api(endPoints.calling.room.reject, {
                searchParams: {
                    token: token,
                    roomId: roomId,
                },
            });
            //we will return the meetingId which we got from the response of the api
            const data = await response.data;
            return data;
        } catch (e) {
            console.log(e);
        }
    };


    return {
        getToken,
        createMeeting,
        validateMeeting,
        endMeeting,
        acceptCall,
        rejectCall,
        removeParticipants,
    };
}

export default useCall;
