import axios from "axios";

const BACKEND_URL = "http://localhost:1337";

const api = axios.create({
    baseURL: BACKEND_URL,
});

export const sendMessageApi = async (message: string) => {
    const res = await api.post("/sendMessage");
    return res.data;
}

