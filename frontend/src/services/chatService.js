import api from "../lib/axios";

export const getChats = async () => {
    const response = await api.get("/chat");
    return response.data;
};