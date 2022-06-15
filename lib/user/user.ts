import { baseURL } from './../utils';
import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = `${baseURL}/users`;

interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
}

interface UserLogin {
    email: string;
    password: string;
}


export const createUser = async (data: UserRegister) => {
    const response = await axios({
        method: "POST",
        url: "/",
        data,
    })
    console.log('aa')
    return response.status;
}

export const Login = async (data: UserLogin) => {
    const response = await axios({
        method: "POST",
        url: `${baseURL}/auth/login`,
        data,
    })
    if (response.status >= 200 && response.status < 300) { 
        storeUserToken(response.data.access_token);
        return true;
    } else {
        return false;
    }
}

export const getUserToken = () => {
    const token : string | null = localStorage.getItem("jwt");
    if (token) {
        if(jwt_decode<any>(token).exp < Date.now() / 1000) {
            logout();
            return null;
        } else {
            return token;
        }
    }
    return null
    
    return localStorage.getItem("jwt");
}

export const getUser = async () => {
    const token = getUserToken();
    if(token) {
        const response = await axios({
            method: "GET",
            url: `${baseURL}/profile`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        return response.data;
    }
}

const storeUserToken = (jwt: string) => {
    localStorage.setItem("jwt", jwt);
}

export const logout = () => {
    localStorage.removeItem("jwt");
}
