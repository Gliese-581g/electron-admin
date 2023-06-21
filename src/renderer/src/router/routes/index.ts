import Layout from '@layout/Layout.vue'
import Login from '@views/login/Login.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    name: 'layout',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export default routes
