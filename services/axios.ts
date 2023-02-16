import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.180.136:8000"
})

export default api