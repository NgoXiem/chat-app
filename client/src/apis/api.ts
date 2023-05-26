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

export const api = {
    async register(email: string, password: string){
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/register`, {email, password});
        return response.data;
    },
    async login(email: string, password: string){
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, {email, password});
        return response.data;
    }
}

