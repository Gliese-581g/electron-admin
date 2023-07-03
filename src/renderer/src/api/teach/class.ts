import request from '@utils/request'

export interface ClassPage {
  records: ClassVO[]
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  searchCount: boolean
  pages: number
}
export interface ClassVO {
  id: string
  className: string
  teachingMethod: string
  subjectId: string
  fullPeople: number
  mainTeacherId: string
  assistTeacherId: string
  manageTeacherId: string
  classHour: number
  beginDate: string
  endDate: string
  teachingDay: string
  teachingTime: string
  status: number
  createBy: string
  createTime: number
  updateBy: string
  updateTime: number
  subjectName?: any
  mainTeacherUsername?: any
  assistTeacherUsername: string
  manageTeacherUsername?: any
  applyNum: string
  arranged: number
}

export interface addItemParam {
  id?: string
  className: string
  teachingMethod: string
  subjectId: string
  fullPeople: number
  mainTeacherId: string
  assistTeacherId: string
  manageTeacherId: string
  classHour: number
  beginDate: string
  endDate: string
  teachingDay: string
  teachingTime: string
  status: number
}
export function getPage(params: PageParam): Promise<ClassPage> {
  return request({
    url: '/crm/teach/class/page',
    method: 'get',
    params
  })
}
export function addItem(data: addItemParam) {
  return request({
    url: '/crm/teach/subject/add',
    method: 'post',
    data
  })
}
export function deleteItem(id: string) {
  return request({
    url: `/crm/teach/subject/delete/${id}`,
    method: 'get'
  })
}
export function getItemById(id: string) {
  return request({
    url: `/crm/teach/subject/get/${id}`,
    method: 'get'
  })
}
export function updateItem(data: addItemParam) {
  return request({
    url: '/crm/teach/subject/update',
    method: 'post',
    data
  })
}
export function getAllSubject() {
  return request({
    url: '/crm/teach/subject/all',
    method: 'get'
  })
}
// 获取机构树
export function getUnitTree() {
  return request({
    url: '/system/unit/tree',
    method: 'get'
  })
}
