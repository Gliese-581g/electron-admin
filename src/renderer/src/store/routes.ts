import { defineStore } from 'pinia'
import * as loginApi from '@api/login'
import { useUserStore } from './user'
import { generateRoute } from '@renderer/utils/generateRoute'

export interface routeType {
  id: string //ID
  name: string //路由名称
  hidden: boolean //显示状态
  redirect: string //重写向地址
  component: string //组件路径
  alwaysShow: boolean //是否总显示
  query: string //路由参数
  path: string //路由地址
  meta: {
    title: string //标题
    icon: string //图标
    noCache: boolean //是否缓存
    link: string //外链
  }
  children?: routeType[]
}

export const useRoutesStore = defineStore('routes', {
  state: () => {
    return {
      asyncRoutes: [] as routeType[],
      // 判断有没有请求过路由，当请求的路由为空时，无需重复请求
      hasSetAsyncRoute: false
    }
  },
  getters: {
    // 取出一级路由的所有子路由
    routesMap: (state) => generateRoute(state.asyncRoutes)
  },
  actions: {
    // 获取动态路由表
    async getAsyncRoutes() {
      const userStore = useUserStore()
      const data = await loginApi.getAsyncRoutes(userStore.rolePerm)
      this.asyncRoutes = data
      this.hasSetAsyncRoute = true
    }
  }
})
