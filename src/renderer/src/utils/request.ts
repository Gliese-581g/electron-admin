import axios, { AxiosInstance, AxiosResponse } from 'axios'
import NProgress from './progress'
import { useAuthStore } from '@store/auth'
import { useRouter } from 'vue-router'
import { useUserStore } from '@store/user'
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
    const { code, data } = res.data
    if (code === '200') {
      return data
    }
    if (code === '50003') {
      const authStore = useAuthStore()
      const router = useRouter()
      const userStore = useUserStore()
      authStore.removeToken()
      userStore.$reset()
      ElMessage.warning('登录过期，请重新登录')
      router.push('/login')
    } else return Promise.reject(res.data)
  },
  (err) => {
    NProgress.done()
    return Promise.reject(err)
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
      .catch((error) => {
        reject(error)
      })
  })
}
export default request
