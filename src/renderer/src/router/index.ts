import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useRoutesStore } from '@store/routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
let load = 0
router.beforeEach(async (to, from) => {
  console.log('hello')
  const accessToken = sessionStorage.getItem('TOKEN')
  // 只要没登录，都跳转到登录页，如果是导航到登录页就直接放行而不跳转
  // 每次return加参数跳转都会开启一个路由守卫的生命周期钩子
  if (!accessToken && to.path !== '/login') return { path: '/login' }
  if (accessToken && to.path === '/login') return { path: from.path }
  if (accessToken && !load) {
    // 获取路由表
    const routesStore = useRoutesStore()
    await routesStore.getRoutes()
    routesStore.routesMap.forEach((route) => {
      router.addRoute('layout', route)
    })
    load++
    return to.fullPath
  }

  return
})
export default router
