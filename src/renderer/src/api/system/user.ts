import request from '@utils/request'

export interface pageParams {
  current: string //当前页
  size: string //分页大小
  username?: string //登录账号
  realName?: string //真实姓名
  email?: string //用户邮箱
  phone?: string //手机号码
  gender?: string //用户性别（1：男；2：女；0：未知）
  enabled?: string //帐号状态（0：禁用；1：正常）
  unitId?: string //机构ID
}

interface User {
  username: string //用户名
  password: string //密码
  realName: string //真实姓名
  email: string //邮箱
  gender: number //用户性别（1：男；2：女；0：未知）
  avatar?: string //头像
  remark: string //备注
  phone: string //手机号
  enabled: number //帐号状态（0：禁用；1：正常）
  roleIds: string[] //角色
  postIds: string[] //岗位
  unitId: string //机构ID
}

export interface Record {
  id: string
  roleName: string
  rolePerm: string
  unitId: string
  dataPrivileges: number
  enabled: string
  createBy?: any
  createTime: number
  updateBy?: any
  updateTime?: any
  descript?: any
}
// 获取用户列表
export function getPage(params: pageParams) {
  return request({
    url: '/system/user/page',
    method: 'get',
    params
  })
}
// 获取用户详情
export function getUserDetail(id: string) {
  return request({
    url: `/system/user/get/${id}`,
    method: 'get'
  })
}
// 添加用户
export function addItem(data: User) {
  return request({
    url: '/system/user/add',
    method: 'post',
    data
  })
}
// 删除用户
export function deleteItem(id: string) {
  return request({
    url: `/system/user/delete/${id}`,
    method: 'get'
  })
}
// 修改用户
export function updateItem(data: User) {
  return request({
    url: '/system/user/update',
    method: 'post',
    data
  })
}
// 获取全部岗位
export function getAllPost() {
  return request({
    url: '/system/post/all',
    method: 'get'
  })
}
// 获取机构列表
export function getUnitList() {
  return request({
    url: '/system/unit/list',
    method: 'get'
  })
}
// 获取全部角色
export function getAllRole() {
  return request({
    url: '/system/role/all',
    method: 'get'
  })
}

// 获取用户选中角色
export function getCheckedById(id: string) {
  return request({
    url: `/system/user/checked/${id}`,
    method: 'get'
  })
}
