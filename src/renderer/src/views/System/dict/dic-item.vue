<template>
  <div v-loading="!pageData.length" class="page-box">
    <SearchItemForm @get-page="getPage" />
    <div class="page-header">
      <el-button type="primary" :icon="Plus">添加</el-button>
    </div>

    <el-table :data="pageData" border>
      <el-table-column type="index" align="center" label="编号" width="100" />
      <el-table-column label="字典键名" prop="k" min-width="100" />
      <el-table-column label="字典键值" prop="v" min-width="100" align="center" />
      <el-table-column label="排序" prop="sort" min-width="50" align="center" />
      <el-table-column label="字典描述" prop="remark" min-width="150" />
      <el-table-column label="创建时间" prop="createTime" min-width="200" align="center">
        <template #default="scope">
          {{ getDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" fixed="right" align="center">
        <template #default="scope">
          <el-button size="small" @click="editForm(scope.row.id)">修改</el-button>
          <el-popconfirm title="确定删除?" @confirm="handleDelete(scope.row.id)">
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
import { Plus, Delete } from '@element-plus/icons-vue'
import { getDate } from '@utils/index'
import usePage from '@renderer/hooks/usePage'
import * as pageApi from '@api/system/dictItem'
import SearchItemForm from './components/SearchItemForm.vue'
const pageName = '字典项列表'
const { pageData, pagination, getPage, total, handleDelete, editForm } =
  usePage<pageApi.DictItemVO>(pageApi, pageName)
</script>

<style lang="scss" scoped></style>
