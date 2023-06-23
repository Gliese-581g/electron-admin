import { defineStore } from 'pinia'
import { reqGetRouters } from '@api/login'
import { ref } from 'vue'
import { useUserStore } from './user'
import { routeType } from './types'
import { generateRoute } from '@renderer/utils/generateRoute'

export const useRoutesStore = defineStore('routes', () => {
  //  路由表
  const userStore = useUserStore()
  const routes = ref<routeType[]>([])
  const routesMap = ref<
    {
      name: string
      path: string
      component: any
      meta: any
    }[]
  >([])

  async function getRoutes() {
    const { code, data, msg } = await reqGetRouters(userStore.role.rolePerm)
    if (code === '200') {
      routes.value = data
      routesMap.value = generateRoute(routes.value)
    } else console.log(msg)
  }
  return { routes, getRoutes, routesMap }
})
