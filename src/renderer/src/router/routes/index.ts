import Layout from '@views/Layout.vue'
import Login from '@views/Login/Login.vue'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Layout',
    component: Layout
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export default routes
