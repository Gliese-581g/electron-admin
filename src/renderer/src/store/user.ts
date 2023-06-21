import { defineStore } from 'pinia'
import { reqGetUserInfo } from '@api/login'
import { ref } from 'vue'
// 获取用户信息【得到权限】
export const useUserStore = defineStore('user', () => {
  const permissions = ref([]),
    roles = ref([]),
    rolePerm = ref(sessionStorage.getItem('rolePerm')),
    userInfo = ref({})
  async function geUserInfo() {
    const { code, data, msg } = await reqGetUserInfo()
    if (code === '200') {
      permissions.value = data.permissions
      roles.value = data.roles
      rolePerm.value = data.roles[0].rolePerm
      sessionStorage.setItem('rolePerm', rolePerm.value || '')
      userInfo.value = data.userInfo
      // 获取路由表
    } else {
      console.log(msg)
    }
  }
  return { geUserInfo, roles, rolePerm, userInfo }
})
