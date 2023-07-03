<template>
  <div class="table-box">
    <div class="table-header">
      <span class="table-title">用户列表</span>
      <div class="table-edit">
        <el-button type="primary" :icon="Plus" @click="editForm()">新增用户</el-button>
        <el-button type="danger" :icon="Delete" @click="editForm()">删除</el-button>
      </div>
    </div>
    <!-- 用户表单 -->
    <UserForm :id="itemId" v-model:dialogVisible="dialogVisible" @get-page="getPage" />
    <el-table v-loading="!pageData.length" :data="pageData" style="width: 100%" border>
      <el-table-column type="selection" align="center" fixed min-width="70" />
      <el-table-column label="用户名称" prop="username" align="center" min-width="150" />
      <el-table-column label="真实姓名" prop="realName" align="center" min-width="150" />
      <el-table-column label="用户类型" prop="userType" align="center" min-width="120">
        <template #default="scope"> {{ calcUserType(scope.row.userType) }} </template>
      </el-table-column>
      <el-table-column label="手机号码" prop="phone" align="center" width="150" />
      <el-table-column label="用户性别" align="center" min-width="100">
        <template #default="{ row }">
          <DictTag :dict-type="DictType.SYSTEM_GLOBAL_GENDER" :value="row.gender" />
        </template>
      </el-table-column>
      <el-table-column label="账号状态" align="center" min-width="100">
        <template #default="{ row }">
          <DictTag :dict-type="DictType.SYSTEM_GLOBAL_STATUS" :value="row.enabled" />
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="操作" align="center" fixed="right">
        <template #default="scope">
          <el-button size="small" type="success" @click="editForm(scope.row.id)">修改</el-button>
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
import * as userApi from '@api/system/user'
import UserForm from './UserForm.vue'
import { DictType } from '@config/index'
import usePage from '@renderer/hooks/usePage'
const pageName = '用户'
const { pageData, pagination, getPage, total, dialogVisible, itemId, handleDelete, editForm } =
  usePage<userApi.Record>(userApi, pageName)

//  "userType": 1,//用户类型（0：普通账号；1：超级管理员）
function calcUserType(userType: number) {
  return userType ? '超级管理员' : '普通账号'
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
