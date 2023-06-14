import request from '@utils/request'

export function getCaptchaImage(data) {
  return request({
    url: '/captcha/image',
    method: 'get',
    responseType: 'arraybuffer',
    params: data
  }).catch((err) => {
    console.log(err)
  })
}

export function reqLogin(data) {
  return request({
    url: '/u/loginByJson',
    method: 'post',
    data
  }).catch((err) => {
    console.log(err)
  })
}
