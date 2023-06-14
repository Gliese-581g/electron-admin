export interface routeType {
  id: string //ID
  name: string //路由名称
  hidden: boolean //显示状态
  redirect: string //重写向地址
  component: string //组件路径
  alwaysShow: boolean //是否总显示
  query: string //路由参数
  path: string //路由地址
  meta: {
    title: string //标题
    icon: string //图标
    noCache: boolean //是否缓存
    link: string //外链
  }
  children?: routeType[]
}
