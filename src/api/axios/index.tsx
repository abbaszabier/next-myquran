import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://equran.id",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default axiosInstance;
