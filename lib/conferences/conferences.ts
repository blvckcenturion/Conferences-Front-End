import axios from "axios";
axios.defaults.baseURL = `${process.env.SERVER_URL}/conferences`;

export const loadConferences = async () => {
    const response = await axios({
        method: "GET",
        url: "/",
    })
    return response.data;
}
