import axiosInstance from "../api/axios";

export const getMessages = async (senderId, receiverId) => {
    const { data } = await axiosInstance.get(
        `/messages/${senderId}/${receiverId}`
    );

    return data;
};

export const sendMessage = async (messageData) => {
    const { data } = await axiosInstance.post(
        "/messages/send",
        messageData
    );

    return data;
};