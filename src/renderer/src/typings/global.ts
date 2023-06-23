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
export interface IRole {
  createBy: string
  createTime: number
  dataPrivileges: number
  descript: string
  enabled: 1 | 0
  id: string
  roleName: string
  rolePerm: string
  unitId: string
  updateBy: string | null
  updateTime: number | null
}

export interface roleParams {
  current: number // 当前页
  size: number // 分页大小
  roleName?: string // 角色名称
  rolePerm?: string //	角色编码
  enabled?: '0' | '1' //是否启用（0：禁用；1：启用）
}

export interface IUser {
  id: string
  username: string //用户名
  realName: string //真实姓名
  userType: 0 | 1 //用户类型（0：普通账号；1：超级管理员）
  email: string //用户邮箱
  phone: string //手机号码
  gender: 0 | 1 | 2 //用户性别（1：男；2：女；0：未知）
  avatar: string //头像路径
  enabled: 0 | 1 //帐号状态（0：禁用；1：正常）
  delFlag: 0 | 1 //是否删除（0：有效；1：删除）
  loginIp: string //最后登陆IP
  loginDate: number //最后登陆时间
  createBy: null
  createTime: number
  updateBy: string
  updateTime: number
  remark: string //备注
}
