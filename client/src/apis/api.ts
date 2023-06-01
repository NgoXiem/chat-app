import axios from 'axios';

/*
*TODO:
* 1. Write function to create authorization header
* 2. List all api endpoints in an object then export it
*/
const authHeader = (token:string) => {
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
}

export const apis = {
    async register(user_name: string, email: string, password: string, confirm: string){
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/register`, {user_name, email, password, confirm});
        return response.data;
    },
    async login(email: string, password: string){
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, {email, password});
        return response.data;
    }
}

