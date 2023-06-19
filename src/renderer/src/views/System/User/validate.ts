import { reactive } from 'vue'
import { userUserListStore } from '@store/use-list'

export const useRulesStore = (id) => {
  const userListStore = userUserListStore()

  const validateName = (_rule: any, value: any, callback: any) => {
    const repeatTimes = userListStore.userList.filter((item) => item.username === value).length
    console.log(repeatTimes, id)
    const isRepeat =
      (repeatTimes >= 2 && id.value) || (repeatTimes >= 1 && !id.value) ? true : false
    if (isRepeat) {
      callback(new Error('该用户名已经存在'))
    }
    callback()
  }
  const rules = reactive({
    // 验证顺序根据在数组中定义的顺序
    username: [
      { required: true, message: '请输入', trigger: 'change' },
      { max: 10, message: '长度最长10位', trigger: 'change' },
      { validator: validateName, trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入', trigger: 'change' },
      { min: 3, max: 15, message: '长度3-15位', trigger: 'blur' }
    ],
    realName: [
      { required: true, message: '请输入', trigger: 'change' },
      { min: 2, max: 6, message: '长度2-6位', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入', trigger: 'change' },
      { min: 11, max: 11, message: '手机长度11位', trigger: 'blur' }
    ],
    remark: [{ max: 50, message: '长度最长50位', trigger: 'blur' }]
  })
  return { rules }
}
