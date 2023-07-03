import { reactive } from 'vue'

export const rules = reactive({
  // 验证顺序根据在数组中定义的顺序
  roleName: [
    { required: true, message: '请输入', trigger: 'change' },
    { max: 15, message: '长度最长15位', trigger: 'change' }
  ],
  rolePerm: [
    { required: true, message: '请输入', trigger: 'change' },
    { min: 2, max: 15, message: '长度2-15位', trigger: 'blur' }
  ],
  descript: [{ max: 50, message: '长度最长50位', trigger: 'blur' }]
})
