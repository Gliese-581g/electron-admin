<template>
  <el-dialog v-model="dialogFormVisible" :title="id ? '修改用户' : '增加用户'" width="800px">
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
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="form.realName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1" size="large">男</el-radio>
          <el-radio :label="2" size="large">女</el-radio>
          <el-radio :label="0" size="large">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="账号状态" prop="enabled">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="1" size="large">启用</el-radio>
          <el-radio :label="0" size="large">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属机构" prop="unitId" required>
        <el-select v-model="form.unitId" placeholder="请选择" size="large">
          <el-option v-for="item in unitList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属岗位" prop="postIds" required>
        <el-select v-model="form.postIds" multiple placeholder="请选择" size="large">
          <el-option
            v-for="item in postList"
            :key="item.id"
            :label="item.postName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分配角色" prop="roleIds" required>
        <el-select v-model="form.roleIds" multiple placeholder="请选择" size="large">
          <el-option
            v-for="item in roleList"
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
import { computed, onBeforeMount, reactive, ref, toRef, watch } from 'vue'
import { userUserListStore } from '@store/use-list'
import { storeToRefs } from 'pinia'
import { getUserById, reqUserAdd } from '@api/user'
import { useRulesStore } from './validate'
// import { IUser } from '@store/types'

const userListStore = userUserListStore()
const { postList, unitList, roleList } = storeToRefs(userListStore)
const props = defineProps<{
  dialogVisible: boolean
  id: string
}>()
const emit = defineEmits(['update:dialogVisible', 'getUserList'])

const dialogFormVisible = computed({
  get() {
    return props.dialogVisible
  },
  set(value) {
    emit('update:dialogVisible', value)
  }
})
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
const rulesStore = useRulesStore(toRef(form, 'id'))

onBeforeMount(() => {
  Promise.all([userListStore.getUnitList(), userListStore.getAllPost(), userListStore.getAllRole()])
})
const ruleFormRef = ref()
async function addUser() {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const { code } = form.id ? await reqUserAdd(form) : await reqUserAdd(form)
      if (code === '200') {
        ElMessage({
          message: form.id ? '修改成功' : '添加成功',
          type: 'success'
        })
        dialogFormVisible.value = false
        emit('getUserList')
      } else {
        ElMessage({
          message: form.id ? '修改失败' : '添加失败',
          type: 'error'
        })
      }
    }
  })
}

async function getUserData(id) {
  const { code, data, msg } = await getUserById(id)
  if (code === '200') {
    form.roleIds = data.roleIds
    form.postIds = data.postIds
    for (let key in form) {
      if (data.user[key] !== undefined) form[key] = data.user[key]
    }
  } else console.log(msg)
}

watch(
  () => props.dialogVisible,
  async (value) => {
    if (value && props.id) {
      getUserData(props.id)
    } else if (!value) {
      form.id = ''
      ruleFormRef.value.resetFields()
    }
  }
)
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
