import { reactive } from 'vue'
export const useRulesStore = (id, roleList) => {
  const validateName = (_rule: any, value: any, callback: any) => {
    const repeatTimes = roleList.value.filter((item) => item.roleName === value).length
    const isRepeat =
      (repeatTimes >= 2 && id.value) || (repeatTimes >= 1 && !id.value) ? true : false
    if (isRepeat) {
      callback(new Error('该角色名已经存在'))
    }
    callback()
  }
  const validatePerm = (_rule: any, value: any, callback: any) => {
    const repeatTimes = roleList.value.filter((item) => item.rolePerm === value).length

    const isRepeat =
      (repeatTimes >= 2 && id.value) || (repeatTimes >= 1 && !id.value) ? true : false
    if (isRepeat) {
      callback(new Error('该权限字符已经存在'))
    }
    callback()
  }
  const rules = reactive({
    // 验证顺序根据在数组中定义的顺序
    roleName: [
      { required: true, message: '请输入', trigger: 'change' },
      { max: 10, message: '长度最长10位', trigger: 'change' },
      { validator: validateName, trigger: 'blur' }
    ],
    rolePerm: [
      { required: true, message: '请输入', trigger: 'change' },
      { min: 2, max: 15, message: '长度2-15位', trigger: 'blur' },
      { validator: validatePerm, trigger: 'blur' }
    ],
    descript: [{ max: 50, message: '长度最长50位', trigger: 'blur' }]
  })
  return { rules }
}
