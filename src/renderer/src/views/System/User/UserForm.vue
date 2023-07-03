<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="800px"
    @close="handleClose"
    @open="handleOpen"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rulesStore.rules"
      label-width="80px"
      class="userForm"
    >
      <el-form-item label="角色名称" prop="username">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password" :required="!id">
        <el-input v-model="form.password" :disabled="Boolean(id)" autocomplete="off" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="form.realName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <DictRadio :dict-type="DictType.SYSTEM_GLOBAL_GENDER" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="账号状态" prop="enabled">
        <el-radio-group v-model="form.enabled">
          <DictRadio :dict-type="DictType.SYSTEM_GLOBAL_STATUS" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属机构" prop="unitId" required>
        <el-select v-model="form.unitId" placeholder="请选择" size="large">
          <el-option
            v-for="item in options.unitList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属岗位" prop="postIds" required>
        <el-select v-model="form.postIds" multiple placeholder="请选择" size="large">
          <el-option
            v-for="item in options.allPost"
            :key="item.id"
            :label="item.postName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分配角色" prop="roleIds" required>
        <el-select v-model="form.roleIds" multiple placeholder="请选择" size="large">
          <el-option
            v-for="item in options.allRole"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="备注" class="remark">
        <el-input v-model="form.remark" :rows="3" type="textarea" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, toRef } from 'vue'
import * as userApi from '@api/system/user'
import { useRulesStore } from './validate'
import { useOptionsStore } from './hook'
import useItemForm from '@renderer/hooks/useItemForm'
import { DictType } from '@config/index'
// import { IUser } from '@store/types'

const props = defineProps<{
  dialogVisible: boolean
  id: string
}>()
const emit = defineEmits(['update:dialogVisible', 'getPage'])
const { ruleFormRef, dialogFormVisible, validateForm, title } = useItemForm(props, emit, userApi)

// const formLabelWidth = '140px'
const form = reactive({
  id: '',
  username: '', //用户名
  password: '', //密码
  realName: '', //真实姓名
  email: '', //邮箱
  gender: 1, //用户性别（1：男；2：女；0：未知）
  phone: '', //手机号
  remark: '', //备注
  enabled: 1, //帐号状态（0：禁用；1：正常）
  roleIds: [], //角色
  postIds: [], //岗位
  unitId: '' //机构ID
})
const rulesStore = useRulesStore()

async function addUser() {
  validateForm(form)
}

async function getDetail(id) {
  const data = await userApi.getUserDetail(id)
  form.roleIds = data.roleIds
  form.postIds = data.postIds
  for (const key in form) {
    if (data.user[key] !== undefined) form[key] = data.user[key]
  }
}

const optionsStore = useOptionsStore()
const options = toRef(optionsStore.options)

onBeforeMount(() => {
  optionsStore.getOptions()
})

const handleOpen = () => {
  if (props.id) {
    getDetail(props.id)
  }
}

const handleClose = () => {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="scss">
.userForm {
  display: grid;
  grid-template-columns: 1fr 1fr;
  .el-form-item {
    display: flex;
    align-items: center;
  }
  .remark {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
</style>
