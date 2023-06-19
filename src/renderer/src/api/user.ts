import request from '@utils/request'
import { IDefaultResponse } from '@utils/types'
import { userParams } from './types'

// 获取用户列表
export function reqGetUserList(params: userParams): Promise<IDefaultResponse> {
  return request({
    url: '/system/user/page',
    method: 'get',
    params
  })
}
// 获取全部岗位
export function reqGetAllPost(): Promise<IDefaultResponse> {
  return request({
    url: '/system/post/all',
    method: 'get'
  })
}
// 获取机构列表
export function reqGetUnitList(): Promise<IDefaultResponse> {
  return request({
    url: '/system/unit/list',
    method: 'get'
  })
}
// 获取全部角色
export function reqGetAllRole(): Promise<IDefaultResponse> {
  return request({
    url: '/system/role/all',
    method: 'get'
  })
}
// 添加用户
export function reqUserAdd(data): Promise<IDefaultResponse> {
  return request({
    url: '/system/user/add',
    method: 'post',
    data
  })
}
// 删除角色
export function reqDeleteUser(id): Promise<IDefaultResponse> {
  return request({
    url: `/system/user/delete/${id}`,
    method: 'get'
  })
}
// 获取角色详情
export function getUserById(id): Promise<IDefaultResponse> {
  return request({
    url: `/system/user/get/${id}`,
    method: 'get'
  })
}
// 获取用户选中角色
export function getCheckedById(id): Promise<IDefaultResponse> {
  return request({
    url: `/system/user/checked/${id}`,
    method: 'get'
  })
}
