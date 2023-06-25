import request from '@utils/request'

interface loginParam {
  password: string
  username: string
  key: string
  captcha: string
}

interface SmsLoginVO {
  mobile: string
  captcha: string
}
// 获取验证码图片
export function getCaptchaImage(params: { key: string }) {
  return request({
    url: '/captcha/image',
    method: 'get',
    responseType: 'arraybuffer',
    params
  })
}
// 登录
export function login(data: loginParam) {
  return request({
    url: '/u/loginByJson',
    method: 'post',
    data
  })
}
// 获取用户个人信息
export function getUserInfo() {
  return request({
    url: '/personal/getInfo',
    method: 'get'
  })
}
// 获取动态路由
export function getAsyncRoutes(rolePerm) {
  return request({
    url: `/personal/getRouters/${rolePerm}`,
    method: 'get'
  })
}
// 请求后端发送登录动态验证码到用户手机（需要Aes对称加密）
export function sendSmsCode(params: { mobile: string }) {
  return request({
    url: '/captcha/sendRegisterOrLoginCaptcha',
    method: 'get',
    params
  })
}
// 手机验证码登录
export function smsLogin(data: SmsLoginVO) {
  return request({
    url: '/u/loginByMobile',
    method: 'post',
    data
  })
}
