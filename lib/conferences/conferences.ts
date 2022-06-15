import axios from "axios";
axios.defaults.baseURL = `${process.env.SERVER_URL}/conferences`;

export const loadConferences = async () => {
    const response = await axios({
        method: "GET",
        url: "/",
    })
    return response.data;
}

export const loadConference = async (id: string) => {
    const response = await axios({
        method: "GET",
        url: `/${id}`,
    })
    return response.data;
}