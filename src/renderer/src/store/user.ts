import { defineStore } from 'pinia'
import { reqGetUserInfo } from '@api/login'
import { ref } from 'vue'
// 获取用户信息【得到权限】

interface IRole {
  id: string
  roleName: string
  rolePerm: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    const initRole = {
      id: '',
      roleName: '',
      rolePerm: ''
    }

    const permissions = ref([]),
      roles = ref<IRole[]>([]),
      role = ref<IRole>(initRole),
      userInfo = ref<any>({})
    async function geUserInfo() {
      const { code, data, msg } = await reqGetUserInfo()
      if (code === '200') {
        permissions.value = data.permissions
        roles.value = data.roles
        // 初始化角色为第一个
        role.value = data.roles[0]
        userInfo.value = data.userInfo
      } else {
        console.log(msg)
      }
    }
    function changeRole(id) {
      role.value = roles.value.find((item) => item.id === id) || initRole
      console.log(role.value.roleName)
    }

    function reset() {
      permissions.value = []
      roles.value = []
      role.value = initRole
      userInfo.value = {}
    }

    return { geUserInfo, roles, role, userInfo, changeRole, reset }
  },
  {
    persist: true
  }
)
