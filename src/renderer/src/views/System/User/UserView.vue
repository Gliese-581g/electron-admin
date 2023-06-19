<template>
  <div class="table-box">
    <div class="table-header">
      <span class="table-title">用户列表</span>
      <div class="table-edit">
        <el-button type="primary" :icon="Plus" @click="addRole">新增用户</el-button>
      </div>
    </div>
    <EditDialog v-model:dialogVisible="dialogVisible" />
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="selection" align="center" fixed width="100" />
      <el-table-column label="用户名称" prop="username" align="center" width="150" />
      <el-table-column label="真实姓名" prop="realName" align="center" width="150" />
      <el-table-column label="用户类型" prop="userType" align="center" width="150" />
      <el-table-column label="手机号码" prop="phone" align="center" width="150" />
      <el-table-column label="用户性别" align="center" width="150">
        <template #default="scope"> {{ calcGender(scope.row.gender) }} </template>
      </el-table-column>
      <el-table-column label="账号状态" align="center" width="150">
        <template #default="scope">
          <el-tag v-if="scope.row.enabled">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="150" label="操作" fixed="right">
        <!-- <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template> -->
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { userUserListStore } from '@store/use-list'
import { storeToRefs } from 'pinia'
import { Plus } from '@element-plus/icons-vue'
import EditDialog from './EditDialog.vue'
const userListStore = userUserListStore()
const { userList } = storeToRefs(userListStore)
const dialogVisible = ref(false)
onBeforeMount(() => {
  userListStore.getUserList({
    current: '1',
    size: '8'
  })
})

function addRole() {
  dialogVisible.value = true
}
// （1：男；2：女；0：未知）
function calcGender(gender: number) {
  return gender ? '未知' : gender === 1 ? '男' : '女'
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
