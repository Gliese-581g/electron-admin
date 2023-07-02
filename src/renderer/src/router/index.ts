import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useRoutesStore } from '@store/routes'
import { useAuthStore } from '@store/auth'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  const routesStore = useRoutesStore()
  const isAuth = authStore.isAuth
  // console.log(isAuth, to.path)
  // 只要没登录，都跳转到登录页，如果是导航到登录页就直接放行而不跳转
  // 每次return加参数跳转都会开启一个路由守卫的生命周期钩子
  if (!isAuth && to.path !== '/login') return { path: '/login' }
  if (isAuth && to.path === '/login') return { path: from.path }
  if (isAuth && !routesStore.hasSetAsyncRoute) {
    //清空路由，避免重复添加
    resetRouter()
    //获取路由表
    try {
      await routesStore.getAsyncRoutes()
      routesStore.routesMap.forEach((route) => {
        router.addRoute('Layout', route)
      })
      return to.fullPath
    } catch (error) {
      return
    }
  } else {
    console.log('hello')
    return
  }
})
export default router

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NotFound', 'Layout']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}
