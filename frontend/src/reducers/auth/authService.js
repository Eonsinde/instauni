import axios from 'axios'
import { BASE_URL } from '../../constants'
import jwt_decode from 'jwt-decode'


// regsiter user
const register = async (userData) => {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, userData);

    if (response.data){
        // dont't generate token for user
        // rather have them redirect back to login
        return response.data;
    }

    return { message: "failure" };
}

const login = async (userData) => {
    const response = await axios.post(`${BASE_URL}/api/auth/token/`, userData);

    if (response.data){
        const user = jwt_decode(response.data.access);
        // console.log('User:', user);
        localStorage.setItem('auth_tokens', JSON.stringify(response.data));
        const payload = {
            ...response.data,
            user
        };
        return payload;
    }

    return { message: "failure" };
}

const updateToken = async () => {
    const response = await axios.post(`${BASE_URL}/api/auth/token/refresh/`, { 'refresh': JSON.parse(localStorage.getItem('auth_tokens')).refresh });

    if (response.data){
        const user = jwt_decode(response.data.access);
        localStorage.setItem('auth_tokens', JSON.stringify(response.data));
        const payload = {
            ...response.data,
            user
        };
        return payload;
    }

    return { messages: "failure" };
}   

const logout = async () => {
    localStorage.removeItem('auth_tokens');
}


const authService = {
    register,
    login,
    updateToken,
    logout
};

export default authService;


