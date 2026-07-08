import axiosInstance from "../api/axios";

export const getAllUsers = async () => {
    const { data } = await axiosInstance.get("/users");
    return data;
};

export const getUserById = async (id) => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
};

export const blockUser = async (userId) => {
    const { data } = await axiosInstance.patch("/users/block", {
        userId,
    });

    return data;
};

export const unblockUser = async (userId) => {
    const { data } = await axiosInstance.patch("/users/unblock", {
        userId,
    });

    return data;
};