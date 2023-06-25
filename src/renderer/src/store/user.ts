import { defineStore } from 'pinia'
import * as loginApi from '@api/login'
// 获取用户信息【得到权限】

interface User {
  userInfo: UserInfo | null
  permissions: string[]
  roles: Role[]
  activeRole: Role
  activePermission: string
  hasSetPermission: boolean
}

interface Role {
  id: string
  roleName: string
  rolePerm: string
}
interface UserInfo {
  id: string
  username: string
  realName: string
  userType: number
  email: string
  phone: string
  gender: number
  avatar: string
  enabled: number
  delFlag: number
  remark?: any
}

export const useUserStore = defineStore('user', {
  state: (): User => ({
    userInfo: null,
    //权限信息
    permissions: [],
    //角色信息
    roles: [],
    activeRole: {
      id: '',
      roleName: '',
      rolePerm: ''
    },
    activePermission: '',
    hasSetPermission: false
  }),
  getters: {
    // 角色权限编码
    rolePerm: (state) => state.activeRole.rolePerm
  },
  actions: {
    // 获取用户个人信息并持久化存储
    async geUserInfo() {
      const data = await loginApi.getUserInfo()
      this.permissions = data.permissions
      this.roles = data.roles
      this.userInfo = data.userInfo
      // 初始化角色为第一个
      this.activeRole = data.roles[0]
      this.activePermission = this.permissions[0]
    },
    // 修改当前角色和权限
    changeActiveRole(roleId) {
      this.activeRole =
        this.roles.find((role, index) => {
          if (role.id === roleId) {
            this.activePermission = this.permissions[index]
            return true
          }
          return false
        }) || this.activeRole
    }
  },
  persist: true
})
