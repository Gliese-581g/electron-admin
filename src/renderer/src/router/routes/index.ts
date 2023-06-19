import Layout from '@layout/Layout.vue'
import HomeView from '@views/Home/Home.vue'
import Login from '@views/Login/Login.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/system/role',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomeView
      },
      {
        path: 'system/role',
        name: 'role',
        component: () => import('@views/System/Role/RoleView.vue')
      },
      {
        path: 'system/user',
        name: 'user',
        component: () => import('@views/System/User/UserView.vue')
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
