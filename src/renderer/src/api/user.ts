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
// 获取岗位列表
export function reqGetPageList(params): Promise<IDefaultResponse> {
  return request({
    url: '/system/post/page',
    method: 'get',
    params
  })
}
// 获取机构列表
export function reqGetUnitList(): Promise<IDefaultResponse> {
  return request({
    url: '/system/unit/list',
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
