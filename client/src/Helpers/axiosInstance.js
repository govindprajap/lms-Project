import axios from 'axios'
const BASE_URL = "http://localhost:8083/api/v1";
// const BASE_URL = "localhost:8083/api/v1"
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL
export default axiosInstance;