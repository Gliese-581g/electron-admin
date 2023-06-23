import Layout from '@layout/Layout.vue'
import Login from '@views/login/Login.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    name: 'layout',
    // 要配置children不然eslint会报错
    redirect: '/dashboard',
    children: []
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export default routes
