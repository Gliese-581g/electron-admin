import request from '@utils/request'
import { IDefaultResponse } from '@utils/types'
import { roleParams, addRoleParams } from './types'

export function reqGetRoleList(params: roleParams): Promise<IDefaultResponse> {
  return request({
    url: '/system/role/page',
    method: 'get',
    params
  })
}

// 获取用户详情
export function getRoleById(id): Promise<IDefaultResponse> {
  return request({
    url: `/system/role/get/${id}`,
    method: 'get'
  })
}

export function reqAddRole(data: addRoleParams): Promise<IDefaultResponse> {
  return request({
    url: '/system/role/add',
    method: 'post',
    data
  })
}
export function reqUpdateRole(data: addRoleParams): Promise<IDefaultResponse> {
  return request({
    url: '/system/role/update',
    method: 'post',
    data
  })
}
export function getMenuTree(): Promise<IDefaultResponse> {
  return request({
    url: '/system/menu/tree',
    method: 'get'
  })
}
export function reqDeleteRole(id): Promise<IDefaultResponse> {
  return request({
    url: `/system/role/delete/${id}`,
    method: 'get'
  })
}
