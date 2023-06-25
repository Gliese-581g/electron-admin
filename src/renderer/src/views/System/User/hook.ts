import { reactive } from 'vue'
import * as userApi from '@api/system/user'

export const useOptionsStore = () => {
  const options = reactive<{
    allPost: {
      postName: string
      id: string
    }[]
    allRole: {
      roleName: string
      id: string
    }[]
    unitList: {
      name: string
      id: string
    }[]
  }>({
    allPost: [],
    allRole: [],
    unitList: []
  })

  async function getOptions() {
    try {
      const resArr = await Promise.all([
        userApi.getAllPost(),
        userApi.getAllRole(),
        userApi.getUnitList()
      ])
      console.log(resArr)
      options.allPost = resArr[0]
      options.allRole = resArr[1]
      options.unitList = resArr[2]
    } catch (error) {
      console.log(error)
    }
  }
  return { options, getOptions }
}
