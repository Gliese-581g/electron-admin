import request from '@utils/request'

export interface pageParams {
  current: string // 当前页
  size: string // 分页大小
  name?: string // 字典类型名称
  type?: string // 分类
}
export interface DictItemVO {
  remark: string
  id: string
  k: any //键
  sort: number //排序
  v: any //值
  typeId: string //字典类型ID
}
// 获取字典类型列表
export function getPage(params) {
  return request({
    url: '/system/dict/item/page',
    method: 'get',
    params
  })
}
// 查询字典项
export function getDictOptions(dictType: string) {
  return request({
    url: `/system/dict/item/query/${dictType}`,
    method: 'get'
  })
}

// 查询字典项（批量）

export function getDictOptionsBatch(data: string[]) {
  return request({
    url: '/system/dict/item/queryBatch',
    method: 'post',
    data
  })
}
