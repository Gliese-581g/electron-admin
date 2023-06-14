import request from '@utils/request'
import { IDefaultResponse } from '@utils/types'

export function reqGetCaptchaImage(data): Promise<ArrayBuffer> {
  return request({
    url: '/captcha/image',
    method: 'get',
    responseType: 'arraybuffer',
    params: data
  })
}

export function reqLogin(data): Promise<IDefaultResponse> {
  return request({
    url: '/u/loginByJson',
    method: 'post',
    data
  })
}
export function reqGetUserInfo(): Promise<IDefaultResponse> {
  return request({
    url: '/personal/getInfo',
    method: 'get'
  })
}
export function reqGetRouters(rolePerm): Promise<IDefaultResponse> {
  return request({
    url: `/personal/getRouters/${rolePerm}`,
    method: 'get'
  })
}
