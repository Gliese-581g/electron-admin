import axios, { AxiosInstance } from 'axios'
const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 4000
})
request.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)
request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => Promise.reject(err)
)
export default request
