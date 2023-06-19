<template>
  <div class="table-box">
    <SearchRole />
    <div class="table-header">
      <span class="table-title">角色列表</span>
      <div class="table-edit">
        <el-button type="primary" :icon="Plus" @click="addRole">新增角色</el-button>
        <el-icon><Refresh /></el-icon>
      </div>
    </div>
    <AddRole v-model:dialog-visible="dialogVisible" :role-item="roleItem" />

    <el-table :data="roleList" border>
      <el-table-column type="index" align="center" label="编号" width="100" />
      <el-table-column label="角色名称" prop="roleName" min-width="150" align="center" />
      <el-table-column label="权限编码" prop="rolePerm" min-width="150" align="center" />
      <el-table-column label="是否启用" prop="enabled" align="center" width="150">
        <template #default="scope">
          <el-tag v-if="scope.row.enabled">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" min-width="150" align="center" />
      <el-table-column label="操作" min-width="230" fixed="right" align="center">
        <template #header> </template>
        <template #default="scope">
          <el-button size="small" @click="editRole(scope.row)">修改</el-button>
          <el-popconfirm title="确定删除?" @confirm="deleteRole(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button size="small" text>分配用户</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoleStore } from '@store/role'
import { storeToRefs } from 'pinia'
import { Plus } from '@element-plus/icons-vue'
import AddRole from './AddRole.vue'
// import { IRole } from '@store/types'
import { reqDeleteRole } from '@api/role'
import SearchRole from './SearchRole.vue'

const roleStore = useRoleStore()
const { roleList } = storeToRefs(roleStore)
const dialogVisible = ref(false)

const getRoleList = () => {
  roleStore.getRoleList({
    current: '1',
    size: '8'
  })
}

onBeforeMount(() => {
  getRoleList()
})
function addRole() {
  roleItem.value = null
  dialogVisible.value = true
}

const roleItem = ref(null)
function editRole(role) {
  roleItem.value = role
  dialogVisible.value = true
}
async function deleteRole(id) {
  const { code, msg } = await reqDeleteRole(id)
  if (code === '200') {
    ElMessage.success('角色删除成功')
    getRoleList()
  } else ElMessage.error(`角色删除失败，失败原因：${msg}`)
}
</script>

<style lang="scss" scoped>
.table-box {
  // margin: 40px;
  .table-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
