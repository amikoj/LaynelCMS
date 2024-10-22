import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:8000'; // 假设FastAPI运行在8000端口
export const getUserById = async (userId: number) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};
export const createUser = async (user: any): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};