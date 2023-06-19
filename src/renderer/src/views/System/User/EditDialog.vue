<template>
  <el-dialog v-model="dialogFormVisible" title="添加用户">
    <el-form :inline="true" :model="form">
      <el-form-item label="角色名称">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.realName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio :label="1" size="large">男</el-radio>
          <el-radio :label="2" size="large">女</el-radio>
          <el-radio :label="0" size="large">未知</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="账号状态">
        <el-radio-group v-model="form.enabled">
          <el-radio :label="1" size="large">启用</el-radio>
          <el-radio :label="0" size="large">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属机构">
        form.unitId
        <el-select v-model="form.unitId" placeholder="请选择" size="large">
          <el-option v-for="item in unitList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属岗位">
        form.unitId
        <el-select v-model="form.postIds" multiple placeholder="请选择" size="large">
          <el-option
            v-for="item in pageList"
            :key="item.id"
            :label="item.postName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="分配角色">
        <el-input v-model="form.roleIds" autocomplete="off" />
      </el-form-item> -->

      <el-form-item label="备注">
        <el-input v-model="form.remark" :rows="2" type="textarea" placeholder="请输入内容" />
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
import { computed, onBeforeMount, reactive } from 'vue'
import { userUserListStore } from '@store/use-list'
import { storeToRefs } from 'pinia'
import { reqUserAdd } from '@api/user'
const userListStore = userUserListStore()
const { pageList, unitList } = storeToRefs(userListStore)
const props = defineProps<{
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
// const formLabelWidth = '140px'
const form = reactive({
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

onBeforeMount(() => {
  userListStore.getPageList({
    current: '1',
    size: '8'
  })
  userListStore.getUnitList()
})

async function addUser() {
  const { code } = await reqUserAdd(form)
  if (code === '200') {
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
  } else ElMessage.error('添加失败')
}
</script>

<style lang="scss" scoped></style>
