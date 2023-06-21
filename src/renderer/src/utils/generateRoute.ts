export function generateRoute(routes) {
  // 提取所有根路由的子路由
  return routes.reduce((accumulator, route) => {
    if (route.children) {
      route = formatRoute(route.children, route.id)
      return accumulator.concat(route)
    } else return accumulator
  }, [])
}

function formatRoute(routes, pid) {
  const viteComponent = import.meta.glob('@views/**/*.vue')
  console.log(viteComponent)
  return routes.map((route) => {
    let { path, component } = route
    path = route.path.replace(/^\//, '')
    const home = () => import('/src/views/home/home.vue')
    component = viteComponent[`/src/views/${component}.vue`] || home
    return { name: route.name, path, meta: { id: route.id, pid }, component }
  })
}
