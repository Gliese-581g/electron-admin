export interface IDefaultResponse {
  code: string
  msg: string
  data: any
}

export type IResponse = ArrayBuffer | IDefaultResponse
