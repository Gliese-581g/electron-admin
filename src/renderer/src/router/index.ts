import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(async (to, from) => {
  const accessToken = sessionStorage.getItem('TOKEN')
  if (!accessToken && to.path !== '/login') return { path: '/login' }
  if (accessToken && to.path === '/login') return { path: from.path }

  return true
})
export default router
