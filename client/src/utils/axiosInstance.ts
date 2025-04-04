import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4444/api/users", 
    withCredentials: true, 
});

export default axiosInstance;
