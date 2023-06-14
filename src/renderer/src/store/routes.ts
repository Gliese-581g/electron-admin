import { defineStore } from 'pinia'
import { reqGetRouters } from '@api/login'
import { ref } from 'vue'
import { useUserStore } from './user'
import { routeType } from './types'

export const useRouteStore = defineStore('routes', () => {
  //  路由表
  const userStore = useUserStore()
  const routes = ref<routeType[]>([])
  async function getRoutes() {
    const { code, data, msg } = await reqGetRouters(userStore.rolePerm)
    if (code === '200') routes.value = data
    else console.log(msg)
  }
  return { routes, getRoutes }
})
