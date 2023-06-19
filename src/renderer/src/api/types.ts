export interface roleParams {
  current: string // 当前页
  size: string // 分页大小
  roleName?: string // 角色名称
  rolePerm?: string //	角色编码
  enabled?: '0' | '1' //是否启用（0：禁用；1：启用）
}

export interface addRoleParams {
  id?: string
  roleName: string //角色名称
  rolePerm: string //角色权限编码
  enabled: number //是否启用（0：禁用；1：启用）
  descript: string //描述
  permissionIds: string[] //菜单ID
}

export interface userParams {
  current: string // 当前页
  size: string // 分页大小
}
