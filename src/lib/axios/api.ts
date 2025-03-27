import { axiosInstance } from "./config";

export const login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post('/api/login', { email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}