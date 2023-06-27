<template>
  <el-dialog v-model="dialogFormVisible" :title="id ? '修改用户' : '增加用户'" width="800px">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px" class="userForm">
      <el-form-item label="角色名称" prop="subjectName">
        <el-input v-model="form.subjectName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="售价" prop="amount">
        <el-input-number v-model="form.amount" :step="100" :min="0" />
      </el-form-item>
      <el-form-item label="账号状态" prop="enabled">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="1" size="large">启用</el-radio>
          <el-radio :label="0" size="large">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <WangEditor :edit-value="form.protocol" class="edit" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import * as subjectApi from '@api/teach/subject'
import WangEditor from '@components/WangEditor.vue'
import { computed, reactive, ref, watch } from 'vue'
const props = defineProps<{
  dialogVisible: boolean
  id: string
}>()
const emit = defineEmits(['update:dialogVisible', 'getPage'])

const dialogFormVisible = computed({
  get() {
    return props.dialogVisible
  },
  set(value) {
    emit('update:dialogVisible', value)
  }
})
const form = reactive({
  id: '',
  subjectName: '', //科目名称
  amount: 0, //售价
  protocol: '<p></p>', //协议（富文本）
  enabled: 1 //状态（1：启用；0：禁用）
})

const rules = reactive({
  subjectName: [
    { required: true, message: '请输入', trigger: 'change' },
    { max: 10, message: '长度最长10位', trigger: 'change' }
  ]
})
const onSubmit = () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        form.id ? await subjectApi.updateSubject(form) : await subjectApi.addSubject(form)
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
const ruleFormRef = ref()

const getSubject = async (id) => {
  const data = await subjectApi.getSubject(id)
  for (const key in form) {
    if (data[key] !== undefined) form[key] = data[key]
  }
}
watch(
  () => props.dialogVisible,
  async (value) => {
    if (value && props.id) {
      getSubject(props.id)
    } else if (!value) {
      form.id = ''
      form.protocol = '<p></p>'
      ruleFormRef.value.resetFields()
    }
  }
)
</script>

<style lang="scss" scoped></style>
