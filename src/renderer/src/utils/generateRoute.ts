export function generateRoute(routes) {
  // 提取所有根路由的子路由
  const viteComponent = import.meta.glob('@views/**/*.vue')
  return routes.reduce((accumulator, route) => {
    if (route.children) {
      route = formatRoute(route, viteComponent)
      return accumulator.concat(route)
    } else return accumulator
  }, [])
}
// 将需要的数据加入到meta字段
function formatRoute(PRoute, viteComponent) {
  const { children, id: pid, name: pName } = PRoute
  const pIcon = formatIconName(PRoute)
  return children.map((cRoute) => {
    let { path, component } = cRoute
    path = cRoute.path.replace(/^\//, '')
    const home = () => import('/src/views/home/Home.vue')
    component = viteComponent[`/src/views/${component}.vue`] || home
    return {
      name: cRoute.name,
      path,
      meta: { id: cRoute.id, pid, pName, icon: formatIconName(cRoute), pIcon },
      component
    }
  })
}
function formatIconName(route) {
  return route.meta.icon.replace(/^el-icon-/, '')
}
