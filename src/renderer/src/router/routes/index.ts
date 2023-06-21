import Layout from '@layout/Layout.vue'
import home from '@views/home/home.vue'
import Login from '@views/Login/Login.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: home
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export default routes
