<template>
  <div class="table-box">
    <div class="table-header">
      <span class="table-title">用户列表</span>
      <div class="table-edit">
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增用户</el-button>
        <el-button type="danger" :icon="Delete" @click="handleAdd">删除</el-button>
      </div>
    </div>
    <!-- 用户表单 -->
    <UserForm :id="userId" v-model:dialogVisible="dialogVisible" @get-user-page="getUserPage" />
    <el-table v-loading="!userPage.length" :data="userPage" style="width: 100%" border>
      <el-table-column type="selection" align="center" fixed min-width="70" />
      <el-table-column label="用户名称" prop="username" align="center" min-width="150" />
      <el-table-column label="真实姓名" prop="realName" align="center" min-width="150" />
      <el-table-column label="用户类型" prop="userType" align="center" min-width="120">
        <template #default="scope"> {{ calcUserType(scope.row.userType) }} </template>
      </el-table-column>
      <el-table-column label="手机号码" prop="phone" align="center" width="150" />
      <el-table-column label="用户性别" align="center" min-width="100">
        <template #default="scope"> {{ calcGender(scope.row.gender) }} </template>
      </el-table-column>
      <el-table-column label="账号状态" align="center" min-width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.enabled">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="操作" align="center" fixed="right">
        <template #default="scope">
          <el-button size="small" type="success" @click="handleEdit(scope.row.id)">修改</el-button>
          <el-popconfirm title="确定删除?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button size="small" type="primary" text>更多</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page.current"
      v-model:page-size="page.size"
      :page-sizes="[8, 10, 12]"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px"
      @size-change="handlePageChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import * as userApi from '@api/system/user'
import UserForm from './UserForm.vue'
const dialogVisible = ref(false)

const page = reactive({
  current: 1,
  size: 10
})
// 用户列表
const userPage = ref<userApi.Record[]>([])
const total = ref(0)
const getUserPage = async () => {
  const data = await userApi.getUserPage({
    current: page.current.toString(),
    size: page.size.toString()
  })
  userPage.value = data.records
  total.value = data.total
}
onBeforeMount(() => {
  getUserPage()
})
const handlePageChange = () => {
  getUserPage()
}
const userId = ref('')
function handleAdd() {
  userId.value = ''
  dialogVisible.value = true
}
// （1：男；2：女；0：未知）
function calcGender(gender: number) {
  return gender ? (gender === 1 ? '男' : '女') : '未知'
}

//  "userType": 1,//用户类型（0：普通账号；1：超级管理员）
function calcUserType(userType: number) {
  return userType ? '超级管理员' : '普通账号'
}

const handleEdit = (id) => {
  userId.value = id
  dialogVisible.value = true
}
const handleDelete = async (id) => {
  try {
    await userApi.deleteUser(id)
    ElMessage.success('用户删除成功')
    getUserPage()
  } catch (error: any) {
    //如果Promise是reject时都会throw reason，无论reason是不是Error
    if (!(error instanceof Error)) {
      ElMessage.error(`用户删除失败，失败原因：${error.msg}`)
    }
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
.table-box {
  .table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
