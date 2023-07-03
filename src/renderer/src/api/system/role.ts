import request from '@utils/request'

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

interface roleParams {
  current: number // 当前页
  size: number // 分页大小
  roleName?: string // 角色名称
  rolePerm?: string //	角色编码
  enabled?: '0' | '1' //是否启用（0：禁用；1：启用）
}

export interface addRoleParams {
  id?: string
  roleName: string //角色名称
  rolePerm: string //角色权限编码
  enabled: number //是否启用（0：禁用；1：启用）
  descript: string //描述
  permissionIds: string[] //菜单ID
}

export function getPage(params: roleParams) {
  return request({
    url: '/system/role/page',
    method: 'get',
    params
  })
}

// 获取用户详情
export function getRoleById(id: string) {
  return request({
    url: `/system/role/get/${id}`,
    method: 'get'
  })
}

export function AddItem(data: addRoleParams) {
  return request({
    url: '/system/role/add',
    method: 'post',
    data
  })
}
export function updateItem(data: addRoleParams) {
  return request({
    url: '/system/role/update',
    method: 'post',
    data
  })
}
export function getMenuTree() {
  return request({
    url: '/system/menu/tree',
    method: 'get'
  })
}
export function deleteItem(id: string) {
  return request({
    url: `/system/role/delete/${id}`,
    method: 'get'
  })
}
