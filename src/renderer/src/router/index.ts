import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { beforeEachGuard } from './guard'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach(beforeEachGuard)
export default router
