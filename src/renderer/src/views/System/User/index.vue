<template>
  <div v-loading="!userList.length" class="table-box">
    <div class="table-header">
      <span class="table-title">用户列表</span>
      <div class="table-edit">
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增用户</el-button>
        <el-button type="danger" :icon="Delete" @click="handleAdd">删除</el-button>
      </div>
    </div>
    <AddUser :id="userId" v-model:dialogVisible="dialogVisible" @get-user-list="getUserList" />
    <el-table :data="userList" style="width: 100%" border>
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
          <el-button size="small" type="primary" text @click="handleDelete(scope.row.id)"
            >更多</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page.currentPage"
      v-model:page-size="page.pageSize"
      :page-sizes="[6, 8, 10]"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
      style="margin-top: 20px"
      @size-change="handlePageChange"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import { userUserListStore } from '@store/use-list'
import { storeToRefs } from 'pinia'
import { Plus, Delete } from '@element-plus/icons-vue'
import AddUser from './AddUser.vue'
import { reqDeleteUser } from '@api/user'
const userListStore = userUserListStore()
const { userList, pageTotal } = storeToRefs(userListStore)
const dialogVisible = ref(false)

const page = reactive({
  currentPage: 1,
  pageSize: 8
})
const getUserList = () => {
  userListStore.getUserList({
    current: page.currentPage,
    size: page.pageSize
  })
}
onBeforeMount(() => {
  getUserList()
})
const handlePageChange = () => {
  getUserList()
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
  const { code, msg } = await reqDeleteUser(id)
  if (code === '200') {
    ElMessage.success('用户删除成功')
    getUserList()
  } else ElMessage.error(`用户删除失败，失败原因：${msg}`)
}
</script>

<style lang="scss" scoped>
.table-box {
  margin: 40px;
  .table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
