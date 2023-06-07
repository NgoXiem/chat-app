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
  register(user_name: string, email: string, password: string, confirm: string){
    return axios.post(`${import.meta.env.VITE_APP_API_URL}/register`, {user_name, email, password, confirm})
  },
  
  login(user_name: string, password: string){
    return axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, {user_name, password});
  },

  getUserInfo(token: string){
    return axios.get(`${import.meta.env.VITE_APP_API_URL}/user/me`, { headers: authHeader(token) });
  }
}

