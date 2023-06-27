<template>
  <div v-loading="!dictTypePage.length" class="table-box">
    <!-- <SearchRole @get-list="getList" /> -->
    <div class="table-header">
      <span class="table-title">字典列表</span>
      <div class="table-edit">
        <el-button type="primary" :icon="Plus">新增角色</el-button>
        <el-icon><Refresh /></el-icon>
      </div>
    </div>
    <!-- <AddRole :id="dictTypeId" v-model:dialog-visible="dialogVisible" :role-page="dictTypePage" /> -->

    <el-table :data="dictTypePage" border>
      <el-table-column type="index" align="center" label="编号" width="100" />
      <el-table-column label="字典类型名称" prop="name" min-width="130" />
      <el-table-column label="分类编码" prop="type" min-width="250" />
      <el-table-column label="字典描述" prop="remarks" min-width="150" />

      <el-table-column label="创建时间" prop="createTime" min-width="200" align="center">
        <template #default="scope">
          {{ getDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="230" fixed="right" align="center">
        <template #header> </template>
        <template #default="scope">
          <el-button size="small" type="primary" @click="editRole(scope.row.id)">详情</el-button>
          <el-button size="small" @click="editRole(scope.row.id)">修改</el-button>
          <el-popconfirm title="确定删除?" @confirm="deleteRole(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger" :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
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
      @size-change="getList()"
      @current-change="getList()"
    />
  </div>
</template>

<script setup lang="ts">
import * as dictApi from '@api/system/dict'
import { onBeforeMount, reactive, ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { getDate } from '@utils/index'

const dictTypePage = ref<dictApi.DictType[]>([])
const page = reactive({
  current: 1,
  size: 10
})
const total = ref(0)
const getList = async () => {
  const data = await dictApi.getDictTypePage({
    current: page.current.toString(),
    size: page.size.toString()
  })
  dictTypePage.value = data.records
  total.value = data.total
}
onBeforeMount(() => {
  getList()
})
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
