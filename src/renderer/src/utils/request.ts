import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { IResponse } from './types'
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 4000
})

service.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem('TOKEN')) {
      config.headers.Authorization = sessionStorage.getItem('TOKEN')
    }
    return config
  },
  (err) => Promise.reject(err)
)
service.interceptors.response.use(
  (res: AxiosResponse) => {
    return res
  },
  (err) => Promise.reject(err)
)

const request = <T = IResponse>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config
  return new Promise((resolve, reject) => {
    service
      .request<unknown, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        resolve(res.data as T)
      })
      .catch((res) => reject(res))
  })
}
export default request
