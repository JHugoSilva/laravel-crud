import axios from "axios";
import { userAuthStore } from "./stores/authStore";

const http = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      'Access-Control-Allow-Origin': 'true',
    //    Authorization: `Bearer ${token}`
    },
  });

  http.interceptors.request.use((config) => {
    const authStore = userAuthStore()
    const token = authStore.token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

export default http