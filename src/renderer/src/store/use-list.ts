import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqGetUserList, reqGetAllPost, reqGetUnitList, reqGetAllRole } from '@api/user'
import { IUser } from './types'
export const userUserListStore = defineStore('user-list', () => {
  // 用户列表
  const userList = ref<IUser[]>([])
  const pageTotal = ref(0)

  // 全部岗位列表
  const postList = ref<
    {
      postName: string
      id: string
    }[]
  >([])

  // 机构列表
  const unitList = ref<
    {
      name: string
      id: string
    }[]
  >([])

  // 全部角色列表
  const roleList = ref<
    {
      roleName: string
      id: string
    }[]
  >([])

  async function getUserList(params) {
    const { code, msg, data } = await reqGetUserList(params)
    if (code === '200') {
      userList.value = data.records
      pageTotal.value = data.total
    } else console.log(msg)
  }
  async function getAllPost() {
    const { code, msg, data } = await reqGetAllPost()
    if (code === '200') {
      postList.value = data
    } else console.log(msg)
  }
  async function getUnitList() {
    const { code, msg, data } = await reqGetUnitList()
    if (code === '200') {
      unitList.value = data
    } else console.log(msg)
  }
  async function getAllRole() {
    const { code, msg, data } = await reqGetAllRole()
    if (code === '200') {
      roleList.value = data
    } else console.log(msg)
  }
  return {
    userList,
    pageTotal,
    postList,
    unitList,
    roleList,
    getUserList,
    getAllPost,
    getUnitList,
    getAllRole
  }
})
