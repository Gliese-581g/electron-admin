export function generateRoute(routes) {
  // 提取所有根路由的子路由
  return routes.reduce((accumulator, route) => {
    if (route.children) {
      route = formatRoute(route.children, route.id, route.name, formatIconName(route))
      return accumulator.concat(route)
    } else return accumulator
  }, [])
}
// 将需要的数据加入到meta字段
function formatRoute(routes, pid, pName, pIcon) {
  const viteComponent = import.meta.glob('@views/**/*.vue')
  return routes.map((route) => {
    let { path, component } = route
    path = route.path.replace(/^\//, '')
    const home = () => import('/src/views/home/Home.vue')
    component = viteComponent[`/src/views/${component}.vue`] || home
    return {
      name: route.name,
      path,
      meta: { id: route.id, pid, pName, icon: formatIconName(route), pIcon },
      component
    }
  })
}
function formatIconName(route) {
  return route.meta.icon.replace(/^el-icon-/, '')
}
