import request from '@utils/request'

export interface SubjectPage {
  records: SubjectVO[]
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  searchCount: boolean
  pages: number
}

export interface SubjectVO {
  id: string
  subjectName: string
  amount: number
  protocol: string
  enabled: string
  createBy: string
  createTime: number
  updateBy?: any
  updateTime?: any
}
interface addSubjectParam {
  id?: string
  subjectName: string
  amount: number
  protocol: string
  enabled: number
}
export function getSubjectPage(params: PageParam): Promise<SubjectPage> {
  return request({
    url: '/crm/teach/subject/page',
    method: 'get',
    params
  })
}
export function addSubject(data: addSubjectParam) {
  return request({
    url: '/crm/teach/subject/add',
    method: 'post',
    data
  })
}
export function deleteSubject(id: string) {
  return request({
    url: `/crm/teach/subject/delete/${id}`,
    method: 'get'
  })
}
export function getSubject(id: string) {
  return request({
    url: `/crm/teach/subject/get/${id}`,
    method: 'get'
  })
}
export function updateSubject(data: addSubjectParam) {
  return request({
    url: '/crm/teach/subject/update',
    method: 'post',
    data
  })
}
