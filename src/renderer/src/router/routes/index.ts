import Layout from '@layout/Layout.vue'
import Login from '@views/login/Login.vue'
import NotFound from '@views/ErrorPage/NotFound.vue'
const routes = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    // 要配置children不然eslint会报错
    redirect: '/dashboard',
    children: []
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  /*   如果当前路由是动态追加的，beforeEach第一次执行的时候，这个路由还没追加进去，那么路由的matched为空，就会报这个警告。
解决办法，在router/index.ts文件里，也就是初始化路由的文件里，注册好404路由，这样第一次执行beforeEach的时候匹配不到路由，就会匹配已经有的404路由 */
  {
    path: '/:matched(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default routes
