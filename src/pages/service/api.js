import axios from "axios";

const api = axios.create({
   baseURL: "https://ibeabuilt.com.br:21256",
  //baseURL: 'http://localhost:3333',
});

export default api;
