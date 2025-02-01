import axios from "axios";

const axiosShalat = axios.create({
  baseURL: "https://api.myquran.com/v2",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default axiosShalat;
