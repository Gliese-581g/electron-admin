import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqGetUserList, reqGetPageList, reqGetUnitList } from '@api/user'

export const userUserListStore = defineStore('user-list', () => {
  const userList = ref([])
  const pageList = ref<
    {
      id: string
      postName: string
    }[]
  >([])
  const unitList = ref<
    {
      id: string
      name: string
    }[]
  >([])

  async function getUserList(params) {
    const { code, msg, data } = await reqGetUserList(params)
    if (code === '200') {
      userList.value = data.records
    } else console.log(msg)
  }
  async function getPageList(params) {
    const { code, msg, data } = await reqGetPageList(params)
    if (code === '200') {
      pageList.value = data.records
    } else console.log(msg)
  }
  async function getUnitList() {
    const { code, msg, data } = await reqGetUnitList()
    if (code === '200') {
      unitList.value = data
    } else console.log(msg)
  }
  return { userList, pageList, unitList, getUserList, getPageList, getUnitList }
})
