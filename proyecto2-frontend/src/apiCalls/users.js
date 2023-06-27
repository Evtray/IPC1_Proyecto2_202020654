import axiosInstance from './axiosInstance';

export const createUser = (data) => {
    return axiosInstance.post('/users/create', data);
}