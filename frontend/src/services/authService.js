import axiosInstance from "../api/axios";

export const signup = async (userData) => {
    const { data } = await axiosInstance.post("/auth/signup", userData);
    return data;
};

export const login = async (userData) => {
    const { data } = await axiosInstance.post("/auth/login", userData);
    return data;
};

export const logout = async () => {
    const { data } = await axiosInstance.post("/auth/logout");
    return data;
};