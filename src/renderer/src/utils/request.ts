import axios, { AxiosInstance, AxiosResponse } from 'axios'
import NProgress from './progress'
import { useAuthStore } from '@store/auth'
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 4000
})

service.interceptors.request.use(
  (config) => {
    NProgress.start()
    const authStore = useAuthStore()
    if (authStore.isAuth) {
      config.headers.Authorization = authStore.getToken()
    }
    return config
  },
  (err) => Promise.reject(err)
)
service.interceptors.response.use(
  (res: AxiosResponse) => {
    NProgress.done()
    // 如果是ArrayBuffer直接返回
    if (res.data instanceof ArrayBuffer) return res.data
    const { code, msg, data } = res.data
    if (code === '200') {
      return data
    } else return Promise.reject({ code, msg })
  },
  (err) => {
    NProgress.done()
    if (err) Promise.reject(err)
  }
)

const request = (config): Promise<any> => {
  const conf = config
  return new Promise((resolve, reject) => {
    service
      .request(conf)
      .then((data) => {
        resolve(data)
      })
      .catch((res) => reject(res))
  })
}
export default request
