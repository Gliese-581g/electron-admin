import request from '@utils/request'

export interface pageParams {
  current: string // 当前页
  size: string // 分页大小
  name?: string // 字典类型名称
  type?: string // 分类
}

export interface DictType {
  id: string //ID
  name: string //字典类型名称
  type: string //分类编码
  remarks: string //描述
  createTime: number //创建时间
}
// 获取字典类型列表
export function getPage(params) {
  return request({
    url: '/system/dict/type/page',
    method: 'get',
    params
  })
}
