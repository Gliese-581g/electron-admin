import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useRoutesStore } from '@store/routes'
import { useUserStore } from '@store/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
let load = ''
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  const accessToken = sessionStorage.getItem('TOKEN')
  // 只要没登录，都跳转到登录页，如果是导航到登录页就直接放行而不跳转
  // 每次return加参数跳转都会开启一个路由守卫的生命周期钩子
  if (!accessToken && to.path !== '/login') return { path: '/login' }
  if (accessToken && to.path === '/login') return { path: from.path }
  if (accessToken && (!load || load !== userStore.role.rolePerm)) {
    // 获取路由表
    const routesStore = useRoutesStore()
    routesStore.routesMap.forEach((route) => {
      if (router.hasRoute(route.name)) {
        router.removeRoute(route.name)
      }
    })
    await routesStore.getRoutes()
    routesStore.routesMap.forEach((route) => {
      router.addRoute('layout', route)
    })
    load = userStore.role.rolePerm
    return to.fullPath
  } else return
})
export default router
