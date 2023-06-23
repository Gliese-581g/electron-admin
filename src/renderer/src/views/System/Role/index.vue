<template>
  <div v-loading="!roleList.length" class="table-box">
    <SearchRole @get-role-list="getRoleList" />
    <div class="table-header">
      <span class="table-title">角色列表</span>
      <div class="table-edit">
        <el-button type="primary" :icon="Plus" @click="editRole('')">新增角色</el-button>
        <el-icon><Refresh /></el-icon>
      </div>
    </div>
    <AddRole :id="id" v-model:dialog-visible="dialogVisible" :role-list="roleList" />

    <el-table :data="roleList" border>
      <el-table-column type="index" align="center" label="编号" width="100" />
      <el-table-column label="角色名称" prop="roleName" min-width="150" align="center" />
      <el-table-column label="权限编码" prop="rolePerm" min-width="150" align="center" />
      <el-table-column label="是否启用" prop="enabled" align="center" width="120">
        <template #default="scope">
          <el-tag v-if="scope.row.enabled">启用</el-tag>
          <el-tag v-else type="danger">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" min-width="200" align="center">
        <template #default="scope">
          {{ getDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="230" fixed="right" align="center">
        <template #header> </template>
        <template #default="scope">
          <el-button size="small" @click="editRole(scope.row.id)">修改</el-button>
          <el-popconfirm title="确定删除?" @confirm="deleteRole(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button size="small" text>分配用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="page.current"
      v-model:page-size="page.size"
      :page-sizes="[6, 8, 10]"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px"
      @size-change="getRoleList()"
      @current-change="getRoleList()"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'

import { reqGetRoleList } from '@api/role'
import { IRole } from '@renderer/typings/global'

import { Plus } from '@element-plus/icons-vue'
import AddRole from './AddRole.vue'
import SearchRole from './SearchRole.vue'
import { reqDeleteRole } from '@api/role'
import { getDate } from '@utils/index'

const dialogVisible = ref(false)
const roleList = ref<IRole[]>([])

const page = reactive({
  current: 1,
  size: 8
})
const total = ref(0)

// 函数重载
async function getRoleList(searchForm = {}) {
  const { code, msg, data } = await reqGetRoleList(Object.assign(page, searchForm))
  if (code === '200') {
    roleList.value = data.records
    total.value = data.total
  } else console.log(msg)
}

onBeforeMount(() => {
  getRoleList()
})

const id = ref('')
function editRole(value) {
  id.value = value
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
