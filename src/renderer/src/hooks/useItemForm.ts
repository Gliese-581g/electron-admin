import { ref, computed } from 'vue'

export default function useItemForm(props, emit, pageApi) {
  const ruleFormRef = ref()
  const dialogFormVisible = computed({
    get() {
      return props.dialogVisible
    },
    set(value) {
      emit('update:dialogVisible', value)
    }
  })

  const title = computed(() => (props.id ? '修改' : '添加'))
  // 提交表单
  const validateForm = (form) => {
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        try {
          form.id ? await pageApi.updateItem(form) : await pageApi.addItem(form)
          ElMessage({
            message: form.id ? '修改成功' : '添加成功',
            type: 'success'
          })
          dialogFormVisible.value = false
          emit('getPage')
        } catch (error: any) {
          if (!(error instanceof Error)) {
            ElMessage({
              message: form.id ? `修改失败，${error.msg} ` : `添加失败，${error.msg} `,
              type: 'error'
            })
          } else {
            console.error(error)
          }
        }
      }
    })
  }
  return { ruleFormRef, dialogFormVisible, validateForm, title }
}
