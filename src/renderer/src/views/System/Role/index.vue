<template>
  <div v-loading="!pageData.length" class="table-box">
    <SearchItem @get-page="getPage" />
    <div class="table-header">
      <span class="table-title">角色列表</span>
      <div class="table-edit">
        <el-button type="primary" :icon="Plus" @click="editForm()">新增角色</el-button>
        <el-button @click="getPage()">
          <el-icon><Refresh /></el-icon>
        </el-button>
      </div>
    </div>
    <ItemForm :id="itemId" v-model:dialog-visible="dialogVisible" :get-page="getPage" />

    <el-table :data="pageData" border>
      <el-table-column type="index" align="center" label="编号" width="100" />
      <el-table-column label="角色名称" prop="roleName" min-width="150" align="center" />
      <el-table-column label="权限编码" prop="rolePerm" min-width="150" align="center" />
      <el-table-column label="是否启用" prop="enabled" align="center" width="120">
        <template #default="{ row }">
          <DictTag :dict-type="DictType.SYSTEM_GLOBAL_STATUS" :value="row.enabled" />
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
          <el-button size="small" @click="editForm(scope.row.id)">修改</el-button>
          <el-popconfirm title="确定删除?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button size="small" text>分配用户</el-button>
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
import { DictType } from '@config/index'

import * as roleApi from '@api/system/role'

import { Plus } from '@element-plus/icons-vue'
import ItemForm from './ItemForm.vue'
import SearchItem from './SearchItem.vue'
import { getDate } from '@utils/index'
import usePage from '@renderer/hooks/usePage'

const pageName = '角色'
const { pageData, pagination, getPage, total, dialogVisible, itemId, handleDelete, editForm } =
  usePage<roleApi.IRole>(roleApi, pageName)
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
