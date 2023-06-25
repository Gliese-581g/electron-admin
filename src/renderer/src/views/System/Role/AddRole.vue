<template>
  <el-dialog v-model="dialogFormVisible" :title="id ? '修改角色' : '增加角色'">
    <el-form ref="ruleFormRef" :model="form" :rules="rulesStore.rules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限字符" prop="rolePerm">
        <el-input v-model="form.rolePerm" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态" prop="enabled">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="1" size="large">启用</el-radio>
          <el-radio :label="0" size="large">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 菜单权限 -->
      <PermissionTree ref="permissionTreeRef" :permission-ids="form.permissionIds" />
      <el-form-item label="备注" prop="descript">
        <el-input v-model="form.descript" :rows="2" type="textarea" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addRole"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch, nextTick, toRef } from 'vue'
import * as roleApi from '@api/system/role'

import { useRulesStore } from './validate'
import PermissionTree from './PermissionTree.vue'

const props = defineProps<{
  id: string
  rolePage: roleApi.IRole[]
  dialogVisible: boolean
}>()
const emit = defineEmits(['update:dialogVisible'])

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
  roleName: '',
  rolePerm: '',
  enabled: 1,
  descript: '',
  permissionIds: []
})
const rulesStore = useRulesStore(toRef(form, 'id'), toRef(props, 'rolePage'))
const ruleFormRef = ref()
const permissionTreeRef = ref()
async function addRole() {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      // 将选择的permissionId带上
      form.permissionIds = permissionTreeRef.value.getCheckedKeys()
      const { code } = form.id ? await roleApi.updateRole(form) : await roleApi.AddRole(form)
      if (code === '200') {
        ElMessage({
          message: form.id ? '修改成功' : '添加成功',
          type: 'success'
        })
        dialogFormVisible.value = false
      } else {
        ElMessage({
          message: form.id ? '修改失败' : '添加失败',
          type: 'error'
        })
      }
    }
  })
}

async function getRoleData(id) {
  const { code, data, msg } = await roleApi.getRoleById(id)
  if (code === '200') {
    for (const key in form) {
      if (data.role[key] !== undefined) form[key] = data.role[key]
    }
    form.permissionIds = data.permissions
    nextTick(() => {
      permissionTreeRef.value.setCheckedKeys(form.permissionIds)
    })
  } else console.log(msg)
}

watch(
  () => props.dialogVisible,
  async (value) => {
    if (value && props.id) {
      getRoleData(props.id)
    } else if (!value) {
      form.id = ''
      ruleFormRef.value.resetFields()
      // nextTick(() => {
      //   permissionTreeRef.value.setCheckedKeys(0)
      // })
    }
  }
)
</script>

<style lang="scss" scoped></style>
