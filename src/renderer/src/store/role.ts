import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqGetRoleList } from '@api/role'
import { IRole } from './types'

export const useRoleStore = defineStore('role', () => {
  const roleList = ref<IRole[]>([])
  async function getRoleList(params) {
    const { code, msg, data } = await reqGetRoleList(params)
    if (code === '200') {
      roleList.value = data.records
    } else console.log(msg)
  }

  // 接口筛选
  function searchRole(searchForm) {
    const params = Object.assign(
      {
        current: '1',
        size: '8'
      },
      searchForm
    )
    getRoleList(params)
  }

  // 本地筛选
  // const filterRoleList = ref<IRole[]>([])
  // const searchRole = (searchForm) => {
  //   let filterArr = roleList.value
  //   if (searchForm.roleName) {
  //     filterArr = roleList.value.filter((role) =>
  //       role.roleName.toLowerCase().includes(searchForm.roleName.toLowerCase())
  //     )
  //   }
  //   if (searchForm.rolePerm) {
  //     filterArr = roleList.value.filter((role) =>
  //       role.rolePerm.toLowerCase().includes(searchForm.rolePerm.toLowerCase())
  //     )
  //   }
  //   if (searchForm.enabled) {
  //     filterArr = roleList.value.filter((role) => role.enabled === searchForm.enabled)
  //   }
  //   filterRoleList.value = filterArr
  // }

  // const resetFilter = () => {
  //   filterRoleList.value = roleList.value
  // }

  return { roleList, getRoleList, searchRole }
})
