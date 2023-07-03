<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title + props.pageName"
    @close="handleClose"
    @open="handleOpen"
  >
    <el-form ref="ruleFormRef" :rules="rules"> </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import * as pageApi from '@api/teach/class'

const props = defineProps<{
  pageName: string
  id: string
  dialogVisible: boolean
}>()
const emit = defineEmits(['update:dialogVisible', 'getPage'])
const title = computed(() => (props.id ? '修改' : '添加'))
const dialogFormVisible = computed({
  get() {
    return props.dialogVisible
  },
  set(value) {
    emit('update:dialogVisible', value)
  }
})
const form = reactive<pageApi.addItemParam>({
  id: '',
  className: '',
  teachingMethod: '',
  subjectId: '',
  fullPeople: 0,
  mainTeacherId: '',
  assistTeacherId: '',
  manageTeacherId: '',
  classHour: 0,
  beginDate: '',
  endDate: '',
  teachingDay: '',
  teachingTime: '',
  status: 0
})
const rules = reactive({})
const ruleFormRef = ref()
const onSubmit = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        form.id ? await pageApi.addItem(form) : await pageApi.updateItem(form)
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

const handleOpen = async () => {
  if (props.id) {
    const data = await pageApi.getItemById(props.id)
    for (const key in form) {
      if (data[key] !== undefined) form[key] = data[key]
    }
  }
}
const handleClose = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss" scoped></style>
