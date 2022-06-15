import { getUserToken } from './../user/user';
import { baseURL } from '../utils';
import axios from "axios";

axios.defaults.baseURL = `${baseURL}/conferences`;

export const loadConferences = async () => {
    const response = await axios({
        method: "GET",
        url: "/",
    })
    return response.data;
}

export const loadConferencesByDate = async (startDate: string, endDate : string) => { 
    const response = await axios({
        method: "GET",
        url: `/?startDate=${startDate}&endDate=${endDate}`,
    })
    return response;
}

export const loadParticipants = async (conferenceId: string) => { 
    const response = await axios({
        method: "GET",
        url: `/${conferenceId}/participants`,
        
    })
    return response.data;
}

export const loadConference = async (id: string) => {
    const url =`${baseURL}/conferences/${id}`;
    const response = await axios({
        method: "GET",
        url: url,
    })
    return response.data;
}

export const loadByCreator = async () => { 
    const token = getUserToken();
    if (token) {
        const response = await axios({
            method: "GET",
            url: `/creator`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
}

export const loadByParticipant = async () => {
    const token = getUserToken();
    if (token) {
        const response = await axios({
            method: "GET",
            url: `/participant`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
}

interface Conference {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    city: string;
    country: string;
    address: string;
    presenters: string[];
    image: string;
}
    


export const createConference = async (data: Conference) => { 
    const token = getUserToken();
    if (token) {
        const response = await axios({
            method: "POST",
            url: "/",
            data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    }
}

export const subscribeToConference = async (id: string) => { 
    const token = getUserToken();
    if (token) {
        const response = await axios({
            method: "PATCH",
            url: `/${id}/participants`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    }
}

export const editConference = async (id: string, data: Conference) => { 
    const token = getUserToken();
    if (token) {
        const response = await axios({
            method: "PATCH",
            url: `/${id}`,
            data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    }
}

export const deleteConference = async (id: string) => { 
    const token = getUserToken();
    if (token) {
        const response = await axios({
            method: "DELETE",
            url: `/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    }
}