<template>
  <el-dialog v-model="dialogFormVisible" :title="title" @open="handleOpen" @close="handleClose">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限字符" prop="rolePerm">
        <el-input v-model="form.rolePerm" autocomplete="off" />
      </el-form-item>
      <el-form-item label="状态" prop="enabled">
        <el-radio-group v-model="form.enabled">
          <DictRadio :dict-type="DictType.SYSTEM_GLOBAL_STATUS" />
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
        <el-button type="primary" @click="addItem"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import * as roleApi from '@api/system/role'
import useItemForm from '@renderer/hooks/useItemForm'

import { rules } from './validate'
import PermissionTree from './PermissionTree.vue'
import { DictType } from '@renderer/config'

const props = defineProps<{
  id: string
  dialogVisible: boolean
}>()
const emit = defineEmits(['update:dialogVisible', 'getPage'])
const { ruleFormRef, dialogFormVisible, validateForm, title } = useItemForm(props, emit, roleApi)
const form = reactive({
  id: '',
  roleName: '',
  rolePerm: '',
  enabled: 1,
  descript: '',
  permissionIds: []
})

const permissionTreeRef = ref()
async function addItem() {
  form.permissionIds = permissionTreeRef.value.getCheckedKeys()
  validateForm(form)
}

async function getRoleData(id) {
  const data = await roleApi.getRoleById(id)
  for (const key in form) {
    if (data.role[key] !== undefined) form[key] = data.role[key]
  }
  form.permissionIds = data.permissions
  // TODO 思考填充tree数据的时机，一定要在tree获取到数据并数据被渲染到dom后才能拿到ref和填充数据吗？还是不用等到渲染完成就提前设置数据
  nextTick(() => {
    permissionTreeRef.value.setCheckedKeys(form.permissionIds)
  })
}
const handleOpen = () => {
  if (props.id) {
    getRoleData(props.id)
  }
}
const handleClose = () => {
  permissionTreeRef.value.setCheckedKeys([])
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss" scoped></style>
