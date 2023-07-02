<template>
  <div v-loading="!pageData.length" class="page-box">
    <slot name="searchForm"></slot>
    <div class="page-header">
      <el-button type="primary" :icon="Plus" @click="editForm()">新建</el-button>
      <el-button :icon="Printer">导出</el-button>
    </div>

    <slot name="editForm"></slot>

    <el-table :data="pageData">
      <el-table-column type="index" min-width="100" align="center" />
      <el-table-column prop="className" label="班级管理" min-width="120" align="center" />
      <el-table-column prop="beginDate" label="开班时间" min-width="120" align="center" />
      <el-table-column label="学员人数" min-width="120" align="center">
        <template #default="{ row }">{{ row.applyNum }} / {{ row.fullPeople }} </template>
      </el-table-column>
      <el-table-column prop="mainTeacherUsername" label="主讲老师" min-width="120" align="center" />
      <el-table-column
        prop="manageTeacherUsername"
        label="学管老师"
        min-width="120"
        align="center"
      />
      <el-table-column
        prop="assistTeacherUsername"
        label="助教老师"
        min-width="120"
        align="center"
      />
      <el-table-column prop="status" label="班级状态" min-width="120" align="center" />
      <el-table-column prop="teachingMethod" label="授课方式" min-width="120" align="center" />
      <el-table-column
        prop="teachingDay"
        :formatter="formatter"
        label="上课时间"
        min-width="200"
        align="center"
      />

      <el-table-column fixed="right" label="Operations" min-width="130">
        <template #default="{ row }">
          <div class="flex-operations">
            <el-button link type="primary" size="small" :icon="Edit" @click="editForm(row.id)">
              上课点名</el-button
            >
            <el-button link type="primary" size="small" :icon="Edit" @click="editForm(row.id)">
              添加学员</el-button
            >
            <el-button link type="primary" size="small" :icon="Edit" @click="editForm(row.id)">
              恢复开班</el-button
            >
            <el-button link type="primary" size="small" :icon="Edit" @click="editForm(row.id)">
              编辑</el-button
            >
            <el-popconfirm title="确定删除?" @confirm="handleDelete(row.id)">
              <template #reference>
                <el-button link size="small" type="danger" :icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
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
    <ItemForm
      :id="itemId"
      v-model:dialog-visible="dialogVisible"
      :page-name="pageName"
      @get-page="getPage"
    />
  </div>
</template>

<script setup lang="ts">
import * as pageApi from '@api/teach/class'
import { Delete, Edit, Plus, Printer } from '@element-plus/icons-vue'
import { convertToChineseWeekday } from '@utils/index'
import usePage from '@renderer/hooks/usePage'
import ItemForm from './ItemForm.vue'

const pageName = '班级'
const { pageData, pagination, getPage, total, dialogVisible, itemId, handleDelete, editForm } =
  usePage(pageApi, pageName)

const formatter = (row, _column, cellValue) => {
  return convertToChineseWeekday(cellValue).replace(/,/g, ', ') + ' ' + row.teachingTime
}
</script>

<style lang="scss" scoped>
.page-box {
  // margin: 40px;
  .page-header {
    margin-bottom: 20px;
  }
  .flex-operations {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
}
</style>
