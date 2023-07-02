<template>
  <div v-loading="!pageData.length" class="table-box">
    <!-- <SearchRole @get-list="getList" /> -->
    <div class="table-header">
      <span class="table-title">{{ pageName }}</span>
      <div class="table-edit">
        <el-button type="primary" :icon="Plus">新增</el-button>
        <el-icon><Refresh /></el-icon>
      </div>
    </div>
    <!-- <AddRole :id="dictTypeId" v-model:dialog-visible="dialogVisible" :role-page="dictTypePage" /> -->

    <el-table :data="pageData" border>
      <el-table-column type="index" align="center" label="编号" width="100" />
      <el-table-column label="字典类型名称" prop="name" min-width="130" />
      <el-table-column label="分类编码" prop="type" min-width="250">
        <template #default="{ row }">
          <el-link type="primary" :underline="false" @click="linkToItem(row.type)">{{
            row.type
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="字典描述" prop="remarks" min-width="150" />

      <el-table-column label="创建时间" prop="createTime" min-width="200" align="center">
        <template #default="scope">
          {{ getDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="230" fixed="right" align="center">
        <template #header> </template>
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="linkToItem(row.type)">详情</el-button>
          <el-button size="small" @click="editForm(row.id)">修改</el-button>
          <el-popconfirm title="确定删除?" @confirm="handleDelete(row.id)">
            <template #reference>
              <el-button size="small" type="danger" :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.size"
      :page-sizes="[8, 10, 12]"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px"
      @size-change="getPage()"
      @current-change="getPage()"
    />
  </div>
</template>

<script setup lang="ts">
import * as dictTypeApi from '@api/system/dictType'
import { Plus, Delete } from '@element-plus/icons-vue'
import { getDate } from '@utils/index'
import usePage from '@renderer/hooks/usePage'
import { useRouter } from 'vue-router'

const pageName = '字典列表'
const { pageData, pagination, getPage, total, handleDelete, editForm } = usePage(
  dictTypeApi,
  pageName
)
const router = useRouter()
const linkToItem = (dictType) => {
  router.push({
    path: '/system/dict-item',
    query: { dictType }
  })
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
